import { updatePostLikes, getPostById, deletePostById } from "lib/api";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { EditTextForm } from "components/EditTextForm";
import { toast } from "react-hot-toast";
import { InstagramStory } from "components/ui/InstagramStory";
import { ShowImage } from "components/ui/ShowImage";
import { InstagramCardProps, PostType } from "lib/types";
import { Modal } from "components/ui/Modal";
import { CancelButton, PrimaryButton, SecondaryButton } from "components/ui/buttons";
import { ConfirmModal } from "components/ui/ConfirmModal/confirm-modal";

// Todo: Componentizar flujo delete para que quede limpio InstagramCard
export function InstagramCard({
  post,
  posts,
  userName,
  setPosts,
}: InstagramCardProps) {
  const [postsIds, setPostsIds] = useState([]);
  const [postLiked, setPostLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [deletePost, setDeletePost] = useState(false);
  const [editText, setEditText] = useState(false);

  // Todo: Resetearlo en cerrar y cancelar
  const [selectedPost, setSelectedPost] = useState({
    image: "",
    texto: "",
    id: "",
  });

  const onUpdateLikes = async (postId: string) => {
    await updatePostLikes(postId);

    setPostLiked(true);
    setPostsIds((prevState) => {
      return [...prevState, postId];
    });

    const postIndex = posts.findIndex((post) => post.id === postId);

    const postNewData = await getPostById(postId);

    setPosts((prevState: PostType[]): PostType[] => {
      prevState.splice(postIndex, 1, postNewData);

      return [...prevState];
    });
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

  const onDeletePost = async (postId: string) => {
    await deletePostById(postId);

    const postIndex = posts.findIndex((post) => post.id === postId);

    setPosts((prevState: PostType[]): PostType[] => {
      prevState.splice(postIndex, 1);

      return [...prevState];
    });

    setDeletePost(false);
  };

  const deletePostConfirmed = async (postId) => {
    try {
      await toast.promise(onDeletePost(postId), {
        loading: "Eliminando publicación...",
        success: (res) => {
          return `Publicación eliminada correctamente`;
        },
        error: (err) => `${err.toString()}`,
      });
    } catch (error) {
      toast.error(`Ha ocurrido un error: ${error}`);
    }
  };

  const openModal = (post) => {
    setIsOpen(true);
    setSelectedPost(post);
  };

  const openEditModal = () => {
    setIsOpen(false);
    setEditText(true);
  };

  const openDeleteModal = () => {
    setIsOpen(false);
    setDeletePost(true);
  };

  return (
    <>
      <div className="border-2 w-11/12 max-w-[450px] rounded-xl bg-white text-black">
        <div className="flex items-center justify-between p-2 pr-4 border-b-2">
          <div className="flex items-center gap-2">
            <InstagramStory src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-6bd64.appspot.com/o/WhatsApp%20Image%202022-07-04%20at%2012.40.51%20PM.jpeg-1662134350288?alt=media&token=f62cf9bd-b5bf-44c2-9dc4-4fa0a4a84a17" />

            <div className="font-medium">{userName}</div>
          </div>

          <BsThreeDots
            className="cursor-pointer"
            onClick={() => openModal(post)}
          />
        </div>

        <div className="flex justify-center mb-2">
          {post.isVideo ? (
            <video
              controls
              muted
              autoPlay
              className="h-[350px] md:h-[400px] w-full m-0"
            >
              <source src={post.image} />
            </video>
          ) : (
            <ShowImage
              src={post.image}
              alt="Post image"
              className="h-[350px] md:h-[400px] w-full m-0"
            />
          )}
        </div>

        <div className="p-2 flex flex-col gap-2">
          <div className="flex gap-5 items-center">
            {postLiked && postsIds.includes(post.id) ? (
              <AiFillHeart fill="red" className="w-7 h-7" />
            ) : (
              <AiOutlineHeart
                className="cursor-pointer w-7 h-7"
                onClick={() => updateLikes(post.id)}
              />
            )}

            <FaRegComment className="w-6 h-6" />

            <FiSend className="w-6 h-6" />
          </div>

          <div className="font-medium">
            {post.likes && <span>{post.likes} Me gusta</span>}
          </div>

          <div className="break-words">
            {post.texto && (
              <span>
                <span className="font-medium">{userName}</span> {post.texto}
              </span>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <Modal>
          <div className="flex flex-col items-center gap-5 w-48">
            <SecondaryButton text="Editar" onClick={openEditModal} className="cursor-pointer w-full" />

            <CancelButton className="w-full" text="Eliminar" onClick={openDeleteModal} />

            <PrimaryButton
              className="w-full"
              text="Cerrar"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </Modal>
      )}

      <ConfirmModal
        onCancel={() => setDeletePost(false)}
        onConfirm={() => deletePostConfirmed(selectedPost.id)}
        showConfirmation={deletePost}
        title="¿Eliminar publicación?"
        description="Si deseas eliminar la publicación, aprieta el botón Eliminar."
      />

      {editText && (
        <EditTextForm
          setEditText={setEditText}
          post={selectedPost}
          posts={posts}
          setPosts={setPosts}
        />
      )}
    </>
  );
}
