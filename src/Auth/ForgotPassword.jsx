import React, { useState, useRef } from "react";
import { TextField, Button, Box, CircularProgress, Typography } from "@mui/material";
import Forgotpasswordim from "../assets/Forgotpassword.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "../Allcomponent/AuthLayout"; 
import axios from "axios"; 

export default function ForgotPassword({ switchToLogin, switchToReset }) {
  const [step, setStep] = useState(1); 
  const [identifier, setIdentifier] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [otp, setOtp] = useState(new Array(5).fill(""));
  const inputsRef = useRef([]);

  const { t } = useTranslation();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    if (identifier.trim() === "") {
      setErrorMessage("الرجاء إدخل البريد الإلكتروني أو رقم الهاتف");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/forgot-password", {
        identifier: identifier,
      });

      if (response.data.success || response.status === 200) {
        setStep(2); 
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    setLoading(true);    

    const otpCode = otp.join(""); 

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verify-forgot-otp", {
        identifier: identifier,
        otp: otpCode,
      });

      if (response.data.verified || response.status === 200) {
        switchToReset(identifier, otpCode); 
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("رمز التحقق غير صحيح، يرجى المحاولة مجدداً");
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // الرجوع للمربع السابق عند الضغط على زر الحذف (Backspace)
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <AuthLayout
      image={Forgotpasswordim}
      title={step === 1 ? t('auth.forgot_password_title') : "تحقق من رمز الأمان"}
      description={step === 1 ? t('auth.forgot_password_desc') : "أدخل الرمز المكون من 5 أرقام المرسل إلى حسابك"}
      footerText={t('auth.remember_password_text')}
      footerLinkText={t('auth.login_link')}
      onFooterLinkClick={switchToLogin}
    >
      
      {errorMessage && (
        <Typography color="error" textAlign="center" variant="body2" sx={{ mb: 2, fontWeight: "bold" }}>
          {errorMessage}
        </Typography>
      )}

      {step === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <TextField
            fullWidth
            placeholder={t('auth.email_placeholder')} 
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : t('auth.confirm_btn')}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <Box display="flex" justifyContent="center" gap={1.5} mb={5} dir="ltr">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                value={data}
                disabled={loading} // قفل المربعات أثناء فحص الرمز
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                style={{
                  width: "48px", 
                  height: "48px",
                  backgroundColor: "#fff",
                  border: "2px solid #ddd",
                  borderRadius: "12px",
                  textAlign: "center",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#4A1525",
                  outline: "none",
                  transition: "all 0.2s",
                  opacity: loading ? 0.6 : 1
                }}
                onFocus={(e) => e.target.style.borderColor = "#d1a3a4"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
              />
            ))}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={otp.includes("") || loading} 
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "تأكيد الرمز"}
          </Button>

          <Box textAlign="center" mt={2}>
            <span 
              onClick={() => {
                if (!loading) {
                  setStep(1);
                  setOtp(new Array(5).fill("")); 
                  setErrorMessage("");
                }
              }} 
              style={{ 
                color: "#d1a3a4", 
                cursor: loading ? "not-allowed" : "pointer", 
                fontSize: "0.9rem", 
                textDecoration: "underline" 
              }}
            >
              تعديل البريد الإلكتروني / رقم الهاتف
            </span>
          </Box>
        </form>
      )}

    </AuthLayout>
  );
}