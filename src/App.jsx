import React, { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./Css/Size.css";

// Components
import HomePage from "./Component/HomePage";
import HeroSection from "./Component/HeroSection"; 
import Onboarding from "./Onboarding";
import MainComponent from "./Component/MainComponent";
import Contactas from "./Component/Contactas";
import AddServices from "./Component/AddServices";
import Users from "./Admin/Users";
import Dashboard from "./Admin/Dashboard";
import DashboardLayout from "./Admin/DashboardLayout";
import Providers from "./Admin/Providers";
import 'react-toastify/dist/ReactToastify.css';
// import Financial_Follow from "./Admin/Financial_Follow";
// import Reports from "./Admin/Reports";
// import Booking from "./Admin/Booking";
// import Comments from "./Admin/Comments";
import Home from "./Admin/Home";
import LoginPage from "./Admin/Login";
import ServicesDetails from "./Component/ServicesDetails";
import ConfirmBooking from "./Component/ConfirmBooking";
import FinancialContent from "./Admin/FinancialContent";
import { Toaster } from "react-hot-toast";
// Auth Components
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Profile from "./Auth/Profile";
import ForgotPassword from "./Component/ForgotPassword";
import ResetPassword from "./Component/ResetPassword";
import Services from "./Component/Services";
import GoogleCallback from "./Auth/GoogleCallback";
export default function App() {
  const [mode, setMode] = useState("light");

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
          <Route path="register" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          {/* <Route path="logout" element={<Logout />} /> */}
          <Route path="contact" element={<Contactas />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/services" element={<Services />} />
          <Route path="/google-callback" element={<GoogleCallback />} />
          <Route path="/ServicesDetails" element={<ServicesDetails />} />
          <Route path="/ConfirmBooking" element={<ConfirmBooking />} />
                    <Route path="/AddServices" element={<AddServices />} />





        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Home" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="provider" element={<Providers />} />
          <Route path="financial_content" element={<FinancialContent />} />


          {/*<Route path="financial_Follow" element={<Financial_Follow />} />
          <Route path="comments" element={<Comments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="booking" element={<Booking />} /> */}
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
