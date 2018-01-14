$(document).ready(function() {

// =============================

  // Анимация
  $(window).scroll( function (e) {
    // Классы
    var $parallaxCall = $('.call-target');
    var $parallaxTimamih = $('.timamih');
    var $animPromoBox = $('.promo-box');
    var $animServiceBox = $('.box-service');
    // Неизменны
    var $winTop = $(this).scrollTop();
    var $winHeight = $(this).height();
    var $winBottom = ($winTop + $winHeight);

    // Подстановки классов
      //Одиночная анимация
      var $elAbout = $animPromoBox.offset().top;
      var $posAbout = ($elAbout - $winHeight / 1.2);
      if ($winTop > $posAbout) {
        $animPromoBox.addClass('anim-left');
      };
      // Пакетная анимация
      $animServiceBox.each(function(i) {
        var $elTimetable = $animServiceBox.offset().top;
        var $posTimetable = ($elTimetable - $winHeight / 1.2);
        if ($winTop > $posTimetable) {
          setTimeout(function () {
            $animServiceBox.eq(i).addClass('anim-bottom');
          }, 200 * (i+1));
        };
      });

  // Паралакс
    var aboutHeight = $parallaxCall.height();
    var $aboutOutWin = (aboutHeight + $winHeight);
    if ($winHeight <= ($winBottom - $winTop)) {
      $parallaxCall.css('transform', 'translate3d(0px, -'+ $winTop /5 +'%, 0px)');
    };
    var aboutHeight = $parallaxTimamih.height();
    var $aboutOutWin = (aboutHeight + $winHeight);
    if ($winHeight <= ($winBottom - $winTop)) {
      $parallaxTimamih.css('transform', 'translate3d(-'+ $winTop /100 +'%, 0px, 0px)');
    };
  });

// =============================

  //Кнопка меню
  $('#checklang').click(function () {

    var $langBox = $('#checklang');
    var $langBtn = $langBox.prop('checked');
    var $langAll = $langBox.parents('.langbox');
    //console.log($langBtn);
    if ($langBtn == true) {
      $langAll.css('height', '260px');
      $('.langbox').mouseleave(function () {
        $(this).css('height', '70px');
        $langBox.prop('checked', false);
      });
    } else {
      $langAll.css('height', '70px');
    }
    return true;
  });

// =============================

  // Загрузчик
    $('.preloader').delay(100).fadeOut(1000);

// =============================
});
