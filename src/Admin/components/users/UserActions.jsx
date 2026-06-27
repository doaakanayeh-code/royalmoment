import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function UserActions({ user, onEdit, onDelete, onBlockToggle }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        width: "100%",
      }}
    >
      <Tooltip title="Edit User">
        <IconButton onClick={() => onEdit(user)}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>

      <Tooltip title={user.is_blocked ? "Unblock User" : "Block User"}>
        <IconButton onClick={() => onBlockToggle(user)}>
          {user.is_blocked ? (
            <CheckCircleIcon color="success" />
          ) : (
            <BlockIcon color="warning" />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete User">
        <IconButton onClick={() => onDelete(user)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
