import axios from "axios";
import { CreatePostType, UpdateTextType, PostType } from "./types";

export const getAllPosts = async (): Promise<PostType[]> => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/posts");

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createNewPost = async (body: CreatePostType): Promise<any> => {
  try {
    const { data } = await axios.post("http://localhost:3000/api/posts", body, {
      headers: {
        "content-type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePostLikes = async (postId: string): Promise<boolean> => {
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

export const updatePostText = async (
  postId: string,
  body: UpdateTextType
): Promise<boolean> => {
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

export const getPostById = async (postId: string): Promise<PostType> => {
  try {
    const { data } = await axios.get("/api/posts/" + postId);

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
