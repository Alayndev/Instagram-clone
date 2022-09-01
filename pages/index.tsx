import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { uuidv4 } from "lib/helpers";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Header } from "components/Header";

const Home: NextPage = () => {
  // Todo: Migrar a getStaticProps() SSG
  const [initialPosts, setInitialPosts] = useState([]);

  const [postsIds, setPostsIds] = useState([]);
  const [postLiked, setPostLiked] = useState(false);

  const getPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setInitialPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Incrementar likes.1) Devolver item actualizado 2) Volver a ejecutar getPosts() 3) RTDB
  const onLike = async (postId: string) => {
    const res = await fetch("/api/likes?postId=" + postId, {
      method: "PATCH",
    });

    const data = await res.json();

    if (data.updated === true) {
      setPostLiked(true);
      setPostsIds((prevState) => {
        return [...prevState, postId];
      });
    }
  };

  return (
    <>
      <Header />

      {/* // Todo: Componentizar InstagramCard y loader cuando initialPosts === 0 */}
      <div className="flex flex-col gap-5 justify-center items-center">
        {initialPosts.map((post: any) => {
          return (
            <div
              key={uuidv4()}
              className="border-2 w-11/12 md:w-6/12 rounded-xl bg-white"
            >
              <div className="flex justify-center w-full">
                <Image
                  src={post.image}
                  alt="Post image"
                  layout="intrinsic"
                  objectFit="contain"
                  width={300}
                  height={400}
                />
              </div>

              <div>
                {postLiked && postsIds.includes(post.id) ? (
                  <AiFillHeart fill="red" />
                ) : (
                  <AiOutlineHeart
                    className="cursor-pointer"
                    onClick={() => onLike(post.id)}
                  />
                )}
              </div>

              <div>{post.likes} Me gusta</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
