import React from "react";
import "./ProfileSection.scss";
import { CiLogout } from "react-icons/ci";

const ProfileSection: React.FC = () => {
    return (
        <div className="profile-wrapper">
            <div className="profile-image">
                <span>P</span>
            </div>
            <div className="profile-info">
                <span className="username">person</span>
                <span className="user-email">person@spam.com</span>
            </div>
            <button className="log-out-btn">
                <CiLogout size={20} />Log Out
            </button>
        </div>
    );
};

export default ProfileSection;
