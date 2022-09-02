/* eslint-disable @next/next/no-img-element */
import { updatePostLikes } from "lib/api";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSWRConfig } from "swr";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { EditTextForm } from "components/EditTextForm";

export function InstagramCard({ post, userName }) {
  const { mutate } = useSWRConfig();

  const [postsIds, setPostsIds] = useState([]);
  const [postLiked, setPostLiked] = useState(false);

  const [editText, setEditText] = useState(false);
  const [selectedPost, setSelectedPost] = useState(false);

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

  const openEditModal = (post) => {
    setEditText(true);
    setSelectedPost(post);
  };

  return (
    <>
      <div className="border-2 w-11/12 md:w-6/12 rounded-xl bg-white">
        <div className="flex items-center justify-between p-2 pr-4 border-b-2">
          <div className="flex items-center gap-2">
            <div className="rounded-3xl bg-gradient-to-r p-[2px] from-[#8a3ab9] to-[#fbad50]">
              <div className="h-full bg-white text-white rounded-3xl p-[1px]">
                <img
                  className="w-[32px] h-[32px] rounded-3xl"
                  src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-6bd64.appspot.com/o/WhatsApp%20Image%202022-07-04%20at%2012.40.51%20PM.jpeg-1662134350288?alt=media&token=f62cf9bd-b5bf-44c2-9dc4-4fa0a4a84a17"
                  alt="Profile"
                />
              </div>
            </div>

            <div className="font-medium">{userName}</div>
          </div>

          <BsThreeDots
            className="cursor-pointer"
            onClick={() => openEditModal(post)}
          />
        </div>

        <div className="flex justify-center w-full">
          <img src={post.image} alt="Post image" width={300} height={400} />
        </div>

        <div className="p-2 flex flex-col gap-2">
          <div className="flex gap-5">
            {postLiked && postsIds.includes(post.id) ? (
              <AiFillHeart fill="red" />
            ) : (
              <AiOutlineHeart
                className="cursor-pointer"
                onClick={() => onLike(post.id)}
              />
            )}

            <FaRegComment />

            <FiSend />
          </div>

          <div className="font-medium">{post.likes} Me gusta</div>

          <div className="break-all">
            <span className="font-medium">{userName}</span> {post.texto}
          </div>
        </div>
      </div>

      {editText && <EditTextForm setEditText={setEditText} post={selectedPost} />}
    </>
  );
}
