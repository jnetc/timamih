window.onload = () => {

  let bodyEl    = document.querySelector('body'),
      themeBtn  = document.querySelector('.theme-bt'),
      langBtn   = document.querySelector('.lang-bt'),
      menuBtn   = document.querySelector('.menu-bt'),
      menuBox   = document.querySelector('.menu-box'),
      menuBg    = document.querySelector('.menu-bg'),
      menuList  = document.querySelector('.menu-list'),
      patyAdd   = document.querySelectorAll('.paty-add'),
      plusBts   = document.querySelectorAll('.plus-bt'),
      teammate  = document.querySelectorAll('.teammate'),
      partnerBt = document.querySelector('#partner-btn'),
      partnerSc = document.querySelector('.partner'),
      partnerCl = document.querySelector('#close-partner'),
      numAdd    = 1,
      numBtn    = 1;
    
  
    // LOCAL STORAGE
  let theme = localStorage.getItem('theme');
    // First open site insert key theme
  if (localStorage.getItem('theme', 'dark-theme') == null) {
    localStorage.setItem('theme', 'dark-theme');
    bodyEl.classList.add('dark-theme');
  }
    // Cheking LocalStorage for key
  if (theme == 'light-theme') {
    bodyEl.classList.add('' + theme + ''); 
  } else if (theme == 'dark-theme') {
    bodyEl.classList.add('' + theme + '');
  }
    // Theme change button
  themeBtn.addEventListener('click', changeTheme);
  function changeTheme () {
    if (bodyEl.classList.contains('dark-theme')) {
      bodyEl.classList.add('light-theme');
      bodyEl.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light-theme');
    }
    else if (bodyEl.classList.contains('light-theme')) {
      bodyEl.classList.add('dark-theme');
      bodyEl.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark-theme');
    }
  }

    // Menu buttons & scroll Animation
  menuBtn.addEventListener('click', () => {
    // if (!menuBox.classList.contains('show-menu-active')) {
    //   menuBox.style.display = "flex";
    //   menuBox.classList.add('show-menu');

    //   let handler = () => {
    //     menuBox.classList.add('show-menu-active');
    //     menuBox.classList.remove('show-menu');
    //     menuBox.removeEventListener('transitionend', handler);
    //   }
    //   menuBox.addEventListener('transitionend', handler);
    // } 
    
    // else {
    //   menuBox.classList.remove('show-menu-active');
    //   let handler = () => {
    //     // menuBox.classList.remove('focused');
    //     menuBox.style.display = "none";
    //     menuBox.removeEventListener('transitionend', handler);
    //   }
    //   menuBox.addEventListener('transitionend', handler);
    // }
    menuBox.classList.toggle('focused');
    menuBtn.classList.toggle('mbt-focus');
    themeBtn.classList.toggle('tbt-anim');
    langBtn.classList.toggle('lbt-anim');
    bodyEl.style.overflow = bodyEl.style.overflow === 'hidden' ? '' : 'hidden';

  });
  menuList.addEventListener('click', menuHide);
  menuBg.addEventListener('mousedown', menuHide);
  function menuHide () {
    menuBox.classList.remove('focused');
    menuBtn.classList.remove('mbt-focus');
    themeBtn.classList.remove('tbt-anim');
    langBtn.classList.toggle('lbt-anim');
    bodyEl.style.overflow = bodyEl.style.overflow === 'hidden' ? '' : 'hidden';
  }
  
    // Get elem's arrays
  let menuBtns = document.querySelectorAll('.menu-list li'),
  boxEl = document.querySelectorAll('.box-scroll');
  // Loop for buttons & get "value" attr.
    for (let j = 0; j < menuBtns.length; j++) {
      menuBtns[j].addEventListener('click', () => { 
      let btnVal = menuBtns[j].getAttribute('value');
        // Loop & push  elem's to array
      let boxArr = [];
      for (let i = 0; i < boxEl.length; i++) {
        boxArr.push( boxEl[i] );
      }
        // Get attr for elem's
      let boxElId = boxArr[j].getAttribute('id');
        // Check & get offset elem's (add animate)
      if ((btnVal + (j+1)) ==  boxElId){
        let currentHeight = boxArr[j].offsetTop;
        scrollTo(currentHeight, 1000);
      }
    })
  }
  // Animate js get from internet & little changes
  let scrollTo  = function(to, duration) {
    let element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startNum = performance.now(),
      // t = current time     // b = start value
      // c = change in value  // d = duration
        easeInOutQuad = (t, b, c, d) => {
          t /= d/2;
          if (t < 1) return c/2*t*t + b;
          t--;
          return -c/2 * (t*(t-2) - 1) + b;
        },
        animateScroll = () => {
          let scrollNum = performance.now();
          let currentNum = scrollNum - startNum;
          element.scrollTop = parseInt(easeInOutQuad(currentNum, start, change, duration));
          if(currentNum < duration) {
              requestAnimationFrame(animateScroll);
          }
          else {
              element.scrollTop = to;
          }
        };
    animateScroll();
  };

    // Set attributes in animated block
  for (let attr of patyAdd) {
    let attrAdd = attr.setAttribute("id", "tag"+numAdd);
    numAdd++;
  }
    // Set attributes buttons
  for (let attr of plusBts) {
    let attrBtn = attr.setAttribute("data-id", "tag"+numBtn);  
    numBtn++;
  }
    
    // Loop for button "plus contact"
  for (const btn of plusBts) {    
    btn.addEventListener('click', () => {
      btn.classList.toggle('pressed-plus');
      let btnId = btn.getAttribute('data-id');
      // loop for blocks
      let arrayAdd = []; // create empty array
      for (let i = 0; i < patyAdd.length; i++) {    
        let addId = patyAdd[i].getAttribute('id'); // getting attributes
        arrayAdd.push(addId); // puting in array
        // Check for validate
        if (btnId == arrayAdd[i]) {
          patyAdd[i].classList.toggle('action');  
        }
      }    
    })
  }

    // PARTNER button
  partnerBt.addEventListener('click', () => {

    partnerSc.style.display = "flex";
    partnerSc.classList.add('show-part');

    let handler = () => {
      partnerSc.style.display = "flex";
      partnerSc.classList.remove('show-part');
      bodyEl.style.overflow = bodyEl.style.overflow === 'hidden' ? '' : 'hidden';
      partnerSc.removeEventListener('animationend', handler);
    }

    // waitAnim(() => {
    //   partnerSc.classList.add('show-part-active');
    //   partnerSc.classList.remove('show-part');
    //   bodyEl.style.overflow = bodyEl.style.overflow === 'hidden' ? '' : 'hidden';
    // });
    partnerSc.addEventListener('animationend', handler);
  });

  partnerCl.addEventListener('click', () => {
    let handler = () => {
      partnerSc.style.display = "none";
      partnerSc.classList.remove('hide-part');
      
      partnerSc.removeEventListener('animationend', handler);
    }
    partnerSc.classList.add('hide-part');
    bodyEl.style.overflow = bodyEl.style.overflow === 'hidden' ? '' : 'hidden';
    // waitAnim(() => {
    //   partnerSc.classList.remove('hide-part');
    //   partnerSc.classList.add('hide-part-active');
    // });
    partnerSc.addEventListener('animationend', handler);
  });
    // Ждем когда отработает предыдущее действеи в браузере
  function waitAnim(fx) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        fx();
      });
    });
  }

    // FOOTER getYear
  let footerYear = document.querySelector('footer span');
  let year = new Date().getFullYear();
  footerYear.innerText += ' ' + year + ' All rights reserved';

    // Preloader Page
  let preloader = document.querySelector('#preloader');
  let imgPreload = document.querySelectorAll('img[alt="preload"]');
  setTimeout(() => {
    if (!preloader.classList.contains('.done')) {
      preloader.classList.add('done');
      bodyEl.classList.remove('hidden');
      for (let i = 0; i < imgPreload.length; i++) {
        imgPreload[i].remove();
        removePreload();
      }
    }
  }, 1000);
  let removePreload = () => {
    setTimeout(() => {
      preloader.remove();
    }, 1000);
  }
}