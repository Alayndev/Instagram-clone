/* eslint-disable @next/next/no-img-element */
import { updatePostLikes, getAllPosts } from "lib/api";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { EditTextForm } from "components/EditTextForm";
import { toast } from "react-hot-toast";
import { InstagramStory } from "components/ui/InstagramStory";

export function InstagramCard({ post, userName, setPosts }) {
  const [postsIds, setPostsIds] = useState([]);
  const [postLiked, setPostLiked] = useState(false);

  const [editText, setEditText] = useState(false);
  const [selectedPost, setSelectedPost] = useState(false);

  const onUpdateLikes = async (postId: string) => {
    await updatePostLikes(postId);

    setPostLiked(true);
    setPostsIds((prevState) => {
      return [...prevState, postId];
    });

    const posts = await getAllPosts();
    setPosts(posts);
  };

  const updateLikes = async (postId: string) => {
    try {
      await toast.promise(onUpdateLikes(postId), {
        loading: "Actualizando publicación...",
        success: (res) => {
          return `Publicación actualizada correctamente`;
        },
        error: (err) => `${err.toString()}`,
      });
    } catch (error) {
      toast.error(`Ha ocurrido un error: ${error}`);
    }
  };

  const openEditModal = (post) => {
    setEditText(true);
    setSelectedPost(post);
  };

  return (
    <>
      <div className="border-2 w-11/12 max-w-[450px] rounded-xl bg-white">
        <div className="flex items-center justify-between p-2 pr-4 border-b-2">
          <div className="flex items-center gap-2">
            <InstagramStory
              width="w-[32px]"
              height="h-[32px]"
              src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-6bd64.appspot.com/o/WhatsApp%20Image%202022-07-04%20at%2012.40.51%20PM.jpeg-1662134350288?alt=media&token=f62cf9bd-b5bf-44c2-9dc4-4fa0a4a84a17"
            />

            <div className="font-medium">{userName}</div>
          </div>

          <BsThreeDots
            className="cursor-pointer"
            onClick={() => openEditModal(post)}
          />
        </div>

        <div className="flex justify-center">
          {post.isVideo ? (
            <video controls muted autoPlay className="h-[350px] w-full m-0">
              <source src={post.image} />
            </video>
          ) : (
            <img
              src={post.image}
              alt="Post image"
              className="h-[350px] w-full m-0"
            />
          )}
        </div>

        <div className="p-2 flex flex-col gap-2">
          <div className="flex gap-5">
            {postLiked && postsIds.includes(post.id) ? (
              <AiFillHeart fill="red" />
            ) : (
              <AiOutlineHeart
                className="cursor-pointer"
                onClick={() => updateLikes(post.id)}
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

      {editText && (
        <EditTextForm
          setEditText={setEditText}
          post={selectedPost}
          setPosts={setPosts}
        />
      )}
    </>
  );
}
