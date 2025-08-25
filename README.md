🚀 Tech Stack
-  Frontend: Next.js (TypeScript, App Router)
-  Backend: Express.js (TypeScript, Node.js)
-  Database: PostgreSQL, AWS Aurora
-  Deployment: Backend -> AWS EC2 (Ubuntu, Node.js, PM2, Nginx) Frontend -> Vercel

📌 Features
-  Homepage showing all events happening
-  Create new events (Only logged-in users can create events)
-  Register for any event (No need to log in)
-  Search functionality (by name and location), used debouncing and caching to optimise search results
-  Filter events based on date (cached on search)
-  Clean separation: frontend <---> backend <---> database

⚡ API Endpoints 

-  Authentication
    -  SignUp -> https://api.volunteeryatraa.online/api/signup    
    -  Login -> https://api.volunteeryatraa.online/api/login
-  Events
    -  Get all events -> GET -> https://api.volunteeryatraa.online/api/events      
    -  Filter Events -> GET -> https://api.volunteeryatraa.online/api/events/search      
    -  Get Event By Id -> GET -> https://api.volunteeryatraa.online/events/:id      
    -  Create Event -> POST -> https://api.volunteeryatraa.online/events      
    -  Edit Event -> PUT -> https://api.volunteeryatraa.online/events/:id      
    -  Delete Event -> DELETE -> https://api.volunteeryatraa.online/events/:id
-  User
    -  Register for Event -> POST -> https://api.volunteeryatraa.online/api/events/:id/users
    -  Get registered users for event -> GET -> https://api.volunteeryatraa.online/api/events/:id/users
    -  Cancel user registration -> DELETE -> https://api.volunteeryatraa.online/api/users/:id
 
DEPLOYMENT
-  The backend is deployed on an AWS EC2 instance with PM2 + Nginx reverse proxy
-  The frontend is deployed on Vercel

