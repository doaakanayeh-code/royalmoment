import { Card, Box, Typography } from "@mui/material";

export default function StatCard({ title, value, icon, color = "#C98994" }) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "22px",
        border: "1px solid #ECECEC",
        boxShadow: "0 8px 20px rgba(0,0,0,.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: ".25s",
        minHeight: 130,

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 30px rgba(0,0,0,.08)",
        },
      }}
    >
      <Box>
        <Typography
          sx={{
            color: "#777",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 34,
            fontWeight: "bold",
            color: "#444",
            mt: 1,
          }}
        >
          {value}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "18px",
          bgcolor: color,
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,.12)",

          "& svg": {
            fontSize: 34,
          },
        }}
      >
        {icon}
      </Box>
    </Card>
  );
}
