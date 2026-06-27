import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function PageHeader({ title, subtitle, buttonText, onClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight={700} color="#3E2723">
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {buttonText && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onClick}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.2,
            textTransform: "none",
            background: "#8D6E63",
            "&:hover": {
              background: "#6D4C41",
            },
          }}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
}
