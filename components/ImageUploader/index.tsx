/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import useFiles from "hooks/useStorage";
import { MdOutlineFileUpload } from "react-icons/md";
import { getDownloadURL } from "firebase/storage";
import { ImageLoader } from "components/ui/loaders";

export function ImageUploader({
  id,
  register,
  setValue,
  error,
  value,
  readOnly,
  dataType,
}: any) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { uploadFile } = useFiles();

  const filesForImage = {
    "image/svg": [],
    "image/jpg": [],
    "image/jpeg": [],
    "image/png": [],
    "image/gif": [],
  };

  const filesForVideo = {
    "video/mp4": [],
    "video/ogv": [],
  };

  const acceptedFiles = dataType === "image" ? filesForImage : filesForVideo;

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFiles,
    disabled: readOnly,
    onDrop: (acceptedFiles) => {
      const task = uploadFile(
        "avatars",
        acceptedFiles[0],
        `${acceptedFiles[0].name}-${Date.now()}`
      );

      const onProgress = () => {
        setLoading(true);
      };

      const onError = () => {};

      const onComplete = () => {
        getDownloadURL(task.snapshot.ref).then((downloadUrl) => {
          setUrl(downloadUrl);
          setValue(id, { src: downloadUrl });
          setLoading(false);

          if (dataType === "video") {
            setValue("isVideo", true);
            setValue("image", downloadUrl);
          } else if (dataType === "image") {
            setValue("isVideo", false);
            setValue("image", downloadUrl);
          }
        });
      };

      task.on("state_changed", onProgress, onError, onComplete);
    },
  });

  useEffect(() => {
    // setValue(id, value || "");

    if (value) {
      setUrl(value.src);
    }
  }, [register, setValue, id, value]);

  return (
    <>
      <div
        {...getRootProps({
          className: `dropzone h-40 w-40 aspect-square bg-blue-maker-light grid place-items-center ${
            error ? "border border-red-500" : ""
          }`,
        })}
      >
        <input type="file" name={id} {...register(id)} {...getInputProps()} />
        {url ? (
          <div className="flex flex-col gap-2">
            {dataType === "image" ? (
              <img
                alt="Avatar"
                src={url}
                className="object-cover w-40 h-40 m-0"
              />
            ) : (
              <video
                controls
                muted
                autoPlay
                className="object-cover w-40 h-40 m-0"
              >
                <source src={url} />
              </video>
            )}
          </div>
        ) : (
          <div className="grid place-items-center cursor-pointer w-40">
            {!loading ? (
              <>
                <span className="uppercase">
                  Subir{" "}
                  {dataType === "image" ? (
                    <span>imagen</span>
                  ) : (
                    <span>video</span>
                  )}
                </span>
                <MdOutlineFileUpload />
              </>
            ) : (
              <>
                <ImageLoader className="h-40 w-40" />
              </>
            )}
          </div>
        )}
      </div>
      {error && (
        <small className="text-red-600 text-xs w-40 text-center">
          {error.message}
        </small>
      )}
    </>
  );
}
