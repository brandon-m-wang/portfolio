function cycleImages(){
      var $active = $('.profile-img .active');
      var $next = ($active.next().length > 0) ? $active.next() : $('.profile-img img:first');
      $next.css('z-index',2);//move the next image up the pile
      $active.fadeOut(1500,function(){//fade out the top image
	  $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
          $next.css('z-index', 3).addClass('active');//make the next image the top one
      });
    }

$(document).ready(function () {

    setInterval(function(){
        var x = $(".box-area > li").position();
        $(".box-area > li").html(`x-pos: ${x.left.toFixed(2)}`);
    }, 1);

    var cycle = setInterval('cycleImages()', 3000);

    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            clearInterval(cycle);
            $('#pfp1').css("z-index", "100");
        }
    })
    /*$('.profile-img').mouseenter(function () {
        interval = setInterval('cycleImages()', 3500);
    }).mouseleave(function (){
        clearInterval(interval);
    })*/

    $('.menu-toggler').on('click', function () {
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('.top-nav .nav-link').on('click', function () {
        $('.menu-toggler').removeClass('open');
        $('.top-nav').removeClass('open');
    });

    $('nav a[href*="#"]').on('click', function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 2000);
    });

    $('#up').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
    });


    $('#pfp').fadeOut('fast', function() {
        $('#imgT').attr('src', goimg).fadeIn('fast');
    });

    AOS.init({
        easing: "ease",
        duration: 1800,
        once: true
    });
    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }

    function changeWord() {
        var cw = wordArray[currentWord];
        var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
        for (var i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i);
        }

        for (var i = 0; i < nw.length; i++) {
            nw[i].className = 'letter behind';
            nw[0].parentElement.style.opacity = 1;
            animateLetterIn(nw, i);
        }

        currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
        setTimeout(function () {
            cw[i].className = 'letter out';
        }, i * 69);
    }

    function animateLetterIn(nw, i) {
        setTimeout(function () {
            nw[i].className = 'letter in';
        }, 340 + (i * 80));
    }

    function splitLetters(word) {
        var content = word.innerHTML;
        word.innerHTML = '';
        var letters = [];
        for (var i = 0; i < content.length; i++) {
            var letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerHTML = content.charAt(i);

            word.appendChild(letter);
            letters.push(letter);
        }

        wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 4000);


});