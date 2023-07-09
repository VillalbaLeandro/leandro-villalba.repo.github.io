window.onload = (event) => {

  // const menuHamburguesa = document.querySelector(".menu-hamburguesa-container");
  // const menuContainer = document.querySelector(".menu-container");
  // const menuNavbar = document.querySelector(".menu-navbar");


  // // opacity: 1;
  // // background-color: black;
  // // left: 0;
  // menuHamburguesa.addEventListener(`click` ,()=>{
  //     menuNavbar.style.opacity = 1;
  //     menuNavbar.style.backgroundColor = "rgb(4, 2, 22)";
  //     menuNavbar.style.left = 0;
  //     menuNavbar.style.boxShadow = "18px 16px 20px -5px rgba(0,0,0,0.75)";
      
  // })
  // menuNavbar.addEventListener(`mouseleave` ,()=>{
  //     menuNavbar.style.opacity = 0;
  //     menuNavbar.style.backgroundColor = "null";
  //     menuNavbar.style.left = "-100%";
      
  // })


// carrusel

/*--------------------
Vars
--------------------*/
let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02;
const speedDrag = -0.1;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)));

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item');
const $cursors = document.querySelectorAll('.cursor');

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty('--zIndex', zIndex);
  item.style.setProperty('--active', (index - active) / $items.length);
};

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor(progress / 100 * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

/*--------------------
Handlers
--------------------*/
const handleMouseMove = (e) => {
  $cursors.forEach(($cursor) => {
    $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  if (!isDown) return;

  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = e => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  document.addEventListener('mousemove', handleMouseMove);
};

const handleMouseUp = () => {
  if (isDown) {
    isDown = false;
    startX = 0;
    document.removeEventListener('mousemove', handleMouseMove);
  }
};

/*--------------------
Listeners
--------------------*/
// document.addEventListener('mousewheel', handleWheel);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('touchstart', handleMouseDown);
document.addEventListener('touchmove', handleMouseMove);
document.addEventListener('touchend', handleMouseUp);

if (navigator.userAgent.match(/android/i)) {
  window.scrollTo(0, 1);
}

if(navigator.userAgent.match(/android">android/i)){ window.scrollTo(0,1); }


};