import React, { useState } from 'react';

export default function PackageSystem({ formData, setFormData }) {
  const [newPkg, setNewPkg] = useState({ name: '', price: '', features: '' });

  const addPackage = () => {
    if (!newPkg.name || !newPkg.price) return alert('Please enter package name and price');
    
    const updatedPackages = [...(formData.packages || []), {
      id: Date.now(),
      name: newPkg.name,
      price: newPkg.price,
      features: newPkg.features.split(',').map(f => f.trim())
    }];

    setFormData({ ...formData, packages: updatedPackages });
    setNewPkg({ name: '', price: '', features: '' }); 
  };

  const removePackage = (id) => {
    const filtered = formData.packages.filter(p => p.id !== id);
    setFormData({ ...formData, packages: filtered });
  };

  return (
    <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '16px', border: '1px solid #E8D0CB', marginTop: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#4A1525' }}>
        🎁 Create Service Packages (Optional)
      </h3>
      
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', backgroundColor: '#FFF8F6', padding: '16px', borderRadius: '8px' }}>
        <input 
          type="text" 
          placeholder="Package Name (e.g., VIP Royal)" 
          value={newPkg.name}
          onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })}
          style={{ flex: '1', minWidth: '200px', padding: '10px', borderRadius: '6px', border: '1px solid #E8D0CB' }}
        />
        <input 
          type="number" 
          placeholder="Price (SYP / SAR)" 
          value={newPkg.price}
          onChange={(e) => setNewPkg({ ...newPkg, price: e.target.value })}
          style={{ width: '150px', padding: '10px', borderRadius: '6px', border: '1px solid #E8D0CB' }}
        />
        <input 
          type="text" 
          placeholder="Features (comma separated: Camera, Drone, 4K)" 
          value={newPkg.features}
          onChange={(e) => setNewPkg({ ...newPkg, features: e.target.value })}
          style={{ flex: '2', minWidth: '250px', padding: '10px', borderRadius: '6px', border: '1px solid #E8D0CB' }}
        />
        <button 
          type="button" 
          onClick={addPackage}
          style={{ backgroundColor: '#4A1525', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          + Add Package
        </button>
      </div>

      {formData.packages && formData.packages.length > 0 && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {formData.packages.map((pkg) => (
            <div key={pkg.id} style={{ border: '1px solid #4A1525', borderRadius: '12px', padding: '16px', minWidth: '220px', backgroundColor: '#FCEEEB', position: 'relative' }}>
              <button 
                type="button"
                onClick={() => removePackage(pkg.id)}
                style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none', color: '#DC2626', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✕
              </button>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#4A1525' }}>{pkg.name}</h4>
              <p style={{ margin: '0 0 12px 0', fontWeight: 'bold', fontSize: '14px', color: '#4A1525' }}>{pkg.price} SYP</p>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#6B5259' }}>
                {pkg.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}