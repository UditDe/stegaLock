import React from "react";
import "./ProfileSection.scss";
import { CiLogout } from "react-icons/ci";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileSection: React.FC = () => {
    const { user, logout } = useAuth0();
    return (
        <div className="profile-wrapper">
            <div className="profile-image">
                <img src={user?.picture} />
            </div>
            <div className="profile-info">
                <span className="username">{user?.name}</span>
                <span className="user-email">{user?.email}</span>
            </div>
            <button className="log-out-btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                <CiLogout size={20} />
                <span className="logout-text">Log Out</span>
            </button>
        </div>
    );
};

export default ProfileSection;
