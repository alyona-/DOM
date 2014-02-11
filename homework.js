template ={}
    template.str1='<div class="fon"></div><div class="window"><h4 class="title">';
    template.str2= '';
    template.str3='</h4><p class="text">';
    template.str4= '';
    template.str5= '</p><input type="button" value="Да"  class="buttons" id="button_1">' +
        '<input type="button" value="Нет" class="buttons" id="button_2"></div>';
    template.winda= document.createElement('div');
    template.parentEl= document.body;
    template.popap= document.getElementsByClassName('popap');


document.querySelector('body').addEventListener('click', function(event) {
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
	if(template.popap.length!=1){
           template.winda.className='popap';
           template.parentEl.appendChild(template.winda);
		   template.winda.addEventListener('click', function(event) {
           var target = event.target.parentNode;
           if(event.target.value === 'Да') {
               onOk();
           }else if(event.target.value === 'Нет'){
               template.winda.style.display = 'none';
			 template.winda.innerHTML ='';
           }  });
		
	}  else {
	     template.winda.style.display ='block';
	}
    template.str2=title;
    template.str4=message;
	template.winda.innerHTML = (template.str1+template.str2+template.str3+template.str4+template.str5);
}