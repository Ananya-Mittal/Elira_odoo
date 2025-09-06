// src/components/DigitalLearning/DigitalLearning.js
import React from "react";
import "./DigitalLearning.css"; // Import the CSS file you shared

const DigitalLearning = () => {
  return (
    <div className="main-container">
      <div className="content-wrapper">
        {/* Header */}
        <header className="header-section">
          <div className="header-bg-blur"></div>
          <div className="header-content">
            <div className="header-badge">
              <span className="header-badge-icon">🎓</span>
              <span className="header-badge-text">Digital Learning</span>
            </div>
            <h1 className="main-title">Digital Learning Hub</h1>
            <p className="main-description">
              Unlock your potential with curated{" "}
              <span className="description-highlight">courses</span>,{" "}
              <span className="description-highlight">workshops</span>, and{" "}
              <span className="description-highlight">certifications</span>{" "}
              designed for every learner.
            </p>
          </div>
        </header>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-rose">
              <span className="stat-icon">📘</span>
            </div>
            <div className="stat-number">120+</div>
            <div className="stat-label">Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-green">
              <span className="stat-icon">👩‍🎓</span>
            </div>
            <div className="stat-number">10k+</div>
            <div className="stat-label">Learners</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-blue">
              <span className="stat-icon">🌍</span>
            </div>
            <div className="stat-number">50+</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-purple">
              <span className="stat-icon">🏆</span>
            </div>
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="modules-grid">
          <div className="module-card module-card-purple">
            <div className="module-card-overlay module-card-overlay-purple"></div>
            <div className="module-content">
              <h2 className="module-title">How to become seller on Elira</h2>
              <p className="module-description">
                Learn the fundamentals of buisness and how to start working on Elira.
              </p>
              <button className="module-button module-button-purple">
                Explore →
              </button>
            </div>
          </div>

          <div className="module-card module-card-green">
            <div className="module-card-overlay module-card-overlay-green"></div>
            <div className="module-content">
              <h2 className="module-title">Business Leadership</h2>
              <p className="module-description">
                Develop essential leadership skills to succeed in business and
                entrepreneurship.
              </p>
              <button className="module-button module-button-green">
                Explore →
              </button>
            </div>
          </div>

          <div className="module-card module-card-blue">
            <div className="module-card-overlay module-card-overlay-blue"></div>
            <div className="module-content">
              <h2 className="module-title">Artificial Intelligence Basics</h2>
              <p className="module-description">
                Learn how AI will help you grow your buisness on Elira.
              </p>
              <button className="module-button module-button-blue">
                Explore →
              </button>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <section className="success-section">
          <h2 className="success-title">Success Stories</h2>
          <div className="success-grid">
            <div className="success-card">
              <div className="success-avatar">
                <span className="success-avatar-text">A</span>
              </div>
              <div className="success-name">Aarav Patel</div>
              <div className="success-location">India</div>
              <div className="success-growth">+80% Skill Growth</div>
              <div className="success-product">Completed Web Dev Program</div>
            </div>
            <div className="success-card">
              <div className="success-avatar">
                <span className="success-avatar-text">S</span>
              </div>
              <div className="success-name">Sarah Johnson</div>
              <div className="success-location">USA</div>
              <div className="success-growth">Launched Startup</div>
              <div className="success-product">
                Applied Business Leadership Training
              </div>
            </div>
            <div className="success-card">
              <div className="success-avatar">
                <span className="success-avatar-text">K</span>
              </div>
              <div className="success-name">Kenji Tanaka</div>
              <div className="success-location">Japan</div>
              <div className="success-growth">AI Specialist Role</div>
              <div className="success-product">
                Completed AI Basics Certification
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Learning?</h2>
            <p className="cta-description">
              Join thousands of learners and gain skills that matter.
            </p>
            <div className="cta-buttons">
              <a href="#courses" className="cta-button-primary">
                Browse Courses
              </a>
              <a href="#join" className="cta-button-secondary">
                Join Now
              </a>
            </div>
            <p className="cta-note">No credit card required. Start free!</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DigitalLearning;
