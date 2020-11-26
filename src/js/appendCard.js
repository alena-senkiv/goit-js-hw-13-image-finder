import getRefs from './getRefs';
import LoadMoreBtn from './components/loadMoreBtn';
import PixabayApiService from './apiService';
import cardsTpl from '../templates/cardImgTpl.hbs';
import '../js/lightbox';
import { debounce } from 'lodash';
import { notification } from './pnotify';

const refs = getRefs();
const pixabayApiService = new PixabayApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.input.addEventListener('input', debounce(onInputChange, 1000));
loadMoreBtn.refs.button.addEventListener('click', onScroll);

function onInputChange(e) {
  e.preventDefault();
  pixabayApiService.query = e.target.value.trim();

  // if (pixabayApiService.query === '') {
  //   return alert('Введите запрос');
  // }
  loadMoreBtn.show();
  pixabayApiService.resetPage();
  clearCardsList();
  fetchCards();
}

function onScroll() {
  fetchCards();

  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, 500);
}

function fetchCards() {
  loadMoreBtn.disable();
  pixabayApiService.fetchPhoto().then(data => {
    appendCardsMarkup(data);
    loadMoreBtn.enable();
  });
}

function appendCardsMarkup(item) {
  refs.cardsList.insertAdjacentHTML('beforeend', cardsTpl(item));
}

function clearCardsList() {
  refs.cardsList.innerHTML = '';
}
