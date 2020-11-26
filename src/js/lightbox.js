import * as basicLightbox from 'basiclightbox';
import getRefs from './getRefs';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = getRefs();
refs.cardsList.addEventListener('click', onImgClick);

function onImgClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.src}" width="800" height="600">
`);

  instance.show();
}
