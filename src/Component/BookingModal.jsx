import React, { useState } from "react";
import { Dialog, DialogContent, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import calendarImg from "../assets/Calendar.png";

import Login from "../Auth/Login";
import Register from "../Auth/SignUp";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import AuthLayout from "../Allcomponent/AuthLayout"; // استيراد القالب المشترك
import { useTranslation } from "react-i18next";

export default function BookingModal() {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState("booking");
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      PaperProps={{
        sx: {
          background: "transparent",
          boxShadow: "none",
          overflow: "visible",
        },
      }}
    >
      <DialogContent
        sx={{
          background: "#F3D5D5",
          borderRadius: "35px",
          width: "420px",
          p: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* CLOSE BUTTON */}
        <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 15, right: 15 }}>
          <CloseIcon />
        </IconButton>

        {/* BOOKING VIEW - مدمجة داخل القالب الموحد هلق */}
        {view === "booking" && (
          <AuthLayout
            image={calendarImg}
            title={t('booking_modal.title')}
            description={t('booking_modal.subtitle')}
            footerText=""
            footerLinkText={t('booking_modal.continue_guest')}
            onFooterLinkClick={() => setOpen(false)}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={() => setView("login")}
              sx={{
                mb: 2,
                borderRadius: "30px",
                py: 1.5,
                backgroundColor: "#d1a3a4",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#be8f90", boxShadow: "none" },
              }}
            >
              {t('auth.login_link')}
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setView("register")}
              sx={{
                borderRadius: "30px",
                py: 1.5,
                backgroundColor: "#d1a3a4",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#be8f90", boxShadow: "none" },
              }}
            >
              {t('booking_modal.create_account')}
            </Button>
          </AuthLayout>
        )}

        {/* بقية الواجهات الفرعية الديناميكية */}
        {view === "login" && (
          <Login switchToRegister={() => setView("register")} switchToForgot={() => setView("forgot")} />
        )}

        {view === "register" && (
          <Register switchToLogin={() => setView("login")} />
        )}

        {view === "forgot" && (
          <ForgotPassword switchToLogin={() => setView("login")} switchToReset={() => setView("reset")} />
        )}

        {view === "reset" && (
          <ResetPassword switchToLogin={() => setView("login")} />
        )}
      </DialogContent>
    </Dialog>
  );
}