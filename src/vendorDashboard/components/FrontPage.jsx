// import { useNavigate } from "react-router-dom";

// const FrontPage = () => {
//   const navigate = useNavigate(); // Initialize navigation

// //   const handleAddShopClick = () => {
// //     navigate("/LandingPage"); 
// //   };
// const handleAddShopClick = () => {
//     // Show some loading effect (optional)
//     const button = document.querySelector(".cta-btn");
//     button.textContent = "Redirecting...";
//     button.disabled = true;

//     // Wait for 2 seconds before navigating
//     setTimeout(() => {
//       navigate("/LandingPage");
//     }, 2000);
//   };


//   return (
//     <div className="seller-hub-container">
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-content">
//           <h1>Grow Your Business with Seller Hub</h1>
//           <p>Join our platform and start selling your products to thousands of customers.</p>
//           <button onClick={handleAddShopClick} className="cta-btn">Add Your Shop</button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features">
//         <div className="feature">
//           <h2>📦 Add Your Products</h2>
//           <p>Easily list your products and manage inventory with our user-friendly interface.</p>
//         </div>
//         <div className="feature">
//           <h2>📈 Track Sales</h2>
//           <p>Monitor your sales performance and gain insights to grow your business.</p>
//         </div>
//         <div className="feature">
//           <h2>🚀 Reach More Customers</h2>
//           <p>Expand your reach and attract new buyers through our marketplace.</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FrontPage;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddShopClick = () => {
    setLoading(true); // Show overlay + blur background

    setTimeout(() => {
      navigate("/LandingPage");
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="seller-hub-container" style={{ position: "relative" }}>
      {/* Page Content always rendered */}
      <section className="hero">
        <div className="hero-content">
          <h1>Grow Your Business with Seller Hub</h1>
          <p>Join our platform and start selling your products to thousands of customers.</p>
          <button onClick={handleAddShopClick} className="cta-btn">
            Add Your Shop
          </button>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h2>📦 Add Your Products</h2>
          <p>Easily list your products and manage inventory with our user-friendly interface.</p>
        </div>
        <div className="feature">
          <h2>📈 Track Sales</h2>
          <p>Monitor your sales performance and gain insights to grow your business.</p>
        </div>
        <div className="feature">
          <h2>🚀 Reach More Customers</h2>
          <p>Expand your reach and attract new buyers through our marketplace.</p>
        </div>
      </section>

      {/* Loading overlay, shown on top with blur */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default FrontPage;

