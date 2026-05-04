# 🔐 PixelVault – Password Steganography CLI Tool

PixelVault is a Python-based CLI tool that securely **encrypts a password** and **hides it inside an image** using steganography. The hidden data can later be extracted and decrypted only with the correct key.

---

## 🚀 Features

* 🔒 Strong encryption using AES (via Fernet)
* 🖼️ Image-based data hiding using Least Significant Bit (LSB) technique
* 🔑 Secure key-based decryption
* 💻 Simple CLI interface
* ⚡ Fast and lightweight

---

## 🧠 How It Works

### 🔐 Encoding Process

1. User provides a password
2. Password is encrypted using AES encryption
3. Encrypted data is converted to binary
4. Binary data is embedded into image pixels using LSB steganography
5. A new image is generated with hidden data

---

### 🔓 Decoding Process

1. Load encoded image
2. Extract binary data from pixel LSBs
3. Convert binary back to encrypted bytes
4. Decrypt using the provided key
5. Retrieve original password

---

## 🛠️ Tech Stack

* Python 3.x
* Pillow (image processing)
* NumPy (array manipulation)
* Cryptography (Fernet / AES)

---

## 📦 Installation

```bash
pip install pillow cryptography numpy
```

---

## ▶️ Usage

### 🔐 Encode (Hide Password in Image)

```bash
python stega.py encode \
  --output output.png \
  --password "mySecret123"
```

✅ Output:

* Encoded image (`output.png`)
* Secret key (IMPORTANT: save this key)

---

### 🔓 Decode (Extract Password)

```bash
python stega.py decode \
  --image output.png \
  --key YOUR_SECRET_KEY
```

---

## ⚠️ Important Notes

* The secret key is required for decryption. If lost, data cannot be recovered.
* Ensure the input image has enough capacity to store the encrypted data.
* This tool modifies only the least significant bits, so visual quality remains unchanged.

---

## 🧪 Example

| Step | Action                     |
| ---- | -------------------------- |
| 1    | Input password: `hello123` |
| 2    | Encrypt → Binary → Embed   |
| 3    | Output image generated     |
| 4    | Decode using key           |
| 5    | Retrieve: `hello123`       |

---

## 🚧 Future Improvements

* Add support for multiple messages
* Implement AES manually with PBKDF2 (custom key derivation)
* Add GUI (React / Web App)
* Add error correction (Hamming code)
* Support different image formats and compression handling

---

## 📁 Project Structure

```
.
├── stega.py
├── README.md
└── sample_images/
```

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 💡 Inspiration

Combines:

* AES Encryption (for security)
* LSB Steganography (for hidden storage)

---

## 👨‍💻 Author

Udit Kanti De

---
