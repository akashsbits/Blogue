import { clearHash } from "../services/cache.js";

export default async function (req, res, next) {
  // First run the route handler
  await next();

  // Then, clear the cache after the blog has been created successfully.
  clearHash(req.user.sub);
}
