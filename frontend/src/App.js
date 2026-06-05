import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data.prediction || data.error);
    } catch (error) {
      console.error("Error predicting:", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Cat or Dog?</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit">Analyze Photo</button>
        </form>

        {preview && <img src={preview} alt="Preview" className="preview-img" />}
        {result && <h2 className="result-text">It's a {result}!</h2>}
      </div>
    </div>
  );
}

export default App;