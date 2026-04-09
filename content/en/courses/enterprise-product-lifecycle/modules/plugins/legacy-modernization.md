---
id: plugins/legacy-modernization
title: "Legacy Modernization & Strangler Fig Pattern"
subtitle: "Incremental Modernization Without Big-Bang Risk"
duration: 40 min
type: plugin
learningObjectives:
  - Assess legacy systems for modernization readiness
  - Apply the Strangler Fig pattern for incremental modernization
  - Manage the dual operating model during transition
  - Avoid common modernization anti-patterns
---

# Legacy Modernization & Strangler Fig Pattern
## Incremental Modernization Without Big-Bang Risk

<!-- notes: Most enterprises don't build greenfield -- they modernize legacy systems while keeping the business running. This module covers proven patterns for incremental modernization without big-bang risk. Best for teams maintaining legacy systems while building modern replacements. -->

---

## The Legacy Reality

- Legacy systems are not failures -- they are successes that survived long enough to become constraints
- Signs a system needs modernization:
  - The talent pool that can maintain it is shrinking (COBOL, Visual Basic 6, proprietary frameworks)
  - Change velocity has slowed to a crawl -- simple features take months
  - Integration with modern systems requires increasingly brittle workarounds
  - Compliance and security requirements are becoming impossible to meet
  - The system is a single point of failure with no viable disaster recovery
- The business reality: legacy systems often run the most critical business processes. You cannot simply turn them off
- Modernization is not optional -- but the approach matters more than the ambition

> Legacy systems are yesterday's innovation running today's business. Respect what they do before you replace how they do it.

<!-- notes: Start by acknowledging that legacy systems exist because they work. The developers who built them made reasonable decisions given the constraints of their time. Modernization is not about blame -- it's about evolution. -->

---

## Legacy Assessment Framework

- Evaluate legacy systems on two dimensions:
  - **Business Value** -- how critical is this system to current operations and revenue?
  - **Technical Health** -- how maintainable, secure, and scalable is the current implementation?
- The four quadrants:
  - **High Value + Poor Health = Modernize** -- critical system that needs investment. This is your priority
  - **Low Value + Poor Health = Retire** -- no longer worth maintaining. Plan a graceful shutdown
  - **High Value + Good Health = Maintain** -- working well, keep investing appropriately
  - **Low Value + Good Health = Replace with SaaS** -- good candidate for off-the-shelf replacement
- Assessment criteria for technical health:
  - Code maintainability and test coverage
  - Infrastructure currency (OS, database, middleware versions)
  - Security posture and compliance gaps
  - Scalability headroom vs. projected demand
  - Availability of skilled engineers

**Framework: Legacy Assessment Matrix** -- Plot systems on Business Value vs. Technical Health. Prioritize modernization investment where business value is high and technical health is low.

<!-- notes: Have participants map their own systems onto this matrix. It's a powerful exercise that often clarifies priorities that organizational politics have obscured. -->

---

## The Strangler Fig Pattern

- Named after tropical strangler fig trees that gradually envelop their host tree
- The principle: incrementally replace legacy functionality with modern implementations, routing traffic to the new system as each piece is ready
- **How it works:**
  1. Place a facade (routing layer) in front of the legacy system
  2. Build new functionality in the modern system
  3. Route new feature requests to the modern system
  4. Gradually migrate existing features from legacy to modern
  5. Eventually decommission the legacy system when all traffic is routed away
- **Key advantages:**
  - No big-bang cutover -- risk is spread over time
  - Value is delivered incrementally -- you don't wait years for the payoff
  - Rollback is simple -- route traffic back to legacy for any feature that has issues
  - The legacy system continues running critical processes during the transition
- **The facade layer** is critical: it can be an API gateway, reverse proxy, or event router that transparently directs requests to either the legacy or modern system

> The Strangler Fig pattern turns a terrifying big-bang migration into a series of manageable, reversible steps. Each step delivers value and reduces risk.

**Framework: Strangler Fig Pattern** -- Facade, build new, route incrementally, migrate gradually, decommission legacy. No big-bang risk. Continuous value delivery.

<!-- notes: Draw the pattern on a whiteboard showing the facade, legacy system, and modern system. Show how traffic gradually shifts from left to right over time. -->

---

## Managing the Dual Operating Model

- During modernization, you operate two systems simultaneously -- this creates unique challenges
- **Operational challenges:**
  - Two systems to monitor, patch, and support
  - Two sets of infrastructure costs (the "double running" expense)
  - Staff must maintain skills in both old and new technologies
  - Incidents may require investigation across both systems
- **Data consistency:**
  - Maintaining a single source of truth when data exists in both systems
  - Synchronization strategies: event-driven sync, scheduled ETL, change data capture
  - Conflict resolution when both systems can modify the same data
- **Team organization:**
  - Dedicated modernization team vs. rotating responsibilities
  - Protecting modernization capacity from legacy support demands
  - Knowledge transfer from legacy experts to modern system builders
- Set a clear timeline and budget for the dual operating period -- without a deadline, it stretches indefinitely

<!-- notes: The dual operating model is the hardest part of modernization. The temptation to cut costs by rushing the legacy shutdown is strong but dangerous. Plan and budget for the overlap explicitly. -->

---

## Data Migration Strategies

- Data migration is often the hardest part of modernization -- and the most underestimated
- **Approaches:**
  - **Dual-write** -- both systems write to both databases simultaneously. Simple concept but complex to implement reliably
  - **Change Data Capture (CDC)** -- monitor legacy database changes and replicate to the new system in near-real-time. Lower application impact
  - **ETL Pipelines** -- extract from legacy, transform to new schema, load into modern database. Good for batch migration of historical data
  - **Event Sourcing** -- replay business events to rebuild state in the new system. Provides an audit trail and enables replaying history
- **Data quality challenges:**
  - Legacy data often has inconsistencies, duplicates, and undocumented encoding rules
  - Schema mapping between old and new models requires deep domain knowledge
  - Historical data may have different semantics than current data (e.g., changed business rules)
- **Validation:** compare outputs of both systems during the dual operating period. Automated reconciliation catches discrepancies before users do
- Hardware context: migrating from legacy industrial controllers to modern edge computing platforms involves protocol translation (Modbus to MQTT), data format conversion, and maintaining real-time control constraints during the transition

**Framework: Data Migration Strategy Selection** -- Dual-write (synchronous consistency), CDC (near-real-time replication), ETL (batch historical), Event Sourcing (replay and audit). Choose based on consistency requirements and system architecture.

<!-- notes: Data migration failures are the number one cause of modernization project failures. Invest heavily in data quality assessment and automated validation. -->

---

## Common Modernization Anti-Patterns

- **Second System Syndrome** -- the replacement system tries to be everything the legacy system was plus everything anyone ever wanted. Scope explodes, timelines slip, and the new system becomes the next legacy
- **The Big Rewrite** -- attempting to replace the entire system at once. Years of development with no value delivered until the end (if it ever ends)
- **Ignoring the organizational change** -- new technology with old processes just creates expensive new problems
- **Modernizing what should be retired** -- not every legacy system deserves a modern replacement. Some should simply be decommissioned
- **Underestimating legacy domain knowledge** -- the legacy system embeds decades of business rules, many undocumented. Losing this knowledge during modernization means rebuilding it through painful production incidents
- **Feature parity obsession** -- insisting the new system must replicate every feature of the legacy system before cutover. Many legacy features are unused -- validate actual usage before migrating

> The goal of modernization is not to replicate the legacy system in modern technology. It's to deliver the business capabilities the organization needs today and tomorrow.

<!-- notes: Close by emphasizing that modernization is a business initiative, not a technology project. The technology decisions are important but secondary to understanding what the business actually needs from the replacement system. -->
