import React from 'react';

const steps = [
  {
    number: 'STEP 01',
    icon: '🔑',
    iconClass: 'icon-blue',
    title: 'Enter your password',
    description:
      'Type in the password you want to hide. StegaLock takes it from there — nothing is stored as plaintext.',
  },
  {
    number: 'STEP 02',
    icon: '🧬',
    iconClass: 'icon-purple',
    title: 'Steganographic embedding',
    description:
      "Your password is encoded into the least significant bits of an image's pixel data. Invisible to the human eye.",
  },
  {
    number: 'STEP 03',
    icon: '📦',
    iconClass: 'icon-green',
    title: 'Get your hash + image',
    description:
      'A unique hashcode is saved to the DB. The encoded image is yours to download — we never store it on our servers.',
  },
  {
    number: 'STEP 04',
    icon: '🔓',
    iconClass: 'icon-orange',
    title: 'Decode anytime',
    description:
      'Upload your image + hashcode to retrieve the original password. Only you have both pieces of the puzzle.',
  },
];

const HowItWorks: React.FC = () => (
  <section id="how-it-works">
    <div className="section-inner">
      <div className="section-label">// how_it_works</div>

      <h2 className="section-title">From password to pixel — in seconds.</h2>

      <p className="section-desc">
        StegaLock uses LSB (Least Significant Bit) steganography to embed your
        password into image data, making it visually indistinguishable from a
        normal image.
      </p>

      <div className="how-grid">
        {steps.map((step) => (
          <div className="step-card" key={step.number}>
            <div className="step-num">{step.number}</div>
            <div className={`step-icon ${step.iconClass}`}>{step.icon}</div>
            <div className="step-title">{step.title}</div>
            <div className="step-desc">{step.description}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
