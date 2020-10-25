// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  curDate = document.querySelector('.curDate');
let bufferName = "";

// Options
const showAmPm = false;

// Show Time
function showTime() {
  let today = new Date(),
    days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    weekDay = days[today.getDay()], 
    day = today.getDate(),
    months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    month = months[today.getMonth()],
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  if (showAmPm) {
    hour = hour % 12 || 12;
  }
  
  // Output Time
  curDate.innerHTML = `${weekDay}<span>, </span>${day}<span> </span>${month}`;
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        document.body.style.backgroundImage =
        "url('./assets/images/night/01.jpg')";
        greeting.textContent = 'Доброй ночи, ';
        document.body.style.color = 'white';
    } else if (hour < 12) {
        // Morning
        document.body.style.backgroundImage =
        "url('./assets/images/morning/01.jpg')";
        greeting.textContent = 'Доброе утро, ';
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage =
        "url('./assets/images/day/01.jpg')";
        greeting.textContent = 'Добрый день, ';
    } else {
        // Evening
        document.body.style.backgroundImage =
        "url('./assets/images/evening/01.jpg')";
        greeting.textContent = 'Добрый вечер, ';
        document.body.style.color = 'white';
    }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

(function () {
    name.addEventListener('click', (e) => {
        bufferName = e.target.textContent;
        e.target.textContent = "";
    });
}())

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
        if (e.target.innerText === "") {
            localStorage.setItem('name', bufferName);
            getName();
        } else {
            localStorage.setItem('name', e.target.innerText);
        }
        name.blur();
    }
  } else {
    if (e.target.innerText === "") {
        localStorage.setItem('name', bufferName);
        getName();
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
