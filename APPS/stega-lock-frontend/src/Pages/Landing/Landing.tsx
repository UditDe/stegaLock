import React from 'react';
import './Landing.scss';
import TerminalDemo from './component/TerminalDemo';
import LandingNav from './component/LandingNav';
import LandingHero from './component/LandingHero';
import HowItWorks from './component/HowItWorks';
import FeaturesSection from './component/FeaturesSection';
import LandingFooter from './component/LandingFooter';

const Landing: React.FC = () => (
  <div className="stegalock">
    <LandingNav />
    <LandingHero />
    <TerminalDemo />
    <HowItWorks />
    <FeaturesSection />
    <LandingFooter />
  </div>
);

export default Landing;
