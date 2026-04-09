---
id: core/03-vendor-evaluation-architecture
title: "Vendor Evaluation & Architecture Design"
subtitle: "From Shortlist to Blueprint"
duration: 70 min
type: core
learningObjectives:
  - Evaluate vendors using structured scoring and POC methodology
  - Select appropriate architecture patterns for enterprise contexts
  - Design integration strategies and API contracts
  - Embed security and compliance into architecture decisions
---

# Vendor Evaluation & Architecture Design
## From Shortlist to Blueprint

<!-- notes: Once you know what you need and whether to build or buy (or both), this module covers how to evaluate vendors objectively, design architectures that last, plan integrations that scale, and embed security from the start. -->

---

## Vendor Evaluation Methodology

- Move beyond gut feel and sales demos to structured evaluation
- **Weighted Scoring Matrix:** define criteria (technical fit, scalability, vendor viability, support model, integration capability, total cost), assign weights reflecting your priorities, and score each vendor objectively
- **Proof of Concept (POC):** validates technical feasibility -- can the vendor's product actually do what they claim in your environment?
- **Proof of Value (POV):** goes further -- does it deliver measurable business value?
- Reference checks: talk to customers similar to you in scale and complexity, not just the vendor's cherry-picked references
- Financial due diligence: will this vendor exist in 3 years?
- SOC example: evaluating SIEM vendors -- score on detection rule coverage (MITRE ATT&CK mapping), false positive rates at your log volume, log ingestion throughput, SOAR integration depth, and analyst workflow efficiency

> Never let a vendor define your evaluation criteria. Their criteria are designed to make them win.

**Framework: Weighted Vendor Scoring Matrix** -- Define criteria, assign weights, score objectively. Categories: technical fit, scalability, vendor viability, support, integration, total cost. Enables apples-to-apples comparison.

**Framework: POC vs. POV** -- POC validates "can it work?" POV validates "does it deliver value?" Always define success criteria before starting either.

<!-- notes: Emphasize the importance of defining evaluation criteria BEFORE vendor demos. Once you see a polished demo, confirmation bias takes over. -->

---

## Enterprise Architecture Patterns

- Architecture is about trade-offs, not best practices
- **Monolith:** simple to develop and deploy, harder to scale and evolve independently
- **Microservices:** independently deployable, scalable per service, but operationally complex and requiring mature DevOps
- **Modular monolith:** the pragmatic middle ground -- logically separated modules in a single deployable unit, with the option to extract services later
- **Event-driven architecture:** decoupled producers and consumers communicating through events -- ideal for real-time processing, audit trails, and system integration
- Data architecture patterns:
  - **Data mesh** -- domain teams own their data products
  - **Data lake** -- centralized raw storage for analytics
  - **Data warehouse** -- structured, curated for reporting
- **Architecture Decision Record (ADR):** document the decision, the context, the options considered, and the rationale. Future you will thank present you
- Hardware parallel: SoC architecture involves similar trade-offs -- selecting IP cores (ARM Cortex vs. RISC-V), bus architecture (AMBA AHB vs. AXI), memory hierarchy, and the build-vs-license decision for silicon IP blocks

**Framework: Architecture Decision Record (ADR)** -- Title, Context, Decision, Status, Consequences. Documents why an architecture choice was made, not just what was chosen.

<!-- notes: The modular monolith is often the right answer for teams that aren't ready for microservices operationally. Don't let architecture astronauts push complexity before it's needed. -->

---

## Integration Strategy & API Design

- Enterprise products don't exist in isolation -- they must integrate with existing systems, data sources, and workflows
- **API-first design:** define the contract before building the implementation. Enables parallel development and clear boundaries between systems
- Integration patterns:
  - **Point-to-point** -- simple for 2-3 connections, becomes spaghetti at scale
  - **ESB/Integration Platform** -- centralized routing and transformation
  - **Event Bus/Message Broker** -- decoupled, scalable, resilient
- Protocol selection by context:
  - **REST** for standard CRUD operations and external APIs
  - **GraphQL** for flexible client-driven queries
  - **gRPC** for high-performance internal service communication
- Versioning strategy: how to evolve APIs without breaking consumers
- Hardware protocols: MQTT and CoAP for IoT device communication (low bandwidth, unreliable networks); CAN bus for automotive and industrial control; SPI and I2C for board-level chip-to-chip communication; Modbus for industrial equipment integration

**Framework: API-First Design** -- Define the contract (OpenAPI/AsyncAPI) before implementation. Enables parallel development, clear boundaries, and consumer-driven design.

<!-- notes: If time allows, walk through a real OpenAPI spec example. The API-first approach is counterintuitive for many developers who are used to building first and documenting later. -->

---

## Security Architecture & Compliance by Design

- Security bolted on after the fact is expensive, incomplete, and fragile
- Security designed into the architecture is a competitive advantage
- **Threat modeling with STRIDE:** for each component and data flow, identify threats across six categories:
  - **S**poofing
  - **T**ampering
  - **R**epudiation
  - **I**nformation Disclosure
  - **D**enial of Service
  - **E**levation of Privilege
- Security architecture patterns:
  - **Zero Trust** -- never trust, always verify, regardless of network location
  - **Defense in Depth** -- multiple layers of security controls
  - **Least Privilege** -- minimum permissions necessary
- Compliance frameworks as architecture requirements: SOC 2 Type II, ISO 27001, GDPR
- Hardware security: Hardware Security Modules (HSM) for key management, secure boot chains to prevent firmware tampering, Trusted Platform Modules (TPM) for hardware-rooted trust, and physical tamper detection mechanisms

> Security isn't a feature you add -- it's a property of your architecture. You either design it in or you bolt it on at 10x the cost.

**Framework: STRIDE Threat Model** -- Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege. Systematic threat identification for each component and data flow.

**Framework: Zero Trust Architecture** -- Never trust, always verify. Authenticate and authorize every request regardless of network location. Microsegmentation and continuous validation.

<!-- notes: STRIDE threat modeling can be done as a whiteboard exercise with the team. It doesn't require expensive tools -- just systematic thinking about each component and data flow. -->
