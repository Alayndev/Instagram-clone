import React from "react";
import { AiOutlineClose, AiOutlineArrowRight } from "react-icons/ai";
import { Modal } from "components/ui/Modal";
import { ImageUploader } from "components/ImageUploader";
import { Input } from "components/ui/Input";
import { useForm } from "react-hook-form";
import { boolean, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createNewPost, getAllPosts } from "lib/api";
import { toast } from "react-hot-toast";
import { CreatePostType } from "lib/types";
import { PrimaryButton } from "components/ui/buttons";
import { Tab } from "@headlessui/react";

export function CreatePostForm({ setPosts, setIsOpen }: any) {
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

  const onCreatePost = async (data: CreatePostType) => {
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
      <Modal>
        <div className="flex flex-col gap-5 md:gap-7">
          <div className="flex gap-5 items-center justify-between">
            <AiOutlineClose
              className="w-6 h-6 cursor-pointer"
              onClick={closeModal}
            />

            <p className="font-bold">Nueva publicación</p>

            <AiOutlineArrowRight fill="#458eff" className="w-6 h-6" />
          </div>

          <form
            onSubmit={handleSubmit(createPost)}
            className="flex flex-col gap-5"
          >
            <div className="w-full max-w-md px-2 sm:px-0">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  <Tab
                    className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                  ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  >
                    <button type="button">Subir imagen </button>
                  </Tab>
                  <Tab
                    className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                  ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  >
                    <button type="button">Subir video </button>
                  </Tab>
                </Tab.List>

                <Tab.Panels className="mt-2 flex items-center justify-center">
                  <Tab.Panel>
                    <ImageUploader
                      register={register}
                      id="photoURL"
                      error={errors.photoURL}
                      setValue={setValue}
                      dataType="image"
                    />
                  </Tab.Panel>

                  <Tab.Panel>
                    <ImageUploader
                      register={register}
                      id="photoURL"
                      error={errors.photoURL}
                      setValue={setValue}
                      dataType="video"
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>

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

            <PrimaryButton
              text="Crear publicación"
              onClick={handleSubmit(createPost)}
            />
          </form>
        </div>
      </Modal>
    </>
  );
}
