import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import RequireAuth from "./components/RequireAuth";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <main>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="admin/login" element={<AdminLogin />} />
      </Routes>
    </main>
  );
}

export default App;
