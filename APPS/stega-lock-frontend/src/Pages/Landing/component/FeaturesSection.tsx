import React from 'react';

const features = [
  {
    icon: '🕵️',
    title: 'Zero server-side image storage',
    description:
      'Encoded images are generated in-memory and delivered directly to you.',
  },
  {
    icon: '🔗',
    title: 'Two-factor unlock',
    description:
      'Decoding requires both your image AND the unique hashcode.',
  },
  {
    icon: '👁️‍🗨️',
    title: 'Visually indistinguishable',
    description:
      'LSB steganography changes pixel values by at most 1 bit.',
  },
];

const FeaturesSection: React.FC = () => (
  <section id="features">
    <div className="section-inner">
      <div className="section-label">// features</div>

      <h2 className="section-title">Built with security in mind.</h2>

      <p className="section-desc">
        Every design decision in StegaLock prioritizes your privacy and the
        integrity of your data.
      </p>

      <div className="features-grid">
        {features.map((feature) => (
          <div className="feat-card" key={feature.title}>
            <div className="feat-icon">{feature.icon}</div>
            <div className="feat-title">{feature.title}</div>
            <div className="feat-desc">{feature.description}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
