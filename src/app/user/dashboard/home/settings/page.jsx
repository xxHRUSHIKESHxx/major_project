"use client";
import { useState } from "react";
import axios from "axios";
import { MAIN_URL } from "../../../../common/urls";

const UpdatePersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    img: "",
  });

  const userId = localStorage.getItem("user_id");
  console.log("this is userId", userId);

  const handleChange = (e) => {
    if (e.target.name === "img") {
      setFormData({ ...formData, img: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  console.log("this is form data", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const FD = new FormData();
      FD.append("name", formData.name);
      FD.append("email", formData.email);
      FD.append("password", formData.password);
      FD.append("img", formData.img);

      console.log("chiga bhuuurrr", formData);
      console.log("bala", FD);

      const response = await axios.patch(
        `${MAIN_URL}user/update-personal-info/${userId}/`,
        FD,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Updated personal info:", response.data);

      if (response) {
        window.history.back();
      }
    } catch (error) {
      console.error("Error updating personal info:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "black",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "80%",
          maxWidth: "400px",
          padding: "20px",
          background: "#292929",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Update Profile
        </h2>
        <label
          style={{ display: "block", marginBottom: "10px", color: "#ffffff" }}
        >
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              color: "black",
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #666",
            }}
          />
        </label>
        <label
          style={{ display: "block", marginBottom: "10px", color: "#ffffff" }}
        >
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              color: "black",
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #666",
            }}
          />
        </label>
        <label
          style={{ display: "block", marginBottom: "10px", color: "#ffffff" }}
        >
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              color: "black",
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #666",
            }}
          />
        </label>
        <label
          style={{ display: "block", marginBottom: "10px", color: "#ffffff" }}
        >
          Image:
          <input
            type="file"
            accept="image/*"
            name="img"
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #666",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePersonalInfoForm;
