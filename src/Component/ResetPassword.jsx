import React, { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Resetpasswordim from "../assets/Resetpassword.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "../Allcomponent/AuthLayout"; // استيراد القالب المشترك

export default function ResetPassword({ switchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();

  return (
    <AuthLayout
      image={Resetpasswordim}
      title={t('auth.reset_password_title')}
      description={t('auth.reset_password_desc')}
      footerText={t('auth.remember_password_text')}
      footerLinkText={t('auth.login_link')}
      onFooterLinkClick={switchToLogin}
    >
      {/* NEW PASSWORD */}
      <TextField
        fullWidth
        type={showPassword ? "text" : "password"}
        placeholder={t('auth.new_password_placeholder')}
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
        fullWidth
        variant="contained"
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
        {t('auth.confirm_reset_btn')}
      </Button>
    </AuthLayout>
  );
}