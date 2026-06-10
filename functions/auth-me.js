import { handleOptions, json, requireMethod, verifySession } from "./_shared.js";

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["GET"]);
  if (methodError) return methodError;

  const user = verifySession(event.headers.cookie || "");
  return json(200, { user });
}
