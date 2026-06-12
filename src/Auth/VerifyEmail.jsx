import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { id, hash } = useParams(); 
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); 
  const [message, setMessage] = useState("جاري التحقق من بريدك الإلكتروني...");

  useEffect(() => {
    const signature = searchParams.get("signature");
    const expires = searchParams.get("expires");

    const apiUrl = `http://localhost:8000/api/verify-email/${id}/${hash}?expires=${expires}&signature=${signature}`;

    axios
      .get(apiUrl, {
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        if (res.status === 200) {
          setStatus("success");
          setMessage(res.data.message || "تم تفعيل حسابك بنجاح! جاري توجيهك إلى لوحة التحكم...");
          
          setTimeout(() => {
            navigate("/"); 
          }, 3000);
        }
      })
      .catch((err) => {
        setStatus("error");

        if (err.response && err.response.status === 403) {
          setMessage(err.response.data.message || "رابط التفعيل غير صالح أو انتهت صلاحيته.");
        } else if (err.response && err.response.status === 422) {
          setMessage("بيانات التحقق غير مكتملة أو مشوهة.");
        } else {
          setMessage("حدث خطأ أثناء تفعيل الحساب، يرجى المحاولة لاحقاً.");
        }
      });
  }, [id, hash, searchParams, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
      <div className={`status-box ${status}`}>
        {status === "loading" && <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "2rem", color: "#3b82f6" }}></i>}
        {status === "success" && <i className="fa-solid fa-circle-check" style={{ fontSize: "2rem", color: "#10b981" }}></i>}
        {status === "error" && <i className="fa-solid fa-circle-xmark" style={{ fontSize: "2rem", color: "#ef4444" }}></i>}
        
        <h2 style={{ marginTop: "20px", color: "#1f2937" }}>{message}</h2>
      </div>
    </div>
  );
}