import { databaseError, getSql, handleOptions, json, requireMethod } from "./_shared.js";

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["GET"]);
  if (methodError) return methodError;

  try {
    const sql = getSql();
    const rows = await sql`select now() as server_time`;
    return json(200, {
      ok: true,
      database: "connected",
      serverTime: rows[0].server_time
    });
  } catch (error) {
    return databaseError(error);
  }
}
