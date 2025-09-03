import React from 'react';
import bgImage from '../assets/gradientBackground.png';
import {useNavigate} from 'react-router-dom';
import {assets} from '../assets/assets.js'
const Hero = () => {
    const navigate = useNavigate();
  return (
    <div
      className="position-relative d-inline-flex flex-column w-100 justify-content-center min-vh-100 px-3 px-sm-5 px-xl-5"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
     <div className="text-center mb-5">
  <h1 className="fw-semibold mx-auto lh-sm display-6 display-sm-4 display-md-3 display-xl-1">
    Create amazing content <br />
    <span className="text-primary">AI tools</span>
  </h1>
  <p className="mt-3 fs-5 mx-auto text-muted small w-100 w-sm-75 w-xl-50">
    Transform your content creation with our suite of premium AI tools. <br></br> Write articles, generate images, and enhance your workflow.
  </p>
</div>
        <div className="d-flex flex-wrap justify-content-center gap-3 small">
      <button
        onClick={() => navigate("/ai")}
        className="btn btn-primary px-4 py-2 rounded-pill"
      >
        Start creating now
      </button>
      <button
        className="btn btn-light border px-4 py-2 rounded-pill"
      >
        Watch demo
      </button>
    </div>
      <div className="d-flex align-items-center gap-3 mt-4 mx-auto text-muted">
      <img src={assets.user_group} alt="" className="me-2" style={{ height: "32px" }} />
      Trusted by 10k+ people
    </div>
    </div>
  );
};

export default Hero;
