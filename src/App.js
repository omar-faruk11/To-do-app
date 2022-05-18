import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./Components/RequireAuth";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home/>
          </RequireAuth>
        }/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path="forgotPassword" element={<ForgotPassword/>}/>
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
