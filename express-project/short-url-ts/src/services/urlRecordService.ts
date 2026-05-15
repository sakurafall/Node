import db from "../utils/db.helper.js";
import { urlRecordTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export async function getURLRecordByURLCode(urlCode: string) {
  const urlRecord = await db
    .select()
    .from(urlRecordTable)
    .where(eq(urlRecordTable.urlCode, urlCode));

  return urlRecord[0];
}

export async function getURLRecordByOriginURL(originURL: string) {
  const urlRecord = await db
    .select()
    .from(urlRecordTable)
    .where(eq(urlRecordTable.originURL, originURL));

  return urlRecord[0];
}

export async function createURLRecord(
  originURL: string,
  shortURL: string,
  urlCode: string,
) {
  const createdURLRecord = await db
    .insert(urlRecordTable)
    .values({
      originURL,
      shortURL,
      urlCode,
    })
    .returning();

  return createdURLRecord[0];
}
