import axios from "axios";

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/posts");

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const createNewPost = async (body) => {
  try {
    const { data } = await axios.post("http://localhost:3000/api/posts", body, {
      headers: {
        "content-type": "application/json",
      },
    });

    console.log(data, "data createNewPost api.ts");

    if (data.created === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePostLikes = async (postId: string) => {
  try {
    const { data } = await axios.patch("/api/posts/likes?postId=" + postId);

    if (data.updated === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePostText = async (postId: string, body) => {
  try {
    const { data } = await axios.patch(
      "/api/posts/text?postId=" + postId,
      body
    );

    if (data.updated === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
