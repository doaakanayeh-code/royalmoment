import Grid from "@mui/material/Grid";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import StatCard from "../common/StatCard";

const cards = [
  {
    title: "Total Providers",
    key: "total",
    color: "#C98994",
    icon: <GroupsRoundedIcon />,
  },
  {
    title: "Active Providers",
    key: "active",
    color: "#22C55E",
    icon: <CheckCircleRoundedIcon />,
  },
  {
    title: "Blocked Providers",
    key: "blocked",
    color: "#EF4444",
    icon: <BlockRoundedIcon />,
  },
  {
    title: "Deleted Providers",
    key: "deleted",
    color: "#64748B",
    icon: <DeleteForeverRoundedIcon />,
  },
];

export default function ProviderStatistics({ statistics = {} }) {
  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.key}>
          <StatCard
            title={card.title}
            value={statistics[card.key] ?? 0}
            icon={card.icon}
            color={card.color}
          />
        </Grid>
      ))}
    </Grid>
  );
}
