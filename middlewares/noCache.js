export const noCache = (req, res, next) => {
  res.set(
    "Cache-Control",
    "no-cache, no-store, must-revalidate, private, max-age=0"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
};
