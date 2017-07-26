var key = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var keys = key.twitterKeys;

//Twitter Stuff

var client = new Twitter({
   consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});

var params = {screen_name: 'Joseph86972451'};

///////

//Spotify Stuff

var spotify = new Spotify({
  id: "bf26948d567e4b2d96d2978f9a679b81",
  secret: "17580c19ac5c4ea1b31d86ac3b45ee14"
});

///////




var input = process.argv;

var command = process.argv[2];

var query = process.argv[3];

switch(command){
	case "my-tweets":

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	for(var i=0; i<20; i++){
		  		console.log("##################");
		    	console.log("\nTweet: "+tweets[i].text);
		    	console.log("\nCreated At: "+tweets[i].created_at);
		  		

		  }
		}
		});
	break;

	case "spotify-this-song":
			if(query==null){
				query = "The Sign Ace of Base";
			}
			spotify.search({ type: 'track', query: query, limit: 1 }, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);

			  }
			 
			// console.log(JSON.stringify(data, null, 2)); 

		  	console.log("##################");
			console.log("\nArtist Name: " + data.tracks.items[0].album.artists[0].name);
			console.log("\nThe Song Name: "+ data.tracks.items[0].name);
			console.log("\nThe Preview Link: "+ data.tracks.items[0].album.artists[0].external_urls.spotify);
			console.log("\nThe Album is: " + data.tracks.items[0].album.name);
		  	console.log("##################");
			});
	break;

	case "movie-this":
		if(query==null){
			query = "Mr. Nobody";
		}
		request('http://www.omdbapi.com/?apikey=40e9cece&tomatoes=true&t='+query+ "&r=json", function (error, response, body) {
		  console.log("##################");
		  console.log("\nTitle: ",JSON.parse(body).Title);
		  console.log("\nYear: ", JSON.parse(body).Year);
		  console.log("\nIMDB Rating : ", JSON.parse(body).imdbRating);
		  console.log("\nRotten Tomatoes Rating: ", JSON.parse(body).tomatoRating);
		  console.log("\nCountry: ", JSON.parse(body).Country);
		  console.log("\nLanguage: ", JSON.parse(body).Language);
		  console.log("\nPlot: ", JSON.parse(body).Plot);
		  console.log("\nActors: ", JSON.parse(body).Actors);
		});
	break;

	case "do-what-it-says":
		var contents;
		fs.readFile('./random.txt', 'utf8', function (err,data) {
		  if (err) {
		    return console.log(err);
		  }
		 	spotify.search({ type: 'track', query: data, limit: 1 }, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);

			  }
			 
			// console.log(JSON.stringify(data, null, 2)); 

		  	console.log("##################");
			console.log("\nArtist Name: " + data.tracks.items[0].album.artists[0].name);
			console.log("\nThe Song Name: "+ data.tracks.items[0].name);
			console.log("\nThe Preview Link: "+ data.tracks.items[0].album.artists[0].external_urls.spotify);
			console.log("\nThe Album is: " + data.tracks.items[0].album.name);
		  	console.log("##################");
			});
		});

	
	break;

	default:
	break;
}