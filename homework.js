var list = document.querySelector('body');
list.addEventListener('click', function(event) {
    var target = event.target;
    if(target.className!=='popup-link'){
        while(target.className!=='popup-link' || target.tagName == 'BODY'){
            target = target.parentNode;
        }
    }
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
    var parentEl = document.body;
    popap = document.getElementsByClassName('popap');
	if(popap.length!=1){
	    winda = document.createElement('div');
		winda.className='popap';
		parentEl.appendChild(winda);
		obj ={
		  str1: '<div class="fon"></div><div class="window"><h4 class="title">',
		  str2: title,
		  str3:'</h4><p class="text">',
		  str4: message,
		  str5: '</p><input type="button" value="Да"  class="buttons" id="button_1">' +
              '<input type="button" value="Нет" class="buttons" id="button_2"></div>'
		 }
		   winda.innerHTML =(obj.str1+obj.str2+obj.str3+obj.str4+obj.str5);
		   winda.addEventListener('click', function(event) {
           var target = event.target.parentNode;
           if(event.target.value === 'Да') {
               onOk();
           }else if(event.target.value === 'Нет'){
               winda.style.display = 'none';
			 winda.innerHTML ='';
           }  });
		
	}  else {
         obj.str2=title;
         obj.str4=message;
	     winda.style.display ='block';
	     winda.innerHTML = (obj.str1+obj.str2+obj.str3+obj.str4+obj.str5);
	}
}