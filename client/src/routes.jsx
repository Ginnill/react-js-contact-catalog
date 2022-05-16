import { Routes, Route } from "react-router-dom";
// get pages
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";

const SiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<h1>Página não encontrada.</h1>} />
    </Routes>
  );
};

export default SiteRoutes;
