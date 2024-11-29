# CMPE451 Group 11 Customer Milestone 2


![Milestone 2 Cover](https://hackmd.io/_uploads/SJN0u04mJx.png)


## Outline

In this milestone we have completed the following requirements.

## 🧱 1. Functional Requirements

### 1.1 User Requirements

#### 1.1.1 Account Requirements

- 1.1.1.1 Users shall be able to register the system.
- 1.1.1.2 Registered users shall be able to log in to the system.
- 1.1.1.5 Registered users shall be able to log out from the system.
- 1.1.1.6 Registered users should have a profile page.
- 1.1.1.9 Registered users should be able to put up a profile picture.

#### 1.1.2 Quiz Requirements

- 1.1.2.1 Registered users shall be able to create quizzes.
- 1.1.2.2 Registered users shall be able to create quiz questions.
- 1.1.2.6 Users shall be able to view any quizzes.
- 1.1.2.8 Registered users shall be able to see previous quizzes they took.
- 1.1.2.12 Registered users shall be able to see the creator of quizzes.
- 1.1.2.13 Registered users shall be able to view a quiz feed.


#### 1.1.3 Forum Requirements

- 1.1.3.1 Registered users shall be able to create forum questions.
- 1.1.3.2 Registered users shall be able to link keywords in the questions to the corresponding linked data source.
- 1.1.3.3 Registered users shall be able to answer forum questions.
- 1.1.3.4 Users shall be able to view any forum questions.
- 1.1.3.5 Users shall be able to search forum questions semantically.
- 1.1.3.6 Registered users should be able to upvote forum questions.
- 1.1.3.7 Registered users should be able to downvote forum questions.
- 1.1.3.8 Registered users should be able to upvote forum answers.
- 1.1.3.9 Registered users should be able to downvote forum answers.
- 1.1.3.10 Users should be able to view the number of upvotes and downvotes of forum questions and their answers.
- 1.1.3.11 Registered users should be able to bookmark forum questions.
- 1.1.3.12 Registered users should be able to unbookmark forum questions that they currently bookmark.
- 1.1.3.13 Registered users shall be able to view a forum feed.

#### 1.2.2 Other Requirements
- 1.2.2.1 The system shall use [Babelnet](https://babelnet.org/) for linked data features.


## ✨ 2. Non-functional Requirements

### 2.1 Web Standards & Guidelines

* 2.1.1 All interactive elements within the web application, such as buttons, links, and form controls, modal openers, dropdown menus shall comply with the [WAI-ARIA 1.2 Standards](https://www.w3.org/TR/wai-aria-1.2/). 

> This includes, but is not limited to, the appropriate use of role, aria-label, aria-describedby, aria-expanded, and other ARIA attributes to enhance accessibility for screen readers and assistive technologies. For instance, in the quiz application, each interactive question option should be assigned a role="radio" to indicate its function to users with screen readers.

* 2.1.2 All static content, whether user-generated or not, shall adhere to the [WCAG 2.1 Standards](https://www.w3.org/TR/WCAG21/). 
> This includes meeting the guidelines for text alternatives, color contrast, keyboard navigation, and focus states to ensure that all users, including those with disabilities, can perceive, understand, navigate, and interact with the content effectively. For instance, all images should have descriptive alt text, and links should provide clear context even when read out of sequence.

* 2.1.3 All vector images used in the web application shall comply with the [Scalable Vector Graphics (SVG) 2 Standards](https://www.w3.org/TR/SVG2/).


### 2.2 Data & Privacy 

2.2.3 The platform shall provide clear and concise privacy policies that explain how user data is collected, stored, processed, and shared.


### 2.3 Compatibility

* 2.3.1 The platform shall be fully compatible with mobile devices, ensuring that the user interface is responsive and adaptable to various screen sizes and orientations, including smartphones and tablets.

* 2.3.2 The web application shall support cross-browser compatibility, ensuring correct functionality on the latest versions of all major browsers, including Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, and Opera, as of January 1, 2024.

* 2.3.3 The platform shall be optimized for performance on both desktop and mobile devices, ensuring fast load times and smooth interactions even on slower network connections (e.g., 3G or 4G).

* 2.3.4 The web application shall support accessibility tools and technologies, including screen readers, keyboard navigation, and voice recognition software, to ensure a seamless experience for users with disabilities.

* 2.3.5 The platform shall be compatible with different operating systems, including but not limited to Windows, macOS, iOS, and Android, to maximize reach and usability across different devices.


## Deliverables

## 🧱 1. Functional Requirements

### 1.1 User Requirements
|1.1.1 Account Requirements| Status |
|--------------------------|--------|
| 1.1.1.1 Users shall be able to register the system. | Completed |
| 1.1.1.2 Registered users shall be able to log in to the system. | Completed |
| 1.1.1.3 Registered users should be able to reset their passwords.| Not Started |
| 1.1.1.4 Registered users should be able to delete their accounts.| Not Started |
| 1.1.1.5 Registered users shall be able to log out from the system.| Completed |
| 1.1.1.6 Registered users should have a profile page.| Completed |
| 1.1.1.7 Registered users should be able to edit their profile.| In Progress |
| 1.1.1.8 Registered users should be able to set their proficiency level in English.| Not started |
| 1.1.1.9 Registered users should be able to put up a profile picture. | Completed|

|1.1.2 Quiz Requirements| Status |
|-----------------------|--------|
| 1.1.2.1 Registered users shall be able to create quizzes.| Completed |
| 1.1.2.2 Registered users shall be able to create quiz questions.| Completed |
| 1.1.2.3 Registered users should be able to duplicate a quiz previously created. | Not Started|
| 1.1.2.4 Registered users shall be able to delete quizzes created by themselves.| In Progress|
| 1.1.2.5 Registered users shall be able to edit difficulty levels, titles, descriptions, and tags of the quizzes created by themselves.| In Progress|
| 1.1.2.6 Users shall be able to view any quizzes.| Completed|
| 1.1.2.7 Registered users shall be able to take quizzes only at their difficulty levels.| In Progress |
| 1.1.2.8 Registered users shall be able to see previous quizzes they took.| Completed |
| 1.1.2.9 Registered users should be able to see their global ranking at their proficiency level.| Not Started|
| 1.1.2.10 Users should be able to search quizzes semantically.| In Progress |
| 1.1.2.11 Registered users should be able to rate the quizzes they took.| In Progress |
| 1.1.2.12 Registered users shall be able to see the creator of quizzes.| Completed |
| 1.1.2.13 Registered users shall be able to view a quiz feed.| Completed |

|1.1.3 Forum Requirements | Status |
|-------------------------|--------|
| 1.1.3.1 Registered users shall be able to create forum questions. | Completed |
| 1.1.3.2 Registered users shall be able to link keywords in the questions to the corresponding linked data source. |Completed |
| 1.1.3.3 Registered users shall be able to answer forum questions. | Completed |
| 1.1.3.4 Users shall be able to view any forum questions. |Completed |
| 1.1.3.5 Users shall be able to search forum questions semantically. | Completed |
| 1.1.3.6 Registered users should be able to upvote forum questions. | Completed|
| 1.1.3.7 Registered users should be able to downvote forum questions. | Completed|
| 1.1.3.8 Registered users should be able to upvote forum answers. |Completed |
| 1.1.3.9 Registered users should be able to downvote forum answers. |Completed |
| 1.1.3.10 Users should be able to view the number of upvotes and downvotes of forum questions and their answers. | Completed|
| 1.1.3.11 Registered users should be able to bookmark forum questions. |Completed |
| 1.1.3.12 Registered users should be able to unbookmark forum questions that they currently bookmark. |Completed |
| 1.1.3.13 Registered users shall be able to view a forum feed. |Completed |

|1.1.4 User-to-User Interactions| Status |
|-------------------------------|--------|
| 1.1.4.1 Registered users shall be able to follow other registered users.| Not Started|
| 1.1.4.2 Registered users shall be able to unfollow users they currently follow.|Not Started|
| 1.1.4.3 Registered users should be able to block other registered users.|Not Started|
| 1.1.4.4 Registered users should be able to unblock users they currently block.| Not Started |

### 1.2 System Requirements

|1.2.1 Gamification Requirements| Status|
|-------------------------------|-------|
| 1.2.1.1 The system shall give users badges.| In Progress|
| 1.2.1.2 The system shall give users scores based on the number of questions answered correctly in each quiz.| In Progress |
| 1.2.1.3 The system should have a mascot.| Not Started |

|1.2.2 Other Requirements| Status|
|------------------------|-------|
| 1.2.2.1 The system shall use [Babelnet](https://babelnet.org/) for linked data features.| Completed |

</details>


## ✨ 2. Non-functional Requirements

|2.1 Web Standards & Guidelines|Status |
|-------------------------------|-------|
|2.1.1 All interactive elements within the web application, such as buttons, links, and form controls, modal openers, dropdown menus shall comply with the [WAI-ARIA 1.2 Standards](https://www.w3.org/TR/wai-aria-1.2/). |Completed |
| 2.1.2 All static content, whether user-generated or not, shall adhere to the [WCAG 2.1 Standards](https://www.w3.org/TR/WCAG21/). | Completed|
| 2.1.3 All vector images used in the web application shall comply with the [Scalable Vector Graphics (SVG) 2 Standards](https://www.w3.org/TR/SVG2/).| Completed|

|2.2 Data & Privacy| Status|
|------------------|-------|
| 2.2.1 The platform shall comply with the [General Data Protection Regulation (GDPR)](https://gdpr.eu/) requirements to ensure that all personal data is processed lawfully, transparently, and for a specific purpose. This includes obtaining explicit user consent before collecting personal data and providing users with the ability to access, modify, or delete their information. | Not Started|
| 2.2.2 The platform shall adhere to the [Law on the Protection of Personal Data (KVKK)](https://kvkk.gov.tr/) to safeguard user data in accordance with Turkish data protection regulations. This includes ensuring data minimization, accuracy, and implementing appropriate security measures to prevent unauthorized access or breaches.| Not Started |
| 2.2.3 The platform shall provide clear and concise privacy policies that explain how user data is collected, stored, processed, and shared.| Completed|


|2.3 Compatibility| Status|
|-----------------|-------|
| 2.3.1 The platform shall be fully compatible with mobile devices, ensuring that the user interface is responsive and adaptable to various screen sizes and orientations, including smartphones and tablets. | Completed|
| 2.3.2 The web application shall support cross-browser compatibility, ensuring correct functionality on the latest versions of all major browsers, including Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, and Opera, as of January 1, 2024. |Completed|
| 2.3.3 The platform shall be optimized for performance on both desktop and mobile devices, ensuring fast load times and smooth interactions even on slower network connections (e.g., 3G or 4G). |Completed|
| 2.3.4 The web application shall support accessibility tools and technologies, including screen readers, keyboard navigation, and voice recognition software, to ensure a seamless experience for users with disabilities. |Completed|
| 2.3.5 The platform shall be compatible with different operating systems, including but not limited to Windows, macOS, iOS, and Android, to maximize reach and usability across different devices. |Completed|

### UX design with focus on domain-specific nature of the features

1. Hint mechanism for the quizzes

![Screenshot 2024-11-27 at 21.34.12](https://hackmd.io/_uploads/By18I1BXkg.png)

![Screenshot 2024-11-27 at 21.34.21](https://hackmd.io/_uploads/H1_uLJSXkx.png)

![Screenshot 2024-11-27 at 21.42.07](https://hackmd.io/_uploads/HJkmuJBQ1g.png)


2. Listing the correct answers of the questions automatically while creating quizzes

![Screenshot 2024-11-27 at 21.37.29](https://hackmd.io/_uploads/r1TbP1BmJx.png)

![Screenshot 2024-11-27 at 21.37.41](https://hackmd.io/_uploads/H1zNvkBQyl.png)


3. Tagging mechanism supports both Turkish and English words



![Screenshot 2024-11-27 at 21.39.12](https://hackmd.io/_uploads/Skx3DyH7yg.png)

![Screenshot 2024-11-27 at 21.39.21](https://hackmd.io/_uploads/r1n3PkrmJg.png)

### Description of the standard being utilized 

#### [WAI-ARIA](https://github.com/bounswe/bounswe2024group11/wiki/Standards:-WAI%E2%80%90ARIA-1.2-Standards)

Given the application's rich functionality and numerous features, adhering to WAI-ARIA standards was essential. We carefully selected ARIA attributes to ensure accessibility, as outlined in our Wiki page. Additionally, we utilized a headless component library, [Ariakit](https://ariakit.org/), which is designed with accessibility in mind. This allowed us to efficiently implement complex components such as hovercards and comboboxes, streamlining development while ensuring the application remains accessible.

![CleanShot 2024-11-29 at 21.07.52@2x](https://hackmd.io/_uploads/Hk_Z7KDmJl.png)

![CleanShot 2024-11-29 at 21.07.41@2x](https://hackmd.io/_uploads/ryY-mYwmJg.png)

![CleanShot 2024-11-29 at 21.09.40@2x](https://hackmd.io/_uploads/SyuO7FP7kl.png)

![CleanShot 2024-11-29 at 21.10.33@2x](https://hackmd.io/_uploads/HJOsXKP71x.png)

#### [WCAG](https://github.com/bounswe/bounswe2024group11/wiki/Standards:-WCAG-2.1-Standards)

To accommodate both static content and user-generated content within the application, we followed WCAG guidelines and incorporated appropriate tags as detailed in our Wiki documentation. During code reviews, we actively identified and addressed issues related to missing or incorrect tag usage to maintain compliance and accessibility standards.

![CleanShot 2024-11-29 at 21.08.42@2x](https://hackmd.io/_uploads/HkqNXFPmyx.png)


#### [SVG](https://github.com/bounswe/bounswe2024group11/wiki/Standards:-SVG-2-Accessibility-Standards)

We added meaningful `title` attributes to SVG illustrations used in various sections, such as the error state, new forum question page, and start quiz page. These titles include clear and well-defined descriptions to enhance accessibility and provide context for assistive technologies.

![CleanShot 2024-11-29 at 21.08.12@2x](https://hackmd.io/_uploads/H11m7FDmyx.png)


### API documentation
Swagger documentation: http://138.68.97.90:8000/api/v1/swagger/

#### Authorization
Since most of the endpoints requires the sender to be authorized for methods, it is better to complete authorization steps before demonstrating any example API call. Steps below explains the authorization process inside the swagger page.
- Get the Access Token: Initially, /auth/login/ endpoint should be envoked with post request including the `username` and `password` in the body. A sample registered user will be used for demonstration in order to skip the registration process.
![:auth:login](https://hackmd.io/_uploads/H1dxs_vQ1g.png)
![access_token](https://hackmd.io/_uploads/H1UWjuPXJg.png)
- You can see the "access" token highlighted above in the JSON response body.
- By clicking onto the **Authorize** button in the beginning of the page, on right, this access token can be used for authorization. In the textbox opening up,
`Bearer <access_token>` should be given as input.
![auth bearer](https://hackmd.io/_uploads/HJx6sOvmyx.png)
![auth response](https://hackmd.io/_uploads/HkEToOwQ1e.png)
- This window can be closed and all endpoints require authorization can be tried inside the Swagger Page.

#### Example API Call From Swagger
- After sending a get request to `/api/v1/forum-questions` endpoint, all of the forum questions are displayed. Answering feature for the forum question with `id=3` is demonstrated below.
- Get the forum question with `id=3` with sending GET request to `/api/v1/forum-questions/3/`.
![display forum question 3](https://hackmd.io/_uploads/SyEvROvX1l.png)
- Write an example answer for the question in the POST request JSON body to the endpoint `/api/v1/forum-questions/3/answer/`.
- Notice that `answer` endpoint is nested in the URL and the `id` of the forum-question should be provided in the URL as `pk`, stands for primary key.
![answer forum question 3](https://hackmd.io/_uploads/rJH9AOP71l.png)
- Response returned from the endpoint after the POST request sent.
![answer forum question 3 response](https://hackmd.io/_uploads/S1frktw7ke.png)
- Newly created answer now can be seen by sending GET request to the same endpoint, `/api/v1/forum-questions/3/`.


#### Body Examples
In order to view request body examples, click on the `Example Value` button indicated with red arrow.
![image](https://hackmd.io/_uploads/H1XzfvDQJe.png)
In order to view response body and response code examples, click on `Example Value` button:
![image](https://hackmd.io/_uploads/Hyn8XPP7yl.png)


## Testing

### General Testing Plan

The general test plan for the project includes the following testing strategies:

1. **Unit Testing**: Individual components will be tested in isolation as they are being developed to ensure they function as expected. Mock data will be used to simulate external dependencies where necessary.

2. **Integration Testing**: The interaction between different modules and components will be tested to verify their proper integration and ensure data flows correctly across the system with mock data. This testing will be implemented as two features that interact with each other is developed.

3. **Mock Data**: Mock data will be used during testing to simulate real-world inputs and edge cases, ensuring the application performs as expected under various scenarios.

4. **Regression Testing**: After each change to the main branch, existing features will be re-tested to ensure new modifications don’t negatively affect the system.

5. **End-to-End Testing**: Complete workflows will be tested from start to finish in the last weekend of the last Customer Demo to ensure the product functions as a whole in real-life usage scenarios.

6. **Performance Testing**: The system's and external API's responsiveness and stability will be evaluated under load to ensure scalability and reliability.

This strategy aims to ensure comprehensive coverage and quality assurance at all levels of the development cycle.

#### Backend
Unit tests are widely used for almost every endopoint we have implemented. For most of the endpoints, we write the unit test after the implementation of that endpoint, which is a very straightforward method. On the other hand, for a few endpoints we have tried to write the tests before the implementation, resulting in test driven implementation. Both methods have been helpful in testing and developing safe endpoints. 

The tests can be found under `./backend/core/tests`

![image](https://hackmd.io/_uploads/SJ3Fu_PmJl.png)


Integration tests are a crucial step in our testing strategy. While unit tests focus on individual components or functions, integration tests verify that multiple components work together as expected. For our endpoints, integration tests ensure seamless interaction between various modules of the backend and, where applicable, the database or external services.


UAT (User Acceptance Tests) are the final step for the testing phase for each endpoint. After the implementation and integration of each endpoint, we have tested if they serve their purpose as expected. We approach as a user to test the application if everything works as intended. 

#### Frontend

Unit tests are only effective in areas without dependencies on external systems. Since most frontend functionality is tightly coupled with either the server or browser APIs, we focused on testing vanilla TypeScript utilities, such as relative date calculations, number differences, pluralization, and similar isolated functions.

We have chosen Vitest as our testing framework because it is versatile and built on top of our module bundler, Vite. Its clear and intuitive API, combined with its seamless integration with our existing tools, makes it a great choice.

The tests can be found under `./client/src/tests`

![CleanShot 2024-11-27 at 19.42.02@2x](https://hackmd.io/_uploads/rJ5y36Nmkx.png)

#### Mobile

As stated in the frontend section; the unit tests are only effective in areas without dependencies on external systems and since most mobile functionality is tightly coupled with either the server or browser APIs, we focused on testing vanilla TypeScript utilities, namely a function combining the different types of hints fetched from the backend. 

The tests can be found under [`./mobile/app/tests`](https://github.com/bounswe/bounswe2024group11/tree/main/mobile/app/tests)

Here is a sample test result from the CLI using Vitest:

![Screenshot 2024-11-27 at 21.25.31](https://hackmd.io/_uploads/r1TEEJHmJl.png)


## Planning and Team Process

### Changes in Plan

We haven't made any significant changes to the team structures. However we tried to be more swift and more open to new ideas. We removed the hard distinction between server and client so that client side workers would contribute to API. For example the initial schemas for quiz and forum was developed by frontend (Ümit Can) and mobile (M. Emin Arayıcı) team members. This makes the needs for having a mock server for frontend development less.
    
From now on, we decide to split tasks among human resources based on the features (e.g., quiz or points) instead of subgroups like backend, client, or mobile. This changes the branch mechanism we use. Previously we have a main branch, a development branch, and subgroup branches (e.g., mobile/quiz-screens) opened from the development branch. Now, we have a main branch and feature branches (e.g., quiz) directly opened from the main branch. And all the subparts of a feature such as backend and frontend combined in these feature branches. This allows us to both speed the synchronization of the developments and also ensure the coherence of the features end-to-end. Actually, this makes our perspective more product oriented. Additionally, this improves the team communication.

We use Makefiles for deployment instead of building a CI/CD pipeline. Using Makefiles is easy for the team. Also, we don't want to have an automated deployment whenever there is a push to the main branch. But, we have much more unit tests now and it is a bit cumbersome to do and track them for each minor version. So we still want to have a CI/CD mechanism, but not for the deployment. We plan to automate testing and possibly linting etc. with a CI/CD pipeline.

Our deployment server was on Amazon Web Services (AWS) for the last milestone. However, their free-tier quotas are very limited and our application was dropping regularly. We switched to another Cloud Service Provider (CSP), which is Digital Ocean. They have much generous free products. Up to now, we have no issue with this new server.

Database data (JSON) will be included in version control to have control over the high-quality data that we will be adding during development. This data will be used in data seeder to populate the database with demo and testing data programmatically, streamlining test and demo preparation.
  
On the contrary, the Swagger documentation will not be added to version control from now on because we will be developing in a feature-based way and features will be developed on the same branch so that the frontend developer will have immediate access to swagger documentation on his/her local.

Dedicated time will be allocated for testing and debugging to ensure higher code quality before the milestones. Up to now, we dedicate these times theoretically, but in the practice, we don't do them.


### Plan for Completing The Project


#### Quiz
- **Feature Implementations**
  - Photo Upload: **Estimated Completion:** ~1 week
  - Pronunciation: **Estimated Completion:** ~1 week
  - Semantic Search: **Estimated Completion:** ~1 week
- **Fixes**
  - Backend API Field Adjustments: **Estimated Completion:** ~3 days
  - Frontend Styling: **Estimated Completion:** ~3 days
- **UI/UX Consistency Improvements**
  - Align Web & Mobile UI/UX: **Estimated Completion:** 4 days

#### Forum
- **Feature Implementations**
  - Photo Upload: **Estimated Completion:** ~1 week
  - Semantic Search: **Estimated Completion:** ~1 week
  - Trending Tags: **Estimated Completion:** ~3 days
- **Fixes**
  - Backend API Field Adjustments: **Estimated Completion:** ~3 days
  - Frontend Styling: **Estimated Completion:** ~3 days
- **UI/UX Consistency Improvements**
  - Align Web & Mobile UI/UX: **Estimated Completion:** ~4 days

#### Gamification
- **Feature Implementationss**
  - Badges: **Estimated Completion:** ~1 week
  - Leaderboard: **Estimated Completion:** ~3 days
  - Competing with other users (Duel): **Estimated Completion:** ~4 days
- **Bug Fixes**
  - Point Earning Logic: **Estimated Completion:** ~2 days
  - Difficulty Level Calculation for Quizzes: **Estimated Completion:** ~2 days

#### Profile
- **Feature Implementations**
  - User-to-User interactions: **Estimated Completion:** ~4 days
  - Self assets: **Estimated Completion:** ~3 days
  - Account management: **Estimated Completion:** ~2 days


#### Links for Plan
- [Project Plan](https://github.com/bounswe/bounswe2024group11/blob/main/Project_Plan.pod): You can access to ProjectLibre file of our project plan here.
- [Project Plan Documentation (Wiki)](https://github.com/bounswe/bounswe2024group11/wiki/Project-Plan): You can access to documentation file of our project plan in our wiki here.

## The Artifacts
- [Release Tag](https://github.com/bounswe/bounswe2024group11/releases/tag/customer-milestone-2): You can access to source code for mobile and the .apk file here.
- [Turquiz](http://138.68.97.90): Simply follow this link to our client/web service.
- [Turquiz API](http://138.68.97.90:8000/api/v1/swagger/): Swagger documentation where you can access information about our API and try it out.
- [Local Deployment Instructions](https://github.com/bounswe/bounswe2024group11/blob/main/README.md): This link directs to README file of our repository which contains docker deployment instructions. 

## Evaluations

### Customer & Product

#### Feedback on CM1 for CM2:

1. **More Engaging and Welcoming Quiz: ✅**  
    We have implemented a hint mechanism to make quizzes more engaging and user-friendly.

2. **A Well-Defined Quiz-Forum Relation and Separation: ✅**  
    To enhance engagement and unify features, we introduced a new functionality that allows users to reference quiz questions and options in forum posts. This prevents users from focusing solely on one aspect of the app, whether it’s the forum or the quiz. Quiz takers are encouraged to engage with the community when they make mistakes or need clarification, while forum users may


#### Feedback on CM2 for CM3:


1. **📝 Minor UX Improvements:** 
Implement features such as confirmation prompts before deleting a forum question to prevent accidental actions.  
3. **📝 Focus on Words:**
As the app is centered around words, expand this specialization by adding features like pronunciation guides, etymology information, and more.  
5. **📝 Customization:** 
Introduce customization options tailored to different user preferences and needs to enhance the overall user experience.  
7. **📝 User-focused copywriting**
No clear metric to identify the difficulty level of a word. Although we displayed a numerical value, it made little to no sense to users.  
10. **📝 Enhanced Quiz Functionality:**
Fix the UI for hint creation and demonstration to make it more intuitive and user-friendly. Randomize the answers in quizzes to eliminate patterns and improve the overall challenge. Currently, users must manually select the position of the correct answer (A, B, C, or D), which will be automated for better usability.


### Reflection

We believe we are on track with the development of features aligned with the requirements. Our development pace appears sufficient to address gamification and engagement-related needs.

However, we find that having five members on the backend team is somewhat excessive. At times, the frontend and mobile teams have felt overwhelmed.

For gamification, we have implemented an effective mechanism to identify the difficulty level of individual words. Additionally, we plan to introduce badges and a comprehensive leaderboard to enhance overall user engagement.

While some UX decisions will be refined and improved, the apps are performing well in terms of UX/UI overall.

To foster greater ownership of features, we will adopt a less rigid approach to domain-based roles (frontend, backend, mobile) and focus more on feature-based divisions. For instance, a few people will be fully responsible for all aspects of a feature, such as Quiz, from UX design to API contracts.

We used to spend too much time dealing with PRs and branches, but that is no longer the case, allowing us to develop more quickly now.

Instead of immediately implementing the first solution that comes to mind, we carefully consider our approach and adjust our steps to minimize technical debt.

We are aware that some endpoints are not perfectly established, but we won’t spend excessive time fixing minor issues. Instead, we are focusing on a higher-level perspective of the application moving forward.

### Tools

- **Jitsi:** Used for meetings; highly efficient and user-friendly. We will continue utilizing it.  
- **WhatsApp:** Used for instant messaging, announcements, and brainstorming.  
- **MSW:** Mock Service Worker was omitted on the client side since the API has now stabilized.  
- **Face-to-Face Meetings:** Increased the frequency of ad-hoc meetings to align on specific goals and features.  
- **Swagger:** Facilitates rapid alignment between backend and frontend on schema and API contracts.  
- **HackMD:** Used for writing reports and documentation.  
- **GitHub:** Leveraging the built-in editor for resolving conflicts efficiently.  


## Individual Contributions

1. [Muhammed Emin Arayıcı](https://github.com/bounswe/bounswe2024group11/wiki/Individual-Contribution-(Muhammed-Emin-ARAYICI))
2. [Mücahit Erdoğan Ünlü](https://github.com/bounswe/bounswe2024group11/wiki/Individual-Contribution-for-MS2-(M%C3%BCcahit-Erdo%C4%9Fan-%C3%9Cnl%C3%BC))
3. [Muhammet Emin Çiftçi](https://github.com/bounswe/bounswe2024group11/wiki/Individual-Contributions-%E2%80%90-Muhammet-Emin-%C3%87ift%C3%A7i)
4. [Ozan Oytun Karakaya](https://github.com/bounswe/bounswe2024group11/wiki/Ozan-Oytun-Karakaya-%E2%80%90-Individual-Contributions-Customer-Milestone-2)
5. [Ceydanur Şen](https://github.com/bounswe/bounswe2024group11/wiki/Individual-Contribution-(Ceydanur-%C5%9Een))
6. [Yunus Kağan Aydın](https://github.com/bounswe/bounswe2024group11/wiki/Individual-Contributions-%E2%80%90-Yunus-Ka%C4%9Fan-Ayd%C4%B1n)
7. [Hasan Kerem Şeker](https://github.com/bounswe/bounswe2024group11/wiki/Individual-Contributions-%E2%80%90-Hasan-Kerem-%C5%9Eeker)
8. [Ümit Can Evleksiz](https://github.com/bounswe/bounswe2024group11/wiki/Individual-Contributions-%E2%80%90-%C3%9Cmit-Can-Evleksiz)
9. [Arda Vural](https://github.com/bounswe/bounswe2024group11/wiki/Individual-Contributions-%E2%80%90-Arda-Vural/)

