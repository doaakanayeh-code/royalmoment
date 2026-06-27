import React from "react";
import { Button, Typography } from "@mui/material";
import CustomDialog from "../common/ConfirmDialog";

export default function DeleteUserDialog({ open, onClose, onDelete }) {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Delete User"
      maxWidth="xs"
      actions={
        <>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        </>
      }
    >
      <Typography
        sx={{
          textAlign: "center",
          py: 2,
        }}
      >
        Are you sure you want to delete this user?
      </Typography>
    </CustomDialog>
  );
}
