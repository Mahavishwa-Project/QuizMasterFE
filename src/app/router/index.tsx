import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthCallback from "@/app/router/auth/AuthCallback";
import { LoginPage } from "@/pages/user/LoginPage";
import { Dashboard } from "@/pages/user/Dashboard";
import { ProtectedRoute } from "@/app/router/ProtectedRoute";

const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    { path: "/auth/callback", element: <AuthCallback /> },
    { 
        path: "/dashboard", 
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ) 
    }
]);

export const AppRouter = () => <RouterProvider router={router} />;

