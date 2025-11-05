# backend/app.py
import os
os.environ["KERAS_BACKEND"] = "jax"

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from keras.models import load_model
import pickle
from sklearn.metrics import confusion_matrix, roc_curve, auc
import io, base64
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)

# Load models
rnn_model = load_model("rnn_model.keras")
with open("xgb_model.pkl", "rb") as f:
    xgb_model = pickle.load(f)
with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)
with open("encoder.pkl", "rb") as f:
    encoder = pickle.load(f)

@app.route("/")
def home():
    return jsonify({"message": "Backend running successfully!"})

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    df = pd.read_csv(file)
    X = df.values
    X_scaled = scaler.transform(X)

    y_pred_rnn = (rnn_model.predict(X_scaled) > 0.5).astype(int)
    y_pred_xgb = xgb_model.predict(X_scaled)

    final_pred = np.round((y_pred_rnn.flatten() + y_pred_xgb) / 2).astype(int)
    pie_counts = {
        "Stressed": int(np.sum(final_pred == 1)),
        "Not Stressed": int(np.sum(final_pred == 0))
    }

    # Confusion matrix & ROC (synthetic y_true for demo)
    y_true = np.random.randint(0, 2, len(final_pred))
    cm = confusion_matrix(y_true, final_pred)
    fpr, tpr, _ = roc_curve(y_true, final_pred)
    roc_auc = auc(fpr, tpr)

    # Generate ROC image
    plt.figure()
    plt.plot(fpr, tpr, color="blue", lw=2, label=f"ROC curve (area = {roc_auc:.2f})")
    plt.plot([0, 1], [0, 1], color="gray", lw=1, linestyle="--")
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title("Receiver Operating Characteristic (ROC)")
    plt.legend(loc="lower right")
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    roc_img = base64.b64encode(buf.getvalue()).decode("utf-8")
    plt.close()

    return jsonify({
        "pie": pie_counts,
        "confusion_matrix": cm.tolist(),
        "roc_auc": roc_auc,
        "roc_image": roc_img
    })

if __name__ == "__main__":
    app.run(debug=True)
