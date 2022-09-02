import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { validateQuery } from "lib/middlewares/schemasMiddlewares";
import * as yup from "yup";
import { updatePostLikes } from "controllers/post";

let querySchema = yup
  .object()
  .shape({
    postId: yup.string().required("postId required by query"),
  })
  .noUnknown(true)
  .strict();

async function updateLikes(req: NextApiRequest, res: NextApiResponse) {
  try {
    const postUpdated = await updatePostLikes(req.query.postId as string);

    res.status(200).json(postUpdated);
  } catch (error) {
    res.status(404).json({ error });
  }
}

const handler = methods({
  patch: validateQuery(querySchema, updateLikes),
});

export default handler;
