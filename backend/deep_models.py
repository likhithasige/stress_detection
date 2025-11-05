import time
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Conv1D, MaxPooling1D, Flatten, LSTM
from tensorflow.keras.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
from utils import calculate_metrics

def train_cnn_model(X_train, X_test, y_train, y_test):
    print("\n[DL] Building CNN Model...")
    num_classes = len(np.unique(y_train))
    X_train = np.expand_dims(X_train, axis=2)
    X_test = np.expand_dims(X_test, axis=2)

    y_encoder = LabelEncoder()
    y_train = to_categorical(y_encoder.fit_transform(y_train))
    y_test_encoded = to_categorical(y_encoder.transform(y_test))

    model = Sequential([
        Conv1D(64, 3, activation='relu', input_shape=(X_train.shape[1], 1)),
        MaxPooling1D(2),
        Dropout(0.3),
        Flatten(),
        Dense(64, activation='relu'),
        Dense(num_classes, activation='softmax')
    ])

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    print("[DL] Training CNN (10 epochs)...")
    start = time.time()
    model.fit(X_train, y_train, epochs=10, batch_size=32, verbose=1)
    end = time.time()

    metrics = calculate_metrics(model, X_test, y_test_encoded, is_dl=True)
    metrics['train_time'] = round(end - start, 2)
    print(f"[DL DONE] CNN → Accuracy: {metrics['accuracy']:.3f}, F1: {metrics['f1']:.3f}")
    return metrics


def train_rnn_model(X_train, X_test, y_train, y_test):
    print("\n[DL] Building RNN (LSTM) Model...")
    num_classes = len(np.unique(y_train))
    X_train = np.expand_dims(X_train, axis=2)
    X_test = np.expand_dims(X_test, axis=2)

    y_encoder = LabelEncoder()
    y_train = to_categorical(y_encoder.fit_transform(y_train))
    y_test_encoded = to_categorical(y_encoder.transform(y_test))

    model = Sequential([
        LSTM(64, input_shape=(X_train.shape[1], 1), return_sequences=True),
        Dropout(0.3),
        LSTM(32),
        Dense(64, activation='relu'),
        Dense(num_classes, activation='softmax')
    ])

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    print("[DL] Training RNN (15 epochs)...")
    start = time.time()
    model.fit(X_train, y_train, epochs=15, batch_size=32, verbose=1)
    end = time.time()

    metrics = calculate_metrics(model, X_test, y_test_encoded, is_dl=True)
    metrics['train_time'] = round(end - start, 2)
    print(f"[DL DONE] RNN → Accuracy: {metrics['accuracy']:.3f}, F1: {metrics['f1']:.3f}")
    return metrics
