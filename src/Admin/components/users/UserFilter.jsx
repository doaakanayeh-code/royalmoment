import { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Paper,
  Button,
  InputAdornment,
  Collapse,
  ListItemIcon,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

export default function UserFilter({
  search,
  setSearch,
  status,
  setStatus,
  deleted,
  setDeleted,
}) {
  const [openFilters, setOpenFilters] = useState(false);

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setDeleted(false);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "22px",
        border: "1px solid #ECECEC",
        boxShadow: "0 6px 18px rgba(0,0,0,.05)",
      }}
    >
      {/* Search + Filter */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Name, Email or Phone..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: "#777" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 56,
              borderRadius: "16px",
              bgcolor: "#FDF5F6",

              "& fieldset": {
                borderColor: "#EDD8DD",
              },

              "&:hover fieldset": {
                borderColor: "#C67C8C",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#C67C8C",
              },
            },
          }}
        />

        <Button
          variant="outlined"
          startIcon={<FilterAltOutlinedIcon />}
          onClick={() => setOpenFilters(!openFilters)}
          sx={{
            minWidth: 170,
            height: 56,
            borderRadius: "16px",
            textTransform: "none",
            fontWeight: 700,
            color: "#6C4C53",
            borderColor: "#E4D3D8",

            "&:hover": {
              borderColor: "#C67C8C",
              bgcolor: "#FAF6F7",
            },
          }}
        >
          {openFilters ? "Hide Filters" : "Filter"}
        </Button>
      </Box>

      <Collapse in={openFilters}>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{
              minWidth: 220,
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
              },
            }}
          >
            <MenuItem value="">All Users</MenuItem>

            <MenuItem value="active">
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckCircleRoundedIcon color="success" fontSize="small" />
              </ListItemIcon>
              Active
            </MenuItem>

            <MenuItem value="blocked">
              <ListItemIcon sx={{ minWidth: 30 }}>
                <BlockRoundedIcon color="error" fontSize="small" />
              </ListItemIcon>
              Blocked
            </MenuItem>
          </TextField>

          <TextField
            select
            label="Trash"
            value={deleted ? "deleted" : ""}
            onChange={(e) => setDeleted(e.target.value === "deleted")}
            sx={{
              minWidth: 220,
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
              },
            }}
          >
            <MenuItem value="">All Users</MenuItem>
            <MenuItem value="deleted">🗑 Deleted Users Only</MenuItem>
          </TextField>

          <Button
            variant="contained"
            startIcon={<RestartAltRoundedIcon />}
            onClick={resetFilters}
            sx={{
              ml: "auto",
              height: 56,
              px: 4,
              borderRadius: "16px",
              textTransform: "none",
              fontWeight: 700,
              bgcolor: "#C67C8C",

              "&:hover": {
                bgcolor: "#B46D7D",
              },
            }}
          >
            Reset
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
}
