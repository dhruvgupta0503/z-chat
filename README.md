ChatBox Application
ChatBox is a real-time chat application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to sign up, log in, send and receive friend requests, and chat with their friends.

Table of Contents
Features
Installation
Usage
API Endpoints
Technologies Used
Folder Structure
Contributing
License
Features
User Registration and Authentication
Real-time Messaging
Friend Requests Management
Notifications for Friend Requests
Profile Management
Responsive Design
Installation
Prerequisites
Make sure you have the following installed on your machine:

Node.js
MongoDB
npm (Node Package Manager) or yarn
Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/chatbox.git
cd chatbox
Install dependencies:

bash
Copy code
cd server
npm install
Create a .env file in the server directory and add your environment variables:

makefile
Copy code
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Start the backend server:

bash
Copy code
npm start
Frontend Setup
Navigate to the client directory:

bash
Copy code
cd ../client
Install dependencies:

bash
Copy code
npm install
Start the frontend development server:

bash
Copy code
npm start
Usage
Open your browser and navigate to http://localhost:3000.
Register a new user or log in with existing credentials.
Add friends by searching for users and sending friend requests.
Chat with your friends in real-time.
API Endpoints
User Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Log in a user.
POST /api/auth/logout: Log out the current user.
GET /api/auth/me: Get the current user's profile.
Friend Requests
POST /api/friends/request: Send a friend request.
POST /api/friends/accept: Accept or reject a friend request.
GET /api/friends/requests: Get friend requests.
Chats
GET /api/chats: Get all chats for the current user.
POST /api/chats: Create a new chat.
Technologies Used
Frontend:

React
Redux (for state management)
Axios (for API requests)
Socket.io (for real-time communication)
Backend:

Node.js
Express.js
MongoDB
Mongoose (for MongoDB object modeling)
JWT (for authentication)
Socket.io (for real-time communication)
Folder Structure
arduino
Copy code
chatbox/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
├── server/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── ...
└── README.md
Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements, bug fixes, or new features.

Fork the Project
Create your Feature Branch (git checkout -b feature/YourFeature)
Commit your Changes (git commit -m 'Add some YourFeature')
Push to the Branch (git push origin feature/YourFeature)
Open a Pull Request
License
This project is licensed under the MIT License. See the LICENSE file for details.
