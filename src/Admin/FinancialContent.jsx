import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Container,
  Paper,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EventIcon from "@mui/icons-material/Event";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancialContent() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const chartData = [
    { name: isAr ? 'السبت' : 'Sat', uv: 20000 },
    { name: isAr ? 'الأحد' : 'Sun', uv: 40000 },
    { name: isAr ? 'الإثنين' : 'Mon', uv: 45000 },
    { name: isAr ? 'الثلاثاء' : 'Tue', uv: 50000 },
    { name: isAr ? 'الأربعاء' : 'Wed', uv: 55000 },
    { name: isAr ? 'الخميس' : 'Thu', uv: 70000 },
    { name: isAr ? 'الجمعة' : 'Fri', uv: 95000 },
  ];

  const bookings = [
    { user: isAr ? 'المستخدم: أحمد حسن' : 'User: Ahmed Hassan', event: 'RM-002', status: 'pending', action: 'remind' },
    { user: isAr ? 'الفعالية: RM-002' : 'Event: RM-002', event: 'RM-002', status: 'processing', action: 'remind' },
    { user: isAr ? 'الحالة: بانتظار دفع العربون' : 'Status: Waiting deposit', event: 'RM-002', status: 'rejected', action: 'remind' },
  ];

  const withdrawalRequests = [
    { provider: isAr ? 'قاعة النجوم' : 'Stars Hall', amount: '750,000', date: '2026-08-30' },
    { provider: isAr ? 'الملتقى' : 'Al-Multaqaa', amount: '750,000', date: '2026-08-30' },
  ];

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 6, direction: isAr ? 'rtl' : 'ltr' }}>
      <Container maxWidth="lg">
        
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 6, color: "#143d28", textAlign: isAr ? 'right' : 'left', px: 1 }}>
          {isAr ? "المتابعة المالية حدمر التفصيلية" : "Detailed Financial Tracking"}
        </Typography>

        <Grid container spacing={4}>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: "30px", bgcolor: "#fffdf9", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", border: "1px solid #f1f5f9", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <Box>
                <Box component="span" sx={{ bgcolor: "#143d28", color: "white", px: 2, py: 0.5, borderRadius: "8px", fontSize: "0.75rem", fontWeight: "bold" }}>
                  {isAr ? "كرت 1" : "Card 1"}
                </Box>
                <Stack alignItems="center" sx={{ my: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1} gap={1}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#143d28" }}>
                      {isAr ? "تفاصيل المحفظة المركزية" : "Central Wallet Details"}
                    </Typography>
                    <AccountBalanceWalletIcon sx={{ color: "#D97706" }} />
                  </Stack>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: "#1E293B", mt: 1 }}>
                    15,450,000 {isAr ? "ل.س." : "SYP"}
                  </Typography>
                </Stack>
              </Box>

              <Grid container spacing={2} sx={{ mt: 2, pt: 3, borderTop: "1px solid #F1F5F9" }}>
                <Grid item xs={6} sx={{ borderLeft: isAr ? "none" : "1px solid #E2E8F0", borderRight: isAr ? "1px solid #E2E8F0" : "none", px: 2 }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem", color: "#334155", mb: 2 }}>
                    {isAr ? "عمليات الإيداع (آخر 5)" : "Deposits (Last 5)"}
                  </Typography>
                  <Stack spacing={1}>
                    {[
                      { amt: "+ 11,000,000", ref: "RM-001" },
                      { amt: "+ 1,000,000", ref: "RM-001" },
                      { amt: "+ 50,000", ref: "RM-002" },
                      { amt: "+ 50,000", ref: "RM-002" },
                      { amt: "+ 50,000", ref: "RM-003" },
                    ].map((item, idx) => (
                      <Typography key={idx} sx={{ color: "#15803D", fontSize: "0.75rem", fontWeight: 600 }}>
                        {item.amt} {isAr ? "ل.س." : "SYP"} <Box component="span" sx={{ color: "#94A3B8" }}>({isAr ? `حجز ${item.ref}` : `Book ${item.ref}`})</Box>
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={6} sx={{ px: 2 }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem", color: "#334155", mb: 2 }}>
                    {isAr ? "عمليات السحب (آخر 5)" : "Withdrawals (Last 5)"}
                  </Typography>
                  <Stack spacing={1}>
                    {[1, 2, 3, 4].map((_, idx) => (
                      <Typography key={idx} sx={{ color: "#DC2626", fontSize: "0.75rem", fontWeight: 600 }}>
                        - 750,000 {isAr ? "ل.س." : "SYP"} <Box component="span" sx={{ color: "#94A3B8" }}>({isAr ? "تحويل قاعة النجوم" : "Stars Hall Transfer"})</Box>
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: "30px", bgcolor: "#fffdf9", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", border: "1px solid #f1f5f9", height: '100%' }}>
              <Box component="span" sx={{ bgcolor: "#143d28", color: "white", px: 2, py: 0.5, borderRadius: "8px", fontSize: "0.75rem", fontWeight: "bold" }}>
                {isAr ? "كرت 2" : "Card 2"}
              </Box>
              <Stack direction="row" alignItems="center" spacing={1} gap={1} sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#143d28" }}>
                  {isAr ? "كشف أرباح العمولات" : "Commission Profits Report"}
                </Typography>
                <TrendingUpIcon sx={{ color: "#16A34A" }} />
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#1E293B", mt: 0.5 }}>
                1,545,000 {isAr ? "ل.س." : "SYP"}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#64748B", fontWeight: "bold", mb: 2 }}>
                {isAr ? "نمو الأرباح اليومي" : "Daily Profits Growth"}
              </Typography>

              <Box sx={{ width: '100%', height: 130, my: 2 }} dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="muiColorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#143d28" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#143d28" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#143d28" strokeWidth={2} fillOpacity={1} fill="url(#muiColorProfit)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>

              <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #F1F5F9" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "0.75rem", color: "#334155", mb: 1 }}>
                  {isAr ? "تفاصيل العمولات المستقطعة:" : "Deducted Commissions Details:"}
                </Typography>
                <Grid container spacing={2}>
                  {[1, 2].map((_, i) => (
                    <Grid item xs={6} key={i}>
                      <Box sx={{ bgcolor: "#F8FAFC", p: 1, borderRadius: "12px", textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: "0.80rem", color: "#334155" }}>100,000 {isAr ? "ل.س." : "SYP"}</Typography>
                        <Typography sx={{ color: "#94A3B8", fontSize: "0.65rem" }}>({isAr ? "من حجز RM-001" : "From Book RM-001"})</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: "30px", bgcolor: "#fffdf9", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", border: "1px solid #f1f5f9", height: '100%' }}>
              <Box component="span" sx={{ bgcolor: "#143d28", color: "white", px: 2, py: 0.5, borderRadius: "8px", fontSize: "0.75rem", fontWeight: "bold" }}>
                {isAr ? "كرت 3" : "Card 3"}
              </Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: "#1E293B" }}>21</Typography>
                <Stack direction="row" alignItems="center" spacing={1} gap={1}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#143d28" }}>
                    {isAr ? "مراجعة الحجوزات المعلقة" : "Review Pending Bookings"}
                  </Typography>
                  <EventIcon sx={{ color: "#00796B" }} />
                </Stack>
              </Stack>

              <Paper component="form" elevation={0} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', bgcolor: "#F8FAFC", borderRadius: "12px", my: 2, border: "1px solid #E2E8F0" }}>
                <InputBase sx={{ ml: 1, pr: 1, flex: 1, fontSize: "0.75rem", textAlign: isAr ? 'right' : 'left' }} placeholder={isAr ? "المعالجة..." : "Processing..."} />
                <SearchIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 18 }} />
              </Paper>

              <Typography sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "#334155", mb: 1 }}>
                {isAr ? "قائمة الحجوزات قيد المعالجة" : "Bookings Under Processing List"}
              </Typography>

              <TableContainer component={Box}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#143d28" }}>
                      <TableCell align={isAr ? "right" : "left"} sx={{ color: "white", fontWeight: "bold", fontSize: "0.7rem", borderRadius: isAr ? "0 8px 8px 0" : "8px 0 0 8px" }}>{isAr ? "المستخدم" : "User"}</TableCell>
                      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "0.7rem" }}>{isAr ? "الفعالية" : "Event"}</TableCell>
                      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "0.7rem" }}>{isAr ? "الحالة" : "Status"}</TableCell>
                      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "0.7rem", borderRadius: isAr ? "8px 0 0 8px" : "0 8px 8px 0" }}>{isAr ? "الإجراء" : "Action"}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((row, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align={isAr ? "right" : "left"} sx={{ fontSize: "0.7rem", fontWeight: 500, color: "#334155" }}>{row.user}</TableCell>
                        <TableCell align="center" sx={{ fontSize: "0.7rem", color: "#64748B" }}>{row.event}</TableCell>
                        <TableCell align="center">
                          <Box component="span" sx={{
                            px: 1.5, py: 0.2, borderRadius: "6px", fontSize: "0.65rem", fontWeight: "bold",
                            bgcolor: row.status === 'pending' ? '#FEF3C7' : row.status === 'processing' ? '#FFEDD5' : '#FEE2E2',
                            color: row.status === 'pending' ? '#B45309' : row.status === 'processing' ? '#C2410C' : '#B91C1C',
                          }}>
                            {isAr ? (row.status === 'pending' ? 'بانتظار' : row.status === 'processing' ? 'قيد المعالجة' : 'مرفوض') : row.status}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Button variant="contained" disableElevation sx={{ bgcolor: "#143d28", color: "white", fontSize: "0.65rem", px: 1, py: 0.2, minWidth: 'auto', borderRadius: "6px", '&:hover': { bgcolor: "#0f2e1e" } }}>
                            {isAr ? "إرسال تذكير" : "Remind"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: "30px", bgcolor: "#fffdf9", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", border: "1px solid #f1f5f9", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <Box>
                <Box component="span" sx={{ bgcolor: "#143d28", color: "white", px: 2, py: 0.5, borderRadius: "8px", fontSize: "0.75rem", fontWeight: "bold" }}>
                  {isAr ? "كرت 4" : "Card 4"}
                </Box>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} gap={1} sx={{ my: 1 }}>
                  <NotificationsIcon sx={{ color: "#D97706" }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#143d28" }}>
                    {isAr ? "إدارة طلبات السحب" : "Withdrawal Requests Management"}
                  </Typography>
                </Stack>

                <Typography align="center" sx={{ fontSize: "0.75rem", fontWeight: "bold", color: "#475569", mb: 2 }}>
                  {isAr ? "إجمالي الطلبات بانتظار الموافقة:" : "Total Pending Requests:"} <Box component="span" sx={{ color: "#143d28", fontSize: "0.9rem", fontWeight: "900" }}>3,450,000 {isAr ? "ل.س." : "SYP"}</Box>
                </Typography>

                <Typography sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "#334155", mb: 1 }}>
                  {isAr ? "طلبات السحب بانتظار الموافقة" : "Withdrawal Requests Pending Approval"}
                </Typography>
              </Box>

              <TableContainer component={Box}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#143d28" }}>
                      <TableCell align={isAr ? "right" : "left"} sx={{ color: "white", fontWeight: "bold", fontSize: "0.7rem", borderRadius: isAr ? "0 8px 8px 0" : "8px 0 0 8px" }}>{isAr ? "المزود" : "Provider"}</TableCell>
                      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "0.7rem" }}>{isAr ? "المبلغ" : "Amount"}</TableCell>
                      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "0.7rem" }}>{isAr ? "التاريخ" : "Date"}</TableCell>
                      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "0.7rem", borderRadius: isAr ? "8px 0 0 8px" : "0 8px 8px 0" }}>{isAr ? "الإجراءات" : "Actions"}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {withdrawalRequests.map((row, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align={isAr ? "right" : "left"} sx={{ fontSize: "0.7rem", fontWeight: 500, color: "#475569" }}>
                          <Box component="span" sx={{ color: "#94A3B8", fontSize: "0.65rem" }}>{isAr ? "المزود: " : "Provider: "}</Box>{row.provider}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: "0.7rem", fontWeight: "bold", color: "#1E293B" }}>{row.amount}</TableCell>
                        <TableCell align="center" sx={{ fontSize: "0.7rem", color: "#94A3B8" }}>{row.date}</TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center" gap={0.5}>
                            <Button variant="contained" size="small" sx={{ bgcolor: "#DC2626", color: "white", fontSize: "0.6rem", px: 1, py: 0.1, minWidth: 'auto', borderRadius: "6px", '&:hover': { bgcolor: "#B91C1C" } }}>
                              {isAr ? "رفض" : "Reject"}
                            </Button>
                            <Button variant="contained" size="small" sx={{ bgcolor: "#16A34A", color: "white", fontSize: "0.6rem", px: 1, py: 0.1, minWidth: 'auto', borderRadius: "6px", '&:hover': { bgcolor: "#15803D" } }}>
                              {isAr ? "موافق" : "Approve"}
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
}