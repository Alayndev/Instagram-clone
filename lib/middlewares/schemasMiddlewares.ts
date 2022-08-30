import { NextApiRequest, NextApiResponse } from "next";
import type { AnySchema } from "yup";

export function validateQuery(
  schema: AnySchema,
  callback: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      await schema.validate(req.query);

      callback(req, res);
    } catch (error) {
      res.status(400).json({ message: error, field: "query" });
    }
  };
}

export function validateBody(
  schema: AnySchema,
  callback: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      await schema.validate(req.body);

      callback(req, res);
    } catch (error) {
      res.status(400).json({ message: error, field: "body" });
    }
  };
}
