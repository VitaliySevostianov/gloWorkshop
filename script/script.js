'use strict';
document.addEventListener("DOMContentLoaded", () => {
    
    //Screen keyboard
    {
        const keyboardBtn = document.querySelector('.search-form__keyboard');
        const searchInput = document.querySelector('.search-form__input');
        const keyboard = document.querySelector('.keyboard');
        const keyboardCloseBtn = document.getElementById('close-keyboard');

        const toggleKeyboard = () => {
            keyboard.style.top = keyboard.style.top ? '' : '50%';
        }

        const typing = event => {  
            console.log(event.target.innerText);  
            if(event.target.innerText == "⬅"){
                searchInput.value = searchInput.value.slice(0, -1);
            }
            else if(event.target.tagName === 'BUTTON'){
                searchInput.value += event.target.innerText;
            }
        }

        keyboardBtn.addEventListener('click', toggleKeyboard);
        keyboardCloseBtn.addEventListener('click', toggleKeyboard);
        keyboard.addEventListener('click', typing);
    }

    //Menu
    {
        const burger = document.querySelector('.spinner');
        const sidebarMenu = document.querySelector('.sidebarMenu');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            sidebarMenu.classList.toggle('rollUp');
        });

        sidebarMenu.addEventListener('click', event => {
            let target = event.target
            target = target.closest('a[href ="#"]');

            if(target){
                const parentTarget = target.parentElement;
                console.log(sidebarMenu.querySelectorAll('li').forEach(elem => {
                    if(elem === parentTarget){
                        elem.classList.add('active');
                    }else{
                        elem.classList.remove('active');
                    }
                }));
            }
        });
    }
});
