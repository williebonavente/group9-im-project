import "./index.css";
import { Route, Routes } from "react-router-dom";
import Task from "./routes/Task";
import Index from "./routes/Index";
import Navbar from "./components/Navbar";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import PrivateRoutes from "./utils/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Index />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
