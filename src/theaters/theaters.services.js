const knex = require("../db/connection");
const Treeize = require("treeize");

async function listTheaters() {
  const theatersMovies = new Treeize()
  const columns = ['title', 'runtime_in_minutes', 'rating', 'description', 'image_url']

  try {
    const q = await knex("movies_theaters as mt")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*",
    ...columns.map(i => `m.${i} as movies:${i}`),
    "mt.is_showing as movies:is_showing",
    "t.theater_id as movies:theater_id")
    return theatersMovies.grow(q).getData()
  }
  catch (err) {
    return new Error(`The query failed due to ${err}`)
  }
}

module.exports = {
  listTheaters,
};
