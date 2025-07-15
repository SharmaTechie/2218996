
---

## Folder Details

### 1. `logging-middleware/`

**Purpose:**  
A reusable logging middleware package, designed to be used in both the backend and frontend applications. It provides consistent logging of requests and actions for debugging and monitoring.

**Contents:**
- `logger.js`: The main logger implementation.
- `package.json`: Package configuration for the middleware.

**Usage:**
- Install dependencies: `npm install`
- Build (if TypeScript): `npm run build`
- Link or install this package in both backend and frontend as a local dependency.

---

### 2. `backend-test-submission/`

**Purpose:**  
The backend microservice built with Node.js and Express. It handles URL shortening, redirection, and analytics.

**Contents:**
- `controllers/`: Contains controller logic (e.g., `urlController.js` for URL operations).
- `routes/`: Defines API routes (e.g., `urlRoutes.js`).
- `utils/`: Utility functions (e.g., `shortCodeGenerator.js` for generating short URLs).
- `server.js`: Entry point for the backend server.
- `package.json`: Backend dependencies and scripts.

**Setup:**
1. Install dependencies:
    ```
    npm install
    ```
2. Create a `.env` file with your logging token:
    ```
    LOG_TOKEN=your_affordmed_access_token
    ```
3. Start the backend:
    ```
    node server.js
    ```
    or (if using TypeScript)
    ```
    npx ts-node src/index.ts
    ```

---

### 3. `frontend-test-submission/`

**Purpose:**  
A React application (using Material UI) that provides the user interface for shortening URLs and viewing analytics.

**Contents:**
- `src/pages/ShortenerPage.jsx`: Page for creating short URLs.
- `src/pages/StatsPage.jsx`: Page for viewing analytics.
- `src/App.js`, `src/index.js`: Main React entry points.
- `public/`: Static assets and HTML template.
- `package.json`: Frontend dependencies and scripts.

**Setup:**
1. Install dependencies:
    ```
    npm install
    ```
2. Create a `.env` file with the backend URL:
    ```
    REACT_APP_BACKEND_URL=http://localhost:4000
    ```
3. Start the frontend:
    ```
    npm start
    ```

---

## Additional Notes

- **.env Files:**  
  Do not commit `.env` files or secrets to version control. Each app (backend, frontend) requires its own `.env` file as described above.

- **Logging:**  
  The logging middleware should be used in both backend and frontend to ensure consistent logging.

- **No Authentication:**  
  Backend endpoints should not require authentication, as per project requirements.

---
