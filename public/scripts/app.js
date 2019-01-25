/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  // Tracks the time since the post was created.
  function days (created) {
    const today = Date.now();
    let daysSince = Math.floor((today - created) / 86400000);
    if (daysSince < 1) {
      return 'Today';
    }
    return daysSince + ' days ago';
  }

  // Clears any scripting attempts by removing the <> upon tweet submission.
  function clearScript (text) {
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

  // Creates a new tweet using database object information
  function createTweetElement (tweetObj) {
    const tweetMessage = clearScript(tweetObj.content.text);
    const day = days(tweetObj.created_at);
    const $tweet = (`

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
                ${day}
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

  // Loops through the tweets and generates the list to post to the page.
  function renderTweets (tweets) {
    tweets.forEach((tweet) => {
      const article = createTweetElement(tweet);
      $('#tweet-log').prepend(article);
    });
  }

  // Event response upon new tweet submission.
  $("#compose").on('submit', function (event) {
    event.preventDefault();
    const serialized = $(this).serialize();
    const textBox = $(this).find('#tweetbox');
    const counter = $(this).find('#counter');
    if (($('#tweetbox').val()).length === 0) {
      $('#error').text('Compose field cannot be empty');
      $('#error').css('display', 'flex');
      return;
    } else if (($('#tweetbox').val()).length > 141) {
      $('#error').text('Message cannot be greater than 140 characters');
      $('#error').css('display', 'flex');
      return;
    } else {
      $('#counter').text(140);
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

  // Event to hide the error box once user begins typing in the compose box again.
  $('#tweetbox').on('keyup click', function () {
    $('#error').css('display', 'none');
  });

  // AJAX Get request
  function loadTweets () {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).done(function (tweets) {
      $('#tweet-log').empty();
      renderTweets(tweets);
    });
  }

  // Handles clicks on the compose button
  $('#compose-button').on('click', function (){
    if ($('.new-tweet:first').is(':hidden')) {
      $('.new-tweet').show('slow');
      $('#tweetbox').focus();
    } else {
      $('.new-tweet').slideUp();
    }
  });

  // Loads tweets on first page load
  loadTweets();
})

