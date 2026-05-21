import React, { useRef } from 'react';

export default function MediaUploader({ category }) {
  const isMusic = category === 'Music & DJ';
  const isVideo = category === 'Videography';
  
  const fileInputRef = useRef(null);

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      console.log("الملفات التي تم اختيارها:", Array.from(files));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      console.log("الملفات التي تم إسقاطها:", Array.from(files));
    }
  };

  return (
    <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '16px', border: '1px solid #E8D0CB' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
        {isMusic ? '🎵 Upload Audio Tracks' : '📸 Upload Media Files'}
      </label>
      
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple 
        accept={isMusic ? "audio/*" : "image/*,video/*"} 
        style={{ display: 'none' }}
      />
      
      <div 
        onClick={handleContainerClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ 
          border: '2px dashed #4A1525', 
          backgroundColor: '#FCEEEB', 
          borderRadius: '12px', 
          padding: '30px', 
          textAlign: 'center', 
          minHeight: '160px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FADCD5'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FCEEEB'}
      >
        <span style={{ fontSize: '32px', marginBottom: '8px' }}>
          {isMusic ? '🎙️' : isVideo ? '🎥' : '📤'}
        </span>
        <p style={{ fontWeight: 'bold', fontSize: '14px', margin: 0, color: '#4A1525' }}>
          {isMusic ? 'Drag & Drop Audio Files' : 'Drag & Drop Photos/Videos'}
        </p>
        <p style={{ fontSize: '12px', color: '#6B5259', marginTop: '6px', maxWidth: '260px' }}>
          {isMusic 
            ? 'Supported formats: MP3, WAV (Max 20MB per track)' 
            : 'Upload up to 5 high-quality assets (Photos or MP4 videos)'}
        </p>
      </div>
    </div>
  );
}