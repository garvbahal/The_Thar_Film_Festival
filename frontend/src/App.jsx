import { Navigate, Route, Routes } from "react-router-dom";
// import AppLayout from './layouts/AppLayout.jsx'
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ParticipantDashboardPage from "./pages/ParticipantDashboardPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

export default function App() {
    return (
        <div className="min-h-screen bg-festival-bg text-zinc-100">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/participant"
                    element={
                        <ProtectedRoute role={["leader", "member"]}>
                            <ParticipantDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}
