import type { NextPage } from "next";
import { Header } from "components/Header";
import { InstagramCard } from "components/InstagramCard";
import { useGetAllPosts } from "lib/api";

const Home: NextPage = () => {
  // Todo: Migrar a getStaticProps() SSG
  const posts = useGetAllPosts();
  console.log("🚀 ~ file: index.tsx ~ line 44 ~ posts", posts);

  return (
    <>
      <Header />

      <div className="flex flex-col gap-5 justify-center items-center">
        {posts.map((post: any) => {
          return <InstagramCard post={post} key={post.id} />;
        })}
      </div>
    </>
  );
};

export default Home;
