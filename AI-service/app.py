from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import cv2
import numpy as np

app = Flask(__name__)
CORS(app) # Allows your frontend to talk to your backend


model = load_model('cat_dog_mobilenet_model.h5')
labels_dict = {0: 'Cat', 1: 'Dog'}

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})
    
    file = request.files['file']

    # Read and preprocess the image
    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    try:
        # Resize to 100x100 and scale exactly like the training data
        resized = cv2.resize(img, (100,100))
        scaled = resized/255.0
        reshaped = np.reshape(scaled,(1,100,100,3))

        # Make Prediction
        prediction  = model.predict(reshaped)
        result_index  = np.argmax(prediction)
        animal = labels_dict[result_index]

        return jsonify({'prediction': animal})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
        
        