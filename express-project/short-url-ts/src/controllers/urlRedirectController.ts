import { getURLRecordByURLCode } from "../services/urlRecordService.ts";
import type { Request, Response } from "express";
import type { URLRecordResponse } from "../types/Response.ts";

interface GetOriginURLRequest extends Request {
  params: {
    urlCode: string;
  }
}

export async function getOriginURL(req: GetOriginURLRequest, res: Response<URLRecordResponse>) {
  const { urlCode } = req.params;

  // If urlCode is not provided
  if (!urlCode) {
    return res.status(400).json({ message: "URL code is required" });
  }

  // TODO: Replace with Drizzle ORM
  // If urlCode is not found
  // const urlRecord = await URLRecord.findOne({ where: { urlCode } });

  const urlRecord = await getURLRecordByURLCode(urlCode);
 
  if (!urlRecord) {
    return res.status(404).json({ message: "URL code not found" });
  }

  return res
    .status(200)
    .json({ message: "Success", data: urlRecord.originURL });
}
