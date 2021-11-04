import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// toto je soucast parcel neni to JS
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // beru id z adresy url
    const id = window.location.hash.slice(1);
    // guard clause - kdyz nemam zadny ID
    if (!id) return;
    //render spinner
    recipeView.renderSpinner();
    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // render spinner na nacitani vyhledavanych receptu
    resultsView.renderSpinner();

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
