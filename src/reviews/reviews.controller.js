const { updateReview, reviewExists, deleteReview, getReview } = require("./reviews.services")

async function reviewIdExists(req, res, next) {
  const { reviewId } = req.params;
  const error = { status: 404, message: `${reviewId} cannot be found in Database` };
  if (!reviewId) return next(error);
  const review = await reviewExists(reviewId);
  if (!review) return next(error);
  res.locals.review = review;
  next();
}

async function update(req, res) {
  const { reviewId } = req.params
  const { ...review } = await getReview(reviewId)
  const updatedReview = { ...review, ...req.body.data }
  const data = await updateReview(reviewId, updatedReview)
  console.log(data)
  res.json({ data })
}

async function destroy(req, res) {
  const { reviewId } = req.params
  const data = await deleteReview(reviewId)
  res.status(204).json({ data })
}

module.exports = {
  update: [reviewIdExists, update],
  delete: [reviewIdExists, destroy],
}