const knex = require("../db/connection")
const Treeize = require("treeize")

async function updateReview(reviewId, updatedReview) {
  const q = await knex("reviews")
  .where({ "review_id": reviewId })
  .update({...updatedReview, updated_at: knex.fn.now()})
  return q
}

async function getReview(reviewId) {  
  const reviews = new Treeize()
  const columns = ["critic_id", "preferred_name", "surname", "organization_name"]
  const q = await knex("reviews as r")
  .where({ "review_id": reviewId })
  .join("critics as c", "c.critic_id", "r.critic_id")
  .join("movies as m", "m.movie_id", "r.movie_id")
  .select("r.*",
  ...columns.map(i => `c.${i} as critic:${i}`)
  )
  return reviews.grow(q).getData()[0]
}

async function reviewExists(reviewId) {
  const q = await knex("reviews")
    .select("*")
    .where({ "review_id": reviewId })
    .first()
  return q
}

async function deleteReview(reviewId) {
  const q = await knex("reviews").where({ "review_id": reviewId }).del()
  return q
}

module.exports = {
  updateReview,
  reviewExists,
  deleteReview,
  getReview,
}