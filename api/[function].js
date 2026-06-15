import * as adminDeleteExperience from "../functions/admin-delete-experience.js";
import * as adminDeleteSphere from "../functions/admin-delete-sphere.js";
import * as adminExperiences from "../functions/admin-experiences.js";
import * as adminSpheres from "../functions/admin-spheres.js";
import * as adminStats from "../functions/admin-stats.js";
import * as authGoogleCallback from "../functions/auth-google-callback.js";
import * as authGoogleStart from "../functions/auth-google-start.js";
import * as authLogout from "../functions/auth-logout.js";
import * as authMe from "../functions/auth-me.js";
import * as createSphere from "../functions/create-sphere.js";
import * as experiences from "../functions/experiences.js";
import * as health from "../functions/health.js";
import * as marketplace from "../functions/marketplace.js";
import * as qrCode from "../functions/qr-code.js";
import * as siteSettings from "../functions/site-settings.js";
import * as spheres from "../functions/spheres.js";

const functions = {
  "admin-delete-experience": adminDeleteExperience,
  "admin-delete-sphere": adminDeleteSphere,
  "admin-experiences": adminExperiences,
  "admin-spheres": adminSpheres,
  "admin-stats": adminStats,
  "auth-google-callback": authGoogleCallback,
  "auth-google-start": authGoogleStart,
  "auth-logout": authLogout,
  "auth-me": authMe,
  "create-sphere": createSphere,
  experiences,
  health,
  marketplace,
  "qr-code": qrCode,
  "site-settings": siteSettings,
  spheres
};

export default async function handler(req, res) {
  const functionName = req.query.function;

  try {
    const mod = functions[functionName];
    if (typeof mod.handler !== "function") {
      return res.status(404).json({ error: "Function not found." });
    }

    const queryStringParameters = { ...req.query };
    delete queryStringParameters.function;

    const event = {
      httpMethod: req.method,
      headers: req.headers,
      queryStringParameters,
      body: req.body === undefined
        ? null
        : typeof req.body === "string"
          ? req.body
          : JSON.stringify(req.body)
    };

    const result = await mod.handler(event);
    for (const [key, value] of Object.entries(result.headers || {})) {
      res.setHeader(key, value);
    }

    res.status(result.statusCode || 200).send(result.body || "");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error." });
  }
}
