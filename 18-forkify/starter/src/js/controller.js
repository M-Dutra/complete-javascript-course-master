import * as model from './model.js'; // Model
import recipeView from './views/recipeViews.js'; // View
import searchView from './views/searchView.js'; // View


// Parcel import - assets, images , icons, etc
// console.log(icons);
import  'core-js/stable'; // polyfilling everything else
import 'regenerator-runtime/runtime'; // polyfilling async await
import {async} from 'regenerator-runtime';

const controlRecipes = async function() {
  try {

    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 1 Loading Recipe
    await model.loadRecipe(id);

    // 2 Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};


const controlSearchResults = async function() {
  try {

    // 1 Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2 Load search result
    await model.loadSearchResults(query);

    // 3 Render results
    console.log(model.state.search.results);
  } catch(err) {
    console.log(err);
  }
}


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
