import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { createNewPost, getAllPosts } from "controllers/post";
import { PostType, PostCreatedRes } from "lib/types";
import { validateBody } from "lib/middlewares/schemasMiddlewares";
import * as yup from "yup";

let bodySchema = yup
  .object()
  .shape({
    image: yup.string().required("image required by body"),
    texto: yup.string(),
  })
  .noUnknown(true)
  .strict();


async function getPosts(req: NextApiRequest, res: NextApiResponse<PostType[]>) {
  const posts: PostType[] = await getAllPosts();

  res.status(200).json(posts);
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const postCreated: PostCreatedRes = await createNewPost(req.body);

    res.status(200).json(postCreated);
  } catch (error) {
    res
      .status(400)
      .json({ message: `There was an error creating a new post: ${error}` });
  }
}

const handler = methods({
  get: getPosts,
  post: validateBody(bodySchema, createPost),
});

export default handler;
