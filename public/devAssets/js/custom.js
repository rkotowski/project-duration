/**
 * Created by Rafał on 2016-07-09.
 */

$(document).ready(function () {
  let dropOptionsMenu = (function () {
    $('.drop-icons').on('click', function () {
		  $(this).parent('.options').find('.optionsWrapper').toggleClass('on');
	  })
  })();
});