/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */

window.onload  = function (){
    win = false;
}

var list = document.querySelector('body');
list.addEventListener('click', function(event) {
    var target = event.target;
    if(event.target.className == 'popup-link'){
        event.returnValue = false;
        openPopupFromLink(target);
    } else if(target.parentNode.className=='popup-link'){
        event.returnValue = false;
        openPopupFromLink(target.parentNode);
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
    (win == false)?winda = document.createElement('div'):winda.style.display = 'block';
    var  str ='<div class="fon"></div><div class="window"><h4>'+title+'</h4><p>'+message+'</p>' +
        '<input type="button" value="Да"  value="1" class="buttons" id="button_1">' +
        '<input type="button" value="Нет" class="buttons" id="button_2"></div>';
    parentEl.appendChild(winda);
    winda.innerHTML = str;
    winda.addEventListener('click', function(event) {
	  var target = event.target.parentNode;
        if(event.target.value === 'Да') {
            onOk();
        }else if(event.target.value === 'Нет'){
			winda.style.display = 'none';
        }  });
        win = true;
}
