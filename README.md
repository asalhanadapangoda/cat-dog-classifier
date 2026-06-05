# AnimaSense AI • Cat & Dog Classifier

AnimaSense AI is a state-of-the-art Web & AI application designed to classify photos of cats and dogs using deep learning. The project features a premium glassmorphic dark-mode web interface and a lightweight Python service powered by a MobileNetV2 convolutional neural network.

---

## 🎨 Features

- **Deep Learning Classifier**: Leverages a pre-trained MobileNetV2 neural network to deliver fast and highly accurate predictions.
- **Premium User Interface**: Modern glassmorphism card design with glowing background orbs, smooth transitions, and high-quality typography (Outfit & Inter fonts).
- **Interactive Drag & Drop**: Seamlessly drag an image directly onto the upload zone or click to browse files from your device.
- **AI Scanner Animation**: A custom green/teal laser line sweep animation runs while the neural network processes the image, enhancing user engagement.
- **Dynamic Theming**: The interface changes color schemes depending on the results—activating a playful warm orange accent for Cats and a friendly bright blue accent for Dogs.
- **Responsive Layout**: Designed to look stunning on mobile phones, tablets, laptops, and wide monitors.

---

## 📁 Repository Structure

```
cat-dog-classifier/
├── AI-service/                   # Python Flask Backend
│   ├── app.py                    # Flask API server & prediction logic
│   └── cat_dog_mobilenet_model.h5 # Pre-trained TensorFlow model
├── frontend/                     # React.js Frontend
│   ├── public/                   # Public assets & index.html
│   └── src/                      # React components & styles
│       ├── App.js                # Core layout & state transitions
│       ├── App.css               # Glassmorphic styles & animations
│       └── index.js              # Entrypoint
└── README.md                     # Project documentation (this file)
```

---

## 🚀 Getting Started

### 1. Backend Service (`AI-service`)

The backend is built with Python 3 and Flask. It exposes a CORS-enabled endpoint that loads a pre-trained TensorFlow model and pre-processes images using OpenCV.

#### Prerequisites
Make sure you have Python installed. It is highly recommended to run this inside a virtual environment.

#### Install Dependencies
Navigate to the `AI-service` folder and install requirements:
```bash
cd AI-service
pip install Flask flask-cors tensorflow opencv-python numpy
```

#### Run the Flask Server
Start the server (by default runs on `http://localhost:5000`):
```bash
python app.py
```

---

### 2. Frontend Application (`frontend`)

The frontend is a single-page application built with React.js.

#### Prerequisites
Make sure you have Node.js and npm (Node Package Manager) installed.

#### Install Dependencies
Navigate to the `frontend` folder and install the npm packages:
```bash
cd frontend
npm install
```

#### Run the React App
Start the development server (runs on `http://localhost:3000`):
```bash
npm start
```

---

## 🔌 API Documentation

### Analyze Image
Sends an uploaded image to the backend to get a prediction.

* **URL**: `/predict`
* **Method**: `POST`
* **Content-Type**: `multipart/form-data`
* **Data Params**: 
  - `file`: The selected image file (JPEG/PNG).
* **Success Response**:
  * **Code**: 200 OK
  * **Content**:
    ```json
    {
      "prediction": "Cat"
    }
    ```
* **Error Response**:
  * **Code**: 200 OK (with error message inside JSON)
  * **Content**:
    ```json
    {
      "error": "Failed to decode image or load model"
    }
    ```

---

## 🛠️ Technology Stack

- **Frontend**: React.js, CSS3 (Custom keyframes, Flexbox, Variables), HTML5
- **Backend**: Python 3, Flask, Flask-CORS
- **Machine Learning**: TensorFlow (Keras), OpenCV, NumPy
- **Design Tokens**: Glassmorphism (`backdrop-filter`), Radial gradients, Custom vector SVGs
