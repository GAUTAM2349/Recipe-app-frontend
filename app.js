import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";

import { AllDataContext, AllDataProvider } from "./utils/AllDataContext";


import Login from "./src/components/Login";
import Signup from './src/components/Signup';
import NavBar from "./src/components/Header/NavBar";
import Recipe from "./src/components/Recipe/Recipe";
import { AuthProvider } from "./utils/AuthProvider";
import Homepage from "./src/components/Homepage/Homepage";
import Activity from "./src/components/ActivityFeed/Activity";
import Profile from "./src/components/Profile/Profile";
import { ProfileData } from "./utils/ProfileData";
import CreateRecipe from "./src/components/CreateRecipe/CreateRecipe";




const AppLayout = () => {

  
  
  return (
    <>
    <div className="bg-yellow-300 min-h-screen flex flex-col" >
    <AuthProvider>
    <AllDataProvider>
    <div className="relative ">
        
        
          <NavBar/>
          <Outlet />
        
      </div>
    </AllDataProvider>
    </AuthProvider>
    </div>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // includes NavBar, Auth
    children: [
      {
        path: "/",
        element: <Homepage />, // ← always shows sidebar
      },
      {
        path : "/recipe/:id",
        element: <Recipe/>
      },
      {
        path : "/feed",
        element : <Activity/>
      },
      {
        path : "/profile",
        element : <ProfileData><Profile/></ProfileData>,
      },

      {
        path : "/create-recipe",
        element : <CreateRecipe/>
      }
      
    ],
  },

  /* public routes */
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
  path: "*",
  element: <Navigate to="/" replace />
}
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <RouterProvider router={appRouter} />
  
);   
