// import { async } from 'regenerator-runtime';
import {RES_PER_PAGE , API_URL} from './config'
import { getJson } from './helpers';
export const state = {
    recipe: {},
    search:{
        query:'',
        results:[],
        currentPage : 1,
        resultsPerPage : RES_PER_PAGE,
        numOfPages:0,
    },
    bookmarks:[],

}; 
export const loadReipe = async function (id){
    try{
      const data =  await getJson(`${API_URL}/${id}`)
        let recipe = data.data.recipe ;
    state.recipe = {
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            id : recipe.id,
            title: recipe.title,
            servings: recipe.servings,
            image: recipe.image_url,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            bookmarked: false,
       }
       state.bookmarks.forEach(bm=> bm.id === state.recipe.id ? addBookMark(state.recipe): '');
    }catch(err){
        throw err
    }
}

export const loadSearchResult = async function(query){
    try{
    const data = await getJson(`${API_URL}?search=${query}`);
    state.search.query = query ;
   state.search.results =  data.data.recipes.map(rec=>{
     return   {
        id : rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
    }});
    }catch(err){
        throw err;
    }
}
export const getSearchPage = function(page = 1){
    const data = state.search.results; //saving results data in the state
    const numOfResults = state.search.resultsPerPage; //how many result in one page
    state.search.currentPage = page; // save current search page
    state.search.numOfPages = Math.ceil(data.length / 10) //calc number of pages to contain results
    if (data.length <= 10) return data;
const start = (page - 1) * numOfResults ;
const end = page * numOfResults;
return data.slice(start, end);
}
export const updateServing = function(servingValue){ //updating ingredients for a number of servivings
    state.recipe.ingredients.forEach(ing =>{ //loping throw ingredients Array to update it
     ing.quantity = ing.quantity / state.recipe.servings * servingValue  
   }) 
    state.recipe.servings = servingValue; //seting the new servivings value to the state
    
}
export const addBookMark = function (recipe) {
    if(!state.recipe.bookmarked){  //checking if the recipe is bookmarked already
    //saving that recipe into bookmarks array [only if it's not there]
     if(state.bookmarks.findIndex(bookmarked => bookmarked.id === recipe.id) < 0)state.bookmarks.push(recipe); 
     state.recipe.bookmarked = true;
    }
    else {
        removeBookmarks(recipe.id);
    }
    saveBookmarks();
}
const removeBookmarks = function (id) {
 state.recipe.bookmarked = false;
  const  bookmarkIndex =  state.bookmarks.findIndex(bookmarked => bookmarked.id === id);
   state.bookmarks.splice(bookmarkIndex , 1);
   saveBookmarks();
}

const saveBookmarks = function () {
    localStorage.setItem('bookmarks' , JSON.stringify(state.bookmarks));
}