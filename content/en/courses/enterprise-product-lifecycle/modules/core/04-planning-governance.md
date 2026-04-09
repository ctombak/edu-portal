---
id: core/04-planning-governance
title: "Planning & Governance"
subtitle: "From Contract to Kickoff"
duration: 70 min
type: core
learningObjectives:
  - Negotiate contracts with clear scope, milestones, and SLA definitions
  - Select delivery methodologies appropriate to project context
  - Apply structured risk identification and mitigation frameworks
  - Define clear roles and responsibilities using the RACI model
---

# Planning & Governance
## From Contract to Kickoff

<!-- notes: Good architecture with bad governance fails. This module covers the organizational and procedural foundations that determine whether your product initiative succeeds: contracts, methodologies, risk management, and team structure. -->

---

## Contract Negotiation & SLAs

- The contract is the foundation of vendor relationships
- Key elements:
  - Precise scope definition (what's included AND what's excluded)
  - Milestone-based payment schedules (tied to deliverables, not calendar dates)
  - Acceptance criteria (objective, measurable, testable)
  - Intellectual property ownership (who owns what, especially for custom development)
  - Change management procedures (how scope changes are requested, evaluated, and priced)
  - Exit clauses (your escape plan if things go wrong)
- SLA design requires understanding the cost of downtime:
  - 99.9% availability = 8.7 hours of downtime per year
  - 99.99% availability = only 52.6 minutes per year
  - Each additional nine roughly 10x the infrastructure cost
- Response time tiers: P1 (critical -- 30 min response, 4 hour resolution), P2 (high -- 2 hour response, 8 hour resolution), P3/P4 (lower urgency)
- Penalty and incentive structures that align vendor behavior with your outcomes
- Hardware considerations: warranty terms, MTTR commitments for replacement hardware, spare parts stocking agreements, and end-of-life notification periods (minimum 24 months advance notice)

> The best contract is one that both parties hope they never need to reference -- because the governance makes collaboration natural.

**Framework: SLA Design Framework** -- Define SLIs (what to measure), set SLOs (internal targets with margin), formalize SLAs (external commitments with consequences). Always set SLOs tighter than SLAs.

<!-- notes: Walk through a real SLA example. The 99.9% vs 99.99% comparison always surprises people -- the gap between three nines and four nines is enormous in both cost and operational discipline. -->

---

## Delivery Methodology Selection

- No methodology is universally superior -- each serves different contexts
- **Agile (Scrum/Kanban):** best for products with evolving requirements, where fast feedback loops and iterative delivery create competitive advantage
- **SAFe (Scaled Agile Framework):** coordinates multiple agile teams delivering a single product or platform -- adds structure for large-scale alignment
- **Waterfall:** appropriate for regulatory-heavy deliverables, fixed-scope contracts, or hardware-dependent timelines where late changes are prohibitively expensive
- **Hybrid approaches:** Agile for software development sprints within a Waterfall-governed overall program -- common in enterprises with hardware-software products
- If your team spends more time on process ceremonies than on building product, something is wrong
- Hardware-specific: **V-Model** for systems requiring hardware-software co-design -- requirements flow down the left side, validation flows up the right
- **Stage-gate** for physical product development: concept, design, prototype, pilot, production. Manufacturing readiness reviews at each gate

**Framework: Methodology Selection Matrix** -- Match methodology to context: Agile (evolving requirements, fast feedback), SAFe (multi-team coordination), Waterfall (regulatory/hardware), Hybrid (mixed constraints). No one-size-fits-all.

**Framework: V-Model** -- Left side: requirements, design, implementation (decomposition). Right side: unit test, integration test, system test, acceptance test (validation). Each right-side phase validates its left-side counterpart.

<!-- notes: This is a good moment to ask the audience what methodology their organization uses and whether it's serving them well. Most will admit to some form of hybrid, even if they officially follow one methodology. -->

---

## Risk Management & Mitigation

- Hope is not a strategy. Every product initiative carries risks -- the question is whether you identify and manage them proactively or discover them as crises
- Risk identification techniques:
  - **Pre-mortem analysis** -- imagine the project has failed. What went wrong?
  - **Risk taxonomy review** -- technical, organizational, external, schedule, budget categories
  - **Lessons learned** from similar projects
- The **Impact x Probability matrix** prioritizes risks into four quadrants:
  - High impact x High probability -- immediate action required
  - High impact x Low probability -- contingency plans ready
  - Low impact x High probability -- monitor and mitigate routinely
  - Low impact x Low probability -- accept and move on
- Four mitigation strategies:
  - **Avoid** -- change the plan to eliminate the risk
  - **Transfer** -- shift risk to another party (insurance, contractual allocation)
  - **Mitigate** -- reduce probability or impact through specific actions
  - **Accept** -- conscious decision with contingency budget and plan
- SOC example: risk assessment for security platform migration. What happens if the new SIEM misses a critical detection during cutover? Mitigation: run both platforms in parallel for 30 days with the legacy system as fallback

> Hope is not a risk mitigation strategy. The pre-mortem is the most underused tool in project management.

**Framework: Pre-Mortem Analysis** -- Imagine the project has failed. Work backward: what went wrong? Surfaces risks that optimism bias would otherwise hide.

**Framework: Impact x Probability Matrix** -- Plot risks on severity vs. likelihood. Focus mitigation effort on high-impact risks regardless of probability.

<!-- notes: Run a quick pre-mortem exercise with the group if time allows. Pick a hypothetical project and have the room brainstorm failure modes. It's a powerful demonstration of how much risk optimism hides. -->

---

## Team Structure & RACI

- Clear accountability is the foundation of cross-functional delivery
- **RACI** defines four roles for every decision and deliverable:
  - **Responsible** -- the person or team doing the work
  - **Accountable** -- the single person who owns the outcome (there can be only one)
  - **Consulted** -- people whose input is sought before a decision
  - **Informed** -- people who are notified after a decision
- Common RACI mistakes: too many people Accountable (nobody is), confusing Consulted with Informed (slows everything down), not including vendors in the matrix
- Cross-functional team design: Product (what to build and why), Engineering (how to build it), QA (whether it works), Security (whether it's safe), Operations (whether it runs)
- Vendor-client integration models:
  - **Embedded** -- vendor team members sit within client teams
  - **Liaison** -- dedicated integration managers bridge the gap
  - **Independent** -- vendor works autonomously with defined interfaces
- **Conway's Law:** system architecture will mirror team communication structure
- The **inverse Conway maneuver:** design your team structure to produce the architecture you want

**Framework: RACI Matrix** -- Responsible (does the work), Accountable (owns the outcome -- only one), Consulted (provides input before), Informed (notified after). Prevents accountability gaps and decision paralysis.

**Framework: Conway's Law** -- System architecture mirrors team communication structure. Use the inverse Conway maneuver: design teams to produce the architecture you want.

<!-- notes: Have participants sketch a quick RACI for one key decision in their current project. The exercise usually reveals accountability gaps immediately. -->
