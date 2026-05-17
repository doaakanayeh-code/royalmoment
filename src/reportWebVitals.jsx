// src/reportWebVitals.js
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry); // تقيس ثبات عناصر الواجهة
    onFID(onPerfEntry); // تقيس سرعة الاستجابة لأول نقرة
    onLCP(onPerfEntry); // تقيس سرعة تحميل أكبر عنصر مرئي
    onFCP(onPerfEntry); // تقيس أول ظهور لأي محتوى برمجياً
    onTTFB(onPerfEntry); // تقيس وقت استجابة السيرفر الأولية
  }
};

export default reportWebVitals;