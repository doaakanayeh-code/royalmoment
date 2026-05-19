import React from 'react';

export default function CakeOptions({ formData, setFormData }) {
  const weights = ['1KG', '2KG', '3KG'];
  const flavors = ['Vanilla', 'Chocolate', 'Strawberry'];

  const handleSelect = (field, value) => {
    setFormData({
      ...formData,
      cakeDetails: { ...formData.cakeDetails, [field]: value }
    });
  };

  const active = { backgroundColor: '#4A1525', color: '#FFF', border: '1px solid #4A1525', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' };
  const inactive = { backgroundColor: '#FFF', color: '#4A1525', border: '1px solid #E8D0CB', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' };

  return (
    <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '16px', border: '1px solid #E8D0CB', marginTop: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>🎂 Cake Specific Configurations</h3>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Select Weight</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {weights.map(w => (
            <button key={w} type="button" onClick={() => handleSelect('weight', w)} style={formData.cakeDetails?.weight === w ? active : inactive}>{w}</button>
          ))}
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Flavor</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {flavors.map(f => (
            <button key={f} type="button" onClick={() => handleSelect('flavor', f)} style={formData.cakeDetails?.flavor === f ? active : inactive}>{f}</button>
          ))}
        </div>
      </div>
    </div>
  );
}