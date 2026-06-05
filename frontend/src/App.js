import React, { useState, useRef } from 'react';
import './App.css';

// SVG Icons
const SparklesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const UploadCloudIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="M16 16l-4-4-4 4" />
  </svg>
);

const CatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5c.67 0 1.35.09 2 .26M12 5c-.67 0-1.35.09-2 .26m4-.26c2.42.63 4.26 2.56 4.75 5M10 5.26c-2.42.63-4.26 2.56-4.75 5" />
    <path d="M18.75 10c.04.42.06.84.06 1.27a6.8 6.8 0 0 1-6.8 6.8 6.8 6.8 0 0 1-6.8-6.8c0-.43.02-.85.06-1.27m13.48 0C19.4 12.63 20 15 20 15l-1.5 1.5M5.21 10C4.6 12.63 4 15 4 15l1.5 1.5" />
    <path d="M9 11h.01M15 11h.01" />
    <path d="M10.5 14h3" />
    <path d="M12 17v-1.5" />
    <path d="M19 10l2.5-4L18 7" />
    <path d="M5 10L2.5 6 6 7" />
  </svg>
);

const DogIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3c-1.1 0-2 .9-2 2v2c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4V5c0-1.1-.9-2-2-2H8z" />
    <path d="M6 7c-2 0-3.5 1.5-3.5 3.5v2.3c0 1.2.8 2.2 2 2.6l.5.2c.6.2 1-.3 1-.9V7z" />
    <path d="M18 7c2 0 3.5 1.5 3.5 3.5v2.3c0 1.2-.8 2.2-2 2.6l-.5.2c-.6.2-1-.3-1-.9V7z" />
    <path d="M9 13.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5H9z" />
    <path d="M10.5 8.5h3" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult('');
    setError('');
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleUploadZoneClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult('');
    setError('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!image) return;

    setIsAnalyzing(true);
    setError('');

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.prediction);
      }
    } catch (err) {
      console.error("Error predicting:", err);
      setError("Failed to connect to the classification service. Make sure the AI backend is running on port 5000.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="App">
      <div className="container">

        {/* Header */}
        <div className="header-area">
          <div className="brand-badge">
            <SparklesIcon />
            <span>AI Computer Vision</span>
          </div>
          <h1>AnimaSense AI</h1>
          <p className="subtitle">
            Instantly identify if your photo features a cat or a dog.
          </p>
        </div>

        {/* Upload State / Preview State */}
        {!preview ? (
          <div
            className={`upload-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleFileDrop}
            onClick={handleUploadZoneClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="file-input"
              onChange={handleInputChange}
            />
            <div className="upload-icon-container">
              <UploadCloudIcon />
            </div>
            <p className="upload-text">Drag and drop photo here</p>
            <p className="upload-hint">or click to browse from device</p>
          </div>
        ) : (
          <div>
            <div className="preview-container">
              <img
                src={preview}
                alt="Preview"
                className={`preview-img ${isAnalyzing ? 'analyzing' : ''}`}
              />
              {isAnalyzing && (
                <div className="scan-overlay">
                  <div className="scanner-line"></div>
                  <div className="scan-pulse-glow"></div>
                </div>
              )}
            </div>

            {/* Action Buttons (Only visible when not analyzed and not predicting) */}
            {!result && !isAnalyzing && (
              <div className="actions-container">
                <button className="btn btn-secondary" onClick={handleReset}>
                  Change Image
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Analyze Photo
                </button>
              </div>
            )}

            {/* Analyzing Button (Disabled state) */}
            {isAnalyzing && (
              <div className="actions-container">
                <button className="btn btn-primary" style={{ width: '100%' }} disabled>
                  <span className="spinner"></span>
                  Processing Image...
                </button>
              </div>
            )}

            {/* Error Notification */}
            {error && (
              <div className="error-banner">
                <AlertCircleIcon />
                <div>
                  <div className="error-title">Analysis Failed</div>
                  <div className="error-desc">{error}</div>
                </div>
              </div>
            )}

            {/* Results Display */}
            {result && (
              <div className={`result-card ${result.toLowerCase()}`}>
                <div className="result-header">
                  <div className="result-icon-wrapper">
                    {result === 'Cat' ? <CatIcon /> : <DogIcon />}
                  </div>
                  <div>
                    <span className="result-label">Classification Result</span>
                    <h2 className="result-val">It's a {result}!</h2>
                  </div>
                </div>

                <div className="detail-match-meter">
                  <div className="meter-labels">
                    <span>{result} Match Found</span>
                    <span>100%</span>
                  </div>
                  <div className="meter-track">
                    <div className="meter-fill"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Scan Another Button (Result state) */}
            {(result || error) && !isAnalyzing && (
              <div className="scan-again-container">
                <button className="btn btn-accent" onClick={handleReset}>
                  Scan Another Photo
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;