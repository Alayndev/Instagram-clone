/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import useFiles from "hooks/useStorage";
import { MdOutlineFileUpload } from "react-icons/md";
import { getDownloadURL } from "firebase/storage";

export function ImageUploader({
  id,
  register,
  setValue,
  error,
  value,
  readOnly,
}: any) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { uploadFile } = useFiles();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
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
            <img
              alt="Avatar"
              src={url}
              className="object-cover w-40 h-40 m-0"
            />

            <p>{url}</p>
          </div>
        ) : (
          <div className="grid place-items-center cursor-pointer w-40">
            {!loading ? (
              <>
                <span className="uppercase">Subir</span>
                <MdOutlineFileUpload />
              </>
            ) : (
              <>
                <Loading className="h-40 w-40" />
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

export const Loading = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: "auto",
      background: "#f1f2f3",
      display: "block",
      shapeRendering: "auto",
    }}
    width={200}
    height={200}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#1d3f72">
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.9166666666666666s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(30 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.8333333333333334s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(60 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.75s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(90 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.6666666666666666s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(120 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.5833333333333334s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(150 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.5s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(180 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.4166666666666667s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(210 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.3333333333333333s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(240 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.25s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(270 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.16666666666666666s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(300 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="-0.08333333333333333s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={47}
      y={24}
      rx={3}
      ry={6}
      width={6}
      height={12}
      fill="#1d3f72"
      transform="rotate(330 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="0s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
);
