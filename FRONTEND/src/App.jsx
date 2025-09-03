import React, { Children } from "react";
import "./App.css";
import Layout from "./components/Layout";
import LayoutAI from "./components/LayoutAI.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WriteArticle from "./pages/WriteArticle.jsx";
import BlogTitles from "./pages/BlogTitles.jsx";
import GenerateImages from "./pages/GenerateImages.jsx";
import RemoveBackground from "./pages/RemoveBackground.jsx";
import RemoveObject from "./pages/RemoveObject.jsx";
import ReviewResume from "./pages/ReviewResume.jsx";
import Community from "./pages/Community.jsx";
import Hero from "./components/Hero.jsx";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
    };

    fetchToken();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/ai",
          element: <LayoutAI />,
          children: [
            {
              index: true,
              // element : <h1>dashboard</h1>
              element: <Dashboard />,
            },
            {
              path: "write-article",
              element: <WriteArticle />,
            },
            {
              path: "blog-titles",
              element: <BlogTitles />,
            },
            {
              path: "generate-images",
              element: <GenerateImages />,
            },
            {
              path: "remove-background",
              element: <RemoveBackground />,
            },
            {
              path: "remove-object",
              element: <RemoveObject />,
            },
            {
              path: "review-resume",
              element: <ReviewResume />,
            },
            {
              path: "community",
              element: <Community />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <Toaster/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
