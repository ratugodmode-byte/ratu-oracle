const functionLoaders = {
  "admin-delete-experience": () => import("../functions/admin-delete-experience.js"),
  "admin-delete-sphere": () => import("../functions/admin-delete-sphere.js"),
  "admin-experiences": () => import("../functions/admin-experiences.js"),
  "admin-spheres": () => import("../functions/admin-spheres.js"),
  "admin-stats": () => import("../functions/admin-stats.js"),
  "admin-update-sphere-image": () => import("../functions/admin-update-sphere-image.js"),
  "auth-google-callback": () => import("../functions/auth-google-callback.js"),
  "auth-google-start": () => import("../functions/auth-google-start.js"),
  "auth-logout": () => import("../functions/auth-logout.js"),
  "auth-me": () => import("../functions/auth-me.js"),
  "create-sphere": () => import("../functions/create-sphere.js"),
  experiences: () => import("../functions/experiences.js"),
  health: () => import("../functions/health.js"),
  marketplace: () => import("../functions/marketplace.js"),
  "qr-code": () => import("../functions/qr-code.js"),
  sitemap: () => import("../functions/sitemap.js"),
  "site-settings": () => import("../functions/site-settings.js"),
  spheres: () => import("../functions/spheres.js")
};

function getFunctionName(req) {
  const value = req.query.function;
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(req, res) {
  const functionName = getFunctionName(req);

  try {
    const loadFunction = functionLoaders[functionName];
    if (!loadFunction) {
      return res.status(404).json({ error: "Function not found." });
    }

    const mod = await loadFunction();
    if (typeof mod.handler !== "function") {
      return res.status(404).json({ error: "Function handler not found." });
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
    for (const [key, values] of Object.entries(result.multiValueHeaders || {})) {
      res.setHeader(key, values);
    }

    res.status(result.statusCode || 200).send(result.body || "");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || "Server error.",
      function: functionName || "unknown"
    });
  }
}
