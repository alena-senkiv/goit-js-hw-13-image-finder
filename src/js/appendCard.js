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

refs.input.addEventListener('input', debounce(onInputChange, 2000));
loadMoreBtn.refs.button.addEventListener('click', onScroll);

function onInputChange(e) {
  e.preventDefault();
  clearCardsList();
  pixabayApiService.query = e.target.value.trim();

  pixabayApiService.resetPage();
  fetchCards();
  loadMoreBtn.show();
  e.target.value = '';
}

function fetchCards() {
  loadMoreBtn.disable();
  pixabayApiService.fetchImg().then(data => {
    catchError(data);
    loadMoreBtn.enable();
    appendCardsMarkup(data);
  });
}

function appendCardsMarkup(item) {
  refs.cardsList.insertAdjacentHTML('beforeend', cardsTpl(item));
}

function catchError(data) {
  if (data.length === 0) {
    loadMoreBtn.disable();
    notification(
      'error',
      'Sorry. Images not found! Please, enter another search phrase',
    );
  }

  if (data.length > pixabayApiService.perPage) {
    loadMoreBtn.disable();
    notification('error', 'Sorry. No more images found!');
  }
}

function clearCardsList() {
  refs.cardsList.innerHTML = '';
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
