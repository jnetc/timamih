$(document).ready(function() {

// =============================

  // Анимация
  $(window).scroll( function (e) {
    // Классы
    var animPromoBox = $('.promo-box');
    var animServiceBox = $('.box-service');
    var el = $('.timamih-box');
    var el2 = $('.call-target');

    // Неизменны
    var winTop = $(this).scrollTop(); // Позиция относительно верха окна
    var winHeight = $(this).height(); // Высота текущего окна
    var winBottom = (winTop + winHeight); // Вычисляем нижнюю часть окна
    var elTop = el.offset().top; // Вычисляем начало блока
    var elHeight = el.height(); // Высота блока
    var elBottom = (elTop + elHeight); // Вычисляем конец блока
    // Активируем паралакс только в заданном блоке
    if ((elTop < winBottom) && (winTop < elBottom)) {
      el.css('transform', 'translate3d(-'+ winTop /350 +'em, 0px, 0px)');
      // console.log('scrolling');
    }
    var el2Top = el2.offset().top; // Вычисляем начало блока
    var el2Height = el2.height(); // Высота блока
    var el2Bottom = (el2Top + el2Height); // Вычисляем конец блока
    if ((el2Top < winBottom) && (winTop < el2Bottom)) {
      el2.css('transform', 'translate3d(0px, -'+ winTop /150 +'em, 0px)');
      // console.log('scrolling');
    }
    // Подстановки классов
      //Одиночная анимация
      var elAbout = animPromoBox.offset().top;
      var posAbout = (elAbout - winHeight / 1.2);
      if (winTop > posAbout) {
        animPromoBox.addClass('anim-left');
      };
      // Пакетная анимация
      animServiceBox.each(function(i) {
        var elTimetable = animServiceBox.offset().top;
        var posTimetable = (elTimetable - winHeight / 1.2);
        if (winTop > posTimetable) {
          setTimeout(function () {
            animServiceBox.eq(i).addClass('anim-bottom');
          }, 200 * (i+1));
        };
      });

  // Паралакс
    // var aboutHeight = parallaxCall.height();
    // var aboutOutWin = (aboutHeight + winHeight);
    // if (winHeight <= (winBottom - winTop)) {
    //   parallaxCall.css('transform', 'translate3d(0px, -'+ winTop /5 +'%, 0px)');
    // };
    // var aboutHeight = parallaxTimamih.height();
    // var aboutOutWin = (aboutHeight + winHeight);
    // if (winHeight <= (winBottom - winTop)) {
    //   parallaxTimamih.css('transform', 'translate3d(-'+ winTop /100 +'%, 0px, 0px)');
    // };
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
  });

// =============================

  // Загрузчик
    $('.preloader').delay(100).fadeOut(1000);

// =============================
});
