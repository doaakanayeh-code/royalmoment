import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ConfirmDialog({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#d18c96",
          color: "white",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {title}
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>{children}</DialogContent>

      {actions && (
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}
