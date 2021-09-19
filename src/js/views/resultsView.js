import icons from 'url:../../img/icons.svg';
import view from './view'

class resultsView extends view {
    _parentEl = document.querySelector('.results');
    _errMessage = `We  could not find that recipe please try another one ;)`;
    htmlGenerator(){
      const html = this._data.map(el => {
     return this._itemGenerator(el);
        }).join('');
        return html ;
    }
    _itemGenerator(el){
      const id = window.location.hash.slice(1);
        return `
        <li class="preview">
        <a class="preview__link ${id == el.id ? 'preview__link--active' : ''}" href="#${el.id}">
          <figure class="preview__fig">
            <img src="${el.image}" alt="${el.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${el.title}</h4>
            <p class="preview__publisher">${el.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
        `
    }
    getSearchQuerys(){
      const searchField = document.querySelector('.search__field');
      let query = searchField.value;
      if(!query){ this.borderResizer(false)
        document.querySelector('.suggs-ist').innerHTML = '';
        return;
      };
      let results = [];
    const keys =  ["carrot","broccoli","asparagus","cauliflower","corn","cucumber","greenpepper","lettuce","mushrooms","onion","potato","pumpkin","redpepper","tomato","beetroot","brusselsprouts","peas","zucchini","radish","sweetpotato","artichoke","leek","cabbage","celery","chili","garlic","basil","coriander","parsley","dill","rosemary","oregano","cinnamon","saffron","greenbean","bean","chickpea","lentil","apple","apricot","avocado","banana","blackberry","blackcurrant","blueberry","boysenberry","cherry","coconut","fig","grape","grapefruit","kiwifruit","lemon","lime","lychee","mandarin","mango","melon","nectarine","orange","papaya","passionfruit","peach","pear","pineapple","plum","pomegranate","quince","raspberry","strawberry","watermelon","salad","pizza","pasta","popcorn","lobster","steak","bbq","pudding","hamburger","pie","cake","sausage","tacos","kebab","poutine","seafood","chips","fries","masala","paella","somtam","chicken","toast","marzipan","tofu","ketchup","hummus","chili","maplesyrup","parmaham","fajitas","champ","lasagna","poke","chocolate","croissant","arepas","bunnychow","pierogi","donuts","rendang","sushi","icecream","duck","curry","beef","goat","lamb","turkey","pork","fish","crab","bacon","ham","pepperoni","salami","ribs"];
    keys.forEach(key => {
      if(key.includes(query)) results.push(key);
    });
    if(results.length > 0 ) this.borderResizer(true);
    else this.borderResizer(false);
    const suggs = this.suggsHtmlGenerator(results);
    this.clearSuggs();
    document.querySelector('.suggs-ist').insertAdjacentHTML('afterbegin',suggs);
    }
    suggestsListner(handler){
      const searchField = document.querySelector('.search__field');
      searchField.addEventListener('keyup' ,  this.getSearchQuerys.bind(this));
      //getting clicked value
      const  suggItems = document.querySelector('.suggs-ist');
     suggItems.addEventListener('click' , function (e) {
        e.preventDefault();
    let clickedQ =  e.target.closest('li');
     if(!clickedQ || clickedQ === '') return;
     clickedQ = clickedQ.innerText;
     handler(clickedQ );
     searchField.value = '';
      })
    }

    clearSuggs(){
      document.querySelector('.suggs-ist').innerHTML = '';
    }
    borderResizer(searching){
      if(searching){
        document.querySelector('.search').style.borderRadius = '2rem 3rem 0 0';
      document.querySelector('.search__btn').style.borderRadius = '2rem 3rem 0 2rem';
    }
      else{
        document.querySelector('.search').style.borderRadius = '10rem';
        document.querySelector('.search__btn').style.borderRadius = '10rem';
      }
    }
    suggsHtmlGenerator(data){
      let suggs = data.slice(0,6);
      const html = suggs.map(suggest =>`<li>${suggest}</li>`).join('');
      return html ;
    }
    
}
export default new resultsView();