import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import api from "./services/adminApi";

import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import loginImg from "../assets/loginadmin.png";

export default function LoginHeroSection() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const navigate = useNavigate();
  const cookie = new Cookies();

  const [showPassword, setShowPassword] = useState(false);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    if (!identifier.trim()) {
      setErrorMessage("Please enter your email");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your password");
      return;
    }
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("identifier", identifier);
      formData.append("password", password);

      const response = await api.post("/login", formData);

      const token = response.data.data.token;
      const admin = response.data.data.user;

      cookie.set("Bearer", token, {
        path: "/",
        sameSite: "lax",
      });

      cookie.set("AdminData", JSON.stringify(admin), {
        path: "/",
        sameSite: "lax",
      });

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);

      setErrorMessage("Wrong Email Or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
        backgroundColor: "#f0f4f8",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          minHeight: "650px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: "#fff",
          borderRadius: "40px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            flex: 1.3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            backgroundColor: "#fff",
            position: "relative",
          }}
        >
          <img
            src={loginImg}
            alt="Illustration"
            style={{
              width: "90%",
              maxWidth: "550px",
              zIndex: 1,
              filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.08))",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: "400px",
              height: "400px",
              bgcolor: "#F5E7D7",
              borderRadius: "50%",
              filter: "blur(80px)",
              opacity: 0.4,
              zIndex: 0,
            }}
          />
        </Box>

        {/* Login Section */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#FDF5F5",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 4, md: 10 },
            py: 8,
            zIndex: 10,

            clipPath: {
              md: isAr
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 15% 75%, 5% 50%, 15% 25%)"
                : "polygon(100% 0, 15% 0, 5% 25%, 15% 50%, 5% 75%, 15% 100%, 100% 100%)",
              xs: "none",
            },

            ml: { md: isAr ? 0 : "-120px" },
            mr: { md: isAr ? "-120px" : 0 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "380px",
              mx: "auto",
              textAlign: isAr ? "right" : "left",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#d18c96",
                fontWeight: 800,
                mb: 1,
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.5rem",
              }}
            >
              {t("home.login_title", "Admin Login")}
            </Typography>

            <Typography
              sx={{
                color: "#718096",
                mb: 5,
                fontSize: "1.1rem",
              }}
            >
              Welcome back! Please enter your details.
            </Typography>

            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <TextField
                label="Email"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setErrorMessage("");
                }}
                error={!!errorMessage}
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fff",

                    "& input": {
                      color: "#000",
                    },

                    "&:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px #fff inset",
                      WebkitTextFillColor: "#000",
                    },

                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px #fff inset",
                      WebkitTextFillColor: "#000",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                  },
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                error={!!errorMessage}
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fff",

                    "& input": {
                      color: "#000",
                    },

                    "&:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px #fff inset",
                      WebkitTextFillColor: "#000",
                    },

                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px #fff inset",
                      WebkitTextFillColor: "#000",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {errorMessage && (
                <Typography
                  sx={{
                    color: "#e53935",
                    fontSize: "13px",
                    fontWeight: 500,
                    mt: -2,
                    mb: 1,
                  }}
                >
                  Wrong Email Or Password
                </Typography>
              )}

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#d18c96",
                  color: "#fff",
                  py: 1.8,
                  borderRadius: "50px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  mt: 2,
                  boxShadow: "0 10px 25px rgba(209,140,150,0.3)",
                  "&:hover": {
                    bgcolor: "#b37680",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
