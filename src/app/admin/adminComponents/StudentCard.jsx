import React from "react";

const StudentCard = (props) => {
  console.log(" data from student card", props.data);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#31363F",
          margin: "0.3%",
          width: "100%", // Update width to match parent component
          height: "10%",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "10%", textAlign: "left" }}>{props.data?.img ? props.data?.img : 'x'}</div>
        <div
          style={{
            textAlign: "center",
            width: "20%",
            // backgroundColor: "#FF6B6B",
            borderRadius: "8px",
            padding: "8px",
            paddingRight: "5%",
          }}
        >
          {props.data?.name}
        </div>
        <div
          style={{
            textAlign: "center",
            width: "15%",
            // backgroundColor: "#6BFFA4",
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          {props.data?.registration_number}
        </div>
        <button
          style={{
            backgroundColor: "#8C6BFF",
            color: "#FFFFFF",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#6B8CFF")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#8C6BFF")}
          // onClick={}
        >
          Details
        </button>
        <button
          style={{
            backgroundColor: "#8C6BFF",
            color: "#FFFFFF",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#6B8CFF")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#8C6BFF")}
          // onClick={}
        >
          update Academic Marks
        </button>

        <button
          style={{
            backgroundColor: "rgb(255 0 26)",
            color: "#FFFFFF",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "rgb(161 0 17)")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(255 0 26)")}
          // onClick={}
        >
        { props.data?.ban == true ? "Unban" : "Ban"}
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
