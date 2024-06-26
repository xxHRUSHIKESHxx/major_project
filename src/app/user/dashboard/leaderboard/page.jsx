"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { get_leader_board } from "../../user_apis/route";
const ListCard = dynamic(() => import("../../userComponents/ListCard"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse rounded-md bg-gray-500 h-16 w-90 mb-2 " />
  ),
});
const CompareRadarChart = dynamic(
  () => import("../../userComponents/CompareRadarChart"),
  { ssr: false, loading: () => <p>Loading the CompareRadarChart......</p> }
);

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isCompareClicked, setIsCompareClicked] = useState(false);
  const [tobeComparedstudent, setTobeComparedstudent] = useState(null);

  useEffect(() => {
    const fetch_leaderboard_data = async () => {
      try {
        const leader_board_data = await get_leader_board();
        setLeaderboardData(await leader_board_data);
      } catch (error) {
        console.error("Error fetching user data in home page:", error);
      }
    };
    fetch_leaderboard_data();
  }, []);

  useEffect(() => {
    {
      leaderboardData && setCurrentUserData(leaderboardData?.user);
    }
  }, [leaderboardData]);

  const handleCompareClick = () => {
    setIsCompareClicked(true);
  };

  const closePopup = () => {
    setIsCompareClicked(false);
  };

  return (
    <div style={{ backgroundColor: "#030439", height: "100vh" }}>
      {isCompareClicked && (
        <CompareRadarChart
          onClose={closePopup}
          current_user_score={currentUserData}
          tobeCompared_student_score={tobeComparedstudent}
        />
      )}

      <div style={{ width: "92%" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "bold",
            background: "linear-gradient(to bottom, #FFFFFF, #3B82F6)",
            marginTop: "0rem",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          Students Leader Board
        </div>

        <div style={{ padding: "2%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              margin: "0.3%",
              height: "10%",
            }}
          >
            <div style={{ width: "10%" }}>Rank</div>
            <div
              style={{
                textAlign: "center",
                width: "20%",
                // backgroundColor: "#FF6B6B",
                // marginLeft:'2%',
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              Name
            </div>
            <div
              style={{
                textAlign: "center",
                width: "15%",
                // backgroundColor: "#6BFFA4",
                borderRadius: "8px",
                padding: "8px",
                marginLeft: "2%",
              }}
            >
              Branch
            </div>
            <div
              style={{
                textAlign: "center",
                width: "15%",
                // backgroundColor: "#A4FF6B",
                borderRadius: "8px",
                padding: "8px",
                marginLeft: "1%",
              }}
            >
              Semister
            </div>
            <div
              style={{
                textAlign: "center",
                width: "20%",
                // backgroundColor: "#6B8CFF",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              Score
            </div>

            <button
              style={{
                color: "#FFFFFF",
                fontWeight: "bold",
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                marginRight: "1%",
              }}
            >
              Action
            </button>
          </div>
          {leaderboardData &&
            leaderboardData.top_scorers.map(
              (
                item,
                index // Add index as a key
              ) => (
                <ListCard
                  key={index}
                  data={item}
                  rank={index + 1}
                  handleCompareClick={handleCompareClick}
                  studentTobeCompared={setTobeComparedstudent}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
