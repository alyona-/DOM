/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */
str =new String();
var list = document.querySelector('body');
list.addEventListener('click', function(event) {
   event.returnValue = false;
    if(event.target.className == 'popup-link'){
        openPopupFromLink(event.target);
    } else if(event.target.parentNode.className=='popup-link'){
        openPopupFromLink(event.target.parentNode);
    }

});



/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */

function openPopupFromLink(link) {
    createPopup(link.getAttribute('data-title'),
       link.getAttribute('data-message').replace('%s' , link),
        function onOk (){
            location.href = link.getAttribute('href');
        });
}

/**
 * Создаёт DOM-узел с сообщением
 * @param {String} title Заголовок сообщение
 * @param {String} message Текст сообщения сообщение
 * @param {Function} onOk Обработчик клика по кнопке 'Да'
 * @returns {HTMLElement}
 */

function createPopup(title, message, onOk) {
    parentEl = document.body;
   if(document.getElementsByClassName('winda').length == 0){
       winda = document.createElement('div');
        str ='<div class="fon"></div>' +
           '<div class="window">' +
           '<h4 class="title"></h4>' +
           '<p class="text"></p>' +
           '<input type="button" value="Да"  class="buttons" id="button_1">' +
           '<input type="button" value="Нет" class="buttons" id="button_2">' +
           '</div>';

       winda.addEventListener('click', function(event) {
           var target = event.target.parentNode;
           if(event.target.value === 'Да') {
               onOk();
           }else if(event.target.value === 'Нет'){
               winda.style.display = 'none';
           }  });


   }else {
        winda.style.display = 'block';
   }

    str =str.substr(0, (str.indexOf('<h4 class="title">') +'<h4 class="title">'.length ))+
             title +
        str.substr(str.indexOf('</h4>'), str.length);

    str =str.substr(0 , (str.indexOf('<p class="text">') +'<p class="text">'.length)) +
        message +str.substr(str.indexOf('</p>') ,str.length);
    parentEl.appendChild(winda);
    winda.innerHTML = str;
	
}
