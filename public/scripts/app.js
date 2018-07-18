/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.
 const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

$(document).ready(function() {
function createTweetElement(data) {
    let username = data.user.name;
    let icon = data.user.avatars.small;
    let handle = data.user.handle;
    let tweet = data.content.text;
    let time = data.created_at;
    let time_now = Date.now();
    // let time_lapsed = calculateTime(time, time_now);

    $('#tweets-container').append(`
        <article class='tweet'>
        <header>
          <div class='topheader'>
            <div class='pictureUsername'>
              <img class='icon' src=${icon}></img>
              <span class="username">${username}</span>
            </div>
            <h6 class='handle'>${handle}</h6>
          </div>
        </header>
        <main>
          <p class="tweet">${tweet}</p>
        </main>
        <footer>
          <p class='time'>${calculateTime(time, time_now)}</p>
        </footer>
      </article>
    `)
}

function calculateTime(then, now) {
    console.log(then)
    console.log(now)
    console.log(Math.floor((now - then) / (1000 * 60 * 60 * 24)));
    return (Math.floor((now - then) / (1000 * 60 * 60 * 24)));
}

  function renderTweets(tweets) {
      tweets.forEach(element => {
          console.log(element);
          createTweetElement(element);
      });
  }
  renderTweets(data)
});