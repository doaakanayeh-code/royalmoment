import React from 'react';
import GenericTable from '../Allcomponent/GenericTable';
import { Button, Box } from '@mui/material';

export default function ProvidersPage() {
  // 1. تعريف الأعمدة الخاصة بالمزودين
  const providerColumns = [
    { id: "doctor", label: "اسم المزود", minWidth: 200, align: "right" }, // تركنا المعرف doctor أو يمكنك تعديله في المكون العام لـ mainName
    { id: "serviceType", label: "نوع الخدمة", minWidth: 150, align: "center" },
    { id: "phone", label: "رقم الهاتف", minWidth: 150, align: "center" },
    { id: "status", label: "حالة الحساب", minWidth: 120, align: "center" },
    { id: "actions", label: "إجراءات", minWidth: 150, align: "center" }
  ];

  // 2. بيانات المزودين المسترجعة من قاعدة البيانات (Laravel API مثلاً)
  const providerRows = [
    { doctor: "أضواء المدينة للتصوير", serviceType: "تصوير فوتوغرافي", phone: "0933xxxxxx", status: "Available" },
    { doctor: "صالة الملكة للأفراح", serviceType: "قاعة حفل زفاف", phone: "0944xxxxxx", status: "Busy" },
    { doctor: "تنظيم ليلة العمر", serviceType: "تنسيق كوشة وزهور", phone: "0955xxxxxx", status: "Offline" },
  ];

  // 3. إضافة أزرار مخصصة للتحكم بالمزود (قبول / حظر)
  const renderProviderActions = (columnId, row) => {
    if (columnId === "actions") {
      return (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button variant="contained" size="small" color="primary">تعديل</Button>
          <Button variant="outlined" size="small" color="error">تعطيل</Button>
        </Box>
      );
    }
    return null;
  };

  return (
    <GenericTable 
      title="إدارة مزودي الخدمات" 
      columns={providerColumns} 
      rows={providerRows} 
      renderCustomCell={renderProviderActions}
    />
  );
}