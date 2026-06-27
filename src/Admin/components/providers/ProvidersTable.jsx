import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  CircularProgress,
  Box,
} from "@mui/material";
import { TableHead, TableRow, TableCell } from "@mui/material";

import ProviderRow from "./ProviderRow";
import EditProviderDialog from "./EditProviderDialog";
import DeleteProviderDialog from "./DeleteProviderDialog";

import {
  blockProvider,
  unblockProvider,
  deleteProvider,
  updateProvider,
} from "../../services/providersService";

const columns = [
  { id: "username", label: "Provider Name", minWidth: 220 },
  { id: "email", label: "Email", minWidth: 220 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "role", label: "Role", minWidth: 120, align: "center" },
  { id: "status", label: "Status", minWidth: 120, align: "center" },
  { id: "created_at", label: "Created At", minWidth: 180, align: "center" },
  { id: "actions", label: "Actions", minWidth: 320, align: "center" },
];

export default function ProvidersTable({
  providers,
  reloadProviders,
  reloadStatistics,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);

  const [editProvider, setEditProvider] = useState({
    id: "",
    username: "",
    phone: "",
    role: "provider",
    frontImage: null,
    backImage: null,
  });

  const handleBlock = async (id) => {
    try {
      await blockProvider(id);

      await Promise.all([reloadProviders(), reloadStatistics()]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await unblockProvider(id);

      await Promise.all([reloadProviders(), reloadStatistics()]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProvider(selectedProviderId);

      await Promise.all([reloadProviders(), reloadStatistics()]);

      setOpenDelete(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("username", editProvider.username);
      formData.append("identifier", editProvider.phone);

      if (editProvider.frontImage) {
        formData.append("id_img_front", editProvider.frontImage);
      }

      if (editProvider.backImage) {
        formData.append("id_img_back", editProvider.backImage);
      }

      await updateProvider(editProvider.id, formData);

      await Promise.all([reloadProviders(), reloadStatistics()]);

      setOpenEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "30px",
          backgroundColor: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          border: "1px solid #F1F5F9",
        }}
      >
        {providers.length === 0 ? (
          <Box
            sx={{
              height: 400,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "#d18c96" }} />
          </Box>
        ) : (
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "center"}
                      sx={{
                        minWidth: column.minWidth,
                        backgroundColor: "#d18c96",
                        color: "#fff",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {providers.map((provider) => (
                  <ProviderRow
                    key={provider.id}
                    provider={provider}
                    onEdit={(provider) => {
                      setEditProvider({
                        id: provider.id,
                        username: provider.username,
                        phone: provider.phone,
                        role: provider.role,
                        frontImage: null,
                        backImage: null,
                      });

                      setOpenEdit(true);
                    }}
                    onDelete={(id) => {
                      setSelectedProviderId(id);
                      setOpenDelete(true);
                    }}
                    onBlock={handleBlock}
                    onUnblock={handleUnblock}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <EditProviderDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        editProvider={editProvider}
        setEditProvider={setEditProvider}
        onSave={handleUpdate}
      />

      <DeleteProviderDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
