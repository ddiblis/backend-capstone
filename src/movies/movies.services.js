const knex = require("../db/connection")
const Treeize = require("treeize")

const tableName = "movies"

async function listMovies(is_showing) {
  const movieReviews = new Treeize() 
  const columns = ["content", "score", "critic_id", "movie_id"]
  if(is_showing == "true") {
    const q = await knex("movies as m")
      .join("reviews as r", "r.movie_id", "m.movie_id")
      .join("critics as c", "c.critic_id", "r.critic_id")
      .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
      .join("theaters as t", "t.theater_id", "mt.theater_id")
      .where({ "mt.is_showing": 1 })
      .select("m.*",
      "r.review_id as reviews:id",
      ...columns.map(i => `r.${i} as reviews:${i}`)
      )
      return movieReviews.grow(q).getData()
}
  const q = await knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("m.*",
    "r.review_id as reviews:id",
    ...columns.map(i => `r.${i} as reviews:${i}`)
    )
  return movieReviews.grow(q).getData()
}

function readMovie(movieId) {
    return knex(tableName)
      .select("*")
      .where({ "movie_id": movieId })
      .first()
}

async function theatersForMovie(movieId) {
  const q = await knex("movies_theaters as mt")
  .join("theaters as t", "t.theater_id", "mt.theater_id")
  .join("movies as m", "m.movie_id", "mt.movie_id")
  .where({ "mt.movie_id": movieId })
  .select("t.*", "mt.is_showing", "m.movie_id")
  return q
}

async function reviewsForMovie(movieId) {
  const reviews = new Treeize()
  const columns = ["critic_id", "preferred_name", "surname", "organization_name"]
  const q = await knex("reviews as r")
  .join("critics as c", "c.critic_id", "r.critic_id")
  .join("movies as m", "m.movie_id", "r.movie_id")
  .where({ "r.movie_id": movieId })
  .select("r.*",
  ...columns.map(i => `c.${i} as critic:${i}`)
  )
  return reviews.grow(q).getData()
}

module.exports = {
    listMovies,
    readMovie,
    theatersForMovie,
    reviewsForMovie,
}