import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-dark pt-5 pb-3 mt-5 border-top">
      <div className="container">
        <div className="row gy-4">

          {/* Brand + Description */}
          <div className="col-md-4">
            <h5 className="fw-bold">AImpress</h5>
            <p>
              Unlock the power of AI to generate content, transform images,
              and analyze resumes – all in one platform.
            </p>
            <p className="small text-muted">© {new Date().getFullYear()} AImpress. All rights reserved.</p>
          </div>

          {/* AI Features */}
          <div className="col-md-2">
            <h6 className="fw-semibold mb-3">AI Features</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Article Generator</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Blog Title Generator</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Image Generator</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Background Remover</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Object Remover</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Resume Analyzer</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-2">
            <h6 className="fw-semibold mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Documentation</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Blog</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-md-2">
            <h6 className="fw-semibold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Careers</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Account */}
          <div className="col-md-2">
            <h6 className="fw-semibold mb-3">Account</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Sign In</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 hover:text-primary">Sign Up</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
