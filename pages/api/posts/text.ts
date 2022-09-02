import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { validateQuery, validateBody } from "lib/middlewares/schemasMiddlewares";
import * as yup from "yup";
import { updatePostText } from "controllers/post";

let querySchema = yup
  .object()
  .shape({
    postId: yup.string().required("postId required by query"),
  })
  .noUnknown(true)
  .strict();

let bodySchema = yup
  .object()
  .shape({
    texto: yup.string().required("Texto required by body"),
  })
  .noUnknown(true)
  .strict();

async function updateText(req: NextApiRequest, res: NextApiResponse) {
  try {
    const postUpdated = await updatePostText(req.query.postId as string, req.body.texto);

    res.status(200).json(postUpdated);
  } catch (error) {
    res.status(404).json({ error });
  }
}

const handler = methods({
  patch: validateQuery(querySchema, validateBody(bodySchema, updateText)),
});

export default handler;
