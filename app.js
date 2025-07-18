import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { AllDataContext, AllDataProvider } from "./utils/AllDataContext";

import Login from "./src/components/Login";
import Signup from "./src/components/Signup";
import NavBar from "./src/components/Header/NavBar";
import Recipe from "./src/components/Recipe/Recipe";
import { AuthProvider } from "./utils/AuthProvider";
import Homepage from "./src/components/Homepage/Homepage";
import Activity from "./src/components/ActivityFeed/Activity";
import Profile from "./src/components/Profile/Profile";
import { ProfileData } from "./utils/ProfileData";
import CreateRecipe from "./src/components/CreateRecipe/CreateRecipe";
import { PrivateRoute } from "./utils/PrivateRoute";
import { FollowersProvider } from "./utils/FollowersProvider";
import FollowersPage from "./src/components/Profile/FollowersPage";
import FollowingPage from "./src/components/Profile/FollowingPage";
import { FollowingProvider } from "./utils/FollowingProvider";
import EditProfile from "./src/components/Profile/EditProfile";
import LearningReact from "./src/components/Temp/useRef";
import { FavoriteProvider } from "./utils/FavoriteProvider";
import FavoritesPage from "./src/components/Profile/FavoritesPage";
import AdminDashboard from "./src/components/Admin/AdminDashboard";
import { AdminProvider } from "./utils/Admin/AdminProvider";
import MyCollectionsPage from "./src/components/Collections/MyCollectionsPage";
import ResetPassword from "./src/components/ResetPassword";
import ForgotPassword from "./src/components/ForgotPassword";
import PublicProfile from "./src/components/Profile/PublicProfile";

const AppLayout = () => {
  return (
    <>
      <div className="bg-yellow-300 min-h-screen flex flex-col">
        <AuthProvider>
          <AllDataProvider>
            <div className="relative ">
              <NavBar />
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
        path: "/recipe/:id",
        element: <Recipe />,
      },
      {
        path: "/feed",
        element: <Activity />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfileData>
              <Profile />
            </ProfileData>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <PrivateRoute>
            <ProfileData>
              <EditProfile />
            </ProfileData>
          </PrivateRoute>
        ),
      },
      {
        path: "/followers",
        element: (
          <PrivateRoute>
            <FollowersProvider>
              <FollowersPage />
            </FollowersProvider>
          </PrivateRoute>
        ),
      },

      {
        path: "/followings",
        element: (
          <PrivateRoute>
            <FollowingProvider>
              <FollowingPage />
            </FollowingProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
            <FavoriteProvider>
              <FavoritesPage />
            </FavoriteProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "/create-recipe",
        element: <CreateRecipe />,
      },

      {
        path: "/admin",
        element: (
          <AdminProvider>
            <AdminDashboard />
          </AdminProvider>
        ),
      },

      {
        path: "/collections",
        element: (
          <PrivateRoute>
            <MyCollectionsPage />
          </PrivateRoute>
        ),
      },
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
    path : '/public-profile/:id',
    element: <PublicProfile/>
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/reset-password/:resetToken", // Add :resetToken to the path
    element: <ResetPassword />,
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
