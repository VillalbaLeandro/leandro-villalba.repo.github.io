
window.addEventListener("load",function() {
  setTimeout(function(){
  window.scrollTo(0, 1);
  }, 0);
  });

window.onload = (event) => {



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

// // Verificar si el navegador admite el modo de pantalla completa
// if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
//   // El navegador ya se encuentra en modo de pantalla completa o en una aplicación independiente
// } else if (window.navigator.userAgent.indexOf('Android') !== -1 && 'requestFullscreen' in document.documentElement) {
//   // Para Android, utilizar el modo de pantalla completa
//   document.documentElement.requestFullscreen();
// } else if (window.navigator.userAgent.indexOf('iPhone') !== -1 && 'standalone' in window.navigator) {
//   // Para iOS, abrir en la pantalla de inicio (modo de pantalla completa)
//   var addToHomeScreen = confirm('Agregar a la pantalla de inicio?');
//   if (addToHomeScreen) {
//     // Redirigir a la página de inicio para abrir en el modo de pantalla completa
//     window.location.href = '/index.html'; // Reemplaza "/" con la ruta de tu página de inicio
//   }
// }



};