$(document).ready(function() {
    console.log('ready');
    $('textarea').keyup(function() {
      var length = $(this).val().length
      $('.counter').text(140 - length)
      if (length > 140) {
        $('.counter').addClass("error");
        $('textarea').val($("textarea").substr(1, 140));
      } else {
        $('.counter').removeClass("error");
      }
    })
  });