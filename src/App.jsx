import React, { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import VerifyEmail from "./Auth/VerifyEmail";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RequireAuth from "./Auth/RequireAuth";
import HomePage from "./Component/HomePage";
import HeroSection from "./Component/HeroSection"; 
import Onboarding from "./Onboarding";
import AIAssistant from "./Component/AIAssistant";
import MainComponent from "./Component/MainComponent";
import Contactas from "./Component/Contactas";
import AddServices from "./Allcomponent/AddServices";
import Users from "./Admin/Users";
import Dashboard from "./Admin/Dashboard";
import DashboardLayout from "./Admin/DashboardLayout";
import Providers from "./Admin/Providers";
import SendNotification from "./Notification/SendNotification";
import 'react-toastify/dist/ReactToastify.css';
 import Comment from "./Admin/Comment";
import Home from "./Admin/Home";
import LoginPage from "./Admin/Login";
import ServicesDetails from "./Component/ServicesDetails";
import ConfirmBooking from "./Component/ConfirmBooking";
import FinancialContent from "./Admin/FinancialContent";
import { Toaster } from "react-hot-toast";
import Logout from "./Admin/Logout";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Profile from "./Auth/Profile";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Services from "./Component/Services";
import GoogleCallback from "./Auth/GoogleCallback";
import ERR404 from "./Component/404";
export default function App() {
  const [mode, setMode] = useState("light");
  const [identifier, setIdentifier] = useState("");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: "#b97681",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#ffffff",
            paper: mode === "dark" ? "#1e1e1e" : "#F3D5D5",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor:
                  mode === "dark" ? "#121212 !important" : "#ffffff !important",
                margin: 0,
                padding: 0,
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage mode={mode} setMode={setMode} />}>
          <Route
            index
            element={
              <>
                <HeroSection />
                <MainComponent />
              </>
            }
          />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register/:type" element={<SignUp />} />          
          <Route 
            path="forgot-password" 
            element={<ForgotPassword switchToReset={(val) => setIdentifier(val)} />} 
          />
                    <Route 
            path="reset-password" 
            element={<ResetPassword identifier={identifier} switchToLogin={() => window.location.href = '/login'} />} 
          />
          
          <Route path="logout" element={<Logout />} /> 
          <Route path="contact" element={<Contactas />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/services" element={<Services />} />
          <Route path="/google-callback" element={<GoogleCallback />} />
          <Route path="/ServicesDetails" element={<ServicesDetails />} />
          <Route path="/ConfirmBooking" element={<ConfirmBooking />} />
          <Route path="/AddServices" element={<AddServices />} />
          <Route path="/AIAssistant" element={<AIAssistant />} />
         <Route path="/SendNotification" element={<SendNotification />} />
          <Route path="/*" element={<ERR404 />} />
          <Route path="verify-email/:id/:hash" element={<VerifyEmail />} /> 
        </Route>
       
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Home" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="provider" element={<Providers />} />
          <Route path="financial_content" element={<FinancialContent />} />
          <Route path="comment" element={<Comment/>} />  
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
