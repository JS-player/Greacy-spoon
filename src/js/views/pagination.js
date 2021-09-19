import view from './view';
import icons from 'url:../../img/icons.svg';
class paginationView extends view {
    _parentEl = document.querySelector('.pagination');
    htmlGenerator(data){
        this.clear();
       this._data = data;
       if (this._data.numOfPages === 1) return;  //if there is one result page hide buttons
       if (this._data.numOfPages > 1 && this._data.currentPage === 1) 
       return this.render(this.buttonGenerator('next')); //more than one page and current page is 1
       if(this._data.numOfPages > 1 && this._data.currentPage === this._data.numOfPages) 
       return this.render(this.buttonGenerator('previous'));  //more than one page and its the final page
       if(this._data.numOfPages > 1 && this._data.currentPage > 1) 
       return this.render(this.buttonGenerator('multi')); //more than one page
    }
    render(button){
        this.clear();
        this._parentEl.insertAdjacentHTML('afterbegin', button);
    }
    clickHandler(handler){
        this._parentEl.addEventListener('click',function(e){
         const btn = e.target.closest('.btn--inline'); //selecting clicked button
         if(!btn) return;
         const val = +btn.dataset.number; //getting button value
         handler (val); //rendring result page selected by user
        });
    }
    buttonGenerator(go){
       if (go === 'next') return `
       <button data-number = '${this._data.currentPage +1}' class="btn--inline pagination__btn--next">
       <span>Page ${this._data.currentPage +1}</span>
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
       </svg>
     </button>
        `
        if (go === 'previous') return `
        <button data-number = '${this._data.currentPage -1}' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.currentPage -1}</span>
      </button>
         `
         if (go === 'multi') return `
         <button data-number = '${this._data.currentPage +1}'  class="btn--inline pagination__btn--next">
         <span>Page ${this._data.currentPage +1}</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </button>

       <button data-number = '${this._data.currentPage -1}' class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${this._data.currentPage -1}</span>
     </button>
         `
    }
    _showNumOfResults(){
      document.querySelector('.trendTitle').style.display = 'none';
        const divBox = document.querySelector('.numOfResults');
        if(this._data.results.length > 10 && this._data.currentPage*10 < this._data.results.length){
            divBox.innerHTML = `Showing ${((this._data.currentPage -1 )*10) +1} - ${this._data.currentPage*10} of ${this._data.results.length} recipes ...` 
        }else if (this._data.currentPage*10 > this._data.results.length ){
            divBox.innerHTML = `Showing ${((this._data.currentPage -1 )*10) +1} - ${this._data.results.length} of ${this._data.results.length} recipes ...` 
        }
        else{
            divBox.innerHTML = `Showing ${this._data.results.length} recipes ...` 
        }
       
      
      }
   
    
}
export default new paginationView();
