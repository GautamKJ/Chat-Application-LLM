Here's a template for a README file that includes setup and run instructions, API route descriptions, and necessary environment configurations:



# Project Name

Description of the project.

## Setup and Run Instructions

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/GautamKJ/Chat-Application-LLM>
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory of the project and add the necessary environment variables. For example:
   ```
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/mydatabase
   JWT_SECRET=your-secret-key
   ```

4. **Run the server:**
   ```bash
   node index.js
   ```

## API Routes

### `/api/user/register` (POST)
Register a new user.

**Input:**
- `email` (string): User's email address.
- `password` (string): User's password.
- `status` (boolean): User's status (e.g., true for available, false for busy).

**Output:**
- `success` (boolean): Indicates whether the registration was successful.

### `/api/user/login` (POST)
Login an existing user.

**Input:**
- `email` (string): User's email address.
- `password` (string): User's password.

**Output:**
- `success` (boolean): Indicates whether the login was successful.
- `token` (string): user._id for getting user_data.

  ### '/api/user/users` (GET)
  Get all users
  
**Output:**
- `User` (array): Array of Users objects
  

### `/api` (POST)
Create_ChatRoom

**Input:**
- `senderId` (string): Sender ID
- `receiverId` (string): receiver ID.

**Output:**

- response of created chatRoom.

### `/api/find/firstID/secondID (GET)
Find chat ID between two users

**Input:**
- `senderId` (string): Sender ID
- `receiverId` (string): receiver ID.

 **Output**
 - ChatRoom data


### `/api/message` (POST)
Add a new message to a chat.

**Input:**
- `chatId` (string): ID of the chat.
- `senderId` (string): ID of the message sender.
- `text` (string): Message text.

**Output:**
- `message` (object): Details of the added message.

### `/api/message/:chatId` (GET)
Get all messages for a specific chat.

**Input:**
- `chatId` (string): ID of the chat.

**Output:**
- `messages` (array): Array of message objects.

## Environment Configurations

- `DATABASE_URL`: URL of the MongoDB database.
- `JWT_SECRET`: Secret key for JWT token generation.
