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
import UserRow from "./UserRow";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import {
  blockUser,
  unblockUser,
  deleteUser,
  updateUser,
} from "../../services/usersService";

const columns = [
  { id: "username", label: "User Name", minWidth: 220 },
  { id: "email", label: "Email", minWidth: 220 },
  { id: "phone", label: "Phone", minWidth: 150 },
  { id: "role", label: "Role", minWidth: 120, align: "center" },
  { id: "status", label: "Status", minWidth: 120, align: "center" },
  { id: "created_at", label: "Created At", minWidth: 180, align: "center" },
  { id: "actions", label: "Actions", minWidth: 350, align: "center" },
];

export default function UsersTable({ users, reloadUsers, reloadStatistics }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);

  const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    phone: "",
    role: "",
  });

  const handleBlock = async (id) => {
    try {
      await blockUser(id);
      await Promise.all([reloadUsers(), reloadStatistics()]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await unblockUser(id);
      await Promise.all([reloadUsers(), reloadStatistics()]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUserId);
      await Promise.all([reloadUsers(), reloadStatistics()]);
      setOpenDelete(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(editUser.id, {
        username: editUser.username,
        phone: editUser.phone,
        role: editUser.role,
      });

      await Promise.all([reloadUsers(), reloadStatistics()]);

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
        {users.length === 0 ? (
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
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onEdit={(user) => {
                      setEditUser({
                        id: user.id,
                        username: user.username,
                        phone: user.phone,
                        role: user.role,
                      });

                      setOpenEdit(true);
                    }}
                    onDelete={(id) => {
                      setSelectedUserId(id);
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

      <EditUserDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        editUser={editUser}
        setEditUser={setEditUser}
        onSave={handleUpdate}
      />

      <DeleteUserDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
