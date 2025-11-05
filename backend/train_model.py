# backend/train_model.py
import os
os.environ["KERAS_BACKEND"] = "jax"

import pandas as pd
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Dropout, LSTM
from keras.callbacks import EarlyStopping
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
import pickle
import os

# === Load dataset ===
df = pd.read_csv("stress_data_large.csv")

# Example feature/label split
X = df.drop("label", axis=1)
y = df["label"]

# === Encode labels ===
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

# === Scale data ===
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# === RNN Model ===
X_reshaped = X_scaled.reshape((X_scaled.shape[0], X_scaled.shape[1], 1))

rnn = Sequential([
    LSTM(64, activation='tanh', input_shape=(X_reshaped.shape[1], 1)),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dropout(0.3),
    Dense(2, activation='softmax')
])

rnn.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

es = EarlyStopping(patience=5, restore_best_weights=True)

X_train, X_val, y_train, y_val = train_test_split(X_reshaped, y_encoded, test_size=0.2, random_state=42)
rnn.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_val, y_val), callbacks=[es])

rnn.save("rnn_model.keras")

# === XGBoost Model ===
xgb = XGBClassifier(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=4,
    subsample=0.8,
    colsample_bytree=0.8,
    gamma=0,
    reg_lambda=1,
    objective="binary:logistic",
    eval_metric="logloss",
    random_state=42
)

xgb.fit(X_scaled, y_encoded)
pickle.dump(xgb, open("xgb_model.pkl", "wb"))

# === Save preprocessors ===
pickle.dump(scaler, open("scaler.pkl", "wb"))
pickle.dump(encoder, open("encoder.pkl", "wb"))

print("✅ Models trained and saved successfully!")
