// SWR
import useSWRImmutable from "swr/immutable";

export const useGetAllPosts = () => {
  const { data, error } = useSWRImmutable(
    "get-posts",
    async () => {
      const res = await fetch("http://localhost:3000/api/posts");
      const data = await res.json();

      console.log("fetcher Immutable");

      return data;
    },
    { suspense: true }
  );

  return data;
};

export const createNewPost = async (data) => {
  try {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const postCreated = await res.json();

    if (postCreated.created === true) {
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
    const res = await fetch("/api/posts/likes?postId=" + postId, {
      method: "PATCH",
    });

    const data = await res.json();

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
    const res = await fetch("/api/posts/text?postId=" + postId, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

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
