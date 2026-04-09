---
id: plugins/technical-debt
title: "Managing Technical Debt as a Leadership Challenge"
subtitle: "Cross-Functional Negotiation & Strategic Prioritization"
duration: 35 min
type: plugin
learningObjectives:
  - Frame technical debt as a leadership challenge
  - Negotiate cross-functionally for debt reduction
  - Prioritize debt strategically using business impact
  - Communicate debt risks to non-technical stakeholders
---

# Managing Technical Debt as a Leadership Challenge
## Cross-Functional Negotiation & Strategic Prioritization

<!-- notes: Frames technical debt management as an adaptive leadership challenge requiring cross-functional negotiation and strategic prioritization -- not just engineering effort. -->

---

## Debt as an Adaptive Challenge

- Technical debt is not purely a technical problem -- treating it as one is why it rarely gets addressed
- It requires cross-functional negotiation, stakeholder communication, and strategic prioritization
- Connecting to Module 1's Heifetz framework:
  - **Technical fix:** "We need X sprints to refactor" (engineering solution alone)
  - **Adaptive challenge:** "We need to change how the organization makes trade-offs between features and system health" (organizational learning)
- The real problem: organizations systematically undervalue system health because the cost is invisible until it isn't

> Technical debt is an organizational problem wearing an engineering costume. Solving it requires leadership, not just code.

<!-- notes: Open with this reframe: most engineering managers treat tech debt as an engineering backlog item. But the reason it accumulates isn't technical -- it's organizational. The decisions that create debt are made by product, business, and engineering together. The solutions must be too. -->

---

## The Debt Prioritization Framework

- Not all technical debt is created equal -- prioritize by business impact:
  - **Critical debt:** Directly threatens availability, security, or compliance -- address immediately
  - **Strategic debt:** Blocks key business capabilities or slows velocity significantly -- plan quarterly
  - **Maintenance debt:** Increases friction but doesn't block outcomes -- address incrementally
  - **Cosmetic debt:** Bothers engineers but doesn't impact business -- deprioritize honestly
- **Connecting core module frameworks:**
  - Module 1 (Heifetz): Is this a technical or adaptive challenge?
  - Module 2 (Influence): Who needs to be convinced and how?
  - Module 4 (Ownership): Who owns the decision and the outcome?

<!-- notes: Have participants categorize their team's current tech debt using this framework. The exercise often reveals that teams spend effort on maintenance/cosmetic debt while ignoring strategic debt -- because the easier work feels more productive. Prioritization requires saying "not now" to some debt to focus on what matters most. -->

---

## Communicating Debt to Non-Technical Stakeholders

- Translating technical debt into business language:
  - **Capacity cost:** "Every sprint, 30% of our time goes to workarounds" becomes "We're losing a third of our capacity to deliver new features"
  - **Risk exposure:** "This legacy system has no tests" becomes "We can't make changes confidently, which increases outage probability by X%"
  - **Velocity drag:** "Our build times are 45 minutes" becomes "Every developer loses 2 hours per day waiting -- that's 10 features per quarter we're not shipping"
  - **Customer impact:** "Our API response times are degrading" becomes "Page load is now 3x our target, and we're seeing a 15% increase in user drop-off"
- **The visualization:** Create a simple dashboard that shows debt impact in business metrics, updated monthly

> Make the invisible visible. Business leaders can't prioritize what they can't see or understand.

<!-- notes: Practice exercise: take one technical debt item and rewrite the description for a non-technical VP. Time the exercise -- 60 seconds to pitch it in business terms. If you can't explain the business impact in 60 seconds, you probably haven't thought it through clearly enough. -->

---

## Negotiating for Debt Reduction

- **Build the coalition before the ask:**
  - Identify business stakeholders who've been impacted by tech debt (slow releases, incidents, missed features)
  - Quantify the impact in their terms -- let them become your advocates
  - Present a phased plan: quick wins (build credibility) + strategic investments (build capacity)
- **The sustainable budget approach:**
  - Negotiate a standing "health allocation" -- 15-20% of each sprint for debt reduction
  - This is cheaper and more sustainable than occasional "debt sprints" that disrupt roadmap
  - Track and report the impact: "Last quarter's health investment reduced incident count by 30%"
- **When they say no:** Don't accept "we'll do it later" without a commitment to when. Debt with no plan isn't deferred -- it's denied.

<!-- notes: Close with a concrete plan: participants draft a 1-page debt reduction proposal using business language and the frameworks from this module. Include the ask, the business justification, and the measurement plan. This becomes their tool for the next planning conversation. -->
