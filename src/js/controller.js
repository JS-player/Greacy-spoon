const { async } = require("q");
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model'; 
import recipeView from './views/recipeView';
import  {searchView} from './views/recipeView'
import resultsView from './views/resultsView';
import bookmarkView from './views/bookmarkView';
import paginationView from './views/pagination'

const showRecipe = async function(){ 
  try{
    //getting id of recipe
   const id = window.location.hash.slice(1); 
   if(!id) return;
    recipeView.spinner();
     //getting data
    await model.loadReipe(id);
    const recipe = model.state.recipe;
 if(model.state.search.results.length > 1) resultsView.update(model.getSearchPage(model.state.search.currentPage),true);
 //test
 //rendering data
  recipeView.render(recipe);
  bookmarkView.update(model.state.bookmarks, true); //updating bookmarks
  }catch(err){
    console.error(err);
    recipeView.renderError();
  }
}
const controlSearch = async function(){
  try{
  const query = searchView.getQuery();
  //spinner while getting data 
  resultsView.spinner();
 await model.loadSearchResult(query);
 controlPagination();
  }catch(err){
    resultsView.renderError();
    console.log(err);
  }
}
const controlPagination = function(val , trends = false){
  resultsView.render(model.getSearchPage(val));
  paginationView.htmlGenerator(model.state.search);
 if(trends === false) paginationView._showNumOfResults();
}

const controlServing = function(newServing){
  model.updateServing(newServing);
  // recipeView.render(model.state.recipe);  //reload all html 
  recipeView.update(model.state.recipe);  //updated text changes only
}

const controlBookmarks = function () {
  model.addBookMark(model.state.recipe);
  recipeView.update(model.state.recipe , true);
  bookmarkView.render(model.state.bookmarks);
}

const getSavedBookmarks = function () {
 const data = localStorage.getItem('bookmarks');
 if(data) model.state.bookmarks = JSON.parse(data) ;
 bookmarkView.render(model.state.bookmarks);
}
const trendRecipesLoad = async function(){
  await model.loadSearchResult('ice');
  model.state.search.results = model.state.search.results.slice(1,11); //deleting first result cause i dont like it ;)
  controlPagination(1, true);
}
const controlSuggests = async function (query) {
  await model.loadSearchResult(query);
  controlPagination();
  resultsView.clearSuggs();
}
const init = function(){
  resultsView.suggestsListner(controlSuggests);
  getSavedBookmarks();
  recipeView.renderHandler(showRecipe);
  recipeView.servingsHandler(controlServing);
  recipeView.addBookmarkhandler(controlBookmarks);
  searchView.addHandlerSearch(controlSearch);
  paginationView.clickHandler(controlPagination);
  trendRecipesLoad();
}
init();