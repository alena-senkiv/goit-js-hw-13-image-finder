const API_KEY = '19232592-72d20f794acedbda632f0e7bd';
const BASE_URL = 'https://pixabay.com/api';

export default class PixabayApiService {
  constructors() {
    this.searchQuery = '';
    this.page = 1;
    // this.check();
  }

  fetchPhoto() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch(error => console.log(error));
  }

  // check() {
  //   if ((this.searchQuery = '')) {
  //     return;
  //   }
  // }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
