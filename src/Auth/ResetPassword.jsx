import React, { useState } from "react";
import { TextField, Button, IconButton, InputAdornment, CircularProgress, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Resetpasswordim from "../assets/Resetpassword.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "../Allcomponent/AuthLayout"; 
import axios from "axios";

export default function ResetPassword({ switchToLogin, identifier }) {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage("يجب أن تكون كلمة المرور 8 أحرف على الأقل");
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("كلمتا المرور غير متطابقتين");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/reset-password", {
        identifier: identifier, 
        password: password,
        password_confirmation: passwordConfirmation, 
      });

      setSuccessMessage(response.data.message || "تم إعادة تعيين كلمة المرور بنجاح!");
      
      setTimeout(() => {
        switchToLogin();
      }, 2000);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("حدث خطأ أثناء تحديث كلمة المرور، يرجى المحاولة لاحقاً");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      image={Resetpasswordim}
      title={t('auth.reset_password_title')}
      description={t('auth.reset_password_desc')}
      footerText={t('auth.remember_password_text')}
      footerLinkText={t('auth.login_link')}
      onFooterLinkClick={switchToLogin}
    >
      
      {errorMessage && (
        <Typography color="error" textAlign="center" variant="body2" sx={{ mb: 2, fontWeight: "bold" }}>
          {errorMessage}
        </Typography>
      )}

      {successMessage && (
        <Typography color="success.main" textAlign="center" variant="body2" sx={{ mb: 2, fontWeight: "bold" }}>
          {successMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        {/* NEW PASSWORD */}
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder={t('auth.new_password_placeholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              backgroundColor: "#fff",
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#d1a3a4" },
              "&.Mui-focused fieldset": { borderColor: "#d1a3a4" },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* CONFIRM PASSWORD */}
        <TextField
          fullWidth
          type={showConfirmPassword ? "text" : "password"}
          placeholder={t('auth.confirm_password_placeholder')}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          disabled={loading}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              backgroundColor: "#fff",
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#d1a3a4" },
              "&.Mui-focused fieldset": { borderColor: "#d1a3a4" },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* BUTTON */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading || !password || !passwordConfirmation}
          sx={{
            borderRadius: "30px",
            backgroundColor: "#d9a5a5",
            color: "#fff",
            py: 1.5,
            textTransform: "none",
            fontSize: "15px",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#c88f8f", boxShadow: "none" },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : t('auth.confirm_reset_btn')}
        </Button>
      </form>
    </AuthLayout>
  );
}