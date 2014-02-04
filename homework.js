/**
* Обработчик клика по ссылке с классом 'popup-link'
* @param {Event} e событие клика
* @private
*/


var link = document.getElementsByClassName('popup-link');
var linkArr = new Array();

for(i=0; i<link.length; i++) {
    linkArr[i] = link[i].addEventListener('click', function () {
    if(this.preventDefault) {
        this.preventDefault();
        openPopupFromLink(this);
    }
    else{
        event.returnValue = false;
        openPopupFromLink(this);
        }
    }, false);
}

/**
* Получает данные из ссылки
* на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
* @param {HTMLElement} link Ссылка с data-аттрибутами
*/

function openPopupFromLink(link) {
    var href = link.getAttribute('href');
    createPopup(
        link.getAttribute('data-title'),
        link.getAttribute('data-message').replace('%s' , link.getAttribute('href')),
        function onOk (){
            location.href = href;
        }
    );
}

/**
* Создаёт DOM-узел с сообщением
* @param {String} title Заголовок сообщение
* @param {String} message Текст сообщения сообщение
* @param {Function} onOk Обработчик клика по кнопке 'Да'
* @returns {HTMLElement}
*/

function createPopup(title, message, onOk) {
    var parentEl = document.body;
    var winda = document.createElement('block');
    var  str ='<div class="fon"></div><div class="window"><h4>'+title+'</h4><p>'+message+'</p>' +
                '<input type="button" value="Да" class="buttons" id="button_1">' +
                '<input type="button" value="Нет" class="buttons" id="button_2"></div>';
    parentEl.appendChild(winda);
    winda.innerHTML = str;
    var input1 = document.getElementById('button_1').addEventListener('click',onOk, false);
    var input2 = document.getElementById('button_2').addEventListener('click',function (){
    parentEl.removeChild(winda);
    }, false);
}
