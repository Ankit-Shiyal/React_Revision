# Blog Management System

A full-stack Blog Management System built with React and a Node.js/Express backend. Users can register, log in, create blogs, view blog posts, update their own blogs, and delete their own blogs.

## Live Demo

🚀 **Live Project:** (https://react-revision-5hzd.vercel.app/)

Click the link above to explore the live application.

## Features

- User Registration and Login
- JWT-Based Authentication
- Public Blog Listing
- View Individual Blog Details
- Create Blogs with Image Upload
- Edit and Delete Own Blogs
- My Blogs Page
- Search Blogs by Title
- Filter Blogs by Category
- Responsive User Interface
- Form Validation using Formik and Yup
- Image Upload using Multer and Cloudinary
- Protected Routes
- Authentication using Context API
- API Integration using Axios

## Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- React Router DOM
- Axios
- Bootstrap
- React Bootstrap
- Formik
- Yup
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary
- Joi Validation
- REST API

## Blog Categories

- Technology
- Sports
- Politics

## Project Structure

    src/
    ├── api/
    │   ├── authApi.js
    │   └── blogApi.js
    │
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Navbar.css
    │   └── ProtectedRoute.jsx
    │
    ├── context/
    │   └── AuthContext.jsx
    │
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
    │
    ├── App.jsx
    └── main.jsx


### User Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /user/addUser | Register User |
| POST | /user/userLogin | User Login |
| POST | /user/authLogin | Verify Authentication |
| GET | /user/logoutUser | User Logout |

### Blog Management APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | /blog/allBlog | Get All Blogs |
| POST | /blog/add | Create Blog |
| PATCH | /blog/update/:id | Update Blog |
| DELETE | /blog/delete/:id | Delete Blog |

## Authentication and Authorization

The application uses JWT (JSON Web Token) authentication.

- Users can register and log in.
- JWT tokens are stored in localStorage.
- Authentication state is managed using React Context API.
- Protected routes prevent unauthorized access.
- Add Blog, Edit Blog, and My Blogs pages require authentication.
- Authorization headers are sent with protected API requests.

Example Authorization Header:

    Authorization: Bearer <token>

## Image Upload

The application supports image uploads using Multer and Cloudinary.

Image field names:

| Field Name | Purpose |
|---|---|
| Profile_Pic | User Profile Image |
| BlogImg | Blog Image |

Images are uploaded to Cloudinary through the backend API.

## Blog Management

Users can perform the following operations:

- Create new blog posts.
- View all available blog posts.
- View individual blog details.
- Update their own blog posts.
- Delete their own blog posts.
- Search blogs by title.
- Filter blogs by category.
- View their created blogs on the My Blogs page.

## Backend Requirements

The backend should:

- Enable public access to GET /blog/allBlog if public blog listing is required.
- Require authentication for blog creation, updating, and deletion.
- Verify blog ownership before updating or deleting a blog.
- Return author information in blog API responses.
- Validate uploaded images.
- Handle updates when no new image is uploaded.
- Ensure registration role validation matches the User model.

For My Blogs and ownership checks, the blog API response should include the author's email.

Example Mongoose Population:

    .populate("Author", "Name Email -_id")

Important: The backend must independently verify blog ownership. Frontend checks alone do not provide security.

## Available Scripts

| Command | Description |
|---|---|
| npm run dev | Start development server |
| npm run build | Create production build |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |

## Deployment

The frontend can be deployed using:

- Vercel
- Netlify

Before deployment:

1. Configure the correct backend URL.
2. Add the VITE_BASE_URL environment variable.
3. Build the application using npm run build.
4. Deploy the generated production build.

The backend must be deployed and configured separately.

## Security Notes

- Never expose JWT secrets in frontend code.
- Never commit database credentials.
- Never expose Cloudinary API secrets.
- Keep private API keys in backend environment variables.
- Always verify user permissions on the backend.

## Future Improvements

- Pagination for blog listings.
- Like and Comment Functionality.
- User Profile Management.
- Blog Bookmarks.
- Rich Text Editor.
- Admin Dashboard.

## Author

**Ankit Shiyal**
