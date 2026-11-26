Blog Management System
A full-stack Blog Management System built with React and a
Node.js/Express backend. Users can register, log in, create blogs, view
blog posts, update their own blogs, and delete their own blogs.
Features
- User registration and login
- JWT-based authentication
- Public blog listing (when the backend GET /blog/allBlog route is
  configured as public)
- View individual blog details
- Create a blog with an image
- Edit and delete blogs
- My Blogs page to view blogs created by the logged-in user
- Search blogs by title
- Filter blogs by category
- Responsive interface using React Bootstrap
- Form validation using Formik and Yup
- Image uploads using the backend's Multer/Cloudinary integration
Technology Stack
Frontend
- React
- Vite
- React Router DOM
- Axios
- Bootstrap
- React Bootstrap
- Formik
- Yup
- JavaScript
Backend
The frontend is designed to work with the existing Blog Management API:
- Node.js
- Express.js
- MongoDB and Mongoose
- JWT authentication
- Multer and Cloudinary for image uploads
- Joi validation
Blog Categories
- Technology
- Sports
- Politics
Project Structure
src/
├── api/
│   ├── authApi.js
│   └── blogApi.js
├── components/
│   ├── Navbar.jsx
│   ├── Navbar.css
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Home.css
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── AddBlog.jsx
│   ├── EditBlog.jsx
│   ├── BlogDetails.jsx
│   ├── MyBlogs.jsx
│   └── MyBlogs.css
├── App.jsx
└── main.jsx
Installation
1. Clone the repository
git clone <your-frontend-repository-url>
cd <your-project-folder>
2. Install dependencies
npm install
If any of these packages are missing, install them:
npm install axios bootstrap react-bootstrap react-router-dom formik yup
3. Configure environment variables
Create a .env file in the frontend project root:
VITE_BASE_URL=https://your-backend-url
Replace the value with your deployed backend URL. Do not add a trailing
slash.
4. Start the development server
npm run dev
5. Create a production build
npm run build
API Endpoints Used
The frontend uses the following backend endpoints:

  Method   Endpoint             Purpose
  POST     /user/addUser      Register a user
POST     /user/userLogin    Log in
POST     /user/authLogin    Verify the logged-in user
GET      /user/logoutUser   Log out
GET      /blog/allBlog      Get all blogs
POST     /blog/add          Create a blog
PATCH    /blog/update/:id   Update a blog
DELETE   /blog/delete/:id   Delete a blog

Protected endpoints require this request header:
Authorization: Bearer <token>
Image upload field names must match the backend:
- User profile image: Profile_Pic
- Blog image: BlogImg
Authentication and Access
- The authentication context stores the logged-in user state.
- The JWT token is stored in localStorage.
- Protected pages such as Add Blog, Edit Blog, and My Blogs require
  login.
- The Home page can show blogs without login only if the backend's
  GET /blog/allBlog route is public.
- The frontend displays Edit and Delete actions for the blog owner.
  The backend must independently verify ownership (or admin
  permissions) before updating or deleting a blog. Frontend checks
  alone are not security.
Important Backend Notes
For the My Blogs and owner checks, the blog API response must include
the author's email. For example:
.populate("Author", "Name Email -_id")
The backend should also:
- Keep authentication enabled for create, update, and delete
  endpoints.
- Verify that the authenticated user owns the blog or has an
  authorized admin role before update/delete.
- Validate uploaded files and handle cases where no new image is
  supplied during an update.
- Ensure registration role validation matches the User model's allowed
  roles.
Available Scripts
  Command             Description
  npm run dev       Start the Vite development server
npm run build     Build the frontend for production
npm run preview   Preview the production build
npm run lint      Run ESLint
Notes
- This repository contains the frontend application. The backend must
  be running and configured separately.
- Set VITE_BASE_URL to the correct backend URL before running the
  application.
- Never commit private API keys, database credentials, JWT secrets, or
  Cloudinary credentials to the frontend repository.




















    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
