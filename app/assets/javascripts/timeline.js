;(function() {

  var input = document.querySelector('input'),
      tweets = document.querySelector('.tweets'),
      source;

  input.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) { // Enter has been pressed
      source && source.close();
      source = new EventSource(Routes.controllers.Application.tweets(input.value).url);
      source.onmessage = function (e) {
        console.log(e.data);
        var tweet = document.createElement('li');
        tweet.innerHTML = e.data;
        tweets.insertBefore(tweet, tweets.firstChild);
      };
      source.onerror = function (e) {
        console.log("error", e)
      };

      input.value = '';
    }
  });

}());
