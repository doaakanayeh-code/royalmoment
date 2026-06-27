import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function TableActions({
  row,
  onEdit,
  onDelete,
  onBlockToggle,
  editTooltip = "Edit",
  deleteTooltip = "Delete",
  blockTooltip = "Block",
  unblockTooltip = "Unblock",
}) {
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
      {onEdit && (
        <Tooltip title={editTooltip}>
          <IconButton onClick={() => onEdit(row)}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
      )}

      {onBlockToggle && (
        <Tooltip title={row.is_blocked ? unblockTooltip : blockTooltip}>
          <IconButton onClick={() => onBlockToggle(row)}>
            {row.is_blocked ? (
              <CheckCircleIcon color="success" />
            ) : (
              <BlockIcon color="warning" />
            )}
          </IconButton>
        </Tooltip>
      )}

      {onDelete && (
        <Tooltip title={deleteTooltip}>
          <IconButton onClick={() => onDelete(row)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
