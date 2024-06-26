import axios from "axios";
import { MAIN_URL } from "../../common/urls";

export const get_user_data = async () => {
  const userId = localStorage.getItem("user_id");
  console.log("user_id stored in local storage", userId);
  try {
    const response = await axios.get(
      `${MAIN_URL}user/get-user-data/${userId}/`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching user data:", error);
    return null;
  }
};

export const user_stats = async () => {
  try {
    const response = await axios.get(`${MAIN_URL}admins/user-stats/`);
    return response.data;
  } catch (error) {
    console.log("error in fetching user_stats", error);
    return null;
  }
};

export const get_users_by_branch = async (branch, sem) => {
  try {
    const response = await axios.get(
      `${MAIN_URL}admins/users-by-branch/${branch}/${sem}/`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching user data:", error);
    return null;
  }
};

export const update_student_info = async (user_id, data) => {
  try {
    const response = await axios.patch(
      `${MAIN_URL}admins/update-student-info/${user_id}/`,
      data
    );
    console.log("reponse data from update_student_info", response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error updating student info:", error);
    throw error; // Rethrow the error for handling in the caller
  }
};

export const get_user_scores = async (userId, sem) => {
  console.log('inside user cosres')
  try {
    const response = await axios.get(
      `${MAIN_URL}user/get-user-scores/${userId}/${sem}/`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching scores data : ", error);
    return null;
  }
};

export const get_leader_board = async () => {
  const userId = localStorage.getItem("user_id");
  try {
    const response = await axios.get(`${MAIN_URL}get-leader-board/${userId}/`);
    return response.data;
  } catch (error) {
    console.log("Error fetching leaderboard data : ", error);
    return null;
  }
};

export const update_user_scores = async (data) => {
  try {
    const response = await axios.post(
      `${MAIN_URL}admins/update-scores/`,
      data,
      {
        headers: {
          "Content-Type": "application/json", // Set Content-Type header
        },
      }
    );
    return response; // Return the response data if needed
  } catch (error) {
    console.error("Error updating student info:", error);
    throw error;
  }
};

export const get_records_by_student_id = async (data) => {
  try {
    const response = await axios.post(
      `${MAIN_URL}get-records-by-student-id/`,
      data,
      {
        headers: {
          "Content-Type": "application/json", // Set Content-Type header
        },
      }
    );
    console.log("response data from update_student_info", response.data);
    return response; // Return the response data if needed
  } catch (error) {
    console.error("Error updating student info:", error);
    throw error;
  }
};

export const insert_semester_marks = async (data) => {
  try {
    const response = await axios.post(
      `${MAIN_URL}insert-semester-marks/`,
      data
    );
    console.log("response data from update_student_info", response);
    return response.data;
  } catch (error) {
    console.error("Error updating student info:", error);
    throw error;
  }
};
export const get_user_sem_marks = async (userId) => {
  if (!userId) {
    console.error("User ID is missing.");
    return null;
  }

  const data = {
    student_id: userId,
  };

  try {
    const response = await axios.post(
      `${MAIN_URL}get-records-by-student-id/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    return null;
  }
};