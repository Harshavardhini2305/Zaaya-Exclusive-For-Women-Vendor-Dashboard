
// import React, { useState } from "react";
// import { API_URL } from "../../data/apiPath";

// const AddFirm = () => {
//   const [formData, setFormData] = useState({
//     firmName: "",
//     area: "",
//     category: [],
//     region: [],
//     offer: "",
//     image: null,
//   });

//   const [file, setFile] = useState(null);

//   const handleImageUpload = (event) => {
//     const selectedImage = event.target.files[0];
//     setFile(selectedImage);
//   };

//   const categories = [
//     "Clothing",
//     "Accessories",
//     "Footwear",
//     "Beauty & Self-Care",
//   ];

//   const regions = {
//     "Clothing": [
//       "Sarees (Pattu, Fancy, Cotton, Silk)",
//       "Lehengas",
//       "Salwar Kameez & Kurtis",
//       "Sherwanis & Ethnic Wear",
//       "Dhotis & Veshtis",
//       "Bridal Wear",
//       "Dresses & Gowns",
//       "Tops & T-Shirts",
//       "Jeans & Trousers",
//       "Jumpsuits & Playsuits",
//       "Blazers & Jackets",
//       "Winter Wear",
//     ],
//     "Accessories": [
//       "Temple Jewelry",
//       "Handmade Bangles & Bracelets",
//       "Maang Tikka & Bindis",
//       "Anklets & Toe Rings",
//       "Nose Rings (Nath)",
//       "Handbags & Clutches",
//       "Sunglasses & Watches",
//       "Fashion Jewelry (Earrings, Necklaces)",
//       "Scarves & Stoles",
//       "Belts & Hair Accessories",
//     ],
//     "Footwear": [
//       "Juttis & Mojaris",
//       "Kolhapuris",
//       "Peshawari Sandals",
//       "Embroidered Slippers",
//       "Khussa Shoes",
//       "Sneakers & Sports Shoes",
//       "Loafers & Moccasins",
//       "Heels (Block, Pencil, Wedges, Kitten)",
//       "Flats & Ballerinas",
//       "Sandals & Slippers",
//       "Boots & Ankle Boots",
//       "Handmade Leather Footwear",
//       "Embellished & Designer Shoes",
//       "Vegan & Sustainable Footwear",
//     ],
//     "Beauty & Self-Care": [
//       "Herbal Face Packs & Ubtans",
//       "Essential Oils & Natural Fragrances",
//       "Organic Skincare (Facewash, Moisturizers, Serums)",
//       "Ayurvedic Haircare (Shampoos, Oils, Masks)",
//       "Handmade Soaps & Bath Salts",
//       "Luxury Skincare (Serums, Anti-aging, Masks)",
//       "Premium Perfumes & Fragrances",
//       "Exclusive Makeup Brands",
//       "Salon-grade Haircare",
//       "Basic Skincare (Face Creams, Cleansers, Sunscreens)",
//       "Affordable Makeup (Kajal, Lip Balms, Compact Powders)",
//       "Daily-use Haircare (Shampoos, Conditioners, Hair Oils)",
//       "Hygiene & Body Care (Deodorants, Soaps, Sanitary Products)",
//     ],
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCategoryChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData((prev) => {
//       const updatedCategories = checked
//         ? [...prev.category, value]
//         : prev.category.filter((cat) => cat !== value);
//       return { ...prev, category: updatedCategories, region: [] };
//     });
//   };

//   const handleRegionChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData((prev) => {
//       const updatedRegions = checked
//         ? [...prev.region, value]
//         : prev.region.filter((reg) => reg !== value);
//       return { ...prev, region: updatedRegions };
//     });
//   };

//   const handleFirmSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const loginToken = localStorage.getItem("loginToken");
//       if (!loginToken) {
//         console.error("User not authenticated");
//         alert("User not authenticated. Please log in.");
//         return;
//       }
  
//       console.log("Form Data Before Submission:", formData); // Debugging Step
  
//       const formDataToSend = new FormData();
//       formDataToSend.append("firmName", formData.firmName);
//       formDataToSend.append("area", formData.area);
//       formDataToSend.append("offer", formData.offer);
  
//       formData.category.forEach((value) => {
//         formDataToSend.append("category[]", value); // Ensuring array submission
//       });
  
//       formData.region.forEach((value) => {
//         formDataToSend.append("region[]", value); // Ensuring array submission
//       });
  
//       if (file) {
//         formDataToSend.append("image", file);
//       }
  
//       console.log("Sending Data:", Object.fromEntries(formDataToSend)); // Debugging Step
  
//       const response = await fetch(`${API_URL}/firm/add-firm`, {
//         method: "POST",
//         headers: {
//           token: loginToken,
//         },
//         body: formDataToSend,
//       });
  
//       const data = await response.json();
//       console.log("Response Data:", data); // Debugging Step
  
//       if (response.ok) {
        
//         alert("Firm added successfully!");
//         console.log("Firm added successfully.");
//         console.log("Full API Response after adding firm:", data);

        

//       }
//       else if(data.message === "vendor can have only one firm"){
//         alert("Firm exists. Only one can be added" )
        

//       }
      
//       else {
//         alert("Failed to add firm.");
//         console.error("Error:", data);
//       }

//       console.log("This is firmID",data.firmId);

//       const firmId = data.firmId;
//       localStorage.setItem('firmId',firmId);

//     } catch (error) {
//       console.error("Submission Error:", error);
//       alert("An error occurred while submitting.");
//     }
//   };
  
//   return (
//     <div className="form-container">
//       <h2 className="form-title">Add Firm</h2>
//       <form onSubmit={handleFirmSubmit}>
//         <h3 className="section-title">Firm Name</h3>
//         <input
//           type="text"
//           name="firmName"
//           placeholder="Firm Name"
//           value={formData.firmName}
//           onChange={handleChange}
//           className="input-field"
//         />

//         <h3 className="section-title">Area</h3>
//         <input
//           type="text"
//           name="area"
//           placeholder="Area"
//           value={formData.area}
//           onChange={handleChange}
//           className="input-field"
//         />

//         <h3 className="section-title">Categories:</h3>
//         {categories.map((cat) => (
//           <label key={cat} className="checkbox-label">
//             <input
//               type="checkbox"
//               value={cat}
//               checked={formData.category.includes(cat)}
//               onChange={handleCategoryChange}
//             />
//             {cat}
//           </label>
//         ))}

//         {formData.category.length > 0 && (
//           <>
//             <h3 className="section-title">Regions:</h3>
//             {formData.category.map(
//               (cat) =>
//                 regions[cat]?.map((reg) => (
//                   <label key={reg} className="checkbox-label">
//                     <input
//                       type="checkbox"
//                       value={reg}
//                       checked={formData.region.includes(reg)}
//                       onChange={handleRegionChange}
//                     />
//                     {reg}
//                   </label>
//                 ))
//             )}
//           </>
//         )}

//         <h3 className="section-title">Offer</h3>
//         <input
//           type="text"
//           name="offer"
//           placeholder="Offer"
//           value={formData.offer}
//           onChange={handleChange}
//           className="input-field"
//         />

//         <h3 className="section-title">Firm Image</h3>
//         <input type="file" onChange={handleImageUpload} className="input-field" />

//         <button type="submit" className="submit-button">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddFirm;


import React, { useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "../../data/apiPath";

const AddFirm = () => {
  const [formData, setFormData] = useState({
    firmName: "",
    area: "",
    category: [],
    region: [],
    offer: "",
    image: null,
  });

  const [file, setFile] = useState(null);

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const categories = [
    "Clothing",
    "Accessories",
    "Footwear",
    "Beauty & Self-Care",
  ];

  const regions = {
    Clothing: [
      "Sarees (Pattu, Fancy, Cotton, Silk)",
      "Lehengas",
      "Salwar Kameez & Kurtis",
      "Sherwanis & Ethnic Wear",
      "Dhotis & Veshtis",
      "Bridal Wear",
      "Dresses & Gowns",
      "Tops & T-Shirts",
      "Jeans & Trousers",
      "Jumpsuits & Playsuits",
      "Blazers & Jackets",
      "Winter Wear",
    ],
    Accessories: [
      "Temple Jewelry",
      "Handmade Bangles & Bracelets",
      "Maang Tikka & Bindis",
      "Anklets & Toe Rings",
      "Nose Rings (Nath)",
      "Handbags & Clutches",
      "Sunglasses & Watches",
      "Fashion Jewelry (Earrings, Necklaces)",
      "Scarves & Stoles",
      "Belts & Hair Accessories",
    ],
    Footwear: [
      "Juttis & Mojaris",
      "Kolhapuris",
      "Peshawari Sandals",
      "Embroidered Slippers",
      "Khussa Shoes",
      "Sneakers & Sports Shoes",
      "Loafers & Moccasins",
      "Heels (Block, Pencil, Wedges, Kitten)",
      "Flats & Ballerinas",
      "Sandals & Slippers",
      "Boots & Ankle Boots",
      "Handmade Leather Footwear",
      "Embellished & Designer Shoes",
      "Vegan & Sustainable Footwear",
    ],
    "Beauty & Self-Care": [
      "Herbal Face Packs & Ubtans",
      "Essential Oils & Natural Fragrances",
      "Organic Skincare (Facewash, Moisturizers, Serums)",
      "Ayurvedic Haircare (Shampoos, Oils, Masks)",
      "Handmade Soaps & Bath Salts",
      "Luxury Skincare (Serums, Anti-aging, Masks)",
      "Premium Perfumes & Fragrances",
      "Exclusive Makeup Brands",
      "Salon-grade Haircare",
      "Basic Skincare (Face Creams, Cleansers, Sunscreens)",
      "Affordable Makeup (Kajal, Lip Balms, Compact Powders)",
      "Daily-use Haircare (Shampoos, Conditioners, Hair Oils)",
      "Hygiene & Body Care (Deodorants, Soaps, Sanitary Products)",
    ],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedCategories = checked
        ? [...prev.category, value]
        : prev.category.filter((cat) => cat !== value);
      return { ...prev, category: updatedCategories, region: [] };
    });
  };

  const handleRegionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedRegions = checked
        ? [...prev.region, value]
        : prev.region.filter((reg) => reg !== value);
      return { ...prev, region: updatedRegions };
    });
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        Swal.fire("Unauthorized", "Please log in first.", "warning");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("firmName", formData.firmName);
      formDataToSend.append("area", formData.area);
      formDataToSend.append("offer", formData.offer);

      formData.category.forEach((value) => {
        formDataToSend.append("category[]", value);
      });

      formData.region.forEach((value) => {
        formDataToSend.append("region[]", value);
      });

      if (file) {
        formDataToSend.append("image", file);
      }

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          token: loginToken,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", "Firm added successfully!", "success");
        localStorage.setItem("firmId", data.firmId);
      } else if (data.message === "vendor can have only one firm") {
        Swal.fire("Oops!", "Firm already exists. You can only add one.", "warning");
      } else {
        Swal.fire("Error", "Failed to add firm. Try again.", "error");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      Swal.fire("Error", "An error occurred while submitting.", "error");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Firm</h2>
      <form onSubmit={handleFirmSubmit}>
        <h3 className="section-title">Firm Name</h3>
        <input
          type="text"
          name="firmName"
          placeholder="Firm Name"
          value={formData.firmName}
          onChange={handleChange}
          className="input-field"
        />

        <h3 className="section-title">Area</h3>
        <input
          type="text"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          className="input-field"
        />

        <h3 className="section-title">Categories:</h3>
        {categories.map((cat) => (
          <label key={cat} className="checkbox-label">
            <input
              type="checkbox"
              value={cat}
              checked={formData.category.includes(cat)}
              onChange={handleCategoryChange}
            />
            {cat}
          </label>
        ))}

        {formData.category.length > 0 && (
          <>
            <h3 className="section-title">Regions:</h3>
            {formData.category.map((cat) =>
              regions[cat]?.map((reg) => (
                <label key={reg} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={reg}
                    checked={formData.region.includes(reg)}
                    onChange={handleRegionChange}
                  />
                  {reg}
                </label>
              ))
            )}
          </>
        )}

        <h3 className="section-title">Offer</h3>
        <input
          type="text"
          name="offer"
          placeholder="Offer"
          value={formData.offer}
          onChange={handleChange}
          className="input-field"
        />

        <h3 className="section-title">Firm Image</h3>
        <input type="file" onChange={handleImageUpload} className="input-field" />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFirm;
