---
id: plugins/engineering-to-business
title: "Translating Engineering to Business"
subtitle: "Communicating Technical Value in Business Language"
duration: 40 min
type: plugin
learningObjectives:
  - Communicate engineering value in business language
  - Frame technical needs as business impact
  - Influence resource allocation through strategic communication
  - Build bridges between engineering and business stakeholders
---

# Translating Engineering to Business
## Communicating Technical Value in Business Language

<!-- notes: Builds the critical skill of translating engineering reality into business impact. Technical debt, infrastructure investment, and refactoring in business language. -->

---

## The Translation Gap

- Engineering and business speak different languages -- and neither side realizes it
- How engineering sounds to business leaders:
  - "Technical debt" sounds optional -- like a nice-to-have cleanup
  - "Infrastructure investment" sounds like pure cost with no return
  - "We need to refactor" sounds like rework -- "Why wasn't it done right the first time?"
  - "System architecture" sounds like an engineering hobby project
- The result: engineering gets underfunded on critical work because the business case isn't made in business terms

> If the business can't understand why something matters, it won't fund it. The translation burden is on engineering, not on the business.

<!-- notes: Open with a relatable scenario: "Your VP asks why you need 3 sprints for 'refactoring' when there are features to build. What do you say?" Most engineering managers fumble this because they explain the technical rationale instead of the business impact. -->

---

## The Cost of the Translation Gap

- **A 2023 Stripe study** found that developers spend an average of **42% of their time** on technical debt and maintenance -- that's the equivalent of losing nearly half your engineering investment to hidden costs
- When engineering leaders fail to translate, the consequences are concrete:
  - **Underfunded infrastructure:** Systems degrade until they cause customer-facing outages
  - **Chronic underinvestment:** Teams patch instead of fix, compounding the problem
  - **Talent attrition:** Top engineers leave organizations that won't invest in engineering health
  - **Reactive firefighting:** Without proactive investment, engineering becomes a cost center that only gets attention during crises
- **The irony:** The business is paying for technical debt either way -- through slow delivery, outages, and turnover. Translation doesn't create the cost; it makes it visible.

> Every business pays for technical debt. The only question is whether they pay intentionally (through planned investment) or unintentionally (through outages, slow delivery, and attrition).

<!-- notes: The Stripe data is powerful because it comes from a company that business leaders respect. The 42% figure is usually shocking to non-technical executives. Use it as an anchor: "If you're not investing in engineering health, you're not saving money -- you're just hiding the cost." -->

---

## The Translation Framework: RICE for Business Communication

- Adapt your engineering communication using the **RICE framework:**
  - **R - Revenue Impact:** How does this affect the company's ability to generate or protect revenue?
  - **I - Investment Efficiency:** How does this improve the return on engineering investment?
  - **C - Customer Impact:** How does this affect customer experience, satisfaction, or retention?
  - **E - Existential Risk:** What happens if we don't do this? What's the worst-case scenario?
- **The rule:** Every engineering request to the business should address at least two of these four dimensions
- **Example -- "We need to migrate to a new database":**
  - Revenue: "Current database limitations are blocking the product features that drive Q3 revenue targets"
  - Investment: "Engineers spend 15 hours/week on workarounds -- that's $400K/year in lost productivity"
  - Customer: "Page load times are 3x slower than competitors, driving 12% higher bounce rates"
  - Risk: "The current system cannot handle projected Black Friday traffic -- estimated $2M exposure"

<!-- notes: RICE gives engineers a repeatable checklist for business communication. Have participants take a current engineering initiative and run it through RICE. Most will find they've been leading with technical rationale instead of business impact. The database migration example shows how the same project can be framed four different ways depending on the audience. -->

---

## Influence Through Translation

- Extending Module 2's influence frameworks for engineering contexts:
  - **Speak in outcomes, not activities:** "This reduces outage risk by 40%" not "We're refactoring the authentication service"
  - **Quantify the cost of inaction:** "Every month we delay costs us X in developer productivity" not "We should really fix this"
  - **Connect to business metrics:** Revenue impact, customer satisfaction, time-to-market, risk reduction
  - **Use analogies the business understands:** "Technical debt is like deferred maintenance on a building -- it's invisible until the roof leaks"
- The key principle: translate technical truth into business truth without losing accuracy

<!-- notes: Practice exercise: give participants common engineering requests and have them rewrite them in business language. Examples: "We need to upgrade the database" becomes "We need to ensure we can handle the projected 3x traffic increase next quarter without service degradation." -->

---

## Exercise: The Translation Workshop

- **Step 1 (3 min, individual):** Write down one engineering initiative you're currently trying to get funded or prioritized. Write it as you would normally describe it to your team.
- **Step 2 (5 min, individual):** Rewrite it using the RICE framework. Address at least 2 of the 4 dimensions. Include specific numbers wherever possible.
- **Step 3 (5 min, pairs):** Read your translated version to a partner. Partner rates it:
  - Would a CFO understand this? (1-5)
  - Would a CEO act on this? (1-5)
  - Is the technical accuracy preserved? (1-5)
- **Step 4 (2 min):** Revise based on feedback

> The best translation preserves technical truth while speaking business language. If you have to sacrifice accuracy for clarity, you haven't found the right framing yet.

<!-- notes: This is the most valuable exercise in the module. The partner feedback is critical because engineers often think they've translated when they've only partially translated. The three rating dimensions ensure they're balancing clarity with accuracy. Allow 15 minutes total. -->

---

## The Business Case Toolkit

- Practical templates for framing engineering investments:
  - **ROI of reliability:** "Each hour of downtime costs the business X in revenue and Y in customer trust. This investment reduces downtime by Z%."
  - **Cost of delay:** "Every sprint we defer this work, we lose X hours of developer time to workarounds -- that's Y features we could have shipped."
  - **Risk quantification:** "There's a 30% probability of a major incident in the next 6 months. The expected cost is X. This investment reduces that to Y."
  - **Velocity investment:** "This platform work will increase team shipping speed by X% -- which means Y additional features per quarter."
- Always include: the cost of doing nothing vs. the cost of action

> Turn "we need to refactor" into "this reduces outage risk by 40% and saves 2M annually." Same truth, different language, different outcome.

<!-- notes: Have participants build a one-page business case for a current engineering investment using one of these templates. The discipline of quantifying impact forces clearer thinking about priorities -- even before presenting to business stakeholders. -->

---

## Stakeholder Mapping for Engineering Leaders

- Not all business stakeholders need the same message
- **Map your stakeholders using the Power/Interest Grid (Mendelow, 1991):**
  - **High Power, High Interest:** CEO, CPO, CFO on key projects -- manage closely, tailor detailed business cases
  - **High Power, Low Interest:** Board members, investors -- keep satisfied with high-level impact summaries
  - **Low Power, High Interest:** Product managers, designers -- keep informed, collaborate on prioritization
  - **Low Power, Low Interest:** Adjacent teams -- monitor, no active communication needed
- **For each key stakeholder, know:**
  - What metrics they care about (revenue? cost? risk? speed?)
  - What language they use (financial? customer-centric? strategic?)
  - What their current pain points are (this is what your pitch should connect to)
  - Who influences them (sometimes the indirect path is more effective)

<!-- notes: Have participants create a quick stakeholder map for their most important engineering initiative. Identify the 2-3 stakeholders who matter most and note what language each one responds to. The insight: you need multiple versions of the same pitch, tailored to different audiences. -->

---

## Case Study: The Platform Team Pitch

- **The situation:** An engineering director needs to justify a dedicated platform team (4 engineers for 2 quarters) to the executive team. Current pitch: "We need to reduce technical debt and improve developer experience."
- **Executive reaction:** "We have features to ship. We can't afford to take 4 engineers off product work."
- **The translated pitch:**
  - "Our engineering team spends 35% of time on infrastructure workarounds -- that's the equivalent of **losing 7 out of 20 engineers** to hidden costs"
  - "A dedicated platform team will recover **5 of those 7 engineer-equivalents** within 2 quarters"
  - "Net impact: we ship **60% more features per quarter** starting Q3, at zero additional headcount cost"
  - "Without this investment, we project a **25% increase in engineering attrition** based on exit interview data citing tooling frustration"
- **What changed:** Same project, same cost, same timeline. Different framing, different outcome.

> Numbers are the universal language of business. If you can't put a number on it, the business can't prioritize it.

<!-- notes: Walk through this case study step by step. Ask participants: "Which version would you fund?" The answer is always the translated version. Then point out that the underlying project is identical -- only the communication changed. This is the power of translation. -->

---

## The Technical Debt Conversation

- Technical debt is the most commonly mistranslated concept in engineering
- **Why business leaders resist:** "Debt" implies past mistakes, and no one wants to fund fixing mistakes
- **Better framing -- The Three Types of Technical Debt:**
  1. **Strategic debt:** "We made a deliberate trade-off to ship faster. Now we need to pay it down before it limits our growth." (Business leaders understand deliberate trade-offs)
  2. **Accumulated debt:** "As the system grew, complexity increased. This is normal -- like a growing city needing better infrastructure." (Removes blame)
  3. **Environmental debt:** "Technology evolves. Our systems need to evolve with it, or we fall behind competitors." (Creates urgency)
- **The conversation structure:**
  1. Acknowledge the trade-off: "We chose speed, and it was the right call at the time"
  2. Show the current cost: "Here's what it's costing us now, in terms the business cares about"
  3. Propose the investment: "Here's the plan, the cost, and the expected return"
  4. Offer options: "Here are three investment levels -- minimum, recommended, and ideal"

<!-- notes: The three-type framework defuses defensiveness because it normalizes technical debt. The conversation structure gives engineering leaders a script they can adapt. Emphasize: never start the tech debt conversation with blame or apology. Start with the business case. -->

---

## Building Bridges with Business Stakeholders

- **Long-term relationship strategies:**
  - Invite business leaders to engineering demos and retrospectives
  - Present engineering updates in business terms (impact, not implementation)
  - Ask business leaders about their challenges and pressures -- genuine curiosity builds trust
  - Create joint roadmaps that show engineering and business priorities together
  - Celebrate shared wins -- "The reliability improvement led to a 15% reduction in customer complaints"
- **The translation habit:** Before every communication to business stakeholders, ask: "Would a non-technical executive understand this? Would they care?"

<!-- notes: The bridge-building strategies are about sustained relationship change, not one-off presentations. Emphasize consistency: one great translated pitch doesn't change perceptions. Monthly translated updates, regular joint celebrations, and genuine curiosity about business challenges -- these build the bridge over time. -->

---

## Common Translation Mistakes

- **Over-simplifying:** Dumbing down the technology insults the audience and loses nuance. Instead, simplify the language while preserving the complexity of the problem.
- **Leading with the solution:** Business leaders want to understand the problem before hearing the solution. Start with pain, then offer relief.
- **Using engineering jargon as shorthand:** "Microservices," "CI/CD," "containerization" -- these mean nothing to most executives. Translate or drop them.
- **Forgetting the emotional dimension:** Business decisions aren't purely rational. Fear of risk, excitement about opportunity, and trust in the messenger all play a role.
- **One-and-done communication:** A single presentation doesn't change minds. Plan for multiple touchpoints: the pre-meeting, the meeting, the follow-up, and the check-in.

> Translation is not a one-time event. It's a communication practice you build into every interaction with business stakeholders.

<!-- notes: This slide addresses the most common failure modes. The emotional dimension point is critical for engineers who tend to rely purely on logic. Remind them of Module 2's influence frameworks -- logic is necessary but not sufficient. -->

---

## Group Activity: Pitch Practice

- **Form groups of 3-4 people**
- **Each person (3 min):** Deliver your translated engineering pitch (from the earlier exercise) to the group as if presenting to a CFO
- **Group feedback after each pitch (2 min):**
  - What was the strongest business argument?
  - Where did the pitch slip back into engineering language?
  - What one change would make this more compelling?
- **Final round:** Each group selects their best pitch. The presenter delivers it to the full room in 60 seconds.

<!-- notes: The pitch practice is where learning becomes embodied. Presenting to peers and getting real-time feedback accelerates skill development. The 60-second constraint for the final round forces ruthless prioritization -- exactly the skill they need with busy executives. Allow 15-20 minutes total. -->

---

## Your Translation Action Plan

- **This week:** Identify one engineering initiative that needs better business communication. Rewrite the pitch using RICE.
- **This month:** Schedule a 30-minute conversation with a business stakeholder you don't regularly engage with. Learn what metrics matter to them.
- **This quarter:** Create a translated engineering update template your team uses for all business communications.
- **Ongoing:** Before every email, presentation, or meeting with non-engineering stakeholders, apply the 5-second test: "Would a non-technical executive understand this and know why it matters?"

> The bridge between engineering and business is built one clear conversation at a time. Start building this week.

<!-- notes: Close with concrete commitments. The weekly, monthly, and quarterly cadence gives participants a graduated path to building translation as a habit, not just a one-time skill. Encourage them to share their translated pitches with a peer for feedback before delivering to business stakeholders. -->

---

## Key Takeaways

- The **translation burden** is on engineering, not on the business -- own it
- Use the **RICE framework** (Revenue, Investment efficiency, Customer impact, Existential risk) for every business communication
- **Quantify everything:** If you can't put a number on it, the business can't prioritize it
- **Technical debt** isn't a cleanup project -- frame it as strategic investment with measurable ROI
- **Know your stakeholders:** Different audiences need different versions of the same message
- **Translation is a practice**, not a one-time skill -- build it into every interaction

> Same truth, different language, different outcome. Master the translation, and engineering gets the investment it deserves.

<!-- notes: Reinforce that this is an ongoing practice, not a one-time training exercise. The best engineering leaders make translation a habit -- it becomes automatic over time. Encourage participants to pair up as accountability partners for practicing translation in the weeks ahead. -->
