import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./context/authContext";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";

export default function App(){
  const { authUser } = useAuthContext();
  

  return(<>
     <Routes>
      <Route index path="/" element={<Landing />} />
      <Route path="/home" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
      <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={'/home'} />} />
      <Route path="/login" element={!authUser ? <Login /> : <Navigate to={'/home'} />} />
     </Routes>
     <Toaster />
    </>
  )
}