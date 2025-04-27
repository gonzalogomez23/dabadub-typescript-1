import {Navigate, createBrowserRouter} from "react-router-dom";
import Home from "@views/Home";
import Posts from "@views/Posts/Posts";
import BlogLayout from "@views/Posts/BlogLayout";
import Login from "@views/Login";
import Users from "@views/Users/Users";
import Signup from "@views/Signup";
import NotFound from "@views/NotFound";
import DefaultLayout from "@layout/DefaultLayout";
import LoginLayout from "@layout/LoginLayout";
import Dashboard from "@views/Dashboard";
import UserForm from "@views/Users/UserForm";
// import PostForm from"/src/views/Posts/PostForm";
// import PostFormNew from"/src/views/Posts/PostFormNew";
import Post from "@views/Posts/Post";
import CreateUpdatePost from "@views/Posts/CreateUpdatePost";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/posts" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                element: <BlogLayout />,
                children: [
                    { 
                        path: '/posts/:category?',
                        element: <Posts />
                    },
                    { 
                        path: '/post/:slug',
                        element: <Post />
                    },
                ]
            },
            {
                path: '/new-post',
                element: <CreateUpdatePost key="postCreate"/>
            },
            {
                path: '/update-post/:slug',
                element: <CreateUpdatePost key="postUpdate"/>
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>
            },
        ]
    },
    {
        path: '/',
        element: <LoginLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    
    {
        path: '/*',
        element: <NotFound />
    },
]);

export default router;