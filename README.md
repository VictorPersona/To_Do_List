# To Do List Application

This is a full-stack To Do List application built with React, Vite, Tailwind CSS, Express, and MongoDB. The application allows users to create, update, delete, and manage their tasks efficiently.

## Features

- **Frontend**: Built with React and styled using Tailwind CSS.
- **Backend**: Powered by Express.js and MongoDB for data storage.
- **Task Management**: Add, edit, toggle completion, and delete tasks.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Local Storage**: Caches tasks locally for offline access.

## Project Structure

### Client
The frontend is located in the `client` directory and includes:
- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **Tailwind CSS**: For styling.

### Server
The backend is located in the `server` directory and includes:
- **Express.js**: For handling API requests.
- **MongoDB**: For storing tasks.
- **Mongoose**: For MongoDB object modeling.

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB instance running locally or in the cloud.

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/To_Do_List.git
    cd To_Do_List
    ```

2. Set up the server:
    ```bash
    cd server
    npm install
    cp .env.example .env
    # Update `.env` with your MongoDB URI and other configurations
    npm run dev
    ```

3. Set up the client:
    ```bash
    cd ../client
    npm install
    cp .env.example .env
    # Update `.env` with your backend URL
    npm run dev
    ```

4. Open the application in your browser:
    ```
    http://localhost:5173
    ```

## API Endpoints

### Base URL
`http://localhost:5000`

### Routes
- `GET /tasks`: Retrieve all tasks.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update an existing task.
- `DELETE /tasks/:id`: Delete a task.

## Scripts

### Client
- `npm run dev`: Start the development server.
- `npm run build`: Build the production-ready app.
- `npm run preview`: Preview the production build.

### Server
- `npm run dev`: Start the server in development mode.
- `npm start`: Start the server in production mode.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Express.js, MongoDB, Mongoose
- **Other Tools**: Axios, ESLint, Nodemon

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

Feel free to contribute to this project by submitting issues or pull requests!