import { Box, TextField, MenuItem } from "@mui/material";

export default function SearchFilter({ search, setSearch, filter, setFilter }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TextField
        select
        sx={{ width: 220 }}
        label="Status"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="blocked">Blocked</MenuItem>
      </TextField>
    </Box>
  );
}
