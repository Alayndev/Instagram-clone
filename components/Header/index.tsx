import { useState, useEffect } from "react";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Modal } from "components/ui/modal/Modal";
import { ImageUploader } from "components/ImageUploader";
import { Input } from "components/ui/Input";
import { useForm } from "react-hook-form";
import { boolean, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createNewPost, getAllPosts } from "lib/api";
import { toast } from "react-hot-toast";
import { InstagramStory } from "components/InstagramStory";
import stories from "stories.json";

// Todo: CreateImagePostForm (Modal) - CreateVideoPostForm - Headless Tabs (por accesibilidad)
export function Header({ setPosts }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const schema = object().shape({
    photoURL: object().shape({
      src: string(),
    }),
    image: string().required("Debe ingresar la url de la imagen."),
    texto: string(),
    isVideo: boolean(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onCreatePost = async (data) => {
    await createNewPost(data);

    const posts = await getAllPosts();
    setPosts(posts);

    closeModal();
  };

  const createPost = async (data) => {
    delete data.photoURL;

    try {
      await toast.promise(onCreatePost(data), {
        loading: "Creando publicación...",
        success: (res) => {
          return `Publicación creada correctamente`;
        },
        error: (err) => `${err.toString()}`,
      });
    } catch (error) {
      toast.error(`Ha ocurrido un error: ${error}`);
    }
  };

  const image =
    watch("photoURL") !== undefined ? watch("photoURL").src : undefined;

  return (
    <>
      <div className="border-b-2 p-3 flex flex-col gap-5 sticky top-0 z-50 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold">Instagram</span>

            <IoIosArrowDown className="mt-4 h-5 w-5" />
          </div>

          <div className="flex gap-3 md:gap-8 items-center justify-center">
            <AiOutlinePlus
              onClick={openModal}
              className="w-6 h-6 border-2 border-black rounded-lg cursor-pointer"
            />

            <AiOutlineHeart className="w-7 h-7" />

            <AiOutlineMessage className="w-6 h-6" />
          </div>
        </div>

        <div className="px-5 flex gap-5 md:gap-10 overflow-hidden overscroll-auto overflow-x-scroll no-scrollbar">
          {stories.map((story) => {
            return (
              <InstagramStory
                width="w-[40px]"
                height="h-[40px]"
                key={story.id}
                userName={story.userName}
                src={story.src}
                closeFriends={story.closeFriends}
              />
            );
          })}
        </div>
      </div>

      {isOpen && (
        <Modal>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center justify-between">
              <AiOutlineClose
                className="w-6 h-6 cursor-pointer"
                onClick={closeModal}
              />

              <p className="font-bold">Nueva publicación</p>

              <AiOutlineArrowRight fill="blue" className="w-6 h-6" />
            </div>

            <form
              onSubmit={handleSubmit(createPost)}
              className="flex flex-col gap-5"
            >
              <ImageUploader
                register={register}
                id="photoURL"
                error={errors.photoURL}
                setValue={setValue}
                dataType="image"
              />

              <ImageUploader
                register={register}
                id="photoURL"
                error={errors.photoURL}
                setValue={setValue}
                dataType="video"
              />

              <Input
                id="image"
                name="image"
                type="text"
                label="Url"
                register={register}
                defaultValue={image}
              />

              {errors.image && (
                <small className="text-red-600 text-xs">
                  Debe ingresar la url de la imagen.
                </small>
              )}

              <Input
                id="texto"
                name="texto"
                type="text"
                label="Texto"
                register={register}
              />

              <button>Crear publicación</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
