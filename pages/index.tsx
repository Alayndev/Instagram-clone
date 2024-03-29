import type { NextPage, NextPageContext, InferGetStaticPropsType } from "next";
import { UpperSection } from "components/UpperSection";
import { InstagramCard } from "components/InstagramCard";
import { useState } from "react";
import { getAllPosts, createNewPost } from "lib/api";
import { BottomSection } from "components/BottomSection";
import { PostType } from "lib/types";

const Home: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [posts, setPosts] = useState(data);

  return (
    <div className="h-[100vh] flex flex-col">
      <UpperSection setPosts={setPosts} />

      <main className="grow overflow-scroll no-scrollbar bg-white">
        <div className="flex flex-col gap-5 justify-center items-center py-5">
          {posts.map((post: PostType) => {
            return (
              <InstagramCard
                post={post}
                posts={posts}
                key={post.id}
                userName="gonzaricci"
                setPosts={setPosts}
              />
            );
          })}
        </div>
      </main>

      <BottomSection />
    </div>
  );
};

export default Home;

const createInitialPosts = async () => {
  const initialPosts = [
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/instagram-clone-6bd64.appspot.com/o/WhatsApp%20Image%202022-07-04%20at%2012.40.51%20PM.jpeg-1662241822467?alt=media&token=773a7d62-43c6-4587-9197-06a047786b9e",
      texto: "Nueva foto de perfil",
      isVideo: false,
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/instagram-clone-6bd64.appspot.com/o/Captura%20de%20pantalla%20de%202022-03-01%2022-46-42.jpg-1662320994532?alt=media&token=9f734c17-1aca-4488-9af9-a3ab9aaea831",
      texto: "Lalo",
      isVideo: false,
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/instagram-clone-6bd64.appspot.com/o/b6a40322-3a06768c%20(1).mp4-1662322275038?alt=media&token=5b0b8d55-894f-4698-8ef0-48360c014ed2",
      texto: "Merienda",
      isVideo: true,
    },
  ];

  for (const post of initialPosts) {
    await createNewPost(post);
  }
};

export async function getStaticProps(context: NextPageContext) {
  // await createInitialPosts();

  const data = await getAllPosts();

  return {
    props: { data }, // will be passed to the page component as props

    revalidate: 2, 
  };
}
