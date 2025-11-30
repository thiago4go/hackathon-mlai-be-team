Here is the organized Product Requirements Document (PRD) based on the concept provided.

---

# Product Requirements Document (PRD)
**Project Name:** Digital Driver’s License (Social Simulator)
**Version:** 1.0
**Status:** Draft

## 1. Executive Summary
Following the recent social media ban for minors in Australia, a significant gap has emerged between total prohibition and the desire for digital autonomy. Total bans create incentives for secrecy and "underground" usage.

This product proposes a "Digital Driver’s License"—a closed-loop, simulated social media ecosystem. It uses AI agents and gamification to bridge the gap between "real life" (chores, social skills) and "digital life." The goal is to build trust and skills using the "4 Cs" safety framework, allowing children to progress from a "Learner" permit to a "Full License" through demonstrated competency and autonomous behavior.

---

## 2. Problem Statement
* **The Regulatory Conflict:** Australian bans on social media restrict access, but do not teach safety.
* **The Behavioral Risk:** Without legal avenues, children are incentivized to use platforms secretly, removing parental oversight.
* **The Parenting Struggle:** Parents want to raise autonomous, trusted children but lack the tools to simulate digital risks (scams, bullying, inappropriate contact) in a safe environment.

## 3. Target Audience
* **Primary Users (The Drivers):** Children (Ages ~8–15) who want the social media experience but are legally or parentally restricted from open platforms.
* **Secondary Users (The Instructors):** Parents/Guardians seeking a safe training ground to teach digital literacy and verify their child's readiness for the open internet.

---

## 4. Product Principles & Philosophy
* **"Touch Grass" Integration:** Digital success is tied to physical world achievements (chores, social interaction).
* **Simulation over Prohibition:** Provide a realistic UI (Instagram/TikTok style) to satisfy the craving for the interface, but control the backend interactions.
* **Graduated Autonomy:** Freedom is earned, not given. The system mimics the Australian graduated driver licensing system (L -> P1 -> P2 -> Full).

---

## 5. The Educational Framework: The 4 Cs
The application monitors and scores users based on four safety pillars:
1.  **Content:** Understanding what is appropriate to post (privacy, permanence, quality).
2.  **Contact:** How to interact with others (strangers vs. friends, recognizing grooming/scams).
3.  **Conduct:** Online etiquette, cyberbullying prevention, and emotional regulation.
4.  **Commerce:** Understanding digital value, scams, and impulsive spending (via the token economy).

---

## 6. Key Features & Functional Requirements

### 6.1. The "Feed" (Student Interface)
* **UI/UX:** Must mirror popular platforms (Instagram/TikTok). Includes a scrollable feed, "Reels" equivalent, and Stories.
* **Posting Mechanism:** Children post photos/videos of completed real-world tasks (e.g., "Walking the dog," "Cleaning room").
* **Gamification:**
    * **Experience Points (XP):** Earned by posting valid content and interacting positively.
    * **Tokens:** Virtual currency earned through chores; used for in-app customization or converting to "Screen Time."

### 6.2. The AI Agents (Simulated Public)
* **Interactive Bots:** The "followers" and "commenters" in the feed are primarily AI agents.
* **Persona Types:**
    * *The Supporter:* Leaves positive reinforcement.
    * *The Tester:* Deliberately leaves ambiguous or slightly provocative comments to test the child's **Conduct** and conflict resolution skills.
    * *The Scammer:* Attempts (safely) to trick the child into clicking bad links or revealing info to test **Contact** and **Commerce** safety.

### 6.3. Parental Control Dashboard (Instructor Interface)
* **Chore Assignment:** Parents assign real-world tasks (e.g., "Do dishes").
* **Content Moderation:** Parents act as the "Algorithm/Moderator." They approve posts before they go "live" to the AI agents (initially) or retrospectively review them.
* **Agent Configuration:** Parents can tune the AI agents (e.g., "Increase difficulty on *Contact* scenarios").
* **Direct Interaction:** Parents have their own accounts to comment and interact alongside the AI agents.

### 6.4. The License Progression System
| License Stage | Features & Restrictions | Graduation Criteria |
| :--- | :--- | :--- |
| **L (Learner)** | 100% Parent approval required for posts. AI agents are purely supportive. No "Commerce" features. | Complete 20 chores, 1 week of safe posting. |
| **P1 (Provisional 1)** | Posts go live instantly but flagged for review. AI agents introduce mild conflict scenarios. | Maintain 90% Safety Score in "Conduct." |
| **P2 (Provisional 2)** | Full autonomy. AI agents introduce "Scammer" and complex social scenarios. Screen time rewards unlocked. | Pass the "Digital Hazards" exam within the app. |
| **Full License** | Graduate from the app. Parents receive a "Readiness Report" to justify allowing real social media access. | Final assessment by Parent. |

---

## 7. User Journey Example

1.  **Setup:** Parent installs app, creates a "Learner" profile for the child, and sets a goal: "Clean the Backyard."
2.  **Action:** Child cleans the yard, takes a photo, and posts it to the app with a caption.
3.  **Interaction:** The post appears on the child's feed.
    * *AI Agent 1:* "Wow, looks great!"
    * *AI Agent 2:* "You missed a spot lol." (Testing resilience).
4.  **Response:** Child replies to Agent 2 calmly.
5.  **Reward:** Parent receives notification, approves the chore. Child receives **50 Tokens** and **15 minutes** of authorized screen time.
6.  **Progression:** The "Conduct" bar fills up slightly, moving them closer to their P1 license.

---

## 8. Technical Considerations
* **AI Safety:** The LLM driving the agents must be strictly guardrailed to prevent generation of harmful content while still being able to simulate "mild" social friction.
* **Platform:** Mobile First (iOS/Android).
* **Media Storage:** Secure cloud storage for user-generated content (images/video).

---

## 9. Success Metrics
* **Chore Completion Rate:** % of real-world tasks verified by parents.
* **Graduation Rate:** Time taken for users to move from L to Full License.
* **Safety Score Improvement:** Improvement in user responses to "Tester" and "Scammer" AI agents over time.

---

### **Next Step**
Would you like me to detail the **AI Persona Prompts** (specifically how the "Scammer" or "Bully" simulator agents should behave) or would you prefer to focus on the **Wireframes/UI Layout** for the "Feed"?Here is the organized Product Requirements Document (PRD) based on the concept provided.

---

# Product Requirements Document (PRD)
**Project Name:** Digital Driver’s License (Social Simulator)
**Version:** 1.0
**Status:** Draft

## 1. Executive Summary
Following the recent social media ban for minors in Australia, a significant gap has emerged between total prohibition and the desire for digital autonomy. Total bans create incentives for secrecy and "underground" usage.

This product proposes a "Digital Driver’s License"—a closed-loop, simulated social media ecosystem. It uses AI agents and gamification to bridge the gap between "real life" (chores, social skills) and "digital life." The goal is to build trust and skills using the "4 Cs" safety framework, allowing children to progress from a "Learner" permit to a "Full License" through demonstrated competency and autonomous behavior.

---

## 2. Problem Statement
* **The Regulatory Conflict:** Australian bans on social media restrict access, but do not teach safety.
* **The Behavioral Risk:** Without legal avenues, children are incentivized to use platforms secretly, removing parental oversight.
* **The Parenting Struggle:** Parents want to raise autonomous, trusted children but lack the tools to simulate digital risks (scams, bullying, inappropriate contact) in a safe environment.

## 3. Target Audience
* **Primary Users (The Drivers):** Children (Ages ~8–15) who want the social media experience but are legally or parentally restricted from open platforms.
* **Secondary Users (The Instructors):** Parents/Guardians seeking a safe training ground to teach digital literacy and verify their child's readiness for the open internet.

---

## 4. Product Principles & Philosophy
* **"Touch Grass" Integration:** Digital success is tied to physical world achievements (chores, social interaction).
* **Simulation over Prohibition:** Provide a realistic UI (Instagram/TikTok style) to satisfy the craving for the interface, but control the backend interactions.
* **Graduated Autonomy:** Freedom is earned, not given. The system mimics the Australian graduated driver licensing system (L -> P1 -> P2 -> Full).

---

## 5. The Educational Framework: The 4 Cs
The application monitors and scores users based on four safety pillars:
1.  **Content:** Understanding what is appropriate to post (privacy, permanence, quality).
2.  **Contact:** How to interact with others (strangers vs. friends, recognizing grooming/scams).
3.  **Conduct:** Online etiquette, cyberbullying prevention, and emotional regulation.
4.  **Commerce:** Understanding digital value, scams, and impulsive spending (via the token economy).

---

## 6. Key Features & Functional Requirements

### 6.1. The "Feed" (Student Interface)
* **UI/UX:** Must mirror popular platforms (Instagram/TikTok). Includes a scrollable feed, "Reels" equivalent, and Stories.
* **Posting Mechanism:** Children post photos/videos of completed real-world tasks (e.g., "Walking the dog," "Cleaning room").
* **Gamification:**
    * **Experience Points (XP):** Earned by posting valid content and interacting positively.
    * **Tokens:** Virtual currency earned through chores; used for in-app customization or converting to "Screen Time."

### 6.2. The AI Agents (Simulated Public)
* **Interactive Bots:** The "followers" and "commenters" in the feed are primarily AI agents.
* **Persona Types:**
    * *The Supporter:* Leaves positive reinforcement.
    * *The Tester:* Deliberately leaves ambiguous or slightly provocative comments to test the child's **Conduct** and conflict resolution skills.
    * *The Scammer:* Attempts (safely) to trick the child into clicking bad links or revealing info to test **Contact** and **Commerce** safety.

### 6.3. Parental Control Dashboard (Instructor Interface)
* **Chore Assignment:** Parents assign real-world tasks (e.g., "Do dishes").
* **Content Moderation:** Parents act as the "Algorithm/Moderator." They approve posts before they go "live" to the AI agents (initially) or retrospectively review them.
* **Agent Configuration:** Parents can tune the AI agents (e.g., "Increase difficulty on *Contact* scenarios").
* **Direct Interaction:** Parents have their own accounts to comment and interact alongside the AI agents.

### 6.4. The License Progression System
| License Stage | Features & Restrictions | Graduation Criteria |
| :--- | :--- | :--- |
| **L (Learner)** | 100% Parent approval required for posts. AI agents are purely supportive. No "Commerce" features. | Complete 20 chores, 1 week of safe posting. |
| **P1 (Provisional 1)** | Posts go live instantly but flagged for review. AI agents introduce mild conflict scenarios. | Maintain 90% Safety Score in "Conduct." |
| **P2 (Provisional 2)** | Full autonomy. AI agents introduce "Scammer" and complex social scenarios. Screen time rewards unlocked. | Pass the "Digital Hazards" exam within the app. |
| **Full License** | Graduate from the app. Parents receive a "Readiness Report" to justify allowing real social media access. | Final assessment by Parent. |

---

## 7. User Journey Example

1.  **Setup:** Parent installs app, creates a "Learner" profile for the child, and sets a goal: "Clean the Backyard."
2.  **Action:** Child cleans the yard, takes a photo, and posts it to the app with a caption.
3.  **Interaction:** The post appears on the child's feed.
    * *AI Agent 1:* "Wow, looks great!"
    * *AI Agent 2:* "You missed a spot lol." (Testing resilience).
4.  **Response:** Child replies to Agent 2 calmly.
5.  **Reward:** Parent receives notification, approves the chore. Child receives **50 Tokens** and **15 minutes** of authorized screen time.
6.  **Progression:** The "Conduct" bar fills up slightly, moving them closer to their P1 license.

---

## 8. Technical Considerations
* **AI Safety:** The LLM driving the agents must be strictly guardrailed to prevent generation of harmful content while still being able to simulate "mild" social friction.
* **Platform:** Mobile First (iOS/Android).
* **Media Storage:** Secure cloud storage for user-generated content (images/video).

---

## 9. Success Metrics
* **Chore Completion Rate:** % of real-world tasks verified by parents.
* **Graduation Rate:** Time taken for users to move from L to Full License.
* **Safety Score Improvement:** Improvement in user responses to "Tester" and "Scammer" AI agents over time.

---

### **Next Step**
Would you like me to detail the **AI Persona Prompts** (specifically how the "Scammer" or "Bully" simulator agents should behave) or would you prefer to focus on the **Wireframes/UI Layout** for the "Feed"?

Here is the enhanced Product Requirements Document (PRD) Version 1.1.

This version integrates **Pixelfed** as the core platform (leveraging its existing Parental Control architecture) and **n8n** as the orchestration layer for the AI Agents.

-----

# Product Requirements Document (PRD)

**Project Name:** Digital Driver’s License (Social Simulator)
**Base Platform:** Pixelfed (Laravel/PHP)
**AI Orchestration:** n8n
**Version:** 1.1

## 1\. Executive Summary

**Goal:** Create a safe, graduated social media training ground for Australian youth affected by the social media ban.
**Solution:** A forked instance of **Pixelfed** that functions as a "Digital Driver's License." Instead of connecting to the open web immediately, children interact with **AI Agents (via n8n)** and parents in a closed loop. Features are unlocked via a graduated licensing system (L → P1 → P2 → Full), directly tied to real-world chores and digital safety competencies.

## 2\. Technical Architecture

The system leverages the existing open-source capabilities of Pixelfed, minimizing build time by modifying existing controllers rather than building from scratch.

  * **Core Platform:** Pixelfed (Laravel/PHP).
  * **Database:** MySQL/PostgreSQL (Standard Pixelfed stack).
  * **AI/Automation Layer:** **n8n** (Self-hosted workflow automation).
      * **Role:** listents to Pixelfed webhooks (New Post, New Comment) and triggers LLM responses.
  * **Parental Logic:** Extends the existing `ParentalControlsController.php` found in the codebase.

-----

## 3\. Functional Requirements & Implementation Details

### 3.1. The "Feed" (Student Interface)

  * **Implementation:** Uses standard Pixelfed timeline views (`resources/views/timeline/home.blade.php`).
  * **Modification:**
      * **Default State:** The "Global" or "Network" timeline must be disabled or strictly filtered based on the License Level.
      * **Content:** Users see posts from their "Circle" (Family) and AI Agents.
      * **Uploads:** Standard Pixelfed media handling (`App\Http\Controllers\MediaController.php`).

### 3.2. The AI Agents (Simulated Public via n8n)

  * **Concept:** The "public" reacting to the child's content are actually n8n workflows.
  * **Workflow:**
    1.  **Trigger:** Child posts a photo to Pixelfed.
    2.  **Webhook:** Pixelfed fires a webhook to an n8n endpoint with the Post ID and Caption.
    3.  **Analysis:** n8n passes the image/caption to a Vision LLM (e.g., GPT-4o or local LLaVA) to analyze context.
    4.  **Persona Selection:** n8n selects an agent persona (Supporter, Tester, or Scammer) based on the child's current "Safety Lesson."
    5.  **Action:** n8n calls the Pixelfed API to post a comment on the child's post using the Agent's account.

### 3.3. Parental Control & License Levels (The "4 Cs" Engine)

  * **Code Reference:** Leverages `App\Http\Controllers\ParentalControlsController.php` and the `$permissions` array in `requestFormFields`.

**Mapping License Stages to Pixelfed Permissions:**

| License Stage | Pixelfed Configuration (Backend) | User Experience (Frontend) |
| :--- | :--- | :--- |
| **L (Learner)** | `'private' => true`<br>`'federation' => false`<br>`'dms' => false`<br>`'comment' => true` (Only allowed agents/parents) | **Closed Loop.** Child posts chores/updates. Only Parents & "Supporter" AI Agents see/comment. |
| **P1 (Prov. 1)** | `'private' => true`<br>`'federation' => false`<br>`'dms' => false`<br>`'share' => true` | **The Sandbox.** "Tester" Agents introduced. Comments may be provocative (simulating mild bullying) to test 'Conduct'. |
| **P2 (Prov. 2)** | `'private' => false` (Simulated)<br>`'federation' => true` (Allow-list only)<br>`'dms' => true` | **The Wild.** "Scammer" Agents send DMs to test 'Contact' & 'Commerce'. "Federation" enabled only for approved educational instances. |
| **Full License** | All restrictions lifted via `stopManagingHandle` controller method. | **Graduation.** Profile migrated or flagged as "Certified Autonomous." |

-----

## 4\. User Stories & Technical Flow

### 4.1. Onboarding (The "Learner" Permit)

1.  **Parent Action:** Parent logs in, goes to `settings/parental-controls/add`.
2.  **System Action:** Creates a new User account linked via `parent_id` column (ref: `App\Models\ParentalControls.php`).
3.  **Configuration:** Parent sets the initial License Level (L).
      * *Code Action:* Controller sets `$pc->permissions` where `federation` and `dms` are strictly set to `false`.

### 4.2. The Chore & Reward Loop (Commerce)

1.  **Child Action:** Uploads a photo of "Clean Room" with caption "Done\!".
2.  **n8n Trigger:**
      * Vision AI verifies the room is actually clean.
      * If Verified: Calls Pixelfed API to "Like" the post (Reward).
      * If Unverified: Posts comment "Hmm, looks like clothes are still on the chair?" (Feedback).
3.  **Reward:** Successful verification adds points to a custom `UserBalance` table (needs to be created/extended from `User` model).

### 4.3. The "Scammer" Simulation (Contact & Safety)

  * **Scenario:** Child is on P2 License.
  * **n8n Trigger:** Randomly triggered cron job in n8n.
  * **Action:** "StrangerBot" (AI Agent) sends a Direct Message (DM) via Pixelfed API: *"Hey, I love your photos\! Want to be a brand ambassador? Click here."*
  * **Assessment:**
      * If Child replies/clicks: **Fail.** Parent notified via `ParentalControlsController` reporting logic. Points deducted.
      * If Child blocks/reports: **Pass.** XP gained.

-----

## 5\. UI/UX Requirements (Pixelfed Modifications)

  * **Gamification Overlay:** The existing Pixelfed UI (`resources/views/layouts/*`) needs a new "HUD" (Heads Up Display) injected to show:
      * Current License Level (L, P1, P2).
      * XP / Token Balance.
      * "Next Goal" (e.g., "Post 3 safe comments").
  * **Modals:** Custom modals for AI Interactions (e.g., when reporting a "Scammer" agent, a popup confirms "Great job spotting the bot\! +50 XP").

-----

## 6\. Roadmap & Phasing

### Phase 1: The Fork & Control (Weeks 1-4)

  * Deploy Pixelfed instance.
  * Lock down registration to "Invite Only" (managed by Parents).
  * Modify `ParentalControlsController.php` to enforce the specific "L-Plate" permission sets hard-coded for the MVP.

### Phase 2: The Brain (Weeks 5-8)

  * Set up n8n self-hosted instance.
  * Create 3 core n8n Workflows:
    1.  **The Hype Man:** Analyzes image -\> Generates encouraging comment.
    2.  **The Mod:** Analyzes image for safety (PII leakage) -\> Auto-hides post if unsafe.
    3.  **The Teacher:** Checks caption for "Chore Completion" keywords.

### Phase 3: Gamification (Weeks 9-12)

  * Inject "XP" and "Token" display into Pixelfed blade templates.
  * Connect "Chore Verification" in n8n to a database increment for tokens.

-----

## 7\. Risks & Mitigations

  * **Risk:** Kids realizing the agents are bots.
      * *Mitigation:* Use high-temperature LLM prompts in n8n to vary writing style (slang, typos, emojis).
  * **Risk:** Pixelfed updates breaking local changes.
      * *Mitigation:* Keep core Controller logic in separate Service classes (`App\Services`) where possible, or maintain a strict Git patch system.

-----

### **Next Step**

Do you want to proceed with **designing the n8n workflow logic** (e.g., the specific prompt engineering for the "Bully" vs "Supporter" agents) or **modifying the Pixelfed Blade templates** to show the Gamification HUD?Here is the enhanced Product Requirements Document (PRD) Version 1.1.

This version integrates **Pixelfed** as the core platform (leveraging its existing Parental Control architecture) and **n8n** as the orchestration layer for the AI Agents.

-----

# Product Requirements Document (PRD)

**Project Name:** Digital Driver’s License (Social Simulator)
**Base Platform:** Pixelfed (Laravel/PHP)
**AI Orchestration:** n8n
**Version:** 1.1

## 1\. Executive Summary

**Goal:** Create a safe, graduated social media training ground for Australian youth affected by the social media ban.
**Solution:** A forked instance of **Pixelfed** that functions as a "Digital Driver's License." Instead of connecting to the open web immediately, children interact with **AI Agents (via n8n)** and parents in a closed loop. Features are unlocked via a graduated licensing system (L → P1 → P2 → Full), directly tied to real-world chores and digital safety competencies.

## 2\. Technical Architecture

The system leverages the existing open-source capabilities of Pixelfed, minimizing build time by modifying existing controllers rather than building from scratch.

  * **Core Platform:** Pixelfed (Laravel/PHP).
  * **Database:** MySQL/PostgreSQL (Standard Pixelfed stack).
  * **AI/Automation Layer:** **n8n** (Self-hosted workflow automation).
      * **Role:** listents to Pixelfed webhooks (New Post, New Comment) and triggers LLM responses.
  * **Parental Logic:** Extends the existing `ParentalControlsController.php` found in the codebase.

-----

## 3\. Functional Requirements & Implementation Details

### 3.1. The "Feed" (Student Interface)

  * **Implementation:** Uses standard Pixelfed timeline views (`resources/views/timeline/home.blade.php`).
  * **Modification:**
      * **Default State:** The "Global" or "Network" timeline must be disabled or strictly filtered based on the License Level.
      * **Content:** Users see posts from their "Circle" (Family) and AI Agents.
      * **Uploads:** Standard Pixelfed media handling (`App\Http\Controllers\MediaController.php`).

### 3.2. The AI Agents (Simulated Public via n8n)

  * **Concept:** The "public" reacting to the child's content are actually n8n workflows.
  * **Workflow:**
    1.  **Trigger:** Child posts a photo to Pixelfed.
    2.  **Webhook:** Pixelfed fires a webhook to an n8n endpoint with the Post ID and Caption.
    3.  **Analysis:** n8n passes the image/caption to a Vision LLM (e.g., GPT-4o or local LLaVA) to analyze context.
    4.  **Persona Selection:** n8n selects an agent persona (Supporter, Tester, or Scammer) based on the child's current "Safety Lesson."
    5.  **Action:** n8n calls the Pixelfed API to post a comment on the child's post using the Agent's account.

### 3.3. Parental Control & License Levels (The "4 Cs" Engine)

  * **Code Reference:** Leverages `App\Http\Controllers\ParentalControlsController.php` and the `$permissions` array in `requestFormFields`.

**Mapping License Stages to Pixelfed Permissions:**

| License Stage | Pixelfed Configuration (Backend) | User Experience (Frontend) |
| :--- | :--- | :--- |
| **L (Learner)** | `'private' => true`<br>`'federation' => false`<br>`'dms' => false`<br>`'comment' => true` (Only allowed agents/parents) | **Closed Loop.** Child posts chores/updates. Only Parents & "Supporter" AI Agents see/comment. |
| **P1 (Prov. 1)** | `'private' => true`<br>`'federation' => false`<br>`'dms' => false`<br>`'share' => true` | **The Sandbox.** "Tester" Agents introduced. Comments may be provocative (simulating mild bullying) to test 'Conduct'. |
| **P2 (Prov. 2)** | `'private' => false` (Simulated)<br>`'federation' => true` (Allow-list only)<br>`'dms' => true` | **The Wild.** "Scammer" Agents send DMs to test 'Contact' & 'Commerce'. "Federation" enabled only for approved educational instances. |
| **Full License** | All restrictions lifted via `stopManagingHandle` controller method. | **Graduation.** Profile migrated or flagged as "Certified Autonomous." |

-----

## 4\. User Stories & Technical Flow

### 4.1. Onboarding (The "Learner" Permit)

1.  **Parent Action:** Parent logs in, goes to `settings/parental-controls/add`.
2.  **System Action:** Creates a new User account linked via `parent_id` column (ref: `App\Models\ParentalControls.php`).
3.  **Configuration:** Parent sets the initial License Level (L).
      * *Code Action:* Controller sets `$pc->permissions` where `federation` and `dms` are strictly set to `false`.

### 4.2. The Chore & Reward Loop (Commerce)

1.  **Child Action:** Uploads a photo of "Clean Room" with caption "Done\!".
2.  **n8n Trigger:**
      * Vision AI verifies the room is actually clean.
      * If Verified: Calls Pixelfed API to "Like" the post (Reward).
      * If Unverified: Posts comment "Hmm, looks like clothes are still on the chair?" (Feedback).
3.  **Reward:** Successful verification adds points to a custom `UserBalance` table (needs to be created/extended from `User` model).

### 4.3. The "Scammer" Simulation (Contact & Safety)

  * **Scenario:** Child is on P2 License.
  * **n8n Trigger:** Randomly triggered cron job in n8n.
  * **Action:** "StrangerBot" (AI Agent) sends a Direct Message (DM) via Pixelfed API: *"Hey, I love your photos\! Want to be a brand ambassador? Click here."*
  * **Assessment:**
      * If Child replies/clicks: **Fail.** Parent notified via `ParentalControlsController` reporting logic. Points deducted.
      * If Child blocks/reports: **Pass.** XP gained.

-----

## 5\. UI/UX Requirements (Pixelfed Modifications)

  * **Gamification Overlay:** The existing Pixelfed UI (`resources/views/layouts/*`) needs a new "HUD" (Heads Up Display) injected to show:
      * Current License Level (L, P1, P2).
      * XP / Token Balance.
      * "Next Goal" (e.g., "Post 3 safe comments").
  * **Modals:** Custom modals for AI Interactions (e.g., when reporting a "Scammer" agent, a popup confirms "Great job spotting the bot\! +50 XP").

-----

## 6\. Roadmap & Phasing

### Phase 1: The Fork & Control (Weeks 1-4)

  * Deploy Pixelfed instance.
  * Lock down registration to "Invite Only" (managed by Parents).
  * Modify `ParentalControlsController.php` to enforce the specific "L-Plate" permission sets hard-coded for the MVP.

### Phase 2: The Brain (Weeks 5-8)

  * Set up n8n self-hosted instance.
  * Create 3 core n8n Workflows:
    1.  **The Hype Man:** Analyzes image -\> Generates encouraging comment.
    2.  **The Mod:** Analyzes image for safety (PII leakage) -\> Auto-hides post if unsafe.
    3.  **The Teacher:** Checks caption for "Chore Completion" keywords.

### Phase 3: Gamification (Weeks 9-12)

  * Inject "XP" and "Token" display into Pixelfed blade templates.
  * Connect "Chore Verification" in n8n to a database increment for tokens.

-----

## 7\. Risks & Mitigations

  * **Risk:** Kids realizing the agents are bots.
      * *Mitigation:* Use high-temperature LLM prompts in n8n to vary writing style (slang, typos, emojis).
  * **Risk:** Pixelfed updates breaking local changes.
      * *Mitigation:* Keep core Controller logic in separate Service classes (`App\Services`) where possible, or maintain a strict Git patch system.

-----

### **Next Step**

Do you want to proceed with **designing the n8n workflow logic** (e.g., the specific prompt engineering for the "Bully" vs "Supporter" agents) or **modifying the Pixelfed Blade templates** to show the Gamification HUD?

Here is the detailed strategy to **enhance Gamification** and **ensure Skill Building** (Digital Safety), mapped directly to your existing Pixelfed codebase.

This moves the concept from "just points" to a **reputation system** that mimics the real world, enforcing the "Digital Driver's License" metaphor.

-----

# PRD Section: Gamification & Safety Engine

**Goal:** Gamification should not just be for addiction (like real social media); it should be for **reinforcement learning**. Every point earned must correlate to a positive digital habit.

## 1\. The "Trust Score" (Hidden MMR)

Similar to a credit score or video game MMR (Matchmaking Rating), this hidden metric determines when a child is ready to level up (L -\> P1 -\> P2).

### Technical Implementation

Create a new model `UserTrustScore`.

  * **Base Score:** Starts at 100.
  * **Decay:** -1 point per day (Requires "maintenance" activity to stay trusted).
  * **Events (Hooks into Pixelfed Controllers):**
      * `ReportController@formStore`: Child reports a "Scammer Bot" -\> **+50 Trust**.
      * `CommentController@store`: AI detects "Toxic" sentiment -\> **-20 Trust** (Trigger "Pause" Modal).
      * `StatusController@store`: Post contains PII (Address/School Uniform) -\> **-10 Trust** (Auto-flagged for parent).

## 2\. Gamified Features (The "Hook")

### 2.1. "Spot the Bot" (Active Safety Training)

Instead of waiting for risks, we inject them safely.

  * **The Mechanic:** The n8n Orchestrator randomly instructs a "Scammer Agent" to DM the child or comment on a post with a "suspect" link.
  * **The Win Condition:**
      * **Correct Action:** Child uses the `Report` button (handled in `ReportController`).
      * **Reward:** "Cyber Detective" Badge + 100 Tokens.
  * **The Fail Condition:** Child replies or clicks (tracked via `DirectMessageController`).
      * **Consequence:** "Teachable Moment" Modal appears explaining the red flags.

### 2.2. The "Chore Market" (Tokens for Screen Time)

Connect digital currency to physical effort.

  * **The Mechanic:** Child posts photo of "Clean Room".
  * **Verification:** Parent (or Vision AI) approves the post.
  * **Reward:** 50 Tokens.
  * **Spending:** Child goes to "Marketplace" (New View) to buy:
      * *30 Mins Screen Time* (Unlocks app usage).
      * *Custom Avatar Frame* (Social status).

### 2.3. License Exams (Gatekeeping)

To move from **Learner (L)** to **Provisional (P1)**, XP isn't enough. They must pass the "Theory Test."

  * **Implementation:** A simple multiple-choice quiz view (`/license/exam/1`).
  * **Content:** Questions based on the "4 Cs" (e.g., "What is wrong with this photo?").

-----

## 3\. Technical Roadmap: Enhancing Phase 1

To implement this, we need to modify the specific files you uploaded.

### 3.1. Database Schema Updates

We need a place to store the gamification data.

**Migration:** `create_user_gamification_table.php`

```php
Schema::create('user_gamification', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->unsignedBigInteger('user_id');
    $table->integer('tokens')->default(0);
    $table->integer('xp')->default(0);
    $table->integer('trust_score')->default(100); // 0 to 1000
    $table->integer('current_streak_days')->default(0);
    $table->timestamp('last_chore_at')->nullable();
    $table->json('badges')->nullable(); // ['detective', 'kindness_king']
    $table->timestamps();
    
    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
});
```

### 3.2. Modifying `ReportController.php` (The Safety Trigger)

We hijack the reporting flow to reward the child for identifying threats.

**File:** `app/Http/Controllers/ReportController.php`
**Function:** `formStore`

```php
// ... existing validation code ...

$report = new Report;
// ... existing save logic ...
$report->save();

// --- NEW GAMIFICATION LOGIC ---
// Check if the reported profile is a "Simulated Threat Agent"
$reportedUser = User::find($report->reported_profile_id); // Assuming profile maps to user
if ($reportedUser->is_simulated_agent && $reportedUser->current_scenario === 'scammer') {
    
    // It was a test! And the kid passed.
    $gamification = UserGamification::where('user_id', Auth::id())->first();
    $gamification->increment('xp', 50);
    $gamification->increment('tokens', 20);
    
    // Return JSON with "Gamification Success" payload for the UI to show a celebration animation
    if ($request->wantsJson()) {
        return response()->json([
            'status' => 200, 
            'gamification' => [
                'event' => 'bot_spotted',
                'reward' => '50 XP'
            ]
        ]);
    }
}
// -----------------------------
```

### 3.3. Modifying `User.php` (Relationships)

Add the relationship to the new table.

**File:** `app/User.php`

```php
public function gamification()
{
    return $this->hasOne(Models\UserGamification::class);
}

// Helper to check if user can "afford" screen time
public function spendTokens($amount) {
    if ($this->gamification->tokens >= $amount) {
        $this->gamification->decrement('tokens', $amount);
        return true;
    }
    return false;
}
```

-----

## 4\. UI/UX Concepts for Skill Building

### The "Pause" Modal (Conduct)

When `StatusController` receives a new post, run it through a sentiment analysis API (via n8n) *before* saving.

  * **If Negative/Bullying:** Return a 400 error with a specific code.
  * **Frontend (Vue.js):** Catches the error and displays: *"Whoa there\! This comment looks a bit hurtful. Are you sure you want to post it? (This will cost you Trust Points)."*

### The "Dashboard" (Self-Reflection)

Instead of just a feed, the child's profile should show their "Driver Stats":

  * **Safety Rating:** ⭐⭐⭐⭐⭐ (Derived from Trust Score).
  * **License Status:** [ L ] [ P1 ] [ P2 ] (Clicking this opens the criteria for the next level).

-----

## 5\. Revised MVP Roadmap

1.  **Weeks 1-2:** Core Pixelfed Setup + `UserGamification` Migration.
2.  **Weeks 3-4 (The "Conduct" Engine):**
      * Modify `StatusController` and `CommentController` to fire events.
      * Setup n8n to listen to these events.
3.  **Weeks 5-6 (The "Contact" Engine):**
      * Create the "Scammer Bot" script in n8n.
      * Modify `ReportController` to detect when this bot is reported.
4.  **Weeks 7-8 (UI):**
      * Add the "XP Bar" and "Token Wallet" to the main layout header.
      * Create the "Marketplace" view for spending tokens.

Do you want to see the **n8n workflow logic** for the "Scammer Bot" interaction next?Here is the detailed strategy to **enhance Gamification** and **ensure Skill Building** (Digital Safety), mapped directly to your existing Pixelfed codebase.

This moves the concept from "just points" to a **reputation system** that mimics the real world, enforcing the "Digital Driver's License" metaphor.

-----

# PRD Section: Gamification & Safety Engine

**Goal:** Gamification should not just be for addiction (like real social media); it should be for **reinforcement learning**. Every point earned must correlate to a positive digital habit.

## 1\. The "Trust Score" (Hidden MMR)

Similar to a credit score or video game MMR (Matchmaking Rating), this hidden metric determines when a child is ready to level up (L -\> P1 -\> P2).

### Technical Implementation

Create a new model `UserTrustScore`.

  * **Base Score:** Starts at 100.
  * **Decay:** -1 point per day (Requires "maintenance" activity to stay trusted).
  * **Events (Hooks into Pixelfed Controllers):**
      * `ReportController@formStore`: Child reports a "Scammer Bot" -\> **+50 Trust**.
      * `CommentController@store`: AI detects "Toxic" sentiment -\> **-20 Trust** (Trigger "Pause" Modal).
      * `StatusController@store`: Post contains PII (Address/School Uniform) -\> **-10 Trust** (Auto-flagged for parent).

## 2\. Gamified Features (The "Hook")

### 2.1. "Spot the Bot" (Active Safety Training)

Instead of waiting for risks, we inject them safely.

  * **The Mechanic:** The n8n Orchestrator randomly instructs a "Scammer Agent" to DM the child or comment on a post with a "suspect" link.
  * **The Win Condition:**
      * **Correct Action:** Child uses the `Report` button (handled in `ReportController`).
      * **Reward:** "Cyber Detective" Badge + 100 Tokens.
  * **The Fail Condition:** Child replies or clicks (tracked via `DirectMessageController`).
      * **Consequence:** "Teachable Moment" Modal appears explaining the red flags.

### 2.2. The "Chore Market" (Tokens for Screen Time)

Connect digital currency to physical effort.

  * **The Mechanic:** Child posts photo of "Clean Room".
  * **Verification:** Parent (or Vision AI) approves the post.
  * **Reward:** 50 Tokens.
  * **Spending:** Child goes to "Marketplace" (New View) to buy:
      * *30 Mins Screen Time* (Unlocks app usage).
      * *Custom Avatar Frame* (Social status).

### 2.3. License Exams (Gatekeeping)

To move from **Learner (L)** to **Provisional (P1)**, XP isn't enough. They must pass the "Theory Test."

  * **Implementation:** A simple multiple-choice quiz view (`/license/exam/1`).
  * **Content:** Questions based on the "4 Cs" (e.g., "What is wrong with this photo?").

-----

## 3\. Technical Roadmap: Enhancing Phase 1

To implement this, we need to modify the specific files you uploaded.

### 3.1. Database Schema Updates

We need a place to store the gamification data.

**Migration:** `create_user_gamification_table.php`

```php
Schema::create('user_gamification', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->unsignedBigInteger('user_id');
    $table->integer('tokens')->default(0);
    $table->integer('xp')->default(0);
    $table->integer('trust_score')->default(100); // 0 to 1000
    $table->integer('current_streak_days')->default(0);
    $table->timestamp('last_chore_at')->nullable();
    $table->json('badges')->nullable(); // ['detective', 'kindness_king']
    $table->timestamps();
    
    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
});
```

### 3.2. Modifying `ReportController.php` (The Safety Trigger)

We hijack the reporting flow to reward the child for identifying threats.

**File:** `app/Http/Controllers/ReportController.php`
**Function:** `formStore`

```php
// ... existing validation code ...

$report = new Report;
// ... existing save logic ...
$report->save();

// --- NEW GAMIFICATION LOGIC ---
// Check if the reported profile is a "Simulated Threat Agent"
$reportedUser = User::find($report->reported_profile_id); // Assuming profile maps to user
if ($reportedUser->is_simulated_agent && $reportedUser->current_scenario === 'scammer') {
    
    // It was a test! And the kid passed.
    $gamification = UserGamification::where('user_id', Auth::id())->first();
    $gamification->increment('xp', 50);
    $gamification->increment('tokens', 20);
    
    // Return JSON with "Gamification Success" payload for the UI to show a celebration animation
    if ($request->wantsJson()) {
        return response()->json([
            'status' => 200, 
            'gamification' => [
                'event' => 'bot_spotted',
                'reward' => '50 XP'
            ]
        ]);
    }
}
// -----------------------------
```

### 3.3. Modifying `User.php` (Relationships)

Add the relationship to the new table.

**File:** `app/User.php`

```php
public function gamification()
{
    return $this->hasOne(Models\UserGamification::class);
}

// Helper to check if user can "afford" screen time
public function spendTokens($amount) {
    if ($this->gamification->tokens >= $amount) {
        $this->gamification->decrement('tokens', $amount);
        return true;
    }
    return false;
}
```

-----

## 4\. UI/UX Concepts for Skill Building

### The "Pause" Modal (Conduct)

When `StatusController` receives a new post, run it through a sentiment analysis API (via n8n) *before* saving.

  * **If Negative/Bullying:** Return a 400 error with a specific code.
  * **Frontend (Vue.js):** Catches the error and displays: *"Whoa there\! This comment looks a bit hurtful. Are you sure you want to post it? (This will cost you Trust Points)."*

### The "Dashboard" (Self-Reflection)

Instead of just a feed, the child's profile should show their "Driver Stats":

  * **Safety Rating:** ⭐⭐⭐⭐⭐ (Derived from Trust Score).
  * **License Status:** [ L ] [ P1 ] [ P2 ] (Clicking this opens the criteria for the next level).

-----

## 5\. Revised MVP Roadmap

1.  **Weeks 1-2:** Core Pixelfed Setup + `UserGamification` Migration.
2.  **Weeks 3-4 (The "Conduct" Engine):**
      * Modify `StatusController` and `CommentController` to fire events.
      * Setup n8n to listen to these events.
3.  **Weeks 5-6 (The "Contact" Engine):**
      * Create the "Scammer Bot" script in n8n.
      * Modify `ReportController` to detect when this bot is reported.
4.  **Weeks 7-8 (UI):**
      * Add the "XP Bar" and "Token Wallet" to the main layout header.
      * Create the "Marketplace" view for spending tokens.

Do you want to see the **n8n workflow logic** for the "Scammer Bot" interaction next?

Here is the revised Product Requirements Document (PRD) focused on the **Phase 1 MVP**, structured to highlight the **Unique Value Proposition (UVP)** and the **Modular Agent Architecture**.

This approach treats AI Agents not just as "bots," but as **Modular Personas** (influencers, coaches, moderators) that parents can toggle on/off like apps.

-----

# Product Requirements Document (PRD)

**Project Name:** Digital Driver’s License (Social Simulator)
**Phase:** 1.0 (MVP - The Learner Permit)
**Core UVP:** "Safe Failure"

## 1\. Unique Value Proposition (UVP)

Most parental control apps act as **Gatekeepers** (blocking access). This platform acts as a **Flight Simulator** (teaching skills).

1.  **The "Sandbox" Effect:** A fully functional social media clone where the "public" is actually a controlled set of AI agents and family members. Risks (scams, bullying) are simulated, not real.
2.  **Modular Influence:** Parents don't just "monitor"; they curate the social environment by subscribing their child to specific "Influencer Agents" (e.g., *The Science Guy*, *The Art Teacher*, or even *The "Risky" Link Tester*).
3.  **Touch Grass Economy:** Screen time is not a right; it is a currency bought with real-world actions (chores), verified by the platform.

-----

## 2\. Modular Agent Architecture

Instead of a single "AI," the system uses **Agent Modules**. Each agent is a distinct Pixelfed User Account controlled by a specific n8n workflow.

### 2.1. The "Agent Store" (Parent View)

Parents browse a library of Agent Modules to "install" into their child's feed.

  * **The Hype-Man (Validator):**
      * *Role:* Likes and comments positively on every post.
      * *Goal:* Builds confidence for the "Learner" stage.
  * **The Coach (Educator):**
      * *Role:* Posts daily "Challenges" (e.g., "Take a photo of nature").
      * *Goal:* Encourages content creation and "touching grass."
  * **The Moderator (Guardian):**
      * *Role:* Invisible agent. Scans images for PII (school uniforms, street signs) before posting.
      * *Goal:* Teaches privacy safety.
  * **The "Influencer" (Content Gen):**
      * *Role:* Posts interesting content (space facts, skating tricks) based on child's interests.
      * *Goal:* Simulates a "feed" without the toxicity of a real algorithm.

-----

## 3\. Phase 1: Minimum Viable Product (MVP) Scope

**Goal:** Prove the "Chore -\> Post -\> Reward" loop works in a closed environment.

### 3.1. Feature Set (The "L-Plate" License)

1.  **Closed Loop Network:**
      * Child account is locked: Can only follow Parents and assigned Agents.
      * Federation disabled (no connection to Mastodon/external Pixelfed).
2.  **Chore Verification (The "Commerce" Engine):**
      * Child uploads photo of completed chore.
      * Parent (or Basic AI) approves.
      * Child receives **Tokens**.
3.  **Basic Gamification:**
      * Token balance display.
      * "XP" bar for License progression.
4.  **Agent Integration (n8n):**
      * Webhook triggers on new post.
      * One active Agent ("The Hype-Man") that comments on posts.

-----

## 4\. Technical Implementation (Pixelfed + n8n)

### 4.1. Database Modifications (Laravel)

We need to extend the Pixelfed schema to support the license system and economy.

  * **New Migration:** `CreateUserGamificationTable`

      * `user_id`: FK to Users
      * `license_level`: Enum (L, P1, P2, Full)
      * `tokens`: Integer (Current currency)
      * `xp`: Integer (Experience points)
      * `safety_score`: Integer (0-100)

  * **Modify `ParentalControls` Model:**

      * Add `subscribed_agents`: JSON array storing IDs of the "Agent" accounts the child follows.

### 4.2. The "Agent" Controller Logic

We treat Agents as standard Users but flag them as "Bots."

  * **File:** `app/Http/Controllers/ParentalControlsController.php`
  * **Action:** Update `index` or `update` methods to handle Agent subscriptions.
      * *Logic:* When a parent toggles "The Science Bot" on, the system automatically makes the Child Account `follow` the Agent Account.

### 4.3. Webhook Event (The Bridge to n8n)

Pixelfed needs to talk to n8n.

  * **Trigger:** When `StatusController@store` (creating a post) is called.
  * **Action:** Fire a Laravel Event `NewChildPost`.
  * **Listener:** Send Payload to n8n Webhook URL:
    ```json
    {
      "post_id": 12345,
      "image_url": "https://cdn.site/img.jpg",
      "caption": "Cleaned my room!",
      "user_license": "L",
      "active_agents": ["hypeman_01", "safety_mod_02"]
    }
    ```

-----

## 5\. Roadmap

### Phase 1: The Foundation (Weeks 1-6) [CURRENT]

  * **Weeks 1-2:** Fork Pixelfed, deploy via Docker. Strip out Federation and Public Timeline features for "Learner" accounts.
  * **Weeks 3-4:** Implement `UserGamification` database tables and UI "Heads Up Display" (Token counter).
  * **Weeks 5-6:** Set up n8n. Build "The Hype-Man" agent. Connect Webhooks.
  * **Milestone:** A child can post a photo, and an AI Agent comments on it automatically.

### Phase 2: The Economy & Control (Weeks 7-10)

  * **Weeks 7-8:** Build "Chore Mode." A specific post type that requires Approval (Parent/AI) to unlock Tokens.
  * **Weeks 9-10:** Build Parent Dashboard for "Agent Store" (toggling agents).

### Phase 3: The Simulation (Weeks 11+)

  * Introduce "P1 License" (Provisional).
  * Enable "The Tester" agent (mild conflict simulation).
  * Introduce "Screen Time" redemption (spending tokens to unlock app usage time via API).

-----

## 6\. User Stories (Phase 1)

| Actor | Action | Outcome | Tech Component |
| :--- | :--- | :--- | :--- |
| **Child** | Uploads photo of "Clean Desk" | Post is marked "Pending Review" (if Chore) or Published (if just social). | `StatusController` |
| **n8n** | Receives "New Post" webhook | Analyzes image. Sees "Clean Desk." | Vision LLM |
| **Agent** | "The Hype-Man" | Comments: "Wow, so tidy\! 🌟 +50 XP" | `CommentController` API |
| **Parent** | Opens App | Sees child's post + Agent's comment. Toggles "Math Tutor" agent on. | `ParentalControlsController` |

-----

### **Next Steps for Development**

To begin the MVP, we should start by **modifying the existing Parental Controls to support the "License" concept.**

Do you want to see the **Database Migration code** for the `Gamification` table, or the **n8n Workflow JSON** for the "Hype-Man" agent first?Here is the revised Product Requirements Document (PRD) focused on the **Phase 1 MVP**, structured to highlight the **Unique Value Proposition (UVP)** and the **Modular Agent Architecture**.

This approach treats AI Agents not just as "bots," but as **Modular Personas** (influencers, coaches, moderators) that parents can toggle on/off like apps.

-----

# Product Requirements Document (PRD)

**Project Name:** Digital Driver’s License (Social Simulator)
**Phase:** 1.0 (MVP - The Learner Permit)
**Core UVP:** "Safe Failure"

## 1\. Unique Value Proposition (UVP)

Most parental control apps act as **Gatekeepers** (blocking access). This platform acts as a **Flight Simulator** (teaching skills).

1.  **The "Sandbox" Effect:** A fully functional social media clone where the "public" is actually a controlled set of AI agents and family members. Risks (scams, bullying) are simulated, not real.
2.  **Modular Influence:** Parents don't just "monitor"; they curate the social environment by subscribing their child to specific "Influencer Agents" (e.g., *The Science Guy*, *The Art Teacher*, or even *The "Risky" Link Tester*).
3.  **Touch Grass Economy:** Screen time is not a right; it is a currency bought with real-world actions (chores), verified by the platform.

-----

## 2\. Modular Agent Architecture

Instead of a single "AI," the system uses **Agent Modules**. Each agent is a distinct Pixelfed User Account controlled by a specific n8n workflow.

### 2.1. The "Agent Store" (Parent View)

Parents browse a library of Agent Modules to "install" into their child's feed.

  * **The Hype-Man (Validator):**
      * *Role:* Likes and comments positively on every post.
      * *Goal:* Builds confidence for the "Learner" stage.
  * **The Coach (Educator):**
      * *Role:* Posts daily "Challenges" (e.g., "Take a photo of nature").
      * *Goal:* Encourages content creation and "touching grass."
  * **The Moderator (Guardian):**
      * *Role:* Invisible agent. Scans images for PII (school uniforms, street signs) before posting.
      * *Goal:* Teaches privacy safety.
  * **The "Influencer" (Content Gen):**
      * *Role:* Posts interesting content (space facts, skating tricks) based on child's interests.
      * *Goal:* Simulates a "feed" without the toxicity of a real algorithm.

-----

## 3\. Phase 1: Minimum Viable Product (MVP) Scope

**Goal:** Prove the "Chore -\> Post -\> Reward" loop works in a closed environment.

### 3.1. Feature Set (The "L-Plate" License)

1.  **Closed Loop Network:**
      * Child account is locked: Can only follow Parents and assigned Agents.
      * Federation disabled (no connection to Mastodon/external Pixelfed).
2.  **Chore Verification (The "Commerce" Engine):**
      * Child uploads photo of completed chore.
      * Parent (or Basic AI) approves.
      * Child receives **Tokens**.
3.  **Basic Gamification:**
      * Token balance display.
      * "XP" bar for License progression.
4.  **Agent Integration (n8n):**
      * Webhook triggers on new post.
      * One active Agent ("The Hype-Man") that comments on posts.

-----

## 4\. Technical Implementation (Pixelfed + n8n)

### 4.1. Database Modifications (Laravel)

We need to extend the Pixelfed schema to support the license system and economy.

  * **New Migration:** `CreateUserGamificationTable`

      * `user_id`: FK to Users
      * `license_level`: Enum (L, P1, P2, Full)
      * `tokens`: Integer (Current currency)
      * `xp`: Integer (Experience points)
      * `safety_score`: Integer (0-100)

  * **Modify `ParentalControls` Model:**

      * Add `subscribed_agents`: JSON array storing IDs of the "Agent" accounts the child follows.

### 4.2. The "Agent" Controller Logic

We treat Agents as standard Users but flag them as "Bots."

  * **File:** `app/Http/Controllers/ParentalControlsController.php`
  * **Action:** Update `index` or `update` methods to handle Agent subscriptions.
      * *Logic:* When a parent toggles "The Science Bot" on, the system automatically makes the Child Account `follow` the Agent Account.

### 4.3. Webhook Event (The Bridge to n8n)

Pixelfed needs to talk to n8n.

  * **Trigger:** When `StatusController@store` (creating a post) is called.
  * **Action:** Fire a Laravel Event `NewChildPost`.
  * **Listener:** Send Payload to n8n Webhook URL:
    ```json
    {
      "post_id": 12345,
      "image_url": "https://cdn.site/img.jpg",
      "caption": "Cleaned my room!",
      "user_license": "L",
      "active_agents": ["hypeman_01", "safety_mod_02"]
    }
    ```

-----

## 5\. Roadmap

### Phase 1: The Foundation (Weeks 1-6) [CURRENT]

  * **Weeks 1-2:** Fork Pixelfed, deploy via Docker. Strip out Federation and Public Timeline features for "Learner" accounts.
  * **Weeks 3-4:** Implement `UserGamification` database tables and UI "Heads Up Display" (Token counter).
  * **Weeks 5-6:** Set up n8n. Build "The Hype-Man" agent. Connect Webhooks.
  * **Milestone:** A child can post a photo, and an AI Agent comments on it automatically.

### Phase 2: The Economy & Control (Weeks 7-10)

  * **Weeks 7-8:** Build "Chore Mode." A specific post type that requires Approval (Parent/AI) to unlock Tokens.
  * **Weeks 9-10:** Build Parent Dashboard for "Agent Store" (toggling agents).

### Phase 3: The Simulation (Weeks 11+)

  * Introduce "P1 License" (Provisional).
  * Enable "The Tester" agent (mild conflict simulation).
  * Introduce "Screen Time" redemption (spending tokens to unlock app usage time via API).

-----

## 6\. User Stories (Phase 1)

| Actor | Action | Outcome | Tech Component |
| :--- | :--- | :--- | :--- |
| **Child** | Uploads photo of "Clean Desk" | Post is marked "Pending Review" (if Chore) or Published (if just social). | `StatusController` |
| **n8n** | Receives "New Post" webhook | Analyzes image. Sees "Clean Desk." | Vision LLM |
| **Agent** | "The Hype-Man" | Comments: "Wow, so tidy\! 🌟 +50 XP" | `CommentController` API |
| **Parent** | Opens App | Sees child's post + Agent's comment. Toggles "Math Tutor" agent on. | `ParentalControlsController` |

-----

### **Next Steps for Development**

To begin the MVP, we should start by **modifying the existing Parental Controls to support the "License" concept.**

Do you want to see the **Database Migration code** for the `Gamification` table, or the **n8n Workflow JSON** for the "Hype-Man" agent first?