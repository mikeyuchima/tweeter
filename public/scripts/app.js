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

//displays tweet
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
                <span class="time">${time_lapsed} days ago</span>
                    <span><div class="feedback">
                        <span><i class="fas fa-flag"></i></span>
                        <span><i class="fas fa-retweet"></i></span>
                        <span><i class="fas fa-heart"></i></span>
                    </div></span>
            </footer>
        </article>
    `)
}
//convert system time to days
    function calculateTime(then, now) {
        return (Math.floor((now - then) / (1000 * 60 * 60 * 24)));
    }
//loop through each object property to display each on to tweeter
    function renderTweets(tweets) {
        tweets.forEach(element => {
        createTweetElement(element);
        });
    }
//retrieving tweets from database
    $(function loadTweets() {
        event.preventDefault()
        $('.invalid').hide();
        let arr = $.getJSON('/tweets');
        $( window ).load(function () {
        $.ajax('/tweets', { method: 'GET' })
        .then(function () {
            console.log(arr.responseJSON);
            renderTweets(arr.responseJSON);
            $('invalid').hide();
        });
        });
    });
//slide toggle functionality for hiding and displaying new-tweet form
    $( "button" ).click(function() {
        $( ".new-tweet" ).slideToggle( "slow", function () {
            $('textarea').focus();
        })
    });
//inserting tweet to database
  $(function postTweets() {
    $('form').on('submit', function () {
    event.preventDefault()
    var query = $( "form" ).serialize();
    console.log( $( this ).serialize() );
    if ((query.length - 5) > 140 || (query.length - 5) === 0) {
        return $('.invalid').show();
    }
      console.log('Button clicked, performing ajax call...');
      $.ajax('/tweets', { method: 'POST', data: query})
      .then(function (data, status) {
        console.log('Success: ', data);
        createTweetElement(data);
        $('textarea').val('');
        $('.invalid').hide();
      })
    });
  });
});