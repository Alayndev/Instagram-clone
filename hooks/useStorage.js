import { useCallback } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "lib/connections/firebase/client";

export default function useStorage() {
  const getImages = useCallback((route) => {
    const promise = new Promise((resolve, reject) => {
      storage
        .ref()
        .child(route)
        .listAll()
        .then(({ items }) => {
          const promises = items.map(async (item) => {
            const url = await item.getDownloadURL();
            return { name: item.name, url };
          });

          Promise.all(promises).then((files) => resolve(files));
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  }, []);

  const uploadFile = (folder, file, fileName) => {
    const filesRef = ref(storage, `${fileName}`);

    const task = uploadBytesResumable(filesRef, file);

    return task;
  };

  const UploadFileCompleted = (folder, file, fileName) => {
    const promise = new Promise((resolve, reject) => {
      const task = uploadFile(folder, file, fileName);

      const onProgress = () => {};

      const onError = () => {};

      const onComplete = async () => {
        resolve(await task.snapshot.ref.getDownloadURL());
      };

      task.on("state_changed", onProgress, onError, onComplete);
    });

    return promise;
  };

  return { getImages, uploadFile, UploadFileCompleted };
}
