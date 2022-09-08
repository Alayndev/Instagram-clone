import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getPostById } from "controllers/post";

async function getPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const post = await getPostById(req.query.postId as string);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error });
  }
}

const handler = methods({
  get: getPost,
});

export default handler;
