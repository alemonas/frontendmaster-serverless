const fetch = require("node-fetch");
const { URL } = require("url");
const { query } = require("./util/hasura");

exports.handler = async () => {
  const { movies } = await query({
    query: `
      query MyQuery {
        movies {
        id
        poster
        tagline
        title
      }
    }
    `,
  });
  const api = new URL("https://omdbapi.com/");
  api.searchParams.set("apikey", process.env.OMDB_API_KEY);
  const promises = movies.map((movie) => {
    api.searchParams.set("i", movie.id);

    return fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const scores = data.Ratings;
        return {
          ...movie,
          scores,
        };
      });
  });

  const moviesWithRatings = await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings),
  };
};
