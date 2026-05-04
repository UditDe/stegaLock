
import argparse
from PIL import Image
import numpy as np
from cryptography.fernet import Fernet


# Image generation
def create_blank_image(width=1024, height=1024):
    arr = np.random.randint(0, 256, (height, width, 3), dtype=np.uint8)
    return Image.fromarray(arr)

# Encryption
def generate_key():
    """
    Generate a new Fernet symmetric encryption key.
    Returns:
        bytes: The generated key.
    """
    return Fernet.generate_key()

def encrypt_data(data, key):
    """
    Encrypt a string using the provided Fernet key.

    Args:
        data (str): The plaintext data to encrypt.
        key (bytes): The Fernet key for encryption.

    Returns:
        bytes: The encrypted data.
    """
    f = Fernet(key)
    return f.encrypt(data.encode())

def decrypt_data(encrypted_data, key):
    """
    Decrypt encrypted data using the provided Fernet key.

    Args:
        encrypted_data (bytes): The encrypted data to decrypt.
        key (bytes): The Fernet key for decryption.

    Returns:
        str: The decrypted plaintext data.
    """
    f = Fernet(key)
    return f.decrypt(encrypted_data).decode()



# Steganography (LSB)
def to_binary(data):
    """
    Convert bytes-like data to a binary string.

    Args:
        data (bytes): Data to convert.

    Returns:
        str: Binary string representation.
    """
    return ''.join(format(byte, '08b') for byte in data)

def from_binary(binary_data):
    """
    Convert a binary string back to bytes.

    Args:
        binary_data (str): Binary string to convert.

    Returns:
        bytes: The resulting bytes.
    """
    bytes_list = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
    return bytes([int(b, 2) for b in bytes_list])

def embed_data(data, output_path):
    """
    Embed binary data into the least significant bits of an image.

    Args:
        image_path (str): Path to the input image.
        data (bytes): Data to embed (should be encrypted if sensitive).
        output_path (str): Path to save the output image.

    Raises:
        ValueError: If the data is too large for the image.
    """
    img = create_blank_image()
    arr = np.array(img)

    binary_data = to_binary(data)
    data_len = len(binary_data)

    flat = arr.flatten()

    if data_len > len(flat):
        raise ValueError("Data too large for image")

    # Store length in first 32 bits
    length_bin = format(data_len, '032b')
    binary_data = length_bin + binary_data

    for i in range(len(binary_data)):
        flat[i] = (flat[i] & 0xFE) | int(binary_data[i])

    new_arr = flat.reshape(arr.shape)
    new_img = Image.fromarray(new_arr.astype('uint8'))
    new_img.save(output_path)

def extract_data(image_path):
    """
    Extract embedded binary data from the least significant bits of an image.

    Args:
        image_path (str): Path to the image with embedded data.

    Returns:
        bytes: The extracted data.
    """
    img = Image.open(image_path)
    arr = np.array(img)

    flat = arr.flatten()

    # Extract length first (first 32 bits)
    length_bin = ''.join(str(flat[i] & 1) for i in range(32))
    data_len = int(length_bin, 2)

    binary_data = ''.join(str(flat[i] & 1) for i in range(32, 32 + data_len))
    return from_binary(binary_data)





# CLI
def main():
    """
    Command-line interface for the Password Steganography Tool.
    Supports encoding (hiding) and decoding (extracting) passwords in images.
    """
    parser = argparse.ArgumentParser(description="Password Steganography Tool")

    subparsers = parser.add_subparsers(dest="command")

    # Encode command
    encode_parser = subparsers.add_parser("encode", help="Hide a password in an image.")
    # encode_parser.add_argument("--image", required=True, help="Path to the input image.")
    encode_parser.add_argument("--output", required=True, help="Path to save the output image.")
    encode_parser.add_argument("--password", required=True, help="Password to hide.")

    # Decode command
    decode_parser = subparsers.add_parser("decode", help="Extract a password from an image.")
    decode_parser.add_argument("--image", required=True, help="Path to the image with hidden password.")
    decode_parser.add_argument("--key", required=True, help="Encryption key for decryption.")

    args = parser.parse_args()

    if args.command == "encode":
        key = generate_key()
        encrypted = encrypt_data(args.password, key)
        embed_data(encrypted, args.output)

        print("\n✅ Encoding complete!")
        print("🔑 Save this key (VERY IMPORTANT):")
        print(key.decode())

    elif args.command == "decode":
        encrypted = extract_data(args.image)
        decrypted = decrypt_data(encrypted, args.key.encode())

        print("\n🔓 Decrypted password:")
        print(decrypted)

    else:
        parser.print_help()

if __name__ == "__main__":
    main()