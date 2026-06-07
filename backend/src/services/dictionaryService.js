const axios = require("axios");

const fetchWordData = async (word) => {
  const response = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const data = response.data[0];

  return {
    definition:
      data.meanings?.[0]?.definitions?.[0]?.definition ||
      "No definition found",

    example:
      data.meanings?.[0]?.definitions?.[0]?.example ||
      "No example available",
  };
};

module.exports = fetchWordData;