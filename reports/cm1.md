<img width="1920" alt="Milestone #1" src="https://github.com/user-attachments/assets/1e976988-a7ae-4d6a-8772-705c169eccc6">

# Customer Milestone 1

This is the first milestone report for the bounswe2024group11 team.
It includes a summary of what we have done so far, our project plan in a detailed manner, work done by each team member, and the tools we have benefitted.


## Executive Summary

Turquiz is a platform for Turkish people to improve their English via quizzes, forum and other various content.
The primary goal is to create an engaging platform so that the process of learning is no more boring.
Our audience is anyone with a mildly beginner level english speakers. We expect some kind of prior knowledge on english. we differ from say Duolingo in that sense.
The application is supposed to be encouraging and captivating.


### Status

We have specified the requirements for the project. We have provided 5 scenarios and corresponding mockups for showcasing better understanding of the project. We have provided class diagram, use case diagram, and sequence diagrams in order to have a common understanding of the implementation. We are now completed our first milestone for implementation of the project. On mobile, we can demonstrate registration, login, and forum question creation together with tagging communicating with the backend. On web, we have implemented quiz solving and ARIA W3C standard.

### Planned Changes

Since we completed all of our tasks, we did not need a plan change accordingly. However, we received useful feedbacks from the customer and we are considering adding some functionalities from the customer feedback such as hints for questions, a learning platform, and determining the difficulty levels of the quizzes. 

## Customer Feedback and Reflections
### Customer Feedback
1) Customers suggested that there are tools which shows the difficulty level of a given English word in order to use determining the difficulty level of a quiz. 
2) They also suggested that there can be hints for quiz questions such as images or what domain does the word belong. 
3) They also recommended that users might want to use the app for only learning English words rather than participating in a quiz thereby becoming more confident before taking a quiz. 
4) They also suggested that there are tools to determine if a text is written in English and therefore we can determine if a user wants to tag his forum question in English or Turkish.
### Reflections
1) Determining the difficulty level of a given English word with a tool is a very good idea. This will enable us to develop more robust quiz difficulty level identification. However, the tools might lack a comprehensive vocabulary.
2) Hints are really good idea to make quizzes more interactive and enjoyable. This will be added to the requirements.
3) Providing a learning platform other than quizzes might be cumbersome. However, we can implement a simple learning platform. For example, the user selects a domain and a difficulty level, then we return a random word together with its image (if available), definition, and synonyms and antonyms.
4) Restricting the user to only one language for tagging might not be a good idea. The user might want to tag with both languages or there are language specific words that the user asks to understand in the other language.
## List and Status of Deliverables

**1. Software Requirements Specification**
- [✅ Software Requirements Specification ](https://github.com/bounswe/bounswe2024group11/wiki/Requirements)

**2. Scenarios and Mockups**
 - [✅ Scenario 1](https://github.com/bounswe/bounswe2024group11/wiki/Scenario-1)
 - [✅ Scenario 2](https://github.com/bounswe/bounswe2024group11/wiki/Scenario-2)
 - [✅ Scenario 3](https://github.com/bounswe/bounswe2024group11/wiki/Scenario-3)
- [✅ Scenario 4](https://github.com/bounswe/bounswe2024group11/wiki/Scenario-4)
- [✅ Scenario 5](https://github.com/bounswe/bounswe2024group11/wiki/Scenario-5)

 **Note:** All mockups can be seen under the related scenario.

**3. Software Designs (UML designs)**
- [✅ Class Diagram](https://github.com/bounswe/bounswe2024group11/wiki/Class-Diagrams) 
- [✅ Use Case Diagram](https://github.com/bounswe/bounswe2024group11/wiki/Use-Case-Diagrams)
- [✅ Sequence Diagram](https://github.com/bounswe/bounswe2024group11/wiki/Sequence-Diagrams)

 **4. Project Plan, Communication Plan, Responsibility Assignment Matrix**
- [Project Plan](https://github.com/bounswe/bounswe2024group11/wiki/Project-Plan)
- [Communication Plan](https://github.com/bounswe/bounswe2024group11/wiki/Communication-Plan)
- [Responsibility Assignment Matrix](https://github.com/bounswe/bounswe2024group11/wiki/Responsibility-Assignment-Matrix)

**5. Pre-Release Version of Turquiz**
- **Release Tag**: Please follow the link to [0.1.0-alpha](https://github.com/bounswe/bounswe2024group11/releases/tag/customer-milestone-1).
- **Web Application**: Please follow the link to [Turquiz Web Application](http://54.247.125.93/).
- **Build & Run**: All Dockerization & Deployment process for testing/using the application locally is covered in the [README](https://github.com/bounswe/bounswe2024group11/blob/main/README.md) section of our repository. 

## Evaluation

### Status of Deliverables

### Changes on Our Project Plan

We didn’t encounter any major changes along the way and were able to deliver everything for the first demo as planned.

Initially, Umit was set to create Figma designs for both the mobile forum and the web quiz. However, recognizing his efficiency in designing directly in code with TailwindCSS, we decided to skip detailed Figma designs for the quiz and develop its UI directly in code instead. To speed up the client-side development, we divided tasks so that Hasan built out the basic page structures, which Umit then refined. Meanwhile, the mobile team could directly reference Umit’s designs, maintaining consistency. This streamlined approach emphasized functional design over detailed UX/UI, allowing us to meet our demo goals efficiently and cohesively.

### Project Management Tools & Processes

- GitHub Issues
As always, GitHub Issues were used effectively for task tracking, bug reporting, and feature management, providing a clear overview of ongoing and completed work.

- WhatsApp
This semester, we expanded our use of WhatsApp to improve communication, even creating dedicated groups for frontend, server, and DevOps teams. This allowed for more focused discussions and quicker resolution of domain-specific issues.

- Discord
While still useful, Discord was not as efficient for us as it had been in previous semesters, and we relied on it less for core discussions even before the ban on Discord.

- Figma 
We used Figma primarily for logo design, color selection, branding, and brainstorming sessions, allowing us to establish a cohesive visual identity early in the process.

- Face-to-Face Meetings: Regular in-person meetings were crucial for discussing API schemas, feature scope, design elements, and more, enabling clear, real-time communication and faster decision-making.

- Online Meeting: We used Jitsi instead of Google Meet or Discord this semester. The change was due to its free software license.

- The Weekly Meetings: We increased one-day per week meeting to two-day per week group meeting this semester. These meetings become more task oriented and helped us get synced more easily.

- Selecting a Lead: This semester, we decided to select a lead responsible for major jobs such as backend, web, mobile, linked data etc. This helped us to keep track of the responsibility better.


## The Requirements Addressed

### 1.1.1 Account Requirements

* 1.1.1.1 Users shall be able to register the system.
* 1.1.1.2 Registered users shall be able to log in to the system.
* 1.1.1.5 Registered users shall be able to log out from the system.

### 1.1.2 Quiz Requirements

* 1.1.2.6 Users shall be able to view any quizzes.
* 1.1.2.8 Registered users shall be able to see previous quizzes 
* 1.1.2.12 Registered users shall be able to see the creator of quizzes.
* 1.1.2.13 Registered users shall be able to view a quiz feed.

### 1.1.3 Forum Requirements

* 1.1.3.1 Registered users shall be able to create forum questions.
* 1.1.3.2 Registered users shall be able to link keywords in the questions to the corresponding linked data source.
* 1.1.3.4 Users shall be able to view any forum questions.
* 1.1.3.13 Registered users shall be able to view a forum feed.


## Individual Contributions

### **Member: *Hasan Kerem Şeker***

 #### **Responsibilities**
 - I am assigned to create the frontend of the Web application which the users will interact when they are using Turquiz. Ümit Can Evleksiz is also working on the clientside. We split tasks and review each other's tasks to push only high quality code the main branch. Therefore, I am also responsible for reviewing Ümit Can's code.
 Moreover I was responsible for creatin the requirments, elicitation questions and a scenario with its mockup.

---

 #### **Main Contributions**
 -  I was the part of the team crating the requirements and elicitation questions.
 - I created the second scenario with Ceydanur Şen.
 - I and Ümit Can created the web application which we have shown in the demo.
 - I initialized the register and the login pages and modified the mock server to make them functional.
 - I created the the page to get a single quiz with id and solve it. I also created mock quizzes to solve and modified mock server to enable solving the quizzes.
 - Ümit Can reviewed what I did and occasionally added new functionalities and improved the design and I reviewed his tasks and merged his branches. 
 - I reviewed the functionalities and the design of the quizzes page, the homepage.
 - I added mock data to leaderboard and the homepage. I also add some styling to the leaderboard initialized by Ümit Can.

---

 #### **Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:  
   - Implement Login Route on Client App [Issue](https://github.com/bounswe/bounswe2024group11/issues/498), [Pr](https://github.com/bounswe/bounswe2024group11/pull/508)
   - Implement Register Page on Client [Issue](https://github.com/bounswe/bounswe2024group11/issues/497), [Pr](https://github.com/bounswe/bounswe2024group11/pull/512)
   - Create a Logger Utility [Issue](https://github.com/bounswe/bounswe2024group11/issues/504), [Pr](https://github.com/bounswe/bounswe2024group11/pull/531)
   - Create Mock Quiz Data For Clientside [Issue](https://github.com/bounswe/bounswe2024group11/issues/559), [Pr](https://github.com/bounswe/bounswe2024group11/pull/560)
   - Implement /quizzes/:quizId route [Issue](https://github.com/bounswe/bounswe2024group11/issues/545), [Pr](https://github.com/bounswe/bounswe2024group11/pull/548)

---

 #### **Non-Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:  
   - Removed old unnecessary artifacts [Issue](https://github.com/bounswe/bounswe2024group11/issues/461)
   - Created Requirements [Issue](https://github.com/bounswe/bounswe2024group11/issues/471)
   - Created Elicitation Questions  [Issue](https://github.com/bounswe/bounswe2024group11/issues/479)
   - Organized New Meeting Schedule  [Issue](https://github.com/bounswe/bounswe2024group11/issues/462)
    Created a General Plan  [Issue](https://github.com/bounswe/bounswe2024group11/issues/467)
   - Created User Scenario 2 - Search for a Quiz & Create a Quiz [Issue](https://github.com/bounswe/bounswe2024group11/issues/489)

---

 #### **Pull Requests (PRs)**
 - **Created PRs**:  
   - [chore(client): add more mock data to home and changed names on the l…](https://github.com/bounswe/bounswe2024group11/pull/586)
   - [feat(client): generate mock data for quizzes](https://github.com/bounswe/bounswe2024group11/pull/560)
   - [feat(client): implement quiz id route](https://github.com/bounswe/bounswe2024group11/pull/548)
   - [feat(client): implement logger utility ](https://github.com/bounswe/bounswe2024group11/pull/531)
   - [feat(client): implement login page and routing](https://github.com/bounswe/bounswe2024group11/pull/508)

 - **Merged PRs**:  
   - [feat(client): refine leaderboard](https://github.com/bounswe/bounswe2024group11/pull/582)
   - [feat(client): add a simple leaderboard table](https://github.com/bounswe/bounswe2024group11/pull/579)
   - [feat(client): add quiz start screen, timer, progress bar and overall style improvements](https://github.com/bounswe/bounswe2024group11/pull/578)
   - [fix(client): prevent id duplication](https://github.com/bounswe/bounswe2024group11/pull/581)
   - [des(client): refine quiz card, quiz page, page heads, router](https://github.com/bounswe/bounswe2024group11/pull/572)
   - [chore(client): configure project and meta tags](https://github.com/bounswe/bounswe2024group11/pull/577)
   - [des(client): improve design, add necessary components](https://github.com/bounswe/bounswe2024group11/pull/578)
   - [feat(client): implement quizzes route & msw](https://github.com/bounswe/bounswe2024group11/pull/540)
   - [w3c(client): add relevant aria attributes to toast modal](https://github.com/bounswe/bounswe2024group11/pull/530)
   - [feat(client): implement register page and routing](https://github.com/bounswe/bounswe2024group11/pull/512)
   - [chore(client): bootstrap client application](https://github.com/bounswe/bounswe2024group11/pull/506)


 - **Reviewed PRs**:  
   - [feat(client): add content to home and refine leaderboard data & design](https://github.com/bounswe/bounswe2024group11/pull/583)
   - [feat(client): refine leaderboard](https://github.com/bounswe/bounswe2024group11/pull/582)
   - [des(client): refine quiz card, quiz page, page heads, router](https://github.com/bounswe/bounswe2024group11/pull/572)
   - [chore(client): configure project and meta tags](https://github.com/bounswe/bounswe2024group11/pull/577)
   - [feat(client): add quizzes route and page & more configuration throughout the project](https://github.com/bounswe/bounswe2024group11/pull/549)
   - [feat(client): implement quizzes route & msw](https://github.com/bounswe/bounswe2024group11/pull/540)
   - [w3c(client): add relevant aria attributes to toast modal](https://github.com/bounswe/bounswe2024group11/pull/530)
   - [feat(client): implement register page and routing](https://github.com/bounswe/bounswe2024group11/pull/512)
   - [chore(client): bootstrap client application](https://github.com/bounswe/bounswe2024group11/pull/506)



 - **Conflict Resolution**:  
   In [feat(client): implement login page and routing](https://github.com/bounswe/bounswe2024group11/pull/508) I had to rebase my code because some changes were merged to the development branch after I created this branch. When I opened the pr for this, Ümit Can warned me about this issue. When I merge the latest development branch to my branch there were more changes than it supposed to be. After the rebasing operation the changes number decreased so the reviewer can review the actual changes easily and does not get overwhelmed by extra changes.

---

<br />

### **Member: *Yunus Kağan Aydın***

 #### **Responsibilities**
 - In previous term I was in backend part of the team, but this term I switched to mobile team of our Turquiz project. My general responsibilities consist of the design and implementation of the mobile part of our project. Other than that I try to help my team in terms of writing requirements, creating scenarios, documenting meeting notes etc.

---

 #### **Main Contributions**
 - I was a member of the team that created requirements. I looked specifically at user requirements. 
 - I created 4th and 5th scenario with Muhammet Emin Çiftçi and Ozan Karakaya.
 - Muhammed Emin Arayıcı and I implemented the mobile part which we showed in our demo.
 - I splitted initial authentication page which had login and register to two seperate screens and modified their UI to a proper one.
 - I implemented CreateQuestion screen in forum screen.
 - I implemented bottom tab to our mobile application in order to navigate into "Forum", "Quiz", "Leaderboard" and "Profile" pages.
 - Muhammed Emin Arayıcı and I resolved conflicts that has occured in merging different branches into the "development" branch.
 - I documented multiple meeting notes and lab reports.
---

 #### **Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:  
   - Bootstrap Mobile Application with [Muhammed Emin Arayıcı](https://github.com/Meminseeker). [Issue](https://github.com/bounswe/bounswe2024group11/issues/524), [PR](https://github.com/bounswe/bounswe2024group11/pull/522)
   - Implement JWT-based authentication system for Mobile application with [Muhammed Emin Arayıcı](https://github.com/Meminseeker). [Issue](https://github.com/bounswe/bounswe2024group11/issues/525), [PR](https://github.com/bounswe/bounswe2024group11/pull/523)
   - Implement Forum Interface and Components for Mobile application. [Issue](https://github.com/bounswe/bounswe2024group11/issues/527), [PR #1](https://github.com/bounswe/bounswe2024group11/pull/573), [PR #2](https://github.com/bounswe/bounswe2024group11/pull/576), [PR #3](https://github.com/bounswe/bounswe2024group11/pull/584), [PR #4](https://github.com/bounswe/bounswe2024group11/pull/585)

---

 #### **Non-Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:  
   - Document [Lab Meeting #1 notes](https://github.com/bounswe/bounswe2024group11/wiki/Lab-Meeting-%231). [Issue](https://github.com/bounswe/bounswe2024group11/issues/463)
   - Document [Meeting #1 notes](https://github.com/bounswe/bounswe2024group11/wiki/Meeting-%231). [Issue](https://github.com/bounswe/bounswe2024group11/issues/470)
   - Document [Meeting #2 notes](https://github.com/bounswe/bounswe2024group11/wiki/Meeting-%232). [Issue](https://github.com/bounswe/bounswe2024group11/issues/480)
   - Document [Frontend Meeting #1 notes](https://github.com/bounswe/bounswe2024group11/wiki/Frontend-Meeting-%231). [Issue](https://github.com/bounswe/bounswe2024group11/issues/486)
   - Document [Meeting #3 notes](https://github.com/bounswe/bounswe2024group11/wiki/Meeting-%233). [Issue](https://github.com/bounswe/bounswe2024group11/issues/509)
   - Document [Meeting #4 notes](https://github.com/bounswe/bounswe2024group11/wiki/Meeting-%234). [Issue](https://github.com/bounswe/bounswe2024group11/issues/532)
   - Create [Lab Report Template](https://github.com/bounswe/bounswe2024group11/wiki/Lab-Report-Template). [Issue](https://github.com/bounswe/bounswe2024group11/issues/469)
   - Document [Lab Report 2](https://github.com/bounswe/bounswe2024group11/wiki/Lab-Report-%232). [Issue](https://github.com/bounswe/bounswe2024group11/issues/476)
   - Document [Lab Report 3](https://github.com/bounswe/bounswe2024group11/wiki/Lab-Report-%233). [Issue](https://github.com/bounswe/bounswe2024group11/issues/488)
   - Document [Lab Report 4](https://github.com/bounswe/bounswe2024group11/wiki/Lab-Report-%234). [Issue](https://github.com/bounswe/bounswe2024group11/issues/535)
   - Create [Requirements](https://github.com/bounswe/bounswe2024group11/wiki/Requirements). [Issue](https://github.com/bounswe/bounswe2024group11/issues/471)
   - Create [User Scenario 4](https://github.com/bounswe/bounswe2024group11/wiki/Scenario-4) with [Ozan Karakaya](https://github.com/ozankrkya) and [Muhammet Emin Çiftçi](https://github.com/meminciftci). [Issue](https://github.com/bounswe/bounswe2024group11/issues/491)
   - Create [User Scenario 5](https://github.com/bounswe/bounswe2024group11/wiki/Scenario-5) with [Ozan Karakaya](https://github.com/ozankrkya) and [Muhammet Emin Çiftçi](https://github.com/meminciftci). [Issue](https://github.com/bounswe/bounswe2024group11/issues/494)

---

 #### **Pull Requests (PRs)**
 - **Created PRs**:  
   - [feat(mobile): Implement Create Question on Forum Screen](https://github.com/bounswe/bounswe2024group11/pull/576)
   - [feat(mobile): Add Bottom Tab](https://github.com/bounswe/bounswe2024group11/pull/584)
   - [feat(mobile): Update Navigation and add Register Screen](https://github.com/bounswe/bounswe2024group11/pull/585)
 - **Merged PRs**:  
   - [chore(mobile): Bootstrap Mobile App](https://github.com/bounswe/bounswe2024group11/pull/522)
   - [feat(mobile): Add Auth Context](https://github.com/bounswe/bounswe2024group11/pull/523)
   - [chore(mobile): Implement Mock Server for Forum Pages](https://github.com/bounswe/bounswe2024group11/pull/542)
   - [feat(mobile): Implement forumQuestionDetail Screen and Enhance Forum Feed Screen](https://github.com/bounswe/bounswe2024group11/pull/573)
   - [chore(mobile): Add Prettier as a Dev Dependency for Mobile Application](https://github.com/bounswe/bounswe2024group11/pull/577)
   - [feat(mobile): Build Mobile App](https://github.com/bounswe/bounswe2024group11/pull/580)
 - **Reviewed PRs**:  
   - [chore(mobile): Bootstrap Mobile App](https://github.com/bounswe/bounswe2024group11/pull/522)
   - [feat(mobile): Add Auth Context](https://github.com/bounswe/bounswe2024group11/pull/523)
   - [chore(mobile): Implement Mock Server for Forum Pages](https://github.com/bounswe/bounswe2024group11/pull/542)
   - [feat(client): Add Quizzes Route and Page & More Configuration Throughout the Project](https://github.com/bounswe/bounswe2024group11/pull/549)
   - [feat(mobile): Implement forumQuestionDetail Screen and Enhance Forum Feed Screen](https://github.com/bounswe/bounswe2024group11/pull/573)
   - [chore(mobile): Add Prettier as a Dev Dependency for Mobile Application](https://github.com/bounswe/bounswe2024group11/pull/577)
   - [feat(mobile): Build Mobile App](https://github.com/bounswe/bounswe2024group11/pull/580)
   - [feat(mobile): Connect Mobile to Backend and Implement Tagging for Forum Questions](https://github.com/bounswe/bounswe2024group11/pull/587)
 - **Conflict Resolution**:  
   Our most important conflict occured in merging authentication page with forum page at the development branch. These conflicts were based on imports can card functions generally. I resolved these conflicts with [Muhammed Emin Arayıcı](https://github.com/Meminseeker) by meeting online and progressing line by line.
---



<br />

### **Member: *Ceydanur Şen***

 #### **Responsibilities**
 - One of my main responsibility was to search and learn which API to use for semantic search and how to implement linked data structure for our project. This task is crucial since according to API used and the implementation way our project structure and the performance affected significantly. 
 - I worked on requirement specification and asked some of the elicitation questions we prepared.
 - I was responsible for creating class diagrams and sequence diagrams. 
- Project planning was my another responsibility. Starting from the first week I took a part in creating project plan and tracking changes to it during our development phases.
- I implemented tagging endpoint with my backend team members to add tag feature into forum question and answers. I was responsible for implementing pagination for forum questions.


---

 #### **Main Contributions**
 - I created project plan with Muhammet Emin Çiftçi and Muhammed Emin Arayıcı. After that the I tracked whether we had fallen behind the schedule.
 - I documented each task explanations stated on Project Plan.
 - I created Scenario 2 and related Mockups with Hasan Kerem Şeker.
 - I created Class Diagrams with other backend members.
 - I was responsible for creating seqeunce diagrams.
 - I searched for linked data structure and found out that the suggested Lexvo API is not suitable for our project structure and has a narrow vocabulary pool for Turkish words. We decided to use BabelNet API. I examined its Python and HTTP API and also examined its sample codes provided at API guide.
 - I implemented tagging endpoint with Muhammet Emin Çiftçi and Mücahit Erdoğan Ünlü. After that users can add tags to forum questions and answers.
 - I added pagination functionality for forum questions with Mücahit Erdoğan Ünlü.
 - I implemented unit test for pagination functionality.

---

 #### **Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:  
   - [Pagination](https://github.com/bounswe/bounswe2024group11/issues/556) | [Related PR](https://github.com/bounswe/bounswe2024group11/pull/561) : I implemented pagination functionality for forum questions. 
   - [Linked Data/ Tagging](https://github.com/bounswe/bounswe2024group11/issues/519) | [Related PR](https://github.com/bounswe/bounswe2024group11/pull/547) : For the linked data structure we implemented a tagging endpoint after spending a lot of time for suitable implementation. 

---

 #### **Non-Code-Related Significant Issues**
- **Resolved/Reviewed Issues**:  
   - [Research Lexvo](https://github.com/bounswe/bounswe2024group11/issues/473) : We conducted a search for linked data implementations on Lexvo, but we found that it is not suitable for our needs. The primary reason for this is that Lexvo only offers a Java API, which limits its accessibility for our project. Additionally, the vocabulary pool available through Lexvo is quite narrow, making it challenging to accommodate the diverse range of terms and concepts we require for effective linked data integration. As a result, we need to explore alternative solutions that offer broader language support and more flexible implementation options.
   - [Create General Plan](https://github.com/bounswe/bounswe2024group11/issues/467) : This plan constructed a base for the final project plan.
   - [Create Project Plan](https://github.com/bounswe/bounswe2024group11/issues/478): We created a project plan to use during our development phases.
   -  [Document Tasks Stated In Project Plan](https://github.com/bounswe/bounswe2024group11/issues/483): I explained thw task and which specific task involves which steps to complete.
   -  [Class Diagrams](https://github.com/bounswe/bounswe2024group11/issues/484) , [Edit Class Diagrams](https://github.com/bounswe/bounswe2024group11/issues/510): I took a role in creating our class diagrams and reviewed it.
   - [Create Scenario](https://github.com/bounswe/bounswe2024group11/issues/489): Created a scenario with Hasan Kerem.
   -  [Create Sequence Diagrams](https://github.com/bounswe/bounswe2024group11/issues/518): With my all backend team, we distributes this task to ease and complete this task.
  

---

 #### **Pull Requests (PRs)**
 - **Created PRs**:  
  - [PR for tagging endpoint](https://github.com/bounswe/bounswe2024group11/pull/547)
  - [PR for pagination](https://github.com/bounswe/bounswe2024group11/pull/561)

---

### **Member: *Muhammet Emin Çiftçi***

 #### **Responsibilities**
 - Starting from the requirements to the current state of our project, I have been working on each step. 
 - Requirements specification, project planning, and mockups are three main parts I worked on during the requirements phase. 
 - Creation of software design diagrams which were use case diagram, class diagram, and sequence diagrams was my resposibility on design phase. 
 - For the implementation part, I was on the backend team and worked on tagging and vote endpoints. Also, I had the opportunity to study on dockerazion thanks to Ozan. 
 - I am also chosen as a project manager with Ceydanur. It is kind of a symbolic responsibility but it is worth mentioning.

---

 #### **Main Contributions**
 - Created project plan with Muhammed Emin Arayıcı and Ceydanur Şen. Also, created and configured the required charts. [The wiki page](https://github.com/bounswe/bounswe2024group11/wiki/Project-Plan)
 - Drew the mockups and write the story for scenerio 4 & 5. [Scenerio 4](https://github.com/bounswe/bounswe2024group11/wiki/Scenario-4) [Scenerio 5](https://github.com/bounswe/bounswe2024group11/wiki/Scenario-5)
 - Decided on requirements with the team. [Requirements](https://github.com/bounswe/bounswe2024group11/wiki/Requirements)
 - Created Use Case Diagram with Ozan. [Use Case Diagram](https://github.com/bounswe/bounswe2024group11/wiki/UML-Use-Case-Diagram)
 - Created Class Diagram with Mücahit and Ceyda. [Class Diagram](https://github.com/bounswe/bounswe2024group11/wiki/Class-Diagrams)
 - Created Sequence Diagrams with the backend team. [Sequence Diagrams](https://github.com/bounswe/bounswe2024group11/wiki/Sequence-Diagrams)
 - Created Tagging endpoint with Mücahit and Ceydanur. 
 - Created Forum Qustion Vote endpoint with Arda and Ozan.
 - Worked on Database Dockerization with Ozan.

---

 #### **Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:  
   - [Create Initial Database Schema](https://github.com/bounswe/bounswe2024group11/issues/529): MySQL Database is chosen for our project. 
   - [Implement API for Returning Entity List from BabelNet](https://github.com/bounswe/bounswe2024group11/issues/519): Mücahit, Ceyda, and me worked on how to implement tagging feature.
   - [Implement Vote Endpoints for Forum Questions](https://github.com/bounswe/bounswe2024group11/issues/543): Arda and me worked on voting feature for forum questions.
   - [Dockerize the Full Application](https://github.com/bounswe/bounswe2024group11/issues/563) - Reviewer: As Ozan and Muhammed Emin Arayıcı worked on dockerization of our application, I had the opportunity to review their work.
   - [Make First (Manuel) Deployment](https://github.com/bounswe/bounswe2024group11/issues/567) - Reviewer: I reviewed the deployment status of our application.
   - [Configure a CI/CD Pipeline for Dev Environment Utilizing GitHub Actions](https://github.com/bounswe/bounswe2024group11/issues/568) - Reviewer: Automation of our application is still on progress.
   - [Decide on Deployment Plan](https://github.com/bounswe/bounswe2024group11/issues/565) - Reviewer: I followed the developments on the plan for deployment.

---

 #### **Non-Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:  
   - [Relocate Gitignore and Get Rid of Workflows](https://github.com/bounswe/bounswe2024group11/issues/464): Additional to moving last semester's work to archive, old workflows directory is also removed.
   - [Create Requirements](https://github.com/bounswe/bounswe2024group11/issues/471): Creation of requirements took several weeks to accomplish. We did it all together.
   - [Modify Issue Templates](https://github.com/bounswe/bounswe2024group11/issues/475): We did not have descriptive issue templates. In the end, we decided on a simple one.
   - [Create Project Plan](https://github.com/bounswe/bounswe2024group11/issues/478): Overall tentative project plan is created with my team members Arayıcı and Ceydanur. Project Libre is used.
   - [Create Gannt and Network Charts for Project Planning](https://github.com/bounswe/bounswe2024group11/issues/487): Gannt and Network Charts created by Project Libre were used for project plan demonstration.
   - [Create Class Diagrams](https://github.com/bounswe/bounswe2024group11/issues/484): Class diagram design was done colleboratively.
   - [Create Use Case Diagrams](https://github.com/bounswe/bounswe2024group11/issues/485): Use case diagram design was done colleboratively.
   - [Create Sequence Diagrams](https://github.com/bounswe/bounswe2024group11/issues/518): Sequence diagrams design was done colleboratively.
   - [Create User Scenario 4 - Search Forum & Bookmark & Upvote & Answer](https://github.com/bounswe/bounswe2024group11/issues/491): In the lab session, we created all the scenerios including this one.
   - [Create User Scenario 5 - View User Badge](https://github.com/bounswe/bounswe2024group11/issues/494): In the lab session, we created all the scenerios including this one.
   - [Create Mock Quiz Data For Clientside](https://github.com/bounswe/bounswe2024group11/issues/559): For our web development, I provided mockup data for quiz page with Hasan Kerem Şeker.
   - [Organize Wiki page](https://github.com/bounswe/bounswe2024group11/issues/465): Our old wiki page was modified according to new term.
   - [Document the Lab Meeting #2](https://github.com/bounswe/bounswe2024group11/issues/477)
   - [Document Project Planning Meeting](https://github.com/bounswe/bounswe2024group11/issues/482)
   - [Document the Lab Meeting #3](https://github.com/bounswe/bounswe2024group11/issues/502)
   - [Document the Lab Meeting #4](https://github.com/bounswe/bounswe2024group11/issues/536)

---

 #### **Pull Requests (PRs)**
 - **Created PRs**:  
   - [Implement tagging endpoint and document the swagger for it](https://github.com/bounswe/bounswe2024group11/pull/547): For our both forum and quiz pages, we need taggin feature so that we can semantically search inside these pages. Therefore, using BabelNet web server, we could get the id of each tag and connect the questions or quizes with them. Briefly, the tagging feature is a very critical point for our overall application.
 
 - **Merged PRs**:  
   - [Implement token obtain pair (login) and register endpoints](https://github.com/bounswe/bounswe2024group11/pull/517): The first endpoints login and register end points were implemented by Mücahit. I had a contribution in merging this PR.
 - **Reviewed PRs**:  
   - [Implement token obtain pair (login) and register endopints](https://github.com/bounswe/bounswe2024group11/pull/517): The first endpoints login and register end points were implemented by Mücahit. I reviewed this PR.

---

 #### **Additional Information**
 - My team has chosen me and Ceydanur as co-project managers for our project development. It is kind of a symbolic responsibility, but I try to be as helpful as possible.


<br />

### **Member: *Muhammed Emin Arayıcı***

> #### **Responsibilities**
> - I'm part of both the mobile team and the DevOps team. My main responsibilities are developingthe mobile application and deploying the full application for mobile and DevOps teams, respectively.
> - Moreover I was responsible for creating the requirments, elicitation questions, a scenario with its mockups, and the UI/UX design.

---

> #### **Main Contributions**
> -  I was the part of the team creating the requirements and elicitation questions.
> - I created the third scenario and its mockups with Mücahit Erdoğan Ünlü.
> - I helped to Ümit Can Evleksiz for the creation of the UI/UX design.
> - Me and Yunus Kağan developed the mobile application.
> - I initialized the authentication system to manage JWT token lifecycle. (e.g., stroing token, deleting token, etc.)
> - I created a mock server using `json-server` for the mobile team to develop the forum screens before the development of related APIs by the backend team.
> - I built the forum feed screen usign the mock server.
> - I built the question detail screen with answers using the mock server.
> - I connected the mobile application to the deployed backend.
> - I developed the tagging feature for the forum questions in the mobile application.
> - I resolved the problems related to Dockerization of the applications, backend, client, and Nginx with Ozan Oytun Karakaya.
> - I initialized the CI/CD pipeline with Ozan Oytun Karakaya.
> - Me and Ozan Oytun Karakaya deployed the application to the cloud.

---

> #### **Code-Related Significant Issues**
> - **Resolved/Reviewed Issues**:  
>   - Implement Auth Context for mobile [Issue](https://github.com/bounswe/bounswe2024group11/issues/525), [PR](https://github.com/bounswe/bounswe2024group11/pull/523)
>   - Implement mock server for forum pages for mobile [Issue](https://github.com/bounswe/bounswe2024group11/issues/544), [PR](https://github.com/bounswe/bounswe2024group11/pull/542)
>   - Implement Forum Question Detail screen for mobile [Issue](https://github.com/bounswe/bounswe2024group11/issues/574), [PR](https://github.com/bounswe/bounswe2024group11/pull/573)
>   - Implement tagging for forum questions for mobile [PR](https://github.com/bounswe/bounswe2024group11/pull/587)
>   - Connect mobile app to deployed backend [PR](https://github.com/bounswe/bounswe2024group11/pull/587)
>   - Dockerize the full application and initialize the CI/CD pipeline [Issue](https://github.com/bounswe/bounswe2024group11/issues/563), [PR](https://github.com/bounswe/bounswe2024group11/pull/570)

---

> #### **Non-Code-Related Significant Issues**
> - **Resolved/Reviewed Issues**:  
>   - Remove Old Unnecessary Artifacts [Issue](https://github.com/bounswe/bounswe2024group11/issues/461)
>   - Create Requirements [Issue](https://github.com/bounswe/bounswe2024group11/issues/471)
>   - Create Elicitation Questions  [Issue](https://github.com/bounswe/bounswe2024group11/issues/479)
>   - Create Project Plan [Issue](https://github.com/bounswe/bounswe2024group11/issues/478)
>   - Document Milestone Scopes [Issue](https://github.com/bounswe/bounswe2024group11/issues/507)
>   - Create User Scenario 3 & Its Mockups [Issue](https://github.com/bounswe/bounswe2024group11/issues/501)

---

> #### **Pull Requests (PRs)**
> - **Created PRs**:  
>   - [Bootstrap Mobile App](https://github.com/bounswe/bounswe2024group11/pull/522)
>   - [Add Auth Context for Mobile](https://github.com/bounswe/bounswe2024group11/pull/523)
>   - [Implement Mock Servers for Forum Screens for Mobile](https://github.com/bounswe/bounswe2024group11/pull/542)
>   - [Dockerize the Full Application and Initialize CI/CD Workflow](https://github.com/bounswe/bounswe2024group11/pull/570)
>   - [Implement ForumQuestionDetail Screen for Mobile](https://github.com/bounswe/bounswe2024group11/pull/573)
>   - [Add Prettier as a Dev Dependency and Refactor the Mobile Directory](https://github.com/bounswe/bounswe2024group11/pull/577)
>   - [Build Mobile App](https://github.com/bounswe/bounswe2024group11/pull/580)
>   - [Connect Mobile to Backend and Implement Tagging for Forum Questions](https://github.com/bounswe/bounswe2024group11/pull/587)

> - **Reviewed & Merged PRs**:  
>   - [Bootstrap Client Application](https://github.com/bounswe/bounswe2024group11/pull/506)
>   - [Dockerize the Application](https://github.com/bounswe/bounswe2024group11/pull/555)
>   - [Implement CreateQuestion on Forum Screen](https://github.com/bounswe/bounswe2024group11/pull/576)
>   - [Add Bottom Tab (i.e., menu)](https://github.com/bounswe/bounswe2024group11/pull/584)
>   - [Update Navigation and Add Register Screen](https://github.com/bounswe/bounswe2024group11/pull/585)



> - **Conflict Resolution**:  
>   In the [Update Navigation and Add Register Screen](https://github.com/bounswe/bounswe2024group11/pull/585) PR, there are some issues arised while resolving the merge conflicts. This PR introduces the changes to the application's default navigation logic since it provides different flows for authenticated and not authenticated users. The base branch also has some newly added configurations for the same file. While combining them, some of the details of the PR are changed. Because the PR does not have the final navigation logic the app has, I didn't go it too much. I informed my colleague about it. Then

<br />

### **Member: *Ozan Oytun Karakaya***
 #### **Responsibilities**
 - My main responsibility is leading the DevOps process of our application with all of its features such Dockerization, Deployment, CI/CD features, etc.
 - I am also a part of the backend development team. I have contributed mostly on DevOps side since backend contributions are satisfied for this milestone.
 - I was also responsible for creation of requirements & elicitation, scenarios, UML Diagrams and Project Plan. 
---

 #### **Main Contributions**
 - I have generated & gathered elicitation questions for requirements and revised requirements according to their answers.
 - I have created general Project Plan with Ceyda Nur Şen and Hasan Kerem Şeker.
 - I have created User Scenario 4 & User Scenario 5 with Muhammet Emin 
 - I have created UML Use Cae
---

 #### **Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:
---

 #### **Non-Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:
   - 
---

 #### **Pull Requests (PRs)**
 - **Created PRs**:
 - **Merged PRs**:
 - **Reviewed PRs**:
 - **Conflict Resolution**:
---




### **Member: *Arda Vural***

 #### **Responsibilities**
 - I was in the mobile team last semester. This term, I have switched to the backend team. I have worked on endpoints.
 - Organized New Meeting Schedule for the project was part of my responsibility.
 - Implementing Vote Endoints for Forum Questions wih Muhammet Emin Çiftçi ,and Forum Question Create and View Endpoints with Mücahit Erdoğan Ünlü were some of my responsibilities for backend.
 - Reviewing part for requirements and giving feedbacks. Also, I was responsible for creating user scenario templates and user scenarios with mockups aswell.
 - Creating software design diagrams like class diagram, and sequence diagrams and also reviewing them was my primary responsibilities in the design process. 
 - Refining and updating wiki also was a kind of responsibility that i helped about.

---

 #### **Main Contributions**
 - Created User Scenario 1 and drawing the mockups with Ümitcan Evleksiz. [The wiki page](https://github.com/bounswe/bounswe2024group11/wiki/Scenario-1)
 - Created User Template for a general use and consistency with Ümitcan Evleksiz. [Template](https://github.com/bounswe/bounswe2024group11/wiki/User-Scenario-Template)
 - Reviewed and gave feedbacks on requirements with the team. [Requirements](https://github.com/bounswe/bounswe2024group11/wiki/Requirements)
 - Created Class Diagrams with Mücahit, decided on the design and reviewed. [Class Diagram](https://github.com/bounswe/bounswe2024group11/wiki/Class-Diagrams)
 - Created Sequence Diagrams and also reviewed others with the backend team. [Sequence Diagrams](https://github.com/bounswe/bounswe2024group11/wiki/Sequence-Diagrams)
 - Created Forum Question Create and View endpoints with Mücahit.
 - Created Forum Question Vote endpoint with Muhammet Emin and Ozan.

---

 #### **Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:  
   - [Implement Vote Endpoints for Forum Questions](https://github.com/bounswe/bounswe2024group11/issues/543): Vote endpoint is implemented with Muhammet Emin Çiftçi and the help of Ozan. [Branch](https://github.com/bounswe/bounswe2024group11/tree/forum-question-votes)
   - [Implement Forum Question Create and View Endpoints](https://github.com/bounswe/bounswe2024group11/issues/526): Forum Question Create and View endpoints are implemented by me and Mücahit. [PR](https://github.com/bounswe/bounswe2024group11/pull/546)

---

 #### **Non-Code-Related Significant Issues**
 - **Resolved/Reviewed Issues**:  
   - [Create User Scenario 1 - Explore and Register](https://github.com/bounswe/bounswe2024group11/issues/492): 
   - [Create User Scenario Template](https://github.com/bounswe/bounswe2024group11/issues/490)
   - [Organize New Meeting Schedule](https://github.com/bounswe/bounswe2024group11/issues/462)
   - [Create Lab Report 1](https://github.com/bounswe/bounswe2024group11/issues/468)
   - [Research Lexvo](https://github.com/bounswe/bounswe2024group11/issues/473)
   - [Create Class Diagrams](https://github.com/bounswe/bounswe2024group11/issues/484)
   - [Create Use Case Diagrams](https://github.com/bounswe/bounswe2024group11/issues/485)
   - [Create Sequence Diagrams](https://github.com/bounswe/bounswe2024group11/issues/518)
   - [Create User Scenario 4 - Search Forum & Bookmark & Upvote & Answer](https://github.com/bounswe/bounswe2024group11/issues/491)
   - [Create User Scenario 5 - View User Badge](https://github.com/bounswe/bounswe2024group11/issues/494)
   - [Implement API for Returning Entity List from BabelNet](https://github.com/bounswe/bounswe2024group11/issues/519)
   - [Create the Initial Database Schema](https://github.com/bounswe/bounswe2024group11/issues/529)
   - [Create Mock Quiz Data For Clientside](https://github.com/bounswe/bounswe2024group11/issues/559)
   - [Modify Issue Templates](https://github.com/bounswe/bounswe2024group11/issues/475)
   - [Organize Wiki page](https://github.com/bounswe/bounswe2024group11/issues/465)
   - [Document the Lab Meeting #2](https://github.com/bounswe/bounswe2024group11/issues/477)
   - [Document Project Planning Meeting](https://github.com/bounswe/bounswe2024group11/issues/482)
   - [Document the Lab Meeting #3](https://github.com/bounswe/bounswe2024group11/issues/502)
   - [Document the Lab Meeting #4](https://github.com/bounswe/bounswe2024group11/issues/536)

---

 #### **Pull Requests (PRs)**
 - **Created PRs**:  
   - [Implement tagging endpoint and document the swagger for it](https://github.com/bounswe/bounswe2024group11/pull/547)
 
 - **Merged PRs**:  
   - [Implement token obtain pair (login) and register endopints](https://github.com/bounswe/bounswe2024group11/pull/517)
 - **Reviewed PRs**:  
   - [Implement token obtain pair (login) and register endopints](https://github.com/bounswe/bounswe2024group11/pull/517)

---


<br />

### **Member: _Ümit Can Evleksiz_**

#### **Responsibilities**

- I am responsible for creating and maintaining the branding of the Turquiz application.
- I am responsible for the UX/UI design of both the web application and the mobile application.
- I am responsible for creating the web client application.
- I am respinsible for accessibility, responsiveness, and the w3c compliance of the web application.

---

#### **Main Contributions**

- Initialized the scenarios with Muhammet Emin Arayici.
- Created first user scenario.
- Created the app logo, theme, and color palette.
- Brainstormed the user flows and possible screens.
- Created forum page designs for the mobile application.
- Bootstrapped the web application, installing necessary dependencies.
- Refined and refactored the login/register pages, removed ui libraries we didn't need anymore.
- Set up a mock server (MSW) to serve mock data for the web application.
- Created quiz card and quizzes page.
- Refined the quiz page, added missing functionalities.
- Added a leaderboard with mock data, created reusable components.
- Added a home page with mock data.

---

#### **Code-Related Significant Issues**

- [Bootstrap Web Client Application](https://github.com/bounswe/bounswe2024group11/issues/496)
- [Implement Toast Notification](https://github.com/bounswe/bounswe2024group11/issues/520)
- [Implement Quizzes Route & Create Mock Server For It](https://github.com/bounswe/bounswe2024group11/issues/541)
- [Fix Build Failure on Local and Docker](https://github.com/bounswe/bounswe2024group11/issues/551)
- [Design and Implement Quiz Inner Component](https://github.com/bounswe/bounswe2024group11/issues/552)
- [Design and Implement Quiz Card](https://github.com/bounswe/bounswe2024group11/issues/553)
- [Design and Implement Quiz Opener Screen](https://github.com/bounswe/bounswe2024group11/issues/554)

#### **Non-Code-Related Significant Issues**

- [Organize Repository by Moving it under /archive](https://github.com/bounswe/bounswe2024group11/issues/460)
- [Research W3C standards](https://github.com/bounswe/bounswe2024group11/issues/474)
- [Create User Scenario Template](https://github.com/bounswe/bounswe2024group11/issues/490)
- [Create User Scenario 1 - Explore and Register](https://github.com/bounswe/bounswe2024group11/issues/492)
- [Design App Name & Logo & Theming](https://github.com/bounswe/bounswe2024group11/issues/495)
- [Decide the Libraries to Use in the Client App](https://github.com/bounswe/bounswe2024group11/issues/499)

#### **Pull Requests (PRs)**

- [chore(client): bootstrap client application](https://github.com/bounswe/bounswe2024group11/pull/506)
- [feat(client): implement register page and routing](https://github.com/bounswe/bounswe2024group11/pull/512)
- [w3c(client): add relevant aria attributes to toast modal](https://github.com/bounswe/bounswe2024group11/pull/530)
- [feat(client): implement quizzes route & msw](https://github.com/bounswe/bounswe2024group11/pull/540)
- [feat(client): add quizzes route and page & more configuration throughout the project](https://github.com/bounswe/bounswe2024group11/pull/549)
- [chore(client): configure project and meta tags](https://github.com/bounswe/bounswe2024group11/pull/557)
- [des(client): improve design, add necessary components](https://github.com/bounswe/bounswe2024group11/pull/558)
- [des(client): refine quiz card, quiz page, page heads, router](https://github.com/bounswe/bounswe2024group11/pull/572)
- [feat(client): add quiz start screen, timer, progress bar and overall style improvements](https://github.com/bounswe/bounswe2024group11/pull/578)
- [feat(client): add a simple leaderboard table](https://github.com/bounswe/bounswe2024group11/pull/579)
- [fix(client): prevent id duplication](https://github.com/bounswe/bounswe2024group11/pull/581)
- [feat(client): refine leaderboard](https://github.com/bounswe/bounswe2024group11/pull/582)
- [feat(client): add content to home and refine leaderboard data & design](https://github.com/bounswe/bounswe2024group11/pull/583)

- **Version Control**:

  After exploring different options for our branching strategy, we decided against creating separate branches for each domain (client, mobile, server, etc.). Instead, we’ll maintain a single branch across all domains, with each branch representing a specific feature or unit of work. For example, a branch for a feature like "forum" will fork from the `main` branch, and both client and server updates related to the forum will be developed within this feature branch. This means our branch structure is organized by features rather than by domain.

  We also discussed the use of `main` and `development` branches in our workflow, focusing particularly on how deployments will be managed. The `main` branch will serve as the stable branch, intended for production-ready code, while the `development` branch will be used for ongoing feature integration and testing. Deployments to staging will occur from `development` to allow for thorough testing, while production deployments will only come from the main branch, ensuring that only fully tested and stable code reaches production.

- **Time and Resource Management**:

  As the sole designer for both web and mobile platforms, I prioritized the mobile application to keep its development moving forward, given the immediate need for specific functionalities. I chose not to create high-resolution UI designs for the web application, as its design needs could be met effectively using only TailwindCSS. This approach allowed for "design by code" on the web, which was not feasible for the mobile application.

---

<br />

### **Member: *Mücahit Erdoğan Ünlü***

> #### **Responsibilities**
> - I was selected as the lead backend developer. This meant that I was responsible for delivering the backend objectives on time. Besides, I had the responsibility of division of labor and assigning teammates to tasks.
> - I took part in specifying the requirements.
> - I took part in scenario & relevant mockups together with Muhammed Emin Arayıcı.
> - I was selected as the lead responsible for class diagrams.
> - I was responsible for sequence diagrams.
> - I was responsible for selecting the best suitable Linked Data tool for our project.

---

> #### **Main Contributions**
> - Actively participated in specifying the requirements and created the glossary.
> - Prepared one scenario & relevant mockups together with Muhammed Emin Arayıcı.
> - Prepared the main design of the class diagrams.
> - Created a few sequence diagrams together with Ceydanur Şen and assigned some sequence diagrams to others.
> - Researched and selected Babelnet API as our Linked Data server as it provided the most comprehensive vocabulary for Turkish-English.
> - Bootstrapped the backend app and integrated the swagger.
> - Created register and login endpoints on backend together with their swaggers and unit tests.
> - Created fully-functional Forum Question CRUD endpoints together with Arda Vural together with its swagger.
> - Created unit tests for Forum Question CRUDs.
> - Implemented tagging endpoint that returned a list of Babelnet entities to user together with Ceydanur Şen and Muhammed Emin Çiftçi together with its swagger.
> - Implemented pagination for Forum Questions together with Ceydanur Şen and updated swagger and unit tests accordingly.

---

> #### **Code-Related Significant Issues**
> - **Resolved/Reviewed Issues**:  
>   - Bootstrap Django REST Framework App: [issue](https://github.com/bounswe/bounswe2024group11/issues/513), [PR](https://github.com/bounswe/bounswe2024group11/pull/517)
>   - Implement Login and register Endpoints: [issue](https://github.com/bounswe/bounswe2024group11/issues/516), [PR](https://github.com/bounswe/bounswe2024group11/pull/517)
>   - Integrate Swagger and use it for Login and Register JWT Tokens: [issue](https://github.com/bounswe/bounswe2024group11/issues/515), [PR](https://github.com/bounswe/bounswe2024group11/pull/517)
>   - Implement Forum Question CRUD Endpoints together with Arda Vural: [issue](https://github.com/bounswe/bounswe2024group11/issues/526), [PR](https://github.com/bounswe/bounswe2024group11/pull/546)
>   - Implement Tagging Endpoint together with Ceydanur Şen and Muhammed Emin Çiftçi: [issue](https://github.com/bounswe/bounswe2024group11/issues/519), [PR](https://github.com/bounswe/bounswe2024group11/pull/547)
>   Implement Pagination for Forum Questions together with Ceydanur Şen: [issue](https://github.com/bounswe/bounswe2024group11/issues/556), [PR](https://github.com/bounswe/bounswe2024group11/pull/561)


> #### **Non-Code-Related Significant Issues**
> - **Resolved/Reviewed Issues**:  
>   - Apart from participating in specifying requirements, I personally prepeared the glossary: [issue](https://github.com/bounswe/bounswe2024group11/issues/481)
>   - I researched the best suitable Linked Data tool for our project. It is important because it will signifcantly affect the user experience: [issue](https://github.com/bounswe/bounswe2024group11/issues/473)
>   - Designed the main part of the class diagrams as they are useful for understanding the project structure: [issue](https://github.com/bounswe/bounswe2024group11/issues/484)
>   - Create a scenario & relevant mockups together with Muhammed Emin Arayıcı: [issue](https://github.com/bounswe/bounswe2024group11/issues/501)

> #### **PRs that I have Created/Merged/Reviewed**
> * **Created**
> 1) Auth: [PR](https://github.com/bounswe/bounswe2024group11/pull/517)
> 2) Forum Question. There was a simple conflict in requirements.txt file. Resolved by adding both incoming lines: [PR](https://github.com/bounswe/bounswe2024group11/pull/546)
> 3) Tagging: [PR](https://github.com/bounswe/bounswe2024group11/pull/547)
> * **Merged**
> 1) Pagination: [PR](https://github.com/bounswe/bounswe2024group11/pull/561)

> #### **Additional Information**
> As a lead backend developer, I had the responsibility to integrate new-coming teammates from mobile team, Muhammed Emin Arayıcı and Arda Vural to backend team. I had sessions with both of them on Django and Django REST framework. Besides, we developed some endpoints together.
