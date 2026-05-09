import React from "react";
import GithubIcon from "./GithubIcon";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { CiLogin } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";

const LandingHero: React.FC = () => {
    const navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect();
    }
    return (
        <div className="hero">
            <div className="hero-badge">
                Open Source &nbsp;·&nbsp; Steganography-based Security
            </div>

            <h1>
                <span className="line-1">
                    Hide your password
                    <br />
                </span>

                <span className="line-2">in plain sight.</span>
            </h1>

            <p className="hero-sub">
                StegaLock embeds your password invisibly inside an image using
                steganography. Download your carrier image, keep your unique
                hashcode — and no one will ever know it's there.
            </p>

            <div className="hero-cta">
                {isAuthenticated ? (
                    <a className="btn-primary" onClick={() => navigate("/home")}>
                        <RxDashboard/> Dashboard
                    </a>
                ) : (
                    <a className="btn-primary" onClick={handleLogin}>
                        <CiLogin /> Login
                    </a>
                )}

                <a
                    href="https://github.com/UditDe/stegaLock"
                    className="btn-secondary"
                >
                    <GithubIcon />
                    View on GitHub
                </a>
            </div>
        </div>
    );
};

export default LandingHero;
