import type { NextComponentType } from "next";
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
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Header: NextComponentType = () => {
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
      src: string().required("Debe seleccionar una imagen."),
    }),
    image: string().required("Debe ingresar la url de la imagen."),
    texto: string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createPost = async (data) => {
    console.log(data, "data");

    delete data.photoURL;

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const postCreated = await res.json();
    console.log(
      "🚀 ~ file: index.tsx ~ line 47 ~ createPost ~ postCreated",
      postCreated
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold">Instagram</span>

          <IoIosArrowDown className="mt-4 h-5 w-5" />
        </div>

        <div className="flex gap-3 items-center justify-center">
          <AiOutlinePlus
            onClick={openModal}
            className="w-6 h-6 border-2 border-black rounded-lg cursor-pointer"
          />

          <AiOutlineHeart className="w-7 h-7" />

          <AiOutlineMessage className="w-6 h-6" />
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
              />

              <Input
                id="image"
                name="image"
                type="text"
                label="Url"
                register={register}
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
};
