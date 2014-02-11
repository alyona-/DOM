obj ={}
    obj.str1='<div class="fon"></div><div class="window"><h4 class="title">';
    obj.str2= '';
    obj.str3='</h4><p class="text">';
    obj.str4= '';
    obj.str5= '</p><input type="button" value="Да"  class="buttons" id="button_1">' +
        '<input type="button" value="Нет" class="buttons" id="button_2"></div>';
    obj.winda= document.createElement('div');
    obj.parentEl= document.body;
    obj.popap= document.getElementsByClassName('popap');


var list = document.querySelector('body');
list.addEventListener('click', function(event) {
    var target = event.target;
    do {
        var i=false;
        var classList = target.classList.toString();
        classList=classList.split(' ');
        for(var i in classList){
            if(classList[i] == 'popup-link') {i=true;break;}
        }
        if(i==true) break;
        target=target.parentNode;
    }while(target.tagName == 'BODY');
    event.returnValue = false;
    openPopupFromLink(target);
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
	if(obj.popap.length!=1){
           obj.winda.className='popap';
           obj.parentEl.appendChild(obj.winda);
		   obj.winda.addEventListener('click', function(event) {
           var target = event.target.parentNode;
           if(event.target.value === 'Да') {
               onOk();
           }else if(event.target.value === 'Нет'){
               obj.winda.style.display = 'none';
			 obj.winda.innerHTML ='';
           }  });
		
	}  else {
	     obj.winda.style.display ='block';
	}
    obj.str2=title;
    obj.str4=message;
	obj.winda.innerHTML = (obj.str1+obj.str2+obj.str3+obj.str4+obj.str5);
}