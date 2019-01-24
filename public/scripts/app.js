/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {


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

  $("#compose").on('submit', function (event) {
    event.preventDefault();
    const serialized = $(this).serialize();
    const textBox = $(this).find('#tweetbox');
    if (($('#tweetbox').val()).length === 0) {
      $('#error').text('Compose field cannot be empty');
      $('#error').css('display', 'flex');
      return;
    } else if (($('#tweetbox').val()).length > 141) {
      $('#error').text('Message cannot be greater than 140 characters');
      $('#error').css('display', 'flex');
      return;
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serialized
      }).done(function () {
        textBox.val('');
        loadTweets();
      });
    }
  });

  $('#tweetbox').on('keyup click', function () {
    $('#error').css('display', 'none');
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

  $('#compose-button').on('click', function (){
    if ($('.new-tweet:first').is(':hidden')) {
      $('.new-tweet').show('slow');
      $('#tweetbox').focus();
    } else {
      $('.new-tweet').slideUp();
    }

  });

  loadTweets();
})


