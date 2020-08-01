const express = require("express");
const cors = require("cors");
const app = express();
const request = require('request');

// TODO this should be in a storage layer, and with a proper storage service, not just a map. Information is lost when the app stops
// TODO async control needed, two different threads can come at the same time and try writing on the same key. Since the result is not different it's not problematic, but it's unnecessary 
var storage = new Map();

// TODO mapping should be separated. 
// TODO add structure validation on input
function GameDescription(input){
  return {
    name : input.name,
    releaseDate: input.released,
    score: input.metacritic,
    image: input.background_image
  }
}

// this should live in another file holding errors
function RequiredParam(name) {
  return {
    message: "Missing required param",
    paramName: name
  }
}

function InternalServerError() {
  return {
    message: "Missing required param"
  }
}

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// TODO create a separated layer holding controller entries
// TODO missing pagination
app.get("/", (req, res) => {
  // TODO add proper request validation to avoid repetition when this grows
  if (!req.query.title) {
    res.status(400).json(RequiredParam("title"));
    return;
  }
  var title = req.query.title.toLowerCase();

  if(storage.has(title)){
    res.json(storage.get(title));
    return;
  }
  //TODO request should be done in a different layer (like a client specifically created for this thirdparty)
  request('https://api.rawg.io/api/games?search=' + title, { json: true }, (error, response, body) => {
    if (error) { res.status(500).json(InternalServerError()); return; }
    // TODO this should return the body, mapping handled on a facade layer and then all logic on the service
    mappedGames = Object.values(body.results).map(key => GameDescription(key));
    storage.set(title, mappedGames);
    res.json(mappedGames);
  });
});