var key = require("./keys.js");
var Twitter = require('twitter');
var keys = key.twitterKeys;
console.log(keys.consumer_key);

var client = new Twitter({
   consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});

var params = {screen_name: 'Joseph86972451'};


var input = process.argv;

var command = process.argv[2];

switch(command){
	case "my-tweets":

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    console.log(tweets[0].text);
		  }
		});
	break;

	case "spotify-this-song":
	break;

	case "movie-this":
	break;

	case "do-what-it-says":
	break;

	default:
	break;
}