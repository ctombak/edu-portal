---
id: core/05-build-quality
title: "Build & Quality"
subtitle: "Development Through Validation"
duration: 65 min
type: core
learningObjectives:
  - Design CI/CD pipelines and environment strategies
  - Implement quality gates using the test pyramid
  - Integrate security scanning into the development workflow
  - Plan and execute performance engineering from the start
---

# Build & Quality
## Development Through Validation

<!-- notes: This module covers the execution phase -- turning plans and architectures into working, tested, secure, performant software (and hardware). Quality is not a phase at the end; it's a discipline woven through every stage. -->

---

## Development Lifecycle Management

- Effective development requires automation, clear environments, and controlled releases
- **CI/CD pipeline design:** every code commit triggers build, unit test, static analysis, security scan, integration test, deployment to staging. No manual steps between commit and staging
- **Environment strategy:**
  - **Development** -- developer experimentation, unstable
  - **Integration** -- team code merges, semi-stable
  - **Staging** -- production mirror, stable
  - **Pre-production** -- final validation with production-like data
  - **Production** -- live
- Each environment has clear promotion criteria and data policies (no production data in dev/staging without anonymization)
- **Feature flags** enable progressive delivery: deploy code to production without exposing it to users, then gradually enable for subsets -- reducing blast radius and enabling rapid rollback
- Hardware considerations: firmware development workflows require hardware-in-the-loop (HIL) testing where software runs against actual hardware or high-fidelity simulators
- FPGA prototyping accelerates hardware-software co-development
- The challenge: hardware lead times (weeks to months) alongside agile software sprints (days to weeks). Solution: decouple hardware and software delivery with well-defined hardware abstraction layers

**Framework: CI/CD Pipeline** -- Commit, Build, Test, Scan, Deploy. Fully automated, no manual gates between commit and staging. Every stage provides fast feedback.

**Framework: Environment Promotion Strategy** -- Dev, Integration, Staging, Pre-prod, Production. Clear promotion criteria, data policies, and ownership at each level.

<!-- notes: If the audience is less technical, focus on the principles (automation, fast feedback, clear environments) rather than specific tooling. The concepts matter more than whether you use Jenkins or GitHub Actions. -->

---

## Quality Gates & Testing Strategy

- **The test pyramid** provides the strategic framework:
  - **Unit tests** (many, fast, cheap) -- test individual components in isolation
  - **Integration tests** (moderate number) -- test interactions between components
  - **End-to-end tests** (few, slow, expensive) -- test complete user workflows
- Invert the pyramid and you get slow feedback, flaky tests, and frustrated developers
- Quality gates at each lifecycle phase ensure defects are caught early when they're cheap to fix:
  - Code review (every change reviewed by at least one peer)
  - Static analysis (automated code quality and style enforcement)
  - Test coverage thresholds (not 100% -- but coverage of critical paths)
  - Performance benchmarks (no regression from established baselines)
  - Security scan clean (no critical or high vulnerabilities)
- **Definition of Done** as a team contract: code complete, tests pass, documentation updated, security scan clean, performance validated, peer reviewed
- Hardware parallel: environmental testing validates operation across temperature, vibration, humidity, and altitude ranges. Reliability testing calculates MTBF and MTTF. Compliance testing ensures FCC, CE, and UL certification requirements are met before production

> The cost of fixing a defect increases 10x at each lifecycle phase. A bug caught in requirements costs $1; the same bug in production costs $10,000.

**Framework: Test Pyramid** -- Many unit tests (fast, cheap), fewer integration tests (medium), few E2E tests (slow, expensive). Inverted pyramids indicate testing strategy problems.

**Framework: Quality Gate Checklist** -- Code reviewed, static analysis passed, tests green, coverage thresholds met, security scan clean, performance benchmarks met, documentation updated.

<!-- notes: The 10x cost multiplier is a well-established industry finding. Use it to justify investment in early-phase quality practices. -->

---

## Security Validation & Compliance

- Security testing is not a phase -- it's integrated into the development workflow
- **SAST (Static Application Security Testing):** analyzes source code for vulnerabilities without executing it. Fast, catches common patterns (SQL injection, XSS, buffer overflows), runs on every commit
- **DAST (Dynamic Application Security Testing):** tests the running application by simulating attacks. Catches runtime vulnerabilities that SAST misses (authentication flaws, configuration errors)
- **SCA (Software Composition Analysis):** identifies known vulnerabilities in third-party dependencies. Critical because 80% of modern codebases are open-source dependencies
- **Penetration testing:** periodic manual testing by security experts simulating real attackers. Quarterly for critical systems, annually for others
- SOC 2 audit preparation is an ongoing discipline, not a last-minute scramble:
  - Continuous evidence collection (automated wherever possible)
  - Control documentation (what you do and why)
  - Gap identification and remediation (address before the auditor finds them)
- Hardware security: HSMs protect cryptographic keys in tamper-resistant hardware. Secure boot ensures only signed, verified firmware runs on the device. Firmware signing prevents unauthorized modifications. Physical tamper detection (mesh sensors, epoxy coating) protects against hardware attacks

**Framework: Security Testing Integration** -- SAST on every commit, SCA on every build, DAST on staging deployments, penetration testing quarterly. Shift security left without slowing development.

<!-- notes: The key message: security is everyone's responsibility, not just the security team's. Developers who understand SAST findings write more secure code over time. -->

---

## Performance Engineering

- Performance is a feature, not an afterthought. By the time users complain, you've already lost them
- **Performance testing types:**
  - **Load testing** -- expected traffic patterns. Does it meet SLAs?
  - **Stress testing** -- beyond expected limits. Where does it break?
  - **Endurance testing** -- sustained load over hours/days. Are there memory leaks or resource exhaustion?
  - **Spike testing** -- sudden traffic bursts. Does auto-scaling respond fast enough?
- **Capacity planning:** size infrastructure based on projected growth curves and peak scenarios (Black Friday, year-end processing, product launches). Build in headroom -- running at 80% capacity means one unexpected spike triggers degradation
- **Benchmarking** establishes baselines so you can detect performance regression before users do. Every release should be compared against the baseline
- **Observability-driven development:** instrument your code before you ship. You can't optimize what you can't measure
- Hardware performance engineering: thermal throttling analysis, power consumption profiling under various workloads (critical for battery-powered devices), signal integrity testing at operating frequency, EMI compliance under actual operating conditions

**Framework: Performance Test Strategy** -- Load (expected), Stress (beyond limits), Endurance (sustained), Spike (bursts). Each test type answers a different question about system behavior.

<!-- notes: Performance engineering is often the most neglected discipline in enterprise projects. Teams discover performance problems in production, which is the most expensive place to find them. -->
