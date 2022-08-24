import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { singleUserQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    
  }
}
