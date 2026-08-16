export function notFound(req, res) {
  res.status(404).json({ message: `Topilmadi: ${req.originalUrl}` });
}

export function errorHandler(err, _req, res, _next) {
  console.error("💥", err.message);
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({ message: err.message || "Server xatosi" });
}
