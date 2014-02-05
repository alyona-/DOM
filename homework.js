/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */




var list = document.querySelector('ul');
list.addEventListener('click', function(event) {
    var target = event.target;
    while (target.tagName !== 'LI') {
        target = target.parentNode;
    }
    var link= target.children[0];
    if(event.preventDefault) {
        event.preventDefault();
        openPopupFromLink(link);
    }
    else{
        event.returnValue = false;
        openPopupFromLink(link);
    }
});

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */

function openPopupFromLink(link) {
    var title = link.getAttribute('data-title');
    var message = link.getAttribute('data-message').replace('%s' , link);
    createPopup(title, message,function onOk (){
        location.href = link;
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
    var parentEl = document.body;
    var winda = document.createElement('div');
    var  str ='<div class="fon"></div><div class="window"><h4>'+title+'</h4><p>'+message+'</p>' +
        '<input type="button" value="Да"  value="1" class="buttons" id="button_1">' +
        '<input type="button" value="Нет" class="buttons" id="button_2"></div>';
    parentEl.appendChild(winda);
    winda.innerHTML = str;
    winda.addEventListener('click', function(event) {
        var target = event.target;
      while (target.tagName == 'INPUT') {
            target = target.parentNode;

        }
        if(event.target.value === 'Да') {
            onOk();
        }else if(event.target.value === 'Нет'){
            parentEl.removeChild(winda);
        }  }); 
}
