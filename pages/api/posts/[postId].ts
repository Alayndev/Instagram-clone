import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getPostById, deletePostById } from "controllers/post";

async function getPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const post = await getPostById(req.query.postId as string);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error });
  }
}

async function deletePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const postDeleted = await deletePostById(req.query.postId as string);

    res.status(200).json(postDeleted);
  } catch (error) {
    res.status(404).json({ error });
  }
}

const handler = methods({
  get: getPost,
  delete: deletePost,
});

export default handler;
