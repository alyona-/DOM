/**
* Обработчик клика по ссылке с классом 'popup-link'
* @param {Event} e событие клика
* @private
*/


    var link_1 = document.getElementsByClassName('popup-link')[0];
    var link_2 = document.getElementsByClassName('popup-link')[1];
    link_1.addEventListener("click",function (){_onMouseClick(this);},false);
    link_2.addEventListener("click",function () {_onMouseClick(this);},false);


function _onMouseClick(e) {
    if(e.preventDefault) {
        e.preventDefault();
        openPopupFromLink(e);
    }else { // вариант IE<9:
        event.returnValue = false;
        openPopupFromLink(e);
    }
}

/**
* Получает данные из ссылки
* на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
* @param {HTMLElement} link Ссылка с data-аттрибутами
*/

function openPopupFromLink(link) {
    var title = link.getAttribute('data-title');
    var message = link.getAttribute('data-message');
    var href = link.getAttribute('href');
    if(message.indexOf('%s')!=-1){
        message = message.replace('%s' , href);
    }
    createPopup(title, message, href);
}



/**
* Создаёт DOM-узел с сообщением
* @param {String} title Заголовок сообщение
* @param {String} message Текст сообщения сообщение
* @param {Function} onOk Обработчик клика по кнопке 'Да'
* @returns {HTMLElement}
*/

function createPopup(title, message, onOk) {
    var fon = document.createElement('block');
    var parentEl = document.body;
    var winda = document.createElement('block');
    var h4 = document.createElement('h4');
    var p = document.createElement('p');
    var text = document.createTextNode(title);
    var ptext = document.createTextNode(message);
    var input_1 = document.createElement('input');
    var input_2 = document.createElement('input');

    input_1.addEventListener("click",function () {
    location.href = onOk;
    },false);
    input_2.addEventListener("click",function () {
    fon.style.display = 'none';
    winda.style.display = 'none';
    },false);
    input_1.type = 'button';
    input_2.type = 'button';
    input_1.className = 'buttons';
    input_2.className = 'buttons';
    input_1.id = 'button_1';
    input_2.id = 'button_2';
    input_1.value = 'Да';
    input_2.value = 'Нет';
    winda.className = 'window';
    fon.className = 'fon';
    fon.style.display = 'block';
    winda.style.display = 'block';
    parentEl.appendChild(fon);
    parentEl.appendChild(winda);
    h4.appendChild(text);
    p.appendChild(ptext);
    winda.appendChild(h4);
    winda.appendChild(p);
    winda.appendChild(input_1);
    winda.appendChild(input_2);
}
