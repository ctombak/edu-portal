---
id: plugins/cloud-migration
title: "Cloud Migration & Multi-Cloud Strategy"
subtitle: "From On-Premise to Cloud-Native"
duration: 40 min
type: plugin
learningObjectives:
  - Evaluate cloud deployment models (IaaS, PaaS, SaaS, hybrid)
  - Apply the 6 Rs of cloud migration to your application portfolio
  - Design multi-cloud strategies that avoid vendor lock-in
  - Plan cloud migrations with minimal disruption to operations
---

# Cloud Migration & Multi-Cloud Strategy
## From On-Premise to Cloud-Native

<!-- notes: Most enterprise products today involve a cloud component -- whether migrating from on-premise, adopting cloud-native, or managing multi-cloud complexity. This module provides frameworks for making cloud strategy decisions and executing migrations safely. Best for organizations moving from on-premise to cloud or managing multi-cloud environments. -->

---

## Why Cloud Migration Matters Now

- Cloud adoption is no longer optional for most enterprises -- it's a competitive necessity
- Key drivers: cost optimization, scalability on demand, global reach, faster time-to-market, and access to managed services (AI/ML, analytics, IoT)
- The reality: most enterprises are not greenfield cloud -- they have decades of on-premise investment to manage
- Cloud deployment models:
  - **IaaS (Infrastructure as a Service)** -- maximum control, you manage OS and up
  - **PaaS (Platform as a Service)** -- managed runtime, you focus on application code
  - **SaaS (Software as a Service)** -- fully managed, you configure and consume
  - **Hybrid** -- strategic mix of on-premise and cloud for specific workloads
- The decision is not "if" but "what, when, and how"

> Cloud migration is not a technology project -- it's a business transformation. The technology is the easy part; the organizational change is hard.

<!-- notes: Set context by asking participants about their current cloud adoption stage. Most enterprises are somewhere in the middle -- neither fully on-premise nor fully cloud-native. -->

---

## The 6 Rs of Cloud Migration

- Every application in your portfolio may follow a different migration path:
  - **Rehost (Lift-and-Shift)** -- move as-is to cloud VMs. Fastest path, minimal optimization, good for quick wins and datacenter exits
  - **Replatform (Lift-and-Optimize)** -- minor adjustments to leverage cloud services (e.g., swap self-managed database for managed RDS). Moderate effort, meaningful benefit
  - **Refactor (Re-architect)** -- redesign for cloud-native (containers, serverless, microservices). Highest effort, highest long-term benefit. Reserve for strategic applications
  - **Repurchase** -- switch to SaaS (e.g., on-premise CRM to Salesforce). Eliminates operational burden but may require data migration and workflow changes
  - **Retire** -- decommission applications no longer needed. Often 10-20% of the portfolio
  - **Retain** -- keep on-premise due to latency requirements, regulatory constraints, or insufficient ROI for migration
- Portfolio assessment: categorize every application using a value vs. migration complexity matrix
- Start with quick wins (rehost) to build momentum and organizational confidence

**Framework: The 6 Rs** -- Rehost, Replatform, Refactor, Repurchase, Retire, Retain. Each application gets its own migration strategy based on business value and technical complexity.

<!-- notes: The 6 Rs framework is from AWS but applies universally. Walk through a concrete example: a portfolio of 50 applications and how you would categorize them. -->

---

## Multi-Cloud Strategy

- **Best-of-breed vs. single-provider:**
  - Single provider: simpler operations, deeper integration, volume discounts, but vendor lock-in risk
  - Multi-cloud: flexibility, negotiating leverage, best service per workload, but operational complexity tax
- Avoiding lock-in through abstraction layers:
  - Container orchestration (Kubernetes) provides compute portability
  - Infrastructure as Code (Terraform) enables multi-cloud provisioning
  - Abstraction at the application layer (avoid cloud-specific APIs where possible)
- Cost optimization through workload placement:
  - Match workload characteristics to provider strengths (e.g., data analytics on GCP, enterprise integration on Azure, general compute on AWS)
  - Reserved instances for predictable workloads, spot/preemptible for batch processing
- The operational complexity tax of multi-cloud: multiple consoles, different security models, distinct networking paradigms, separate identity systems
- Multi-cloud does not mean every workload runs on every cloud -- it means strategic placement

> Multi-cloud is a strategy, not a goal. Don't adopt it for its own sake -- adopt it when the business benefits outweigh the operational complexity.

<!-- notes: Be honest about multi-cloud complexity. Many organizations adopt multi-cloud accidentally (through acquisitions or team preferences) rather than strategically. That's the worst outcome. -->

---

## Migration Execution Planning

- **Application dependency mapping:** understand what connects to what before you move anything. A database migration that breaks 15 downstream applications is a career-defining event
- **Migration wave planning:** group applications into waves based on dependencies, risk, and business impact. Early waves should be low-risk to build confidence and refine processes
- **Cutover strategies:**
  - **Big bang** -- switch everything at once (high risk, fast completion)
  - **Phased** -- migrate wave by wave (lower risk, longer duration)
  - **Parallel running** -- both old and new systems active during transition (safest, most expensive)
- **Rollback procedures:** every migration needs a documented, tested rollback plan. If you can't roll back, you can't migrate safely
- **Post-migration validation:** functional testing, performance benchmarking against pre-migration baselines, security scanning of the new environment

<!-- notes: Dependency mapping is the most time-consuming but most valuable pre-migration activity. Tools help, but manual validation with application owners is essential. -->

---

## Landing Zones & Governance Guardrails

- A **landing zone** is a pre-configured, secure, well-governed cloud environment ready to receive workloads
- Key components:
  - **Account/subscription structure** -- organizational hierarchy for billing, access, and blast radius isolation
  - **Network architecture** -- VPCs, subnets, peering, connectivity back to on-premise
  - **Identity and access management** -- federated identity, role-based access, least privilege
  - **Security baselines** -- encryption policies, logging requirements, compliance controls
  - **Cost management** -- budgets, alerts, tagging standards for cost allocation
- Governance guardrails prevent teams from making expensive mistakes:
  - Service control policies limiting which services and regions can be used
  - Automated compliance scanning detecting misconfigured resources
  - Tagging enforcement for cost tracking and ownership

**Framework: Cloud Landing Zone** -- Account structure, network architecture, IAM, security baselines, cost management. Build the foundation before migrating workloads.

<!-- notes: Landing zones are worth the upfront investment. Organizations that skip this step spend far more time later cleaning up ad-hoc environments. -->

---

## Common Migration Pitfalls

- **Lift-and-shift everything:** moving inefficient on-premise architectures to the cloud just makes them expensive cloud architectures
- **Underestimating data transfer costs:** moving terabytes of data has real costs in time, bandwidth, and egress charges
- **Ignoring the people side:** cloud migration requires new skills. Budget for training and expect a productivity dip during the transition
- **No cost governance:** cloud spend can spiral without guardrails. Teams accustomed to fixed infrastructure costs are surprised by variable cloud billing
- **Security model gaps:** on-premise security assumptions (perimeter-based) don't apply in the cloud (identity-based). This is where breaches happen
- **Neglecting operational readiness:** the ops team needs to be ready to manage cloud infrastructure before migration, not after

> The most dangerous migration pitfall is assuming that "same application, different location" means "same risk, same cost." It doesn't.

<!-- notes: Close by asking participants to identify which pitfalls their organization is most susceptible to. This builds awareness and prevention. -->
