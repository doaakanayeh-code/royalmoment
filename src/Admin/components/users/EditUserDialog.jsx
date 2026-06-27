import React from "react";
import { Button, TextField } from "@mui/material";
import CustomDialog from "../common/ConfirmDialog";

export default function EditUserDialog({
  open,
  onClose,
  editUser,
  setEditUser,
  onSave,
}) {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Edit User"
      actions={
        <>
          <Button onClick={onClose}>Cancel</Button>

          <Button
            variant="contained"
            onClick={onSave}
            sx={{
              bgcolor: "#d18c96",
            }}
          >
            Save Changes
          </Button>
        </>
      }
    >
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        value={editUser.username}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            username: e.target.value,
          })
        }
      />

      <TextField
        fullWidth
        margin="normal"
        label="Phone"
        value={editUser.phone}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            phone: e.target.value,
          })
        }
      />

      <TextField
        fullWidth
        margin="normal"
        label="Role"
        value={editUser.role}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            role: e.target.value,
          })
        }
      />
    </CustomDialog>
  );
}
