/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
function createTweetElement(data) {
    let username = data.user.name;
    let icon = data.user.avatars.small;
    let handle = data.user.handle;
    let tweet = data.content.text;
    let time = data.created_at;
    let time_now = Date.now();
    let time_lapsed = calculateTime(time, time_now);

    $('#tweets-container').prepend(`
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
                <p class='time'>${time_lapsed}</p>
            </footer>
        </article>
    `)
}

    function calculateTime(then, now) {
        return (Math.floor((now - then) / (1000 * 60 * 60 * 24)));
    }

    function renderTweets(tweets) {
        tweets.forEach(element => {
        createTweetElement(element);
        });
    }

    $(function loadTweets() {
        event.preventDefault()
        let arr = $.getJSON('/tweets');
        $( window ).load(function () {
        $.ajax('/tweets', { method: 'GET' })
        .then(function () {
            console.log(arr.responseJSON);
            renderTweets(arr.responseJSON);
        });
        });
    });

    $( "button" ).click(function() {
        $( ".new-tweet" ).slideToggle( "slow", function () {
            $('textarea').focus();
        })
    });


  $(function postTweets() {
    $('form').on('submit', function () {
    event.preventDefault()
    var query = $( "form" ).serialize();
    console.log( $( this ).serialize() );
    if (query.length > 145) {
        console.log(query.length)
        return alert('Invalid Input');
    }
      console.log('Button clicked, performing ajax call...');
      $.ajax('/tweets', { method: 'POST' })
      .then(function (data, status) {
        console.log(status);
        console.log('Success: ', data);
        createTweetElement(data);
      }) 
      .fail(function (data, status) {
        console.log(status);
        alert('Invalid Input')
      });
    });
  });
});