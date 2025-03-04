import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// tooltips on hover
var tooltips = document.querySelectorAll('.tooltip span');

window.onmousemove = function (e) {
  var x = e.clientX + 20 + 'px',
    y = e.clientY + 20 + 'px';
  for (var i = 0; i < tooltips.length; i++) {
    tooltips[i].style.top = y;
    tooltips[i].style.left = x;
  }
};
///

// show elements with tiny animation (it might be in general.js)
const options = { threshold: [0.1] };
const observer = new IntersectionObserver(onEntry, options);
document
  .querySelectorAll('section')
  .forEach(section => observer.observe(section));
function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) change.target.classList.add('in-view');
    else change.target.classList.remove('in-view');
  });
}

// rendering with options
let device,
  currentDevice = 'm';
const retinaORnot = window.devicePixelRatio >= 2 ? 2 : 1;
const webpORjpg = document.body.classList.contains('nowebp') ? 'jpg' : 'webp'; // manualy switch to jpg:
// let webpORjpg = 'jpg';
window.addEventListener('resize', () => {
  renderAccodingToWidth()
    .then(simpleLightboxCoversSection.refresh())
    .catch(e => console.error(e));
});

const allProjects = [
  { id: 1, name: 'WatchCharm', alt: 'Premium watches collections' },
  { id: 2, name: 'StarlightStudio', alt: 'Improve your business' },
  { id: 4, name: 'Get SH', alt: 'Get body in shape, Stay healthy' },
  { id: 5, name: 'Fresh HB', alt: 'Fresh harvest box helper' },
  { id: 6, name: 'Chego', alt: 'Jewellery for special' },
  { id: 7, name: 'MIMINO hotel', alt: 'Great food available to everyone' },
  { id: 8, name: 'Ukrainian DO', alt: 'Reviving the traditional artistry' },
  { id: 9, name: 'OV Diet', alt: 'Organic vegetables to your diet today' },
  { id: 10, name: 'Power Pulse', alt: 'Transforming your body shape' },
  { id: 11, name: 'MY Finances', alt: 'Manage Your Finances Masterfully' },
  { id: 12, name: 'L English', alt: 'Joing and learning Eanglish with us' },
];
const proudOfProjects = [
  { id: 5 },
  { id: 10 },
  { id: 7 },
  { id: 6 },
  { id: 12 },
  { id: 11 },
  { id: 1 },
  { id: 8 },
  { id: 2 },
  { id: 9 },
  { id: 4 },
  { id: 5 },
];
let allCardsCode = '';

function renderCoverCards(
  allProjects,
  productsList,
  device,
  retinaORnot,
  webpORjpg
) {
  let path =
    webpORjpg === 'jpg'
      ? `./img/covers/project`
      : `https://raw.githubusercontent.com/StasAstenenko/js-gurus/main/src/img/covers/project`;
  allCardsCode = productsList.reduce(
    (acc, { id }) =>
      (acc += `<li class="card-of-project"><a class="tooltip" href="${path}${id
        .toString()
        .padStart(2, '0')}pc@${retinaORnot}.${webpORjpg}"><img src="${path}${id
        .toString()
        .padStart(2, '0')}${device}@${retinaORnot}.${webpORjpg}" alt="${
        allProjects.find(element => element.id === id).name
      }"><span>${
        allProjects.find(element => element.id === id).alt
      }</span></a></li>`),
    ''
  );

  document.querySelector('.covers-ul').innerHTML = allCardsCode;
}
async function renderAccodingToWidth() {
  if (window.innerWidth < 768) currentDevice = 'm';
  else if (window.innerWidth > 1439) currentDevice = 'pc';
  else currentDevice = 't';

  if (device !== currentDevice) {
    device = currentDevice;
    renderCoverCards(
      allProjects,
      proudOfProjects,
      currentDevice,
      retinaORnot,
      webpORjpg
    );
  }
}
renderAccodingToWidth();

// simpleLightbox
const simpleLightboxCoversSection = new simpleLightbox('.card-of-project a', {
  captionsData: 'alt',
  captionDelay: 250,
});
simpleLightboxCoversSection.on('show.simplelightbox', coversMovement);
simpleLightboxCoversSection.on('close.simplelightbox', coversMovement);
simpleLightboxCoversSection.on('error.simplelightbox', e => console.error(e));
// /simpleLightbox

function coversMovement() {
  document.querySelector('.section-covers').classList.toggle('in-view');
}
