const axios = require("axios");

const fetchWordData = async (word) => {
  try {
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
  } catch (error) {
    console.log("Dictionary API Error:", error.message);

    return {
      definition: "Definition not available",
      example: "No example available",
    };
  }
};

module.exports = fetchWordData;