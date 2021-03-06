// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(function() {
    $('#remind a').click(function() {
    	setTimeout(function() {
        var remind_value = $('#remind input').val();
        if(remind_value==""){
          alert("Please enter the valid value.");
          return false;
        }
        $.ajax({
              url: '/remind_list?callback=?',
              type: 'POST',
              data: {'blah':remind_value},
              success: function(){
                $('#thankyou').show();
                $('#thankyou').animate({
                    opacity: 1
                }, 500);
              }
        });
    	},300);
    });

    var window_width  = $(document).width(),
    slider_view   = 4,
    slider_index  = 0,
    slider_length = $('#slider li').length,
    slider_auto   = function() {
      if (slider_index < slider_length-slider_view) slider_index++;
      else slider_index = 0;
      slider_move();
    },
    slider_move   = function() {
      $('#slider ul').animate({
        left: -slider_index*224
      });
    },
    slider_timer  = setInterval(slider_auto, 3000);
    
    var modal_open = function(html, w, h, mL, mT) {
        var video = '<a href="#">&times;</a>'+html,
        $modal = $('<div id="modal-container"></div>').html(video),
        $overlay = $('<div id="modal-overlay"></div>'),
        modal_close = function(){
            $modal.fadeOut();
            $overlay.fadeOut(function(){
                $modal.remove();
                $overlay.remove();
            });
            $('body').off('keyup.modal-escape');
        };
        
        $overlay.appendTo('body').fadeIn(function(){
            $modal.appendTo('body').animate({
                marginLeft: (mL || -280)+'px',
                marginTop: (mT || -157)+'px',
                width: (w || 560)+'px',
                height: (h || 315)+'px',
                padding: '10px',
                opacity: 1
            }, 'slow');
            $('#modal-container a, #modal-overlay').on('click', function(e){
                e.preventDefault();
                modal_close();
            });
            $('body').on('keyup.modal-escape', function(e){
                if (e.keyCode = 27) {
                    e.preventDefault();
                    modal_close();
                }
            });
        });
    };

    $('#slider ul').width(slider_length*224);

    $('#slider .prev').on('click', function(e){
	e.preventDefault();
	clearInterval(slider_timer); slider_timer = null;
	if (slider_index > 0) slider_index--;
	slider_move();
	slider_timer = setInterval(slider_auto, 3000);
    });

    $('#slider .next').on('click', function(e){
	e.preventDefault();
	clearInterval(slider_timer); slider_timer = null;
	if (slider_index < slider_length-slider_view) slider_index++;
	slider_move();
	slider_timer = setInterval(slider_auto, 3000);
    });

    $('#app .video').on('click', function(e){
	e.preventDefault();
	modal_open('<iframe width="560" height="315" src="http://www.youtube.com/embed/hjNBJJ4iDg0?autoplay=1" frameborder="0" allowfullscreen></iframe>');
    });

    $('#app .appstore').on('click', function(e){
	e.preventDefault();
	modal_open('<h5>Visit this site using iPads, iPhones, or other smart devices to automatically use our mobile app.</h5><h5><i>(We\'ll have downloadable versions shortly.)</i></h5>');
    });

    $(window).on('resize', function(e){
	window_width = $(document).width();
	if (window_width <= 1000) slider_view = 3;
	if (window_width <= 760) slider_view = 2;
	if (window_width <= 580) slider_view = 1;
    }).trigger('resize');

    $('.not-in-rapids').on('click', function(e){
	e.preventDefault();
	modal_open('<div rel="LHUTOEKT" class="lrdiscoverwidget" data-logo="off" data-background="off" data-share-url="foodcircles.net" data-css=""></div><scr' + 'ipt type="text/javascript" src="http://launchrock-ignition.s3.amazonaws.com/ignition.1.1.js"></scr' + 'ipt>', 409, 242);
    });
    $('.for-restaurants').on('click', function(e){
	e.preventDefault();
	modal_open('<img src="/assets/home/restaurantpage.png"  width="425" height="525" />', 425, 525, -232, -273);
    });
});