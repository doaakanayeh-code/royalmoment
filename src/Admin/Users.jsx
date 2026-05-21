import React from 'react';
import GenericTable from '../Allcomponent/GenericTable';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustomersPage() {
  // 1. أعمدة جدول الزبائن
  const customerColumns = [
    { id: "doctor", label: "اسم الزبون", minWidth: 200, align: "right" },
    { id: "email", label: "البريد الإلكتروني", minWidth: 220, align: "center" },
    { id: "totalBookings", label: "عدد الحجوزات", minWidth: 130, align: "center" },
    { id: "joinDate", label: "تاريخ الانضمام", minWidth: 150, align: "center" },
    { id: "deleteAction", label: "حذف", minWidth: 100, align: "center" }
  ];

  // 2. بيانات الزبائن
  const customerRows = [
    { doctor: "أحمد العلي", email: "ahmad@example.com", totalBookings: "2 حجز", joinDate: "2026/01/15" },
    { doctor: "سارة الحمصي", email: "sara@example.com", totalBookings: "1 حجز", joinDate: "2026/03/22" },
  ];

  // 3. إضافة زر حذف مخصص للزبائن
  const renderCustomerActions = (columnId, row) => {
    if (columnId === "deleteAction") {
      return (
        <IconButton color="error" onClick={() => alert(`حذف حساب الزبون: ${row.doctor}`)}>
          <DeleteIcon />
        </IconButton>
      );
    }
    return null;
  };

  return (
    <GenericTable 
      title="سجل الزبائن المسجلين" 
      columns={customerColumns} 
      rows={customerRows} 
      renderCustomCell={renderCustomerActions}
    />
  );
}