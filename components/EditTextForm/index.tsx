import { Modal } from "components/ui/Modal";
import { Input } from "components/ui/Input";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePostText, getPostById } from "lib/api";
import { toast } from "react-hot-toast";
import { PrimaryButton, CancelButton } from "components/ui/buttons";
import { EditTextFormProps, PostType } from "lib/types";

export function EditTextForm({
  setEditText,
  post,
  posts,
  setPosts,
}: EditTextFormProps) {
  const schema = object().shape({
    texto: string().required(
      "Debe ingresar la nueva descripción de la publicación."
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { texto: post.texto },
  });

  const closeModal = () => {
    setEditText(false);
    reset();
  };

  const onEditPost = async (data) => {
    await updatePostText(post.id, data);

    const postIndex = posts.findIndex((x) => x.id === post.id);

    const postNewData = await getPostById(post.id);

    setPosts((prevState: PostType[]): PostType[] => {
      prevState.splice(postIndex, 1, postNewData);

      return [...prevState];
    });

    closeModal();
  };

  const editPost = async (data) => {
    try {
      await toast.promise(onEditPost(data), {
        loading: "Actualizando el texto...",
        success: (res) => {
          return `Texto actualizado correctamente`;
        },
        error: (err) => `${err.toString()}`,
      });
    } catch (error) {
      toast.error(`Ha ocurrido un error: ${error}`);
    }
  };

  return (
    <Modal>
      <div className="flex flex-col gap-5">
        <h3 className="text-[#000] font-bold">
          Editar texto de la publicación
        </h3>

        <form>
          <Input
            id="texto"
            name="texto"
            type="text"
            label="Texto"
            register={register}
          />

          {errors.texto && (
            <small className="text-red-600 text-xs">
              Debe ingresar la nueva descripción de la publicación.
            </small>
          )}

          <div className="flex justify-between mt-5">
            <CancelButton text="Cancelar" className="p-2" onClick={closeModal} />

            <PrimaryButton
              onClick={handleSubmit(editPost)}
              className="p-2"
              text="Editar texto"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
