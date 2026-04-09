---
id: core/02-the-discovery-phase
title: "The Discovery Phase"
subtitle: "Requirements, RFI & Build-vs-Buy"
duration: 75 min
type: core
learningObjectives:
  - Map the enterprise product lifecycle and identify common failure modes
  - Translate stakeholder needs into structured, traceable requirements
  - Navigate the RFI/RFP/RFQ procurement process effectively
  - Apply a structured Build-vs-Buy decision framework
---

# The Discovery Phase
## Requirements, RFI & Build-vs-Buy

<!-- notes: This module covers the critical first phase of the product lifecycle: understanding what you need, determining how to get it, and making the fundamental build-or-buy decision that shapes everything that follows. -->

---

## The Enterprise Product Lifecycle Map

- The lifecycle spans six phases:
  - **Discovery** -- what do we need?
  - **Evaluation** -- who can deliver it?
  - **Planning** -- how will we deliver it?
  - **Build** -- making it real
  - **Launch** -- going live
  - **Operate** -- keeping it running and evolving
- Each phase has specific inputs, outputs, quality gates, and decision points
- The lifecycle isn't linear -- it's iterative with feedback loops
- A discovery insight can reshape architecture; a build constraint can redefine requirements
- Organizations that treat this as a waterfall from phase to phase consistently underperform

> The lifecycle isn't a conveyor belt -- it's a conversation between phases. The best teams maintain feedback loops at every stage.

**Framework: Product Lifecycle Phases** -- Discovery, Evaluation, Planning, Build, Launch, Operate. Each phase has defined inputs, outputs, quality gates, and feedback loops to earlier phases.

<!-- notes: Draw the lifecycle on the board as a loop, not a line. Emphasize that feedback loops are the differentiator between mature and immature organizations. -->

---

## Requirements Engineering -- From Needs to Specifications

- Requirements exist at three levels:
  - **Business Requirements** (why -- strategic goals)
  - **User Requirements** (what -- capabilities needed)
  - **Functional/Technical Requirements** (how -- specific behaviors and constraints)
- **MoSCoW Prioritization:**
  - **Must have** -- the product fails without it
  - **Should have** -- important but not critical for launch
  - **Could have** -- nice to have if budget allows
  - **Won't have** -- explicitly out of scope (equally important to define)
- The Requirements Traceability Matrix links every requirement back to its business justification and forward to its test case
- Hardware example: embedded system requirements must specify operating temperature ranges (-40C to +85C for industrial), power consumption budgets (mW for battery-powered IoT), physical dimensions, weight constraints, and EMC compliance alongside functional specifications

**Framework: MoSCoW Prioritization** -- Must have (critical), Should have (important), Could have (desirable), Won't have (explicit exclusion). Forces difficult prioritization conversations early.

**Framework: Requirements Traceability Matrix** -- Links each requirement to its business justification, design component, and validation test case. Ensures nothing is built without reason and nothing is untested.

<!-- notes: Spend extra time on the 'Won't have' category. Explicitly defining what is out of scope prevents scope creep more effectively than any other technique. -->

---

## The RFI/RFP/RFQ Procurement Framework

- Three instruments for three purposes:
  - **RFI (Request for Information)** -- market scanning. You know your problem but not who can solve it. Broad, exploratory, non-committal
  - **RFP (Request for Proposal)** -- solution evaluation. You know what you need and want vendors to propose their approach and pricing. Detailed, structured, comparative
  - **RFQ (Request for Quote)** -- price negotiation. You know exactly what you want and need the best price. Specification-driven, price-focused
- Sequencing matters: RFI narrows the market from 20 vendors to 5; RFP evaluates the 5 and selects 2-3 finalists; RFQ determines the winner
- SOC example: procuring a SOC-as-a-Service platform -- the RFI explores which vendors offer integrated SIEM, SOAR, and threat intelligence. The RFP specifies required detection rules, mean-time-to-detect SLAs, log source coverage, and analyst staffing models. The RFQ finalizes pricing per log volume tier

> A well-written RFP does half the evaluation work for you -- it forces vendors to address your real requirements, not their marketing talking points.

**Framework: RFI/RFP/RFQ Framework** -- RFI (explore the market), RFP (evaluate solutions), RFQ (negotiate pricing). Sequential narrowing from broad discovery to specific commitment.

<!-- notes: If the audience includes procurement professionals, invite them to share their RFP war stories. Common pitfall: writing an RFP so broad that vendor responses are incomparable. -->

---

## Build vs. Buy Decision Framework

- The decision hinges on two axes:
  - **Strategic Differentiation** -- does this capability give you competitive advantage?
  - **Organizational Capability** -- can you build and maintain this better than the market?
- **Build** when the capability is core to your value proposition and you have (or can attract) the talent
- **Buy** when the capability is commodity and the market offers mature, well-supported options
- Hidden costs of building: ongoing maintenance, talent retention, opportunity cost
- Hidden costs of buying: integration, customization limitations, vendor lock-in, license escalation
- Total Cost of Ownership (TCO) analysis over 3-5 years, including Year 0 (implementation) through Year 5 (ongoing operations and evolution)
- Hardware considerations: COTS (Commercial Off-The-Shelf) vs. custom hardware design. COTS is faster and cheaper upfront but may not meet exact performance, form factor, or certification needs. Custom design gives full control but requires NRE (Non-Recurring Engineering) investment and longer time-to-market

**Framework: Build vs. Buy Matrix** -- Plot capabilities on Strategic Differentiation vs. Organizational Capability. Build for high differentiation + high capability; buy for commodity + lower capability.

**Framework: TCO Analysis** -- Total Cost of Ownership over 3-5 years: implementation, integration, customization, maintenance, training, license escalation, and opportunity cost.

<!-- notes: This is often the most debated topic in the room. Allow time for discussion. Many participants will have strong opinions based on past experiences with both approaches. -->
