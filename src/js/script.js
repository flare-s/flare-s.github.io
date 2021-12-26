import '../css/style.css';
import {tsParticles} from "tsparticles";
import config from './particles.json';





const header = document.querySelector('.header');
const pointer = document.querySelector('.pointer');
const indicator = document.querySelector('.nav__indicator');
const menuButton = document.querySelector('.main-nav__toggle');
const themeButton = document.querySelector('.main-nav__theme');
const popups = document.querySelectorAll('.popup');
const tabs = document.querySelectorAll('[data-tab]');
const preload = document.querySelector('.preload');
const portfolioItems = document.querySelectorAll('.portfolio__item');
const Wrapper = document.querySelector('.wrapper');
const aboutAge = document.querySelector('.about__personal__age');
const copyrightYear = document.querySelector('.copyright__year');





// function that starts the particles
const startParticles = () => {
  return tsParticles.load("tsparticles", config)
  .then((container) => {
      console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
      console.error(error);
  });
}


// function that calculates age, dateString = (yyyy/mm/dd)
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}






// function that shows the appropriate items depending on which tab has been clicked
const handleTabs = (tabs, items, type) => {
  tabs.forEach(tab => tab.classList.remove('active'));
  items.forEach(item => item.classList.remove('active'));
  if (type === "all") {
    items.forEach(item => item.classList.add('active'));
  } else {
    items.forEach(item => {
      if(item.dataset.type === type) item.classList.add('active');
    
    });
  }
    
}

//function that set the menu indicator to the appropriate element
const handleIndicator = (element) => {
  let elementSpecs = element.getBoundingClientRect();
  indicator.style.top = `${elementSpecs.bottom + header.scrollTop}px`;
  indicator.style.left = `${elementSpecs.left}px`;
  indicator.style.width = `${elementSpecs.width}px`;

} 

// setting the year in the header
copyrightYear.textContent = new Date().getFullYear();
//settng the age in the about section
aboutAge.textContent = getAge('1996/11/02');



startParticles();

// removing the loading animation after the content been loaded
window.addEventListener('load', () => {
  document.body.removeChild(preload);
});

// custom mouse position
window.addEventListener("mousemove", (e) => {
  pointer.style.left = `${e.clientX}px`;
  pointer.style.top = `${e.clientY}px`;
});

//adding a class to the custom mouse when hovering over a link
document.querySelectorAll('a').forEach(link => link.addEventListener("mouseenter", (e) => {
  pointer.classList.add('link');
}))

//removing a class to the custom mouse when hovering over a link
document.querySelectorAll('a').forEach(link => link.addEventListener("mouseleave", (e) => {
  pointer.classList.remove('link');
}))


// handling the menu on small screens when the menu button is clicked
menuButton.addEventListener("click", (e) => {
  if (!e.target.classList.contains('active')) {
    menuButton.classList.add('active');
    header.classList.add('active');
  } else {
    header.classList.remove('active');
    menuButton.classList.remove('active');
  }
});

// switching themes when the theme button is clicked
themeButton.addEventListener("click", () => {
  themeButton.classList.toggle('active');
  document.body.classList.toggle('dark');
})




// handling the active section and active link functionality
header.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    // because the event listener is on a parent element we check if the clicked element is the right one
    if (e.target.dataset.link) {
        // a reference of the particles
        const particles = tsParticles.domItem(0);
        let linkName = e.target.dataset.link;
        let prevLink = document.querySelector(`[data-link].active`);
        prevLink.classList.remove('active');
        let prevSection = document.querySelector('[data-section].active');
        prevSection.classList.remove('active');
        //making the logo link and the home link  do the same thing
        if (linkName === 'logo' || linkName === 'home') {
            //if the active section before clicking the home or logo link was not the home section
            if (prevSection.dataset.section !== "home") {
              // start the particles again
              startParticles();
            }
            //adding the active class to the home link and section;
            let home = document.querySelector('[data-link="home"]');
            home.classList.add('active');
            document.querySelector('[data-section="home"]').classList.add('active');
            handleIndicator(home);
            // return so it dosen't continue to the code below
            return;
        }
        // if it's not either the home or logo link
        // check if particles exist than destroy it
        if(particles) particles.destroy();
        //adding the active state to the appropriate link and section
        e.target.classList.add('active');
        handleIndicator(e.target);
        let activeSection = document.querySelector(`[data-section="${linkName}"]`);
        activeSection.classList.add('active');
    }
});




Wrapper.addEventListener('click', (e) => {
  e.stopPropagation();  
  // make sure that a tab was clicked
  if (e.target.dataset.tab) {
    let tab = e.target;
    let type = tab.dataset.tab;
    // handling the active tab and items
    handleTabs(tabs, portfolioItems, type);
    tab.classList.add('active');
    return;
  }

  // handling the popup functionality
  if (e.target.dataset.popupButton) {
    popups.forEach(item => item.classList.remove('active'));
    popups.forEach(item => {
      if(item.dataset.popup === e.target.dataset.popupButton) item.classList.add('active');
    })
    return;
  }

  // closing the popup
  if (e.target.classList.contains('popup__close')) {
    e.target.parentNode.parentNode.classList.remove('active');
  }
});








