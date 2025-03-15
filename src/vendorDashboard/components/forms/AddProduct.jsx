// import React, { useState } from 'react';

// const categories = {
//   Clothing: ["Traditional Wear", "Western Wear"],
//   Accessories: ["Traditional Accessories", "Modern Accessories"],
//   Footwear: ["Ethnic Footwear", "Modern Footwear", "Handcrafted Footwear"],
//   "Beauty & Self-Care": ["Organic & Ayurvedic", "Luxury & Premium", "Budget & Essentials"]
// };

// const AddProduct = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//     setSelectedSubCategory(""); // Reset subcategory when category changes
//   };

//   return (
//     <div className="addProductSection">
//       <form className="productForm">
//         <h3>Add Product</h3>

//         <label>Product Name</label>
//         <input type="text" />

//         <label>Price</label>
//         <input type="text" />

//         <label>Category</label>
//         <select value={selectedCategory} onChange={handleCategoryChange}>
//           <option value="">Select Category</option>
//           {Object.keys(categories).map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>

        

//         <label>BestSeller</label>
//         <input type="text" />

//         <label>Description</label>
//         <input type="text" />

//         <label >Firm Image</label>
//         <input type="file" />
//         <br />

//         <div className=".btnContainer">
//           <button>Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const categories = {
  Clothing: ["Traditional Wear", "Western Wear"],
  Accessories: ["Traditional Accessories", "Modern Accessories"],
  Footwear: ["Ethnic Footwear", "Modern Footwear", "Handcrafted Footwear"],
  "Beauty & Self-Care": ["Organic & Ayurvedic", "Luxury & Premium", "Budget & Essentials"]
};

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [bestSeller, setBestSeller] = useState("false"); // Default value should be "false"
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if (!loginToken || !firmId) {
        console.error("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('category', selectedCategory);
      formData.append('subcategory', selectedSubCategory);
      formData.append('bestSeller', bestSeller);

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
       
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert('Product added successfully!');
      } else {
        console.error("Error:", data.message || "Failed to add product");
        alert('Failed to add product');
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert('Failed to add product');
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory(""); // Reset subcategory when category changes
  };

  const handleBestSeller = (event) => {
    setBestSeller(event.target.value);
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="addProductSection">
      <form className="productForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>

        <label>Product Name</label>
        <input type="text" value={productName}  onChange={(e) => setProductName(e.target.value)} />

        <label>Price</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Category</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {selectedCategory && (
          <>
            <label>Subcategory</label>
            <select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)}>
              <option value="">Select Subcategory</option>
              {categories[selectedCategory].map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </>
        )}

        <label>BestSeller</label>
        <select value={bestSeller} onChange={handleBestSeller}>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>

        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />

        <div className="btnContainer">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
