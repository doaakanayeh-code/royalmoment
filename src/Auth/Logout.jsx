import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

// تأكدي من وجود export default هنا لكي نستطيع استيراده في السايدبار
export default function Logout({ open, onClose, onConfirm, isAr }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          p: 2,
          minWidth: "320px",
          textAlign: "center",
          direction: isAr ? "rtl" : "ltr",
          bgcolor: "#FFFFFF",
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", color: "#1E293B", pb: 1 }}>
        {isAr ? "تسجيل الخروج؟" : "Logout?"}
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ color: "#64748B", fontSize: "0.9rem" }}>
          {isAr ? "هل أنت متأكد أنك تريد تسجيل الخروج من الحساب؟" : "Are you sure you want to logout?"}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: 2, mt: 1 }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#EF4444",
            color: "white",
            borderRadius: "10px",
            px: 3,
            fontWeight: "bold",
            "&:hover": { bgcolor: "#DC2626" }
          }}
        >
          {isAr ? "تأكيد" : "Confirm"}
        </Button>

        <Button
          onClick={onClose}
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#475569",
            color: "white",
            borderRadius: "10px",
            px: 3,
            fontWeight: "bold",
            "&:hover": { bgcolor: "#334155" }
          }}
        >
          {isAr ? "إغلاق" : "Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}