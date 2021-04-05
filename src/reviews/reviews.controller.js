const { updateReview, reviewExists, deleteReview, getReview } = require("./reviews.services")

async function reviewIdExists(req, res, next) {
  const { reviewId } = req.params;
  const error = { status: 404, message: `${reviewId} cannot be found in Database` };
  if (!reviewId) return next(error);
  res.locals.reviewId = reviewId
  const review = await reviewExists(reviewId);
  if (!review) return next(error);
  res.locals.review = review;
  next();
}

async function update(req, res) {
  const reviewId = res.locals.reviewId
  await updateReview(reviewId, req.body.data)
  const { ...data } = await getReview(reviewId)
  res.json({ data })
}

async function destroy(req, res) {
  const reviewId = res.locals.reviewId
  const data = await deleteReview(reviewId)
  res.status(204).json({ data })
}

module.exports = {
  update: [reviewIdExists, update],
  delete: [reviewIdExists, destroy],
}