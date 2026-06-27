import Grid from "@mui/material/Grid";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import StatCard from "../common/StatCard";

export default function UserStatistics({ statistics = {} }) {
  const stats = [
    {
      title: "Total Users",
      value: statistics.total ?? 0,
      icon: <PeopleAltOutlinedIcon />,
      color: "#C98994",
    },
    {
      title: "Active Users",
      value: statistics.active ?? 0,
      icon: <VerifiedUserOutlinedIcon />,
      color: "#22C55E",
    },
    {
      title: "Blocked Users",
      value: statistics.blocked ?? 0,
      icon: <BlockOutlinedIcon />,
      color: "#EF4444",
    },
    {
      title: "Deleted Users",
      value: statistics.deleted ?? 0,
      icon: <DeleteOutlineOutlinedIcon />,
      color: "#64748B",
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        </Grid>
      ))}
    </Grid>
  );
}
