import React, { useState } from "react";
import "./PasswordDataTable.scss";
import { MdOutlineEnhancedEncryption } from "react-icons/md";
import { RxLinkBreak2 } from "react-icons/rx";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type rowType = {
    name: string;
    date: string;
    hash: string;
};

interface TableRows {
    row: rowType;
    idx: number;
}

// Example data, replace with props or state as needed
const passwordRows = [
    { name: "Google", date: "2026-05-07", hash: "sh123456789k" },
    { name: "Facebook", date: "2026-05-06", hash: "sh987654321k" },
    { name: "Twitter", date: "2026-05-05", hash: "sh112233445k" },
];

const maskHash = (hash: string) => {
    if (hash.length <= 4) return hash;
    return hash.slice(0, 2) + "*****************" + hash.slice(-1);
};

const TableRows: React.FC<TableRows> = ({ row, idx }) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const handleCopy = (hash: string) => {
        navigator.clipboard.writeText(hash);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };
    return (
        <tr key={idx}>
            <td>{row.name}</td>
            <td>{row.date}</td>
            <td className="hash-key">{maskHash(row.hash)}</td>
            <td>
                <button
                    className="copy-btn"
                    title="Copy Hash-key"
                    onClick={() => handleCopy(row.hash)}
                >
                    {isCopied ? (
                        <>
                            <IoCheckmarkDoneOutline /> Done
                        </>
                    ) : (
                        "Copy"
                    )}
                </button>
            </td>
        </tr>
    );
};

const PasswordData: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordName, setPasswordName] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [isDecodeModalOpen, setIsDecodeModalOpen] = useState(false);
    const [decodeHash, setDecodeHash] = useState("");
    const [decodeImage, setDecodeImage] = useState<File | null>(null);

    return (
        <div className="password-data-wrapper">
            <div className="btn-containers">
                <button className="back-btn" onClick={() => navigate("/")}>Back</button>
                <div className="control-btn">
                    <button className="decode-btn" onClick={() => setIsDecodeModalOpen(true)}>
                        <RxLinkBreak2 />
                        Decode
                    </button>
                    <button className="encode-btn" onClick={() => setIsModalOpen(true)}>
                        <MdOutlineEnhancedEncryption size={20} /> Encode
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Encode Password</h2>
                        <div className="input-group">
                            <label>Password Name</label>
                            <input
                                type="text"
                                value={passwordName}
                                onChange={(e) => setPasswordName(e.target.value)}
                                placeholder="e.g. Google"
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        <p className="important-message">
                            WE NEVER STORE YOUR PASSWORDS, WE JUST ENCODE IT IN A IMAGE AND RETURN IT TO YOU
                        </p>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="submit-btn" onClick={() => setIsModalOpen(false)}>Encode</button>
                        </div>
                    </div>
                </div>
            )}

            {isDecodeModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Decode Password</h2>
                        <div className="input-group">
                            <label>Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setDecodeImage(e.target.files[0]);
                                    }
                                }}
                            />
                            {decodeImage && (
                                <img
                                    src={URL.createObjectURL(decodeImage)}
                                    alt="Preview"
                                    className="image-preview"
                                />
                            )}
                        </div>
                        <div className="input-group">
                            <label>Hash-code</label>
                            <input
                                type="text"
                                value={decodeHash}
                                onChange={(e) => setDecodeHash(e.target.value)}
                                placeholder="Enter your hash-code"
                            />
                        </div>
                        <p className="important-message-green">
                            YOU CAN COPY IT FROM THE TABLE
                        </p>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setIsDecodeModalOpen(false)}>Cancel</button>
                            <button className="submit-btn" onClick={() => setIsDecodeModalOpen(false)}>Decode</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="data-table">
                <table className="password-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Hash-key</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwordRows.map((row, idx) => (
                            <TableRows row={row} idx={idx} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="how-to-encode-decode">

            </div>
        </div>
    );
};

export default PasswordData;
