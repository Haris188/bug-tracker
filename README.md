A system that helps you manage and track bugs in software\
App: https://lfa.netlify.app \
UI: https://github.com/Haris188/bug-tracker-ui
## Quick Start
Clone the repository and then you can
```
npm install && npm run dev
```
## Architecture
BugTracker follows a strict architecture that is flexible and extendable in nature. The main idea is that everything in the app depends on the business rules themselves hence makes everything replaceable. The following diagram demonstrates the architecture.
![Architecture](https://user-images.githubusercontent.com/40364018/116463939-50f88a80-a839-11eb-86a9-f54330bbf202.png)

### Server Architecture
Server architecture includes the following components

1. Interface Boundary
2. Interactors
3. Entities
4. FileStore
5. AuthenticationLib
6. DataStore

Note that everything has a dependecy flow on Entities and Entities are the business rules. Everything else is replacable

### Interface Boudary
With the help of ExpressJS, we have established an interface boundary, which is nothing but simple REST API endpoint.
### Interactors
Interactors are the dispatchers for a job to be done, e.g signup, signin. They use the entities to perform a task and return the result.
### Entities
Entites are the components that deals with the logic of business rules. For example Attachment entity deals with the actions performed on an attachment e.g `upload()`
#### FileStore, DataStore and AuthenticationLib
These components provide an interface of the app to the 3rd party libraries or frameworks. This is because we do not want to be dependent on 3rd party libraries. This configration allows you to change from MongoDB to MySQL by just implementing the interfaces.
## User
**The most important entity is User**. User is an interface that can be implemented. As per requirements there are different users allocated on a project and each one has different privilege and boundaries. To make sure their logic do not cross path and to preserve them from being entangled to each other, we have separated the users using interface. Now if you want to add a new user type, e.g Janitor, you can implement the User interface and it magically works!
## Client Architecture
Client has a relatively simple architecture. It includes

1. Controllers
2. Presenters
3. Container
4. Views

### Controllers
Controllers causes side effects on the server and intrigue server to return a response.
### Presenters
Presenters performs data requests to the server and the format the data delivered by the server for Views
### Container
Container is the logical component. It only contains the logic that a View needs. e.g form validation.
### View
View is dumb. It does not have any logic and it only has the JSX code for React. It uses Container for its logic.
