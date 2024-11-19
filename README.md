# React-Assignment

# Next.js Hotel Application

This project converts an initial HTML and CSS project into a server-side, component-based application using **React** and **Next.js**. It integrates dynamic content by leveraging an API from a **Node.js** and **Express.js** backend. The application ensures scalability, maintainability, and robustness through the use of **TypeScript** and comprehensive unit testing.

## Features

- **API Integration**: Fetch hotel data dynamically using an API endpoint.
- **Server-Side Rendering (SSR)**: SEO-friendly page rendering with fresh data retrieval on every request.
- **Dynamic Routing**: Supports routes like `/hotel-details/{slug}/{hotel-id}` for hotel detail pages.
- **Type Safety**: Full use of TypeScript across the project.
- **Component-Based Architecture**: Reusable React components with modular CSS.
- **Error Handling**: Robust error handling with meaningful messages and a custom 404 page.
- **Testing**: Unit tests for critical components and functionality using Jest and React Testing Library.

## API Integration

### Endpoint
- **URL**: `GET /hotel-details/{slug}/{hotel-id}`
- **Description**: Fetch hotel details using the provided `slug & hotel-id`.

### Integration
- The API is called from the Next.js frontend to dynamically retrieve and display hotel data based on the URL.

---

## Dynamic Hotel Details Page

### URL Structure
- **Page URL**: `/hotel-details/{slug}/{hotel-id}`
- **Example**: `http://localhost:8080/hotel-details/radisson-blu/76512`

### Implementation Details
1. **Dynamic Routing**: Captures `slug` and `hotel-id` from the URL using Next.js dynamic routing.
2. **Server-Side Rendering (SSR)**: Uses `getServerSideProps` to fetch fresh data for every request.
3. **Styling**: Utilizes reusable React components with CSS Modules for modular styling.

---

## Technologies Used
- **Frontend**: React, Next.js
- **Backend**: Node.js, Express.js API
- **Styling**: CSS Modules, Tailwind CSS
- **Testing**: Jest, React Testing Library
- **Type Safety**: TypeScript

---

## Setup and Run Instructions

### Prerequisites
- Node.js version 16 or above must be installed on system.

### Steps
1. Clone the repository:
  
   `git clone https://github.com/siddiqua14/React-Assignment.git`
   `cd client`  
2. Install dependencies:
    `npm install`
    Set up the environment variables:

3. Create a .env.local file in the root directory and define the required environment variables (e.g., API base URL).
4. Start the development server:
    `npm run dev`
5. Access the application:

Open http://localhost:3000 in browser.
 
markdown
Copy code
## Testing

### Run Unit Tests
To run unit tests with Jest and React Testing Library, use the following command:
`npm test`
### Code Coverage

Ensure the codebase achieves at least 70% test coverage. 
`npx jest --coverage`