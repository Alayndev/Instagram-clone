import { Modal } from "components/ui/modal/Modal";
import { Input } from "components/ui/Input";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePostText } from "lib/api";
import { useSWRConfig } from "swr";

export function EditTextForm({ setEditText, post }) {
  const { mutate } = useSWRConfig();

  const schema = object().shape({
    texto: string().required(
      "Debe ingresar la nueva descripción de la publicación."
    ),
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
    defaultValues: { texto: post.texto },
  });

  const closeModal = () => {
    setEditText(false);
    reset();
  };

  const editPost = async (data) => {
    console.log("🚀 ~ file: index.tsx ~ line 34 ~ editPost ~ data", data);
    const res = await updatePostText(post.id, data);
    console.log("🚀 ~ file: index.tsx ~ line 38 ~ editPost ~ res", res)

    if (res) {
      mutate("get-posts");
      
      closeModal();
    } else {
      //toast
      console.log("Toast");
    }
  };

  return (
    <Modal>
      <div className="flex flex-col gap-5">
        <h3>Editar texto de la publicación</h3>

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

          <div className="flex justify-between">
            <button onClick={closeModal}>Cancelar</button>

            <button onClick={handleSubmit(editPost)}>Editar texto</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
