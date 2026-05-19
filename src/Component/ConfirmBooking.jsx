import React, { useState } from 'react';

const ConfirmBooking = ({ isOpen, onClose, bookingDetails }) => {
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Processing payment for:", paymentData);
    alert("تمت عملية الدفع بنجاح!");
    onClose(); 
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
    },
    modalBox: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      padding: '32px',
      width: '100%',
      maxWidth: '400px',
      position: 'relative',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'none',
      border: 'none',
      fontSize: '18px',
      color: '#9ca3af',
      cursor: 'pointer',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#1f2937',
      marginTop: 0,
      marginBottom: '24px',
    },
    summaryBox: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '24px',
      border: '1px solid #f3f4f6',
      textAlign: 'left',
    },
    summaryItem: {
      marginBottom: '12px',
    },
    labelSmall: {
      fontSize: '12px',
      color: '#6b7280',
      display: 'block',
      marginBottom: '4px',
    },
    valueBold: {
      fontWeight: '600',
      color: '#1f2937',
    },
    priceBold: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2563eb',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      textAlign: 'left',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#4b5563',
      marginBottom: '6px',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box',
    },
    row: {
      display: 'flex',
      gap: '16px',
    },
    submitButton: {
      width: '100%',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      fontWeight: '500',
      padding: '14px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '12px',
      boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
      transition: 'background-color 0.2s',
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modalBox}>
        
        <button onClick={onClose} style={styles.closeButton}>✕</button>

        <h2 style={styles.title}>Secure Payment</h2>

        <div style={styles.summaryBox}>
          <div style={styles.summaryItem}>
            <span style={styles.labelSmall}>Service</span>
            <span style={styles.valueBold}>{bookingDetails?.service || 'Grand Ballroom Wedding'}</span>
          </div>
          <div style={styles.summaryItem}>
            <span style={styles.labelSmall}>Date</span>
            <span style={styles.valueBold}>{bookingDetails?.date || '18 May 2026'}</span>
          </div>
          <div style={{ marginBottom: 0 }}>
            <span style={styles.labelSmall}>Total Amount</span>
            <span style={styles.priceBold}>{bookingDetails?.total || '$6000'}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Cardholder Name</label>
            <input 
              type="text" 
              name="cardName"
              required
              value={paymentData.cardName}
              onChange={handleChange}
              placeholder="John Doe" 
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Card Number</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                name="cardNumber"
                required
                maxLength="19"
                value={paymentData.cardNumber}
                onChange={handleChange}
                placeholder="4321 **** **** ****" 
                style={styles.input}
              />
              <span style={{ position: 'absolute', right: '12px', top: '10px' }}>💳</span>
            </div>
          </div>

          <div style={styles.row}>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.inputLabel}>Expiry</label>
              <input 
                type="text" 
                name="expiry"
                required
                placeholder="MM/YY" 
                maxLength="5"
                value={paymentData.expiry}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.inputLabel}>CVV</label>
              <input 
                type="password" 
                name="cvv"
                required
                maxLength="3"
                placeholder="***" 
                value={paymentData.cvv}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>
            Proceed with Payment
          </button>
        </form>

      </div>
    </div>
  );
};

export default ConfirmBooking;