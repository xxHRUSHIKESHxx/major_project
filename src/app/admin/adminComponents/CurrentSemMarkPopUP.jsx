import React, { useRef, useEffect, useState } from "react";
import { branch_sem_wise_subjects } from "../utils/sem_subjects";
import { insert_semester_marks } from "../adminapi/route";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdSmsFailed } from "react-icons/md";

const CurrentSemMarkPopUP = ({ data, onClose }) => {
  const branch_name = {
    cse: "Computer Science & Engineering",
    me: "Mechanical Engineering",
    ee: "Electrical Engineering",
    civil: "Civil Engineering",
  };

  const subjects =
    branch_sem_wise_subjects[data.branch]?.[`sem${data.sem}`] || [];

  const [subjectMarks, setSubjectMarks] = useState({});
  const [examType, setExamType] = useState("");
  const [unit, setUnit] = useState("Marks");
  const [showMessage, setShowMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleInputChange = (subject, value) => {
    setSubjectMarks((prevMarks) => ({
      ...prevMarks,
      [subject]: value,
    }));
  };

  const handleExamTypeChange = (value) => {
    setExamType(value);
  };

  const handleUnitChange = (value) => {
    setUnit(value);
  };

  const handleSubmit = async () => {
    try {
      const data_for_Input = {
        student_id: data.id,
        sem: data.sem,
        branch: `${data.branch}`,
        exam_type: `${examType}`,
        unit: `${unit}`,
        subject_marks: subjectMarks,
      };

      console.log("data_for_Input", data_for_Input);
      const response = await insert_semester_marks(data_for_Input);
      console.log("API Response:", response);

      setSuccessMessage("Data updated successfully.");
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
        onClose();
      }, 5000); // Close the success message popup after 5 seconds
    } catch (error) {
      console.error("Error in API call:", error);
      setErrorMessage("Something went wrong. Please try again later.");
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
        onClose();
      }, 5000); // Close the error message popup after 5 seconds
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-full flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur">
      {showMessage ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 shadow-lg p-4 rounded-lg z-50 ">
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {successMessage ? (
              <IoMdCheckmarkCircle
                style={{ fontSize: "100px", color: "#00ff00" }}
              />
            ) : (
              <MdSmsFailed style={{ fontSize: "100px", color: "red" }} />
            )}
          </div>

          <p className="text-center text-white">
            {successMessage || errorMessage}
          </p>
        </div>
      ) : (
        <div ref={popupRef} className="bg-slate-900 rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-1 justify-center">
            <h1
              style={{
                fontFamily: "sans-serif",
                backgroundImage:
                  'url("/moon.jpg"), linear-gradient(to bottom, #FFFFFF, #3B82F6)',
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              className="text-2xl font-inter font-extrabold text-white py-1 transform transition duration-300 ease-out hover:scale-105 hover:animate-shake"
            >
              set current sem marks
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold mb-1 text-white">
              {data.name}, Branch: {branch_name[data.branch]}, Sem: {data.sem}
            </h2>
            <div className="flex flex-row justify-around ">
              <div className="mb-2 text-white flex items-center">
                <label className="mr-2">Exam Type:</label>
                <select
                  className="bg-gray-950 py-2 px-3 rounded"
                  value={examType}
                  onChange={(e) => handleExamTypeChange(e.target.value)}
                >
                  <option value="">Select Exam Type</option>
                  <option value="internal1">Internal 1</option>
                  <option value="internal2">Internal 2</option>
                  <option value="final">Final</option>
                </select>
              </div>
              <div className="mb-2 ml-2 text-white flex items-center">
                <label className="mr-2">Unit:</label>
                <select
                  className="bg-gray-950 py-2 px-3 rounded"
                  value={unit}
                  onChange={(e) => handleUnitChange(e.target.value)}
                >
                  <option value="grade">Grade</option>
                  <option value="sgpa">SGPA</option>
                  <option value="marks">Marks</option>
                </select>
              </div>
            </div>

            {/* Render input fields for each subject */}
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="mb-4 text-white flex flex-col items-center"
              >
                <label className="mb-2">{subject}</label>
                <input
                  type="number"
                  className="bg-gray-950 py-2 px-3 rounded"
                  placeholder={`Enter marks for ${subject}`}
                  value={subjectMarks[subject] || ""}
                  onChange={(e) => handleInputChange(subject, e.target.value)}
                />
              </div>
            ))}
            <button
              className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded w-80 flex items-center justify-center"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentSemMarkPopUP;
