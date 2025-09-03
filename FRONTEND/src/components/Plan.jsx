import React, { useState, useEffect } from 'react';
import { PricingTable } from '@clerk/clerk-react';

const Plan = () => {
  const [paddingX, setPaddingX] = useState("20px");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) setPaddingX("230px");
      else if (width >= 768) setPaddingX("100px");
      else setPaddingX("20px");
    };

    handleResize(); // Apply padding on initial load
    window.addEventListener("resize", handleResize); // Update padding on window resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  return (
    <div className="container my-5 position-relative" style={{ zIndex: 1 }}>
      <div className="text-center mb-5">
        <h2 className="text-dark fw-semibold" style={{ fontSize: "42px" }}>
          Choose Your Plan
        </h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
        </p>
      </div>

      <div
        style={{
          paddingLeft: paddingX,
          paddingRight: paddingX,
          position: 'relative',
          zIndex: 0,
          overflow: 'visible', // optional: ensure popups aren't clipped
        }}
      >
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
