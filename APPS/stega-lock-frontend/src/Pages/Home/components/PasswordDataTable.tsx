import React, { useState } from "react";
import "./PasswordDataTable.scss";
import { MdOutlineEnhancedEncryption } from "react-icons/md";
import { RxLinkBreak2 } from "react-icons/rx";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

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
    return (
        <div className="password-data-wrapper">
            <div className="btn-containers">
                <button className="decode-btn">
                    <RxLinkBreak2 />
                    Decode
                </button>
                <button className="encode-btn">
                    <MdOutlineEnhancedEncryption size={20} /> Encode
                </button>
            </div>
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
        </div>
    );
};

export default PasswordData;
