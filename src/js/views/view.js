import icons from 'url:../../img/icons.svg';
export default class view{
    _data;
    _errMessage = `We  could not find that recipe please try another one!`;
   /**
    * Render the recived object to the DOM
    * @param {object | object[]} data  The data to be renderd in the parent element
    * @returns {undefined}
    * @author Mamoud Abdelrahman [M_JSplayer]
    */
    render(data){
        this._data = data;
        if (Array.isArray(this._data) && this._data.length === 0) { //if no data render Error
            this.renderError();
            return;
        }
        this.clear();   //clear the parent el to insert new html
        let html = this.htmlGenerator();   //a function that returns the html needed
        this._parentEl.insertAdjacentHTML('afterbegin', html);  //insert the new htnl in the parent el
    
        }
        clear(){
            this._parentEl.innerHTML = '';
        }
        /**
         * updating html [text content only] 
         * @param {Object | object[]} data 
         * @param {boolean} [if "onlyAttributes" is true update parameters only in html] NOT the content...
         * @returns {undefined}
         */
        update(data , onlyAttributes){
          if(!data) return;
          this._data = data;
          const newMarkup = this.htmlGenerator(); //new html recipe as text
          const newDom = document.createRange().createContextualFragment(newMarkup); //A virtual DOM for the new recipe
          const newElements = Array.from(newDom.querySelectorAll('*')); //creating an array of the new elements
          const currentEls = Array.from(this._parentEl.querySelectorAll('*')); //selecting current recipe html content to compare it with the updated html
          newElements.forEach((el,i)=>{    //loping throw new updated elements
          const currEL = currentEls[i];
          let textValue;  
          if(el.firstChild) textValue =  el.firstChild.nodeValue.trim();  //making sure there is a first child 
          // test
          if (newElements.length !== currentEls.length) return ; 
         //Updating recipe ingredients [ONLY TEXT VALUES]
          if(!currEL.isEqualNode(el) &&  textValue !== '' && !onlyAttributes){  //checking if the elemnt changed and contains a text string
            currEL.textContent = el.textContent;  //update the old text value to the new one
          }
          //updating new elemnts attributes
          if(!currEL.isEqualNode(el)){     //if an elemnt has changed
            Array.from(el.attributes).forEach(attr =>{  //looping throw the attributes of that element
            currEL.setAttribute(attr.name ,attr.value );  //set the old attributes to the new ones
            })
          }
          })
          }
        //Render spinner while getting data
        spinner(){
            this.clear();
            let tempHtml = `
            <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
            `;
            this._parentEl.insertAdjacentHTML('afterbegin',tempHtml);
        }
        renderError(message = this._errMessage){
            const html = `
             <div class="error">
            <div>
              <svg>
                <use href="${icons}_icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
            `
            this.clear();
            this._parentEl.insertAdjacentHTML('afterbegin',html);
          }
          
    renderMessage(message = this._message){
        const html = `
         <div class="message">
        <div>
          <svg>
            <use href="${icons}_icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
        `
        this.clear();
        this._parentEl.insertAdjacentHTML('afterbegin',html);
      }
}