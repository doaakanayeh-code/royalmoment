import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingModal from "./ConfirmBooking"; // 1. استيراد مكون التأكيد هنا

import {
  MapContainer,
  TileLayer,
  Marker,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

// ================= DATA =================
const venueData = {
  name: "Royal Sapphire Hall",
  images: [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop",
  ],
  capacity: 1000,
  type: "Weddings, Engagements",
  price: "$5000 / Night",
  location: {
    lat: 33.8938,
    lng: 35.5018,
    address: "123 Royal Ave, Event City",
  },
  availableTimes: [
    "18:00",
    "18:30",
    "19:30",
    "21:00",
  ],
  bookingAgent: {
    name: "Booking Agent",
    status: "Available",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=60",
  },
};

// ================= COMPONENT =================
export default function ServicesDetails() {
  const venue = venueData;
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("19:30");
  
  // 2. حالة للتحكم بفتح وإغلاق نافذة تأكيد الحجز
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadBooklet = () => {
    const fileUrl = "/clinic-hub-booklet.pdf";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "Clinic_Hub_Booklet.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // تجهيز البيانات المختارة ديناميكياً لإرسالها لصفحة التأكيد
  const bookingDetails = {
    service: venue.name,
    date: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()} @ ${selectedTime}`,
    total: venue.price.split(' ')[0] // يأخذ $5000 فقط
  };

  const calendarCustomStyle = `
    .custom-cal .react-calendar {
      border: none !important;
      width: 100% !important;
      font-family: sans-serif;
      font-size: 11px;
    }
    .custom-cal .react-calendar__tile--active {
      background: #007bff !important;
      color: white !important;
      border-radius: 50%;
    }
    .custom-cal .react-calendar__tile {
      border-radius: 50%;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "sans-serif"
      }}
    >
      <style>{calendarCustomStyle}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
          padding: "24px",
          boxSizing: "border-box"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            borderBottom: "1px solid #f4f4f5",
            paddingBottom: "12px"
          }}
        >
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#18181b", margin: 0 }}>
            Venue Details
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#f4f4f5",
                border: "1px solid #e4e4e7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              自由
            </button>
            <img
              src="https://i.pravatar.cc/100"
              alt="User"
              style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #e4e4e7" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* TOP SECTION */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              gap: "20px",
              backgroundColor: "#fafafa",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #e4e4e7"
            }}
          >
            {/* MAIN IMAGE */}
            <div style={{ gridColumn: "span 8", display: "flex", flexDirection: "column", gap: "10px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#09090b", margin: 0 }}>
                {venue.name}
              </h2>
              <div style={{ position: "relative", width: "100%", height: "260px" }}>
                <img
                  src={venue.images[0]}
                  alt="Main"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                />
              </div>
            </div>

            {/* GALLERY */}
            <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#a1a1aa", textTransform: "uppercase", marginBottom: "10px" }}>
                Visual Gallery
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", maxHeight: "260px" }}>
                {venue.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt=""
                    style={{ width: "100%", height: "76px", objectFit: "cover", borderRadius: "12px", border: "1px solid #e4e4e7" }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
            {/* DETAILS */}
            <div style={{ backgroundColor: "#fafafa", border: "1px solid #e4e4e7", borderRadius: "16px", padding: "16px" }}>
              <h3>Details & Specifications</h3>
              <p>Capacity: {venue.capacity}</p>
              <p>Type: {venue.type}</p>
              <p>Price: {venue.price}</p>
            </div>

            {/* MAP */}
            <div style={{ backgroundColor: "#fafafa", border: "1px solid #e4e4e7", borderRadius: "16px", padding: "16px" }}>
              <h3>Location & Map</h3>
              <div style={{ height: "200px", width: "100%", overflow: "hidden", borderRadius: "12px" }}>
                <MapContainer
                  center={[venue.location.lat, venue.location.lng]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  zoomControl={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[venue.location.lat, venue.location.lng]} />
                </MapContainer>
              </div>
              <p>{venue.location.address}</p>
              <button
                onClick={handleDownloadBooklet}
                style={{ marginTop: "12px", width: "100%", backgroundColor: "#ffffff", border: "1px solid #e4e4e7", padding: "10px", borderRadius: "10px", cursor: "pointer" }}
              >
                📄 تحميل الكتيب
              </button>
            </div>

            {/* CALENDAR */}
            <div style={{ backgroundColor: "#fafafa", border: "1px solid #e4e4e7", borderRadius: "16px", padding: "16px" }}>
              <h3>Availability Calendar</h3>
              <div className="custom-cal" style={{ backgroundColor: "#ffffff", border: "1px solid #e4e4e7", borderRadius: "12px", padding: "6px", marginBottom: "12px" }}>
                <Calendar onChange={setDate} value={date} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "6px", marginBottom: "12px" }}>
                {venue.availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: "6px 0",
                      fontSize: "11px",
                      borderRadius: "8px",
                      border: "1px solid #e4e4e7",
                      cursor: "pointer",
                      backgroundColor: selectedTime === time ? "#18181b" : "#ffffff",
                      color: selectedTime === time ? "#ffffff" : "#27272a"
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* 3. تعديل الحدث هنا لفتح المودال عند الضغط */}
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  width: "100%",
                  backgroundColor: "#007bff",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 0",
                  borderRadius: "10px",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. استدعاء نافذة التاكيد بالأسفل وتمرير المتغيرات */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        bookingDetails={bookingDetails} 
      />
    </div>
  );
}