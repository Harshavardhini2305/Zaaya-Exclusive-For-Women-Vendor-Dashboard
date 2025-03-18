
import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

//   const productsHandler = async () => {
//     const firmId = localStorage.getItem("firmId");
//     try {
//       const response = await fetch(`${API_URL}/product/${firmId}/products`);
//       const newProductsData = await response.json();
//       setProducts(newProductsData.products);
//     } catch (error) {
//       console.error("Failed to fetch products", error);
//       alert("Failed to fetch products");
//     }
//   };

const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");
console.log("Firm ID:", firmId);

if (!firmId) {
  alert("Firm ID is missing. Please log in again or select a firm.");
  return;
}


    try {
        console.log(`Fetching from: ${API_URL}/product/${firmId}/products`);

        const response = await fetch(`${API_URL}/product/${firmId}/products`);

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const newProductsData = await response.json();
        if (!newProductsData || !newProductsData.products) {
            throw new Error("Invalid API response structure");
        }

        setProducts(newProductsData.products);
    } catch (error) {
        console.error("Failed to fetch products", error);
        alert("Failed to fetch products. Please try again later.");
    }
};




  useEffect(() => {
    console.log("AllProducts component mounted");
    productsHandler();
}, []);

  const deleteProductById = async (productId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (!isConfirmed) return;

    // Optimistic UI update
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );

    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete product");

      // Restore products if API call fails
      productsHandler();
    }
  };

  // return (
  //   <div className="product-page">
  //     <h1 className="page-title">All Products</h1>

  //     {Array.isArray(products) && !products ? (
  //       <p>No Products added</p>
  //     ) : (
  //       <div className="product-container">
  //         {Array.isArray(products) &&
  //           products.map((item) => (
  //             <div key={item._id} className="product-card">
  //               <h2>{item.productName}</h2>
  //               <p>Price: ₹{item.price}</p>
  //               <p>{item.description}</p>
  //               {item.image && (
  //                 <img
  //                   src={`${API_URL}/uploads/${item.image}`}
  //                   alt={item.productName}
  //                 />
  //               )}
  //               <button onClick={() => deleteProductById(item._id)}>
  //                 Delete
  //               </button>
  //             </div>
  //           ))}
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="product-page">
      {Array.isArray(products) && products.length > 0 ? (
        <>
          <h1 className="page-title">All Products</h1>
          <div className="product-container">
            {products.map((item) => (
              <div key={item._id} className="product-card">
                <h2>{item.productName}</h2>
                <p>Price: ₹{item.price}</p>
                <p>{item.description}</p>
                {item.image && (
                  <img
                    src={`${API_URL}/uploads/${item.image}`}
                    alt={item.productName}
                  />
                )}
                <button onClick={() => deleteProductById(item._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No Products added</p>
      )}
    </div>
  );
  
  
};

export default AllProducts;
