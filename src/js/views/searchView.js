class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    // nacte query
    const query = this._parentEl.querySelector('.search__field').value;
    // smaze query z vyhledavaciho pole
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    //tim ze to dam na cely element udelam to ze to listen cely element enter i click
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
