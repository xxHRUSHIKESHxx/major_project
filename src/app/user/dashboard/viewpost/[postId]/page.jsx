"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MAIN_URL } from "../../../../common/urls";
import { IoArrowBackCircleOutline } from "react-icons/io5";
const UpdatePost = dynamic(
  () => import("../../../../components/postComponents/UpdatePost"),
  {
    ssr: false,
  }
);
const RelatedPosts = dynamic(
  () => import("../../../../components/postComponents/RelatedPosts"),
  { ssr: false }
);
const Loading = dynamic(
  () => import("../../../../user/userComponents/Loading"),
  { ssr: true }
);

const PostPage = ({ params, searchParams }) => {
  const [post, setPost] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [userId, setUserId] = useState(null);

  console.log("search params", searchParams);

  let parsedUserDetails = null;
  if (searchParams.uidDetails) {
    try {
      parsedUserDetails = JSON.parse(searchParams.uidDetails);
      console.log("parsedUserDetails", parsedUserDetails);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
  console.log("userpost:>");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${MAIN_URL}post-details/${params.postId}`
        );
        setPost(response.data.post);
        setUserPosts(response.data.user_posts);
        console.log("post", response.data.post);
        console.log("posts ", response.data.user_posts);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    const user_id = localStorage.getItem("user_id");
    setUserId(user_id);
    console.log("this is user_id", user_id);

    fetchPost();
  }, [params.postId]);

  const navigateBack = () => {
    window.history.back();
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescription = () => {
    if (!post) return "Loading...";
    return showFullDescription ? post.desc : post.desc.slice(0, 2000) + "...";
  };

  const handleUpdatePost = () => {
    setShowUpdateForm(true);
  };

  const getSemesterSuffix = (sem) => {
    switch (sem) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  // Function to generate keyframe animation
  const generateKeyframeAnimation = () => {
    return `
      @keyframes moveLeftRight {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(15px);
        }
      }
    `;
  };

  return (
    <div
      style={{
        // background: "black",
        background: "#030439",
        fontFamily: "sans-serif",
        color: "#C7C7D1",
      }}
    >
      {showUpdateForm ? (
        <UpdatePost postId={post.id} postDetails={post} />
      ) : (
        <div
          style={{
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          {post ? (
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                // background: "white",
              }}
            >
              <Image
                width={500}
                height={500}
                loading="lazy"
                src={post.img}
                alt={post.title}
                style={{
                  width: "40%",
                  margin: "1rem auto",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                }}
              />
              <div
                style={{
                  // background: "red",
                  display: "flex",
                  flexDirection: "column",
                  width: "80%",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    wordSpacing: "1px",
                  }}
                >
                  {post.title}
                </h1>

                {post.desc.length > 2000 ? (
                  <p
                    style={{
                      fontSize: "16px",
                      marginBottom: "20px",
                      wordSpacing: "2px",
                      letterSpacing: "0.4px",
                    }}
                  >
                    {getDescription()}
                    {!showFullDescription ? (
                      <span
                        onClick={toggleDescription}
                        style={{ color: "#007bff", cursor: "pointer" }}
                      >
                        Read More
                      </span>
                    ) : (
                      <span
                        onClick={toggleDescription}
                        style={{ color: "#007bff", cursor: "pointer" }}
                      >
                        Read Less
                      </span>
                    )}
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: "16px",
                      // color: "#666",
                      marginBottom: "20px",
                    }}
                  >
                    {getDescription()}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  // color: "black",
                }}
              >
                <div>
                  {" "}
                  <p
                    style={{
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  >
                    Category: {post.category}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  >
                    Date: {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p>createdBy: {parsedUserDetails.name}</p>
                  <p>Branch: {parsedUserDetails.branch}</p>
                  <p>
                    Semester: {parsedUserDetails.sem}
                    {getSemesterSuffix(parsedUserDetails.sem)}
                  </p>
                </div>
              </div>

              {parsedUserDetails.id == userId ? (
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    // color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    margin: "0.5rem auto",
                    letterSpacing: "1px",
                  }}
                  onClick={handleUpdatePost}
                >
                  Edit Your Post!
                </button>
              ) : null}

              <div className="container">
                <style>{generateKeyframeAnimation()}</style>
                <a
                  // title="go back"
                  onClick={navigateBack}
                  style={{
                    fontSize: "3rem",
                    color: "#007bff",
                    cursor: "pointer",
                    padding: "0 1rem",
                    position: "fixed",
                    top: "50%",
                    left: "0",
                    animation: "moveLeftRight 2s infinite alternate", // Animation applied
                  }}
                >
                  <IoArrowBackCircleOutline />
                </a>
              </div>
            </div>
          ) : (
            <Loading />
          )}

          <RelatedPosts posts={userPosts} />
        </div>
      )}
    </div>
  );
};

export default PostPage;
