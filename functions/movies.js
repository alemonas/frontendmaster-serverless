const movies = require("../data/movies.json");

exports.handler = async () => {
  console.log({ movies });
  return {
    statusCode: 200,
    body: JSON.stringify(movies),
  };
};
