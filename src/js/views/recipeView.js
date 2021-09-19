import icons from 'url:../../img/icons.svg'; //for parcel 2
import view from './view'
class recipeView extends view{
    _data;
    _parentEl = document.querySelector('.recipe');
    _errMessage = `We  could not find that recipe please try another one!`;
    _message = '';

    renderHandler(fun){
      const events = ['hashchange','load']; 
      events.forEach(ev => addEventListener(ev, fun));
    }
    htmlGenerator(){
      return  `
        <figure class="recipe__fig">
 <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
 <h1 class="recipe__title">
   <span>${this._data.title}</span>
 </h1>
</figure>

<div class="recipe__details">
 <div class="recipe__info">
   <svg class="recipe__info-icon">
     <use href="${icons}#icon-clock"></use>
   </svg>
   <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
   <span class="recipe__info-text">minutes</span>
 </div>
 <div class="recipe__info">
   <svg class="recipe__info-icon">
     <use href="${icons}#icon-users"></use>
   </svg>
   <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
   <span class="recipe__info-text">servings</span>

   <div class="recipe__info-buttons">
     <button class="btn--tiny btn--update-servings" data-servVal = ${this._data.servings - 1}>
       <svg>
         <use href="${icons}#icon-minus-circle"></use>
       </svg>
     </button>
     <button class="btn--tiny btn--update-servings" data-servVal = ${this._data.servings + 1}>
       <svg>
         <use href="${icons}#icon-plus-circle"></use>
       </svg>
     </button>
   </div>
 </div>

 <div class="recipe__user-generated">
   <svg>
     <use href="${icons}#icon-user"></use>
   </svg>
 </div>
 <button class="btn--round bookmark">
   <svg class="">
     <use href="${icons}#icon-bookmark${this._data.bookmarked? '-fill' : ''}"></use>
   </svg>
 </button>
</div>

<div class="recipe__ingredients">
 <h2 class="heading--2">Recipe ingredients</h2>
 <ul class="recipe__ingredient-list">
 ${this._data.ingredients.map(el => {
return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div style="font-weight: 600;color:_f38e82;" class="recipe__quantity">${el.quantity ? +el.quantity.toFixed(1) :''}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${el.unit ? el.unit :''}</span>
        ${el.description ? el.description : ''}
   </div>
 </li>
 ` ;}
 ).join('')} 
 </ul>
</div>

<div class="recipe__directions">
 <h2 class="heading--2">How to cook it</h2>
 <p class="recipe__directions-text">
   This recipe was carefully designed and tested by
   <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
   directions at their website.
 </p>
 <a
   class="btn--small recipe__btn"
   href="${this._data.sourceUrl}"
   target="_blank"
 >
   <span>Directions</span>
   <svg class="search__icon">
     <use href="${icons}#icon-arrow-right"></use>
   </svg>
 </a>
</div>
`
    }

    servingsHandler(handler){
    this._parentEl.addEventListener('click',function(e){
    const btn = e.target.closest('.btn--update-servings');
    if(!btn) return;
    let newServ_val = +btn.dataset.servval ; 
    if (newServ_val < 1) return ;
    handler(newServ_val);
    });
    }
     
   addBookmarkhandler(handler){
  this._parentEl.addEventListener('click',function (e) {
    e.preventDefault;
    const btn = e.target.closest('.bookmark');
    if(!btn) return;
    handler();
  })
   }

    Getfraction(dec){  //converting decimal to fraction 
      let int , fraction ;
     if(Number.isInteger(dec) ) return dec;  //if number isn't decimal return it
     if (dec > 1) { // if number is decimal but greater than 1 
         int = Math.floor(dec);
         dec = dec - int; 
     }
     let denominator = 100 / (dec*100);  //coverting to 1/denominator 
     fraction = `1/${denominator}`;
     if (!Number.isInteger(denominator)){ //if converted result has a decimal number then try num 2
        fraction = `${dec/0.25}/${100/25}`;
     }
     if (int) return `${int} <span style = 'font-size:12px'>${fraction}</span>`
     return fraction;
    }

}
export default new recipeView();


class searchView {
  _parenEl = document.querySelector('.search');
  
  getQuery(){
    const query = this._parenEl.querySelector('.search__field').value;
    if (!query) return;
    this.clear();
    return query;
  }
  clear(){
    this._parenEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler){
    this._parenEl.addEventListener('submit' , function(e){
    e.preventDefault(); 
    handler();
    });
  }
}
const SearchView = new searchView();
export {SearchView as searchView}