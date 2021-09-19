import icons from 'url:../../img/icons.svg';
import view from './view'

class bookmarkView extends view {
    _parentEl = document.querySelector('.bookmarks__list');
    _errMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
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
    
}
export default new bookmarkView();