const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");

const cors = require("cors");

var spotifyApi = new SpotifyWebApi({
  clientId: "d7bed51d359e491e9ee15890d476b423",
  clientSecret: "4a6d999b92fc4c48a7324eeefcfe6c32",
});

let lastTimeTokenUpdated = Date.now();

const app = express();
app.use(cors());
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/search", async (req, res) => {
  const searchQuery = req.query.search;

  console.log(Date.now(), lastTimeTokenUpdated);

  if (Date.now() > lastTimeTokenUpdated) {
    const clientData = await spotifyApi.clientCredentialsGrant();
    console.log("The access token expires in " + clientData.body["expires_in"]);
    console.log("The access token is " + clientData.body["access_token"]);

    lastTimeTokenUpdated = Date.now() + clientData.body["expires_in"] * 1000;
    spotifyApi.setAccessToken(clientData.body["access_token"]);
  }

  const tracks = await spotifyApi.searchTracks(searchQuery);

  console.log("hello", { lastTimeTokenUpdated, tracks });

  res.json(tracks.body.tracks.items);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
