import React from "react";
import { TableRow, TableCell, Avatar, Typography, Box } from "@mui/material";

import TableActions from "../common/TableActions";
export default function UserRow({
  user,
  onEdit,
  onDelete,
  onBlock,
  onUnblock,
}) {
  return (
    <TableRow
      hover
      sx={{
        "&:hover": {
          backgroundColor: "#F8FAFC",
        },
      }}
    >
      <TableCell
        align="center"
        sx={{
          verticalAlign: "middle",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#d18c96",
            }}
          >
            {user.username?.charAt(0)}
          </Avatar>

          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            {user.username}
          </Typography>
        </Box>
      </TableCell>

      <TableCell
        align="center"
        sx={{
          verticalAlign: "middle",
        }}
      >
        {user.email || "-"}
      </TableCell>

      <TableCell
        align="center"
        sx={{
          verticalAlign: "middle",
        }}
      >
        {user.phone || "-"}
      </TableCell>

      <TableCell
        align="center"
        sx={{
          verticalAlign: "middle",
        }}
      >
        <Typography
          sx={{
            color: "#64748B",
            fontWeight: "bold",
            fontSize: "15px",
            textTransform: "capitalize",
          }}
        >
          {user.role}
        </Typography>
      </TableCell>

      <TableCell
        align="center"
        sx={{
          verticalAlign: "middle",
        }}
      >
        <Typography
          sx={{
            color: user.is_blocked ? "#ef4444" : "#22c55e",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          {user.is_blocked ? "Blocked" : "Active"}
        </Typography>
      </TableCell>

      <TableCell
        align="center"
        sx={{
          verticalAlign: "middle",
        }}
      >
        <Typography
          sx={{
            color: "#64748B",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {new Date(user.created_at).toLocaleDateString("en-GB")}
        </Typography>
      </TableCell>

      <TableCell
        align="center"
        sx={{
          verticalAlign: "middle",
          textAlign: "center",
        }}
      >
        <TableActions
          row={user}
          onEdit={onEdit}
          onDelete={() => onDelete(user.id)}
          onBlockToggle={() =>
            user.is_blocked ? onUnblock(user.id) : onBlock(user.id)
          }
          editTooltip="Edit User"
          deleteTooltip="Delete User"
          blockTooltip="Block User"
          unblockTooltip="Unblock User"
        />
      </TableCell>
    </TableRow>
  );
}
