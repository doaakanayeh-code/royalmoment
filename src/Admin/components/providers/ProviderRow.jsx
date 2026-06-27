import React from "react";
import { TableRow, TableCell, Avatar, Typography, Box } from "@mui/material";

import TableActions from "../common/TableActions";

export default function ProviderRow({
  provider,
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
      <TableCell align="center">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#d18c96",
            }}
          >
            {provider.username?.charAt(0)}
          </Avatar>

          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            {provider.username}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="center">{provider.email || "-"}</TableCell>

      <TableCell align="center">{provider.phone || "-"}</TableCell>

      <TableCell align="center">
        <Typography
          sx={{
            color: "#64748B",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {provider.role}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography
          sx={{
            color: provider.is_blocked ? "#ef4444" : "#22c55e",
            fontWeight: "bold",
          }}
        >
          {provider.is_blocked ? "Blocked" : "Active"}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography
          sx={{
            color: "#64748B",
            fontWeight: 500,
          }}
        >
          {new Date(provider.created_at).toLocaleDateString("en-GB")}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <TableActions
          row={provider}
          onEdit={onEdit}
          onDelete={() => onDelete(provider.id)}
          onBlockToggle={() =>
            provider.is_blocked ? onUnblock(provider.id) : onBlock(provider.id)
          }
          editTooltip="Edit Provider"
          deleteTooltip="Delete Provider"
          blockTooltip="Block Provider"
          unblockTooltip="Unblock Provider"
        />
      </TableCell>
    </TableRow>
  );
}
