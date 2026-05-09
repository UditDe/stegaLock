import React from 'react';
import GithubIcon from './GithubIcon';

const LandingHero: React.FC = () => (
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
      steganography. Download your carrier image, keep your unique hashcode
      — and no one will ever know it's there.
    </p>

    <div className="hero-cta">
      <a href="#" className="btn-primary">
        🔒 Try StegaLock
      </a>

      <a href="https://github.com" className="btn-secondary">
        <GithubIcon />
        View on GitHub
      </a>
    </div>
  </div>
);

export default LandingHero;
