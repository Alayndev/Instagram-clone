/* eslint-disable @next/next/no-img-element */
import { updatePostLikes } from "lib/api";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSWRConfig } from "swr";

export function InstagramCard({ post }) {
  const { mutate } = useSWRConfig();

  const [postsIds, setPostsIds] = useState([]);
  const [postLiked, setPostLiked] = useState(false);

  const onLike = async (postId: string) => {
    const res = await updatePostLikes(postId);

    if (res) {
      setPostLiked(true);
      setPostsIds((prevState) => {
        return [...prevState, postId];
      });

      mutate("get-posts");
    } else {
      // toast
      console.log("Toast");
    }
  };

  return (
    <div className="border-2 w-11/12 md:w-6/12 rounded-xl bg-white">
      <div className="flex justify-center w-full">
        <img src={post.image} alt="Post image" width={300} height={400} />
      </div>

      <div>
        {postLiked && postsIds.includes(post.id) ? (
          <AiFillHeart fill="red" />
        ) : (
          <AiOutlineHeart
            className="cursor-pointer"
            onClick={() => onLike(post.id)}
          />
        )}
      </div>

      <div>{post.likes} Me gusta</div>

      <p>{post.texto}</p>
    </div>
  );
}
