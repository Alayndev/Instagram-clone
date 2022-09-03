import type { NextPage, NextPageContext } from "next";
import { Header } from "components/Header";
import { InstagramCard } from "components/InstagramCard";
import { useState } from "react";
import { getAllPosts } from "lib/api";

const Home: NextPage = ({ data }: any) => {
  const [posts, setPosts] = useState(data);
  console.log("🚀 ~ file: index.tsx ~ line 44 ~ posts", posts[0]);

  return (
    <>
      <Header setPosts={setPosts} />

      <div className="flex flex-col gap-5 justify-center items-center py-5">
        {posts.map((post: any) => {
          return (
            <InstagramCard
              post={post}
              key={post.id}
              userName="Claudio López"
              setPosts={setPosts}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps(context: NextPageContext) {
  const data = await getAllPosts();
  console.log(
    "🚀 ~ file: index.tsx ~ line 39 ~ getStaticProps ~ data",
    data[0]
  );

  return {
    props: { data }, // will be passed to the page component as props
  };
}
