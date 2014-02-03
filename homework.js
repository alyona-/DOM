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
     createPopup(
        link.getAttribute('data-title'),
        link.getAttribute('data-message').replace('%s' , link.getAttribute('href')),
        link.getAttribute('href')
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
    var fon = document.createElement('block');
    var parentEl = document.body;
    var winda = document.createElement('block');
    var h4 = document.createElement('h4');
    var p = document.createElement('p');
    var text = document.createTextNode(title);
    var ptext = document.createTextNode(message);
    var buton = new Array();
    for(var i=0; i<2; i++){
        buton[i] = document.createElement('input');
        buton[i].type ='button';
        buton[i].id = 'button_'+(i+1);
        buton[i].className = 'buttons';
        winda.appendChild(buton[i]);
        if(i==0){
            buton[i].value= 'Да';
            buton[i] = buton[i].addEventListener("click",function () {
                location.href = onOk;
            },false);
        }
        else {
            buton[i].value= 'Нет';
            buton[i] = buton[i].addEventListener("click",function () {
                fon.style.display = 'none';
                winda.style.display = 'none';
            }, false );
        }
    }

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
}
