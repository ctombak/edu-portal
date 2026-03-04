# ==========================================
# Next.js Production Dockerfile (Standalone)
# ==========================================
# Produces a minimal (~150MB) production image
# with non-root user, health check, and proper
# signal handling.
# ==========================================

# ==========================================
# Base Image
# ==========================================
FROM node:24-alpine AS base

# ==========================================
# Stage 1: Install dependencies only
# ==========================================
FROM base AS deps

# libc6-compat is required on Alpine for some
# Node.js native modules (e.g. sharp, bcrypt)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy lockfile + package.json for cache-friendly installs.
# Supports npm (default), yarn, pnpm — uncomment your manager.
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# --- If using yarn instead: ---
# COPY package.json yarn.lock* ./
# RUN yarn install --frozen-lockfile --ignore-scripts

# --- If using pnpm instead: ---
# COPY package.json pnpm-lock.yaml* ./
# RUN corepack enable pnpm && pnpm install --frozen-lockfile --ignore-scripts

# ==========================================
# Stage 2: Build the application
# ==========================================
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# If you need build-time env vars (public ones only),
# pass them as build args:
# ARG NEXT_PUBLIC_SUPABASE_URL
# ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL

RUN npm run build

# ==========================================
# Stage 3: Production runner (final image)
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 1. Copy public assets (standalone doesn't include them)
COPY --from=builder /app/public ./public

# 2. Create .next dir with correct ownership for
#    ISR / on-demand revalidation prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# 3. Copy the standalone server + bundled node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# 4. Copy static assets (standalone doesn't include them)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose and configure networking
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check — adjust the path if you have a
# dedicated /api/health route
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the standalone server
CMD ["node", "server.js"]
