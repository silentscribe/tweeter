/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

//   const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense, donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

// var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweet-log').append($tweet);

  function days (created) {
    const today = Date.now()
    const daysSince = Math.floor((today - created) / 87900000);
    return daysSince;
  }

  function clearScript (text){
    let newMessage = [];
    for (var i = 0; i < text.length; i++) {
      if (text[i] === '<' || text[i] === '>') {
        newMessage.push('');
      } else {
        newMessage.push(text[i]);
      }
    }
    return newMessage.join('');
  }

  function createTweetElement (tweetObj) {
    let tweetMessage = clearScript(tweetObj.content.text);
    let day = days(tweetObj.created_at)
    let $tweet = (`

      <div class="space">
          <article class="tweet">
            <header class="tweet-head">
              <img src=${tweetObj.user.avatars.small}>
              <span class="username">${tweetObj.user.name}</span>
              <span class="tw-name">${tweetObj.user.handle}</span>
            </header>
            <p>${tweetMessage}</p>
            <footer>
              <div class="timestamp">
                ${day} days ago
              </div>
              <div class="icon-wrap">
                <span>🏴↻🖤</span>
              </div>
            </footer>
          </article>
        </div>
    `);
    return $tweet;
  }

  function renderTweets (tweets) {
    tweets.forEach((tweet) => {
      const article = createTweetElement(tweet);
      $('#tweet-log').prepend(article);
    })
  }

  // renderTweets(tweetData);

  $("#compose").on('submit', function (event) {
    event.preventDefault();
    $('#tweetbox').empty();
    const serialized = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: serialized
    }).done(function () {
      loadTweets();
    });
  });

  function loadTweets () {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).done(function (tweets) {
      $('#tweet-log').empty();
      renderTweets(tweets);
    });
  }

})


