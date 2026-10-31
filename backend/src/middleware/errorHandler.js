export function notFound(req, res) {
  res.status(404).json({ message: `Маршрутът ${req.originalUrl} не е намерен.` });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Възникна сървърна грешка.',
  });
}
