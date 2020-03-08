  // CREATE NEW AJAX FOR EVENTS - events.json
let eventsData = new XMLHttpRequest();
  //  open( type, url/file, asunc);
eventsData.open("GET", "../json/cards.json", true);
eventsData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let evenParse = JSON.parse(eventsData.responseText);
    renderEvents(evenParse);
    renderEventParagraphs(evenParse);
    renderComingEvents(evenParse);
    renderEventBtns(evenParse);
    addEventBtnVal(evenParse);
  }
};
// send request
eventsData.send();

  // ELEMENTS EVENTS
  const patyBox     = document.querySelectorAll('.paty-box'), // poster image
        patyDateEls = document.querySelectorAll('.paty-dat'), // data, time and caption
        patyTimeEls = document.querySelectorAll('.paty-time'), // data, time and caption
        patyContEl  = document.querySelectorAll('.paty-content'),
        patyParagEl = document.querySelectorAll('.paty-text'), // event text paragraph
        patyPriceEl = document.querySelectorAll('.paty-tag'), // event price
        moreBts     = document.querySelectorAll('.more-bt'); // button "more"

  // Create event dynamic elements
let renderEvents = data => {
  data.forEach((item, i, data) => {
    patyBox[i].insertAdjacentHTML('afterbegin',
      `<img src="${item.img}" alt="poster" title="poster">`)
    patyDateEls[i].innerText = item.date;
    patyDateEls[i].insertAdjacentHTML('beforeend',
  `<span>${item.month}</span>`)
    patyTimeEls[i].innerText = item.time;
    patyContEl[i].insertAdjacentHTML('afterbegin',
      `<h3>${item.capt}</h3>`)
    patyPriceEl[i].insertAdjacentHTML('beforeend',
      `<span>${item.price}<sup>€</sup></span>`)
  })
    // Add class for theme
  patyContEl[0].querySelector('h3').className = 'night-capt';
  patyContEl[1].querySelector('h3').className = 'day-capt';  
}

  // Create event Paragraphs, dynamic text height
let renderEventParagraphs = getList => {
  for (let i = 0; i < getList.length; i++) {
    const content = getList[i];
    patyParagEl[i].setAttribute("style", "max-height: 200px");
    patyParagEl[i].innerHTML += `<p class="pre-txt">${content.text}</p>`
  } 
  for (let j = 0; j < patyParagEl.length; j++) {
    const getPatyStyle  = getComputedStyle(patyParagEl[j]).getPropertyValue('max-height').substring(0,3);
    const patyPreEl     = document.querySelectorAll('.pre-txt');

    for (let k = 0; k < patyPreEl.length; k++) {
        // Getting from css line-height: 25px;
      const getPreHeight = patyPreEl[k].scrollHeight;     

        // Check if content more or not, and hide if low
      for (let i = 0; i < moreBts.length; i++) {       
        if (i == k && getPatyStyle < getPreHeight) {
          moreBts[i].addEventListener('click', eventClickPaty);          
        } 
        else if (i == k && getPatyStyle >= getPreHeight) {
          moreBts[i].style.display = "none";
        }
          // Click event & dynamicly get height content
        function eventClickPaty () {
          let getNewStyle = getComputedStyle(patyParagEl[j]).getPropertyValue('max-height').substring(0,3);
          
          if (j == k && getNewStyle < getPreHeight) {
            patyParagEl[j].style.maxHeight = getPreHeight.toString() + 'px';
            moreBts[i].classList.add('pressed-more');
          }
          else if (j == k && getNewStyle == getPreHeight) {   
            patyParagEl[j].style.maxHeight = getPatyStyle + 'px';
            moreBts[i].classList.remove('pressed-more');
          }
        }
      }
    }
  }
}

  // Create event contact buttons
const patyAddBtn = document.querySelectorAll('.paty-add'); // Create event links
let renderEventBtns = getButtons => { 
  getButtons.forEach((item, i, getButtons) => {

    let createBtns = '';
    for (let btn in item.btns) {
      createBtns += 
      `<a href="${item.btns[btn]}" title="${item.btns[btn]}" target="_blank">
          <svg role="img" class="icon-svg">
            <use xlink:href="./img/svg/icons.svg#${btn}"></use>
        </svg>
      </a>`
    }
    patyAddBtn[i].innerHTML = createBtns; 
  })
}

  // Create event extra adds for contact buttons
let addEventBtnVal = extAdds => {
  extAdds.forEach((item, i, extAdds) => {
    let eventBtnAdd = patyAddBtn[i].querySelectorAll('a');
    eventBtnAdd.forEach((add, j, eventBtnAdd) => {
        // Take value form title
      let titleVal = add.getAttribute('title');
        // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + item.btns.mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + item.btns.tel;        
      } 
    })
  })
}

  // Dynamically generate coming events
const nextBlocks = document.querySelectorAll('.next-blk'); 
let renderComingEvents = data => {
  data.forEach((item, i, data) => {
    const eventsObj = data[i].events;
    let createComeEvents = '';
    for ( let eventNum in eventsObj) {
      createComeEvents += `
      <div class="next-box">
        <span class="next-date">${eventsObj[eventNum].eDate}
          <span>${eventsObj[eventNum].eMonth}</span>
        </span>
        <div>
          <div class="next-poster" style="background-image: url(${eventsObj[eventNum].ePoster})">
            <span class="next-btn">${eventsObj[eventNum].eBtn}</span>
          </div>
          <svg role="img" class="next-stars">
            <use xlink:href="./img/svg/fts-elem.svg#stars"></use>
          </svg>
          <h5>${eventsObj[eventNum].eCap}</h5>
          <p>${eventsObj[eventNum].eCont}</p>
        </div>
      </div>`
    }
    nextBlocks[i].innerHTML = createComeEvents;
  })
    // Add class for element's
    addClass();
}

  // Add class for theme dates
let addClass = () => {
  nextBlocks.forEach((item, i, nextBlocks) => {
    let elms = nextBlocks[i].querySelectorAll('.next-box');
    for (let j = 0; j < elms.length; j++) {
      if (i == 0) {      
        elms[j].className += ' night-next';
      } if (i == 1) {
        elms[j].className += ' day-next';
      }
    }
  }) 
}

  // CREATE NEW AJAX FOR COURSES - course.json
let coursesData = new XMLHttpRequest();
coursesData.open("GET", "../json/courses.json", true);
coursesData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
  let crsParse = JSON.parse(coursesData.responseText);
    renderCourses(crsParse);
    renderCourseParagraphs(crsParse);
    renderCourseBtns(crsParse);
    addExtraCourseVal(crsParse);
  }
};
coursesData.send();

  // Dynamically generate courses
const coursesDom  = document.querySelector('.course-blk');
let renderCourses = data => {
  let createCourses = '';
  data.forEach((item, i, data) => {
    createCourses +=
    `<div class="flex-crs">
      <div class="crs-dat">
        <span class="crs-day">${item.days}</span>
        <span class="crs-time">${item.time}</span>
        <svg role="img" class="crs-svg">
          <use xlink:href="./img/svg/icons.svg#clock"></use>
        </svg>
      </div>
      <div class="crs-img">
        <span class="crs-cls">${item.cls}</span> 
        <img src="${item.img}" alt="courses" title="poster">
      </div>
      <div class="crs-cont">
        <h4>${item.name}</h4>
        <ul class="crs-graphs" style="max-height: 115px"></ul>
      </div>
      <div class="crs-opt">
        <div class="crs-btns"></div>
        <div class="crs-more">
          <span class="night-bt"></span>
        </div>
        <div class="for-price">
          <span class="crs-tip">${item.period}</span>
          <span class="crs-price">${item.price}<sup>€</sup></span>
        </div>
      </div>
    </div>`
  });
  coursesDom.innerHTML += createCourses; 
}

  // Create course paragraphs
let renderCourseParagraphs = getList => {
  const crsMore = document.querySelectorAll('.crs-more span');
  const crsCont = document.querySelectorAll('.crs-graphs');
  for (let i = 0; i < getList.length; i++) {
    const content = getList[i];
    crsCont[i].innerHTML += `<pre>${content.txt}</pre>`
  } 
  for (let j = 0; j < crsCont.length; j++) {
    const getCrsStyle  = getComputedStyle(crsCont[j]).getPropertyValue('max-height').substring(0,3);
    const getCrsHeight = crsCont[j].scrollHeight;
      // Check if content more or not, and hide if low
    for (let i = 0; i < crsMore.length; i++) {   
      if (i == j && getCrsStyle < getCrsHeight) {      
        crsMore[i].addEventListener('click', eventClickCrs);
      } 
      else if (i == j && getCrsStyle >= getCrsHeight) {
        crsMore[i].parentElement.style.display = "none";
      }
        // Click course & dynamicly get height content
      function eventClickCrs () {
        this.classList.toggle('pressed-more');
        let getNewStyle = getComputedStyle(crsCont[j]).getPropertyValue('max-height').substring(0,3);
        if (getNewStyle < getCrsHeight) {
          crsCont[j].style.maxHeight = getCrsHeight.toString() + 'px';
        }
        else if (getNewStyle == getCrsHeight) {
          crsCont[j].style.maxHeight = getCrsStyle + 'px';
        }
      }
    }
  }
}

  // Create course buttons
let renderCourseBtns = getButtons => {
  let coursesButtons = document.querySelectorAll('.crs-btns');
  getButtons.forEach((item, i, getButtons) => {
    let createBtns = '';
      for (let btn in item.btns) {
        createBtns += 
        `<a href="${item.btns[btn]}" title="${item.btns[btn]}" target="_blank">
            <svg role="img" class="crs-svg">
              <use xlink:href="./img/svg/icons.svg#${btn}"></use>
          </svg>
        </a>`
      }
      coursesButtons[i].innerHTML = createBtns;     
  });  
}

  // Create event extra adds for contact buttons
let addExtraCourseVal = extAdds => {
  let coursesButtons = document.querySelectorAll('.crs-btns');
  extAdds.forEach((item, i, extAdds) => {
    let specialAdd = coursesButtons[i].querySelectorAll('a');
    specialAdd.forEach((add, j, specialAdd) => {
        // Take value form title
      let titleVal = add.getAttribute('title');
        // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + item.btns.mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + item.btns.tel;        
      } 
    })
  })
}

  // CREATE NEW AJAX FOR TEAM - team.json
let teamData = new XMLHttpRequest();
teamData.open("GET", "../json/team.json", true);
teamData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
  let teamParse = JSON.parse(teamData.responseText);
    renderTeam(teamParse);
    renderTeamBtns(teamParse);
    addExtraTeamVal(teamParse);
  }
};
teamData.send();

  // Dynamically generate teammate
const ourTeamDom = document.querySelector('.team-blk');
let renderTeam = data => {
  let createTeam = '';
  data.forEach((teammate, i, data) => {
    createTeam += 
    `<div class="teammate">
      <div class="team-img">
      <div style="background-image: url(${teammate.img})"></div>
        <svg role="img" class="team-img-svg">
          <use xlink:href="./img/svg/fts-elem.svg#border-up"></use>
        </svg>
        <svg role="img" class="team-img-svg">
          <use xlink:href="./img/svg/fts-elem.svg#border-down"></use>
        </svg>
      </div>
      <span class="about-me">${teammate.about}</span>
      <h5>${teammate.name}</h5>
      <h6>${teammate.post}</h6>
      <svg role="img" class="stars">
        <use xlink:href="./img/svg/fts-elem.svg#stars"></use>
      </svg>
      <div class="team-btns"></div>
    </div>`
  })
  ourTeamDom.innerHTML = createTeam;
}

  // Create teammate buttons
let renderTeamBtns = getButtons => {
  getButtons.forEach((item, i, getButtons) => {
    let buttons = document.querySelectorAll('.team-btns');
    let createBtns = '';
      for (let btn in item.btns) {      
        createBtns += 
        `<a href="${item.btns[btn]}" title="${item.btns[btn]}" target="_blank">
            <svg role="img" class="crs-svg">
              <use xlink:href="./img/svg/icons.svg#${btn}"></use>
          </svg>
        </a>`
      }
      buttons[i].innerHTML = createBtns;     
  });
}
  
  // Create team extra adds for contact buttons
let addExtraTeamVal = extAdds => {
  let coursesButtons = document.querySelectorAll('.team-btns');
  extAdds.forEach((item, i, extAdds) => {
    let specialAdd = coursesButtons[i].querySelectorAll('a');
    specialAdd.forEach((add, j, specialAdd) => {
        // Take value form title
      let titleVal = add.getAttribute('title');
        // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + item.btns.mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + item.btns.tel;        
      } 
    })
  })
}

  // CREATE NEW AJAX FOR LINKS - main.json
let linksData = new XMLHttpRequest();
linksData.open("GET", "../json/main.json", true);
linksData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
  let linksParse = JSON.parse(linksData.responseText);
    renderLinks(linksParse);
  }
};
linksData.send();

  // Create text main-json
const mainTitle       = document.querySelector('title'), // main.json
      mainTitleOg     = document.querySelector('meta[property="og:title"]'), // main.json
      mainSiteNameOg  = document.querySelector('meta[property="og:site_name"]'), // main.json
      mainDescriptOg  = document.querySelector('meta[property="og:description"]'), // main.json
      mainDescript    = document.querySelector('meta[name="description"]'), // main.json
      mainLinks       = document.querySelectorAll('.menu-list li'), // main.json
      mainH2          = document.querySelectorAll('h2'), // main.json
      mainIn          = document.querySelectorAll('.paty-tag span:nth-of-type(1)'), // main.json
      partnerBtnText  = document.querySelector('#partner-btn'),
      partnerLinks    = document.querySelector('.link-blk'); // Dynamically generate partners link
let renderLinks = data => {
  mainTitle.textContent = data.title;
  mainTitleOg.textContent = data.title;
  mainSiteNameOg.textContent = data.site_name;
  mainDescriptOg.textContent = data.description;
  mainDescript.textContent = data.description;
  partnerBtnText.textContent = data.partbtn;
  for (let i = 0; i < mainLinks.length; i++) {
    let getLinks = data.menu;
    for (let j in getLinks) {
      if (i.toString() == j.substring(4)) {
        mainLinks[i].textContent = getLinks[j];
      }
    }
  }
  for (let i = 0; i < mainH2.length; i++) {
    let getH2 = data.h2;
    for (let j in getH2) {    
      if (i.toString() == j.substring(4)) {
        mainH2[i].textContent = getH2[j];
      }
    }
  }
  for (let i = 0; i < mainIn.length; i++) {
    mainIn[i].textContent = data.in;
  }
   // Create DOM partner links
  let createLinks = '';
  let partner = data.partner;
  for (let i in partner) {
    const links = partner[i];  
    createLinks += 
    `<a href="${links.href}" target="_blank" style="background-image: url(${links.img})"></a>`
  }
  partnerLinks.innerHTML = createLinks;
  partnerLinks.insertAdjacentHTML('afterbegin', '<span id="close-partner"></span>');
}