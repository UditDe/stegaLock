# StegaLock — System Design Documentation

## Overview

StegaLock is a privacy-focused password steganography system where users can:

- Authenticate using Auth0
- Encrypt secrets/passwords
- Hide encrypted data inside generated images using LSB steganography
- Store only metadata and encrypted keys in the database
- Retrieve secrets later using a master password

The system is designed around:

- Ownership-based authorization
- Zero plaintext password storage
- Strong cryptographic isolation
- JWT-protected APIs

---

# High Level Architecture

```text
┌───────────────┐
│   Frontend    │
│ React + Vite  │
└──────┬────────┘
       │
       │ Login / API Requests
       ▼
┌───────────────┐
│     Auth0     │
│ Authentication│
└──────┬────────┘
       │
       │ JWT Access Token
       ▼
┌───────────────┐
│    FastAPI    │
│    Backend    │
└──────┬────────┘
       │
       │ Ownership Validation
       │ Encryption Logic
       │ Steganography Logic
       ▼
┌───────────────┐
│   MongoDB     │
│ Metadata Store│
└───────────────┘
```

---

# Core Security Principles

## 1. No Plaintext Password Storage

The system never stores:

- User passwords
- Master passwords
- Plaintext secrets
- Raw Fernet keys

---

## 2. Ownership-Based Authorization

Users can only access their own vault data.

Authorization is implemented by validating:

```python
resource.owner_id == current_user.sub
```

The frontend is never trusted for authorization.

---

## 3. JWT-Protected APIs

All API routes are protected using Auth0-issued JWT access tokens.

The backend:

- Verifies JWT signature
- Extracts authenticated user identity
- Performs ownership checks

---

## 4. Master Password Never Stored

The master password is used only for:

- Deriving encryption keys
- Unlocking encrypted vault data

It is never stored directly.

---

# Authentication Flow

## User Login

```text
User
  ↓
Auth0 Login
  ↓
Auth0 verifies identity
  ↓
JWT Access Token issued
  ↓
Frontend stores token securely
```

---

# Authorization Model

The project does not require:

- RBAC
- Admin roles
- Permission systems

Instead, authorization is resource ownership based.

## Example

A user attempting to access:

```http
GET /vault/item/123
```

Backend validation:

```python
if vault_item.owner_id != current_user.sub:
    raise HTTPException(status_code=403)
```

---

# Encryption & Steganography Pipeline

## Encode / Store Flow

### Step 1 — User Input

User provides:

- Secret password
- Master password

---

### Step 2 — Generate Fernet Key

A unique symmetric encryption key is generated.

```python
key = Fernet.generate_key()
```

---

### Step 3 — Encrypt Secret

The secret password is encrypted using Fernet.

```python
encrypted = f.encrypt(secret.encode())
```

---

### Step 4 — Embed Data Into Image

Encrypted bytes are hidden inside a generated image using:

- LSB steganography
- Bit-level embedding

```python
flat[i] = (flat[i] & 0xFE) | int(binary_data[i])
```

---

### Step 5 — Derive Encryption Key From Master Password

A secure KDF is used:

- Argon2id
- PBKDF2
- scrypt

Example:

```text
DerivedKey = KDF(master_password + salt)
```

---

### Step 6 — Encrypt Fernet Key

The Fernet key is encrypted using the derived key.

```text
EncryptedFernetKey = AES(FernetKey, DerivedKey)
```

---

### Step 7 — Store Metadata

Only encrypted metadata is stored.

The image itself is not stored.

---

# Decode / Retrieve Flow

## Step 1 — User Uploads Image

User provides:

- Generated image
- Master password

---

## Step 2 — Fetch Vault Metadata

Backend retrieves:

- Salt
- Encrypted Fernet key
- Vault metadata

---

## Step 3 — Re-Derive Key

```text
DerivedKey = KDF(master_password + salt)
```

---

## Step 4 — Decrypt Fernet Key

```text
FernetKey = AES_Decrypt(EncryptedFernetKey, DerivedKey)
```

---

## Step 5 — Extract Embedded Data

Encrypted bytes are extracted from image LSBs.

---

## Step 6 — Decrypt Secret

```python
secret = f.decrypt(encrypted_data)
```

---

## Step 7 — Return Secret

The decrypted password is returned to the authenticated user.

---

# Database Design

## MongoDB User Document

```json
{
  "_id": "ObjectId",
  "auth0_id": "auth0|abc123",
  "email": "user@example.com",
  "vault": [
    {
      "vault_id": "uuid",
      "name": "gmail",
      "created_at": "ISODate",
      "salt": "base64_salt",
      "image_hash": "sha256_hash",
      "encrypted_fernet_key": "base64_encrypted_key"
    }
  ]
}
```

---

# Recommended Improvements

## 1. Randomized Embedding Positions

Current embedding is sequential.

Better approach:

- Use pseudo-random embedding positions
- Seed random generator using derived key

This makes extraction significantly harder.

---

## 2. Natural Cover Images

Currently the system generates random noise images.

Better approach:

- Use real images
- Embed into natural image textures
- Reduce detectability

---

## 3. Compression Before Embedding

Compress encrypted payload before embedding.

Benefits:

- Smaller payload size
- Better embedding efficiency
- Reduced steganographic footprint

---

## 4. Integrity Verification

Store:

```text
SHA256(image)
```

This helps detect:

- Image tampering
- Corruption
- Modified payloads

---

# Backend Responsibilities

The FastAPI backend is responsible for:

- JWT verification
- User authentication
- Ownership validation
- Encryption orchestration
- Steganography execution
- Vault metadata management

---

# Frontend Responsibilities

The React frontend is responsible for:

- User authentication UI
- Upload/download workflows
- Token forwarding
- Vault management UI
- User interaction

The frontend should never:

- Make authorization decisions
- Store secret keys insecurely
- Trust local ownership state

---

# Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Authentication | Auth0 |
| Backend | FastAPI |
| Database | MongoDB Atlas |
| Crypto | cryptography |
| KDF | Argon2 / PBKDF2 |
| Steganography | Pillow + NumPy |

---

# API Design (Suggested)

## Authentication

```http
POST /auth/login
```

Handled by Auth0.

---

## Vault APIs

### Create Vault Item

```http
POST /vault/create
```

---

### List User Vault

```http
GET /vault
```

---

### Retrieve Secret

```http
POST /vault/decode
```

---

### Delete Vault Item

```http
DELETE /vault/{vault_id}
```

---

# Security Considerations

## Important Rules

### Never Store

- Plaintext passwords
- Master passwords
- Unencrypted Fernet keys

---

### Always Verify

- JWT validity
- Ownership
- Image integrity

---

### Prefer

- Argon2id over PBKDF2 when possible
- HTTPS everywhere
- Secure token storage
- Backend-side validation

---

# Future Enhancements

Potential future improvements:

- End-to-end encryption
- Client-side encryption
- Multi-device vault sync
- Steganalysis resistance
- Image fingerprinting
- Hardware-backed keys
- Offline mode
- Secure sharing mechanism

---

# Summary

StegaLock is designed as a secure ownership-based password steganography platform.

Key characteristics:

- Auth0-based authentication
- JWT-secured APIs
- Ownership authorization
- Fernet encryption
- KDF-derived protection
- LSB steganography
- Zero plaintext secret storage
- No RBAC complexity

The architecture emphasizes privacy, isolation, and cryptographic security while maintaining a relatively simple backend model.

