import React from 'react';
import GithubIcon from './GithubIcon';

const LandingNav: React.FC = () => (
  <nav>
    <a className="nav-logo" href="#">
      <span className="logo-icon">🔐</span>
      StegaLock
    </a>

    <ul className="nav-links">
      <li>
        <a href="#how-it-works">How it works</a>
      </li>

      <li>
        <a href="#features">Features</a>
      </li>

      <li>
        <a href="#open-source">Open Source</a>
      </li>

      <li>
        <a href="https://github.com" className="nav-github">
          <GithubIcon size={15} />
          GitHub
        </a>
      </li>
    </ul>
  </nav>
);

export default LandingNav;
