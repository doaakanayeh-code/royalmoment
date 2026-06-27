import { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import UserFilter from "../../components/users/UserFilter";
import UserStatistics from "../../components/users/UserStatistics";
import UsersTable from "../../components/users/UsersTable";
import AddUserDialog from "../../components/users/AddUserDialog";

import {
  getUsers,
  getStatistics,
  filterUsers,
} from "../../services/usersService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState({});

  // رجعنا البحث
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");
  const [deleted, setDeleted] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadStatistics = async () => {
    try {
      const data = await getStatistics();
      setStatistics(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
    loadStatistics();
  }, []);

  useEffect(() => {
    const loadFilteredUsers = async () => {
      try {
        // إذا ما في أي فلتر رجع كل المستخدمين
        if (!search && !status && !deleted) {
          await loadUsers();
          return;
        }

        const data = await filterUsers({
          search,
          status,
          deleted,
        });

        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadFilteredUsers();
  }, [search, status, deleted]);

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        {/* Header */}
        <Box mb={2}>
          <Typography
            sx={{
              fontSize: "58px",
              fontWeight: 700,
              color: "#7C5664",
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1.3,
            }}
          >
            User Management
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6E6A6A",
              fontSize: "22px",
              mb: 3,
            }}
          >
            Manage users, monitor their activity and control access easily.
          </Typography>
        </Box>

        {/* Statistics */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 3,
            mb: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <UserStatistics statistics={statistics} />
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAdd(true)}
            sx={{
              minWidth: 180,
              height: 54,
              mt: 1,
              borderRadius: "12px",
              backgroundColor: "#C98994",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "16px",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 20px rgba(201,137,148,.25)",
              "&:hover": {
                backgroundColor: "#B87482",
              },
            }}
          >
            Add User
          </Button>
        </Box>

        {/* Filters */}
        <Box mb={100}>
          <UserFilter
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            deleted={deleted}
            setDeleted={setDeleted}
          />
        </Box>

        {/* Users Table */}
        <UsersTable
          users={users}
          reloadUsers={loadUsers}
          reloadStatistics={loadStatistics}
        />

        {/* Add User Dialog */}
        <AddUserDialog
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          reloadUsers={loadUsers}
          reloadStatistics={loadStatistics}
        />
      </Box>
    </Container>
  );
}
