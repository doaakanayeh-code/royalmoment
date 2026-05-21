import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Forgotpasswordim from "../assets/Forgotpassword.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "../Allcomponent/AuthLayout"; // استيراد القالب المشترك

export default function ForgotPassword({ switchToLogin, switchToReset }) {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    switchToReset();
  };

  return (
    <AuthLayout
      image={Forgotpasswordim}
      title={t('auth.forgot_password_title')}
      description={t('auth.forgot_password_desc')}
      footerText={t('auth.remember_password_text')}
      footerLinkText={t('auth.login_link')}
      onFooterLinkClick={switchToLogin}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder={t('auth.email_placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            borderRadius: "30px",
            backgroundColor: "#d1a3a4",
            color: "#fff",
            py: 1.5,
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#be8f90", boxShadow: "none" },
          }}
        >
          {t('auth.confirm_btn')}
        </Button>
      </form>
    </AuthLayout>
  );
}