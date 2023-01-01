import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: "No token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).send({ error: "Error token" });

  const [schema, token] = parts;
  if (!/^Bearer$/i.test(schema))
    return res.status(401).send({ error: "Token malformatted" });

  jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token invalid" });
    req.userId = (decoded as { id: string }).id;

    return next();
  });
};
