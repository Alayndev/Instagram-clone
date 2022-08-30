import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { uuidv4 } from "lib/helpers";

const Home: NextPage = () => {
  // Todo: Migrar a getStaticProps() SSG
  const [initialPosts, setInitialPosts] = useState([]);
  console.log("🚀 ~ file: index.tsx ~ line 8 ~ initialPosts", initialPosts);

  const getInitialPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setInitialPosts(data);
  };

  useEffect(() => {
    getInitialPosts();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-blue-600 font-bold underline">
        Hello world!
      </h1>

      {initialPosts.map((post: any) => {
        return <p key={uuidv4()}>{post.texto}</p>;
      })}
    </>
  );
};

export default Home;
