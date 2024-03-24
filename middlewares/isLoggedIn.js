export default (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ error: "Login required" });
  }

  next();
};
