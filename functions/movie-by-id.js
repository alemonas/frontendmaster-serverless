const movies = require("../data/movies.json");

exports.handler = async ({ queryStringParameters }) => {
  const { id } = queryStringParameters;
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return {
      statusCode: 404,
      body: "Not found",
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(movie),
  };
};
