// for btn search
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  console.log(e.currentTarget.elements.query.value);
  pixabayApiService.query = e.currentTarget.elements.query.value;

  if (pixabayApiService.query === '') {
    return alert('Введите запрос');
  }
  loadMoreBtn.show();
  pixabayApiService.resetPage();
  clearCardsList();
  fetchCards();
}
