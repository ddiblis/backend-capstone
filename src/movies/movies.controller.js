const { listMovies, readMovie, theatersForMovie, reviewsForMovie } = require("./movies.services")

async function movieExists(req, res, next) {
  const error = { status: 404, message: "movieId does not match any movies in the database" }
  const { movieId } = req.params
  if (!movieId) next(error)
  const data = await readMovie(movieId)
  if(!data) next(error) 
  next()
}

async function list(req, res) {
  const { is_showing } = req.query
  const data = await listMovies(is_showing)
  res.json({ data })
}

async function read(req, res) {
  const { movieId } = req.params
  const data = await readMovie(movieId)
  res.json({ data })
}

async function readTheater(req, res) {
  const { movieId } = req.params
  const data = await theatersForMovie(movieId)
  res.json({ data })
}

async function readReviews(req, res) {
  const { movieId } = req.params
  const data = await reviewsForMovie(movieId)
  res.json({ data })
}

module.exports = {
  list,
  read: [movieExists ,read],
  readTheater: [movieExists, readTheater],
  readReviews: [movieExists, readReviews],
}