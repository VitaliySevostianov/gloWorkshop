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

        const changeLang = (btn, lang) => {
            const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
                'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
                'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
                'en', ' '
            ];
            const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
                'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
                'ru', ' '
            ];
            if (lang == 'en') {
                btn.forEach((elem, i) => {
                    elem.innerText = langEn[i];
                })
            } else {
                btn.forEach((elem, i) => {
                    elem.innerText = langRu[i];
                })
            }
        };


        const typing = event => {
            if (event.target.tagName === 'BUTTON') {
                const buttons = [...keyboard.querySelectorAll('button')]
                    .filter(elem => elem.style.visibility !== 'hidden');
                console.log(buttons);
                if (event.target.innerText == "⬅") {
                    searchInput.value = searchInput.value.slice(0, -1);
                } else if (event.target.innerText === 'en' || event.target.innerText === 'ru') {
                    changeLang(buttons, event.target.innerText)
                } else {
                    searchInput.value += event.target.innerText;
                }
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

            if (target) {
                const parentTarget = target.parentElement;
                console.log(sidebarMenu.querySelectorAll('li').forEach(elem => {
                    if (elem === parentTarget) {
                        elem.classList.add('active');
                    } else {
                        elem.classList.remove('active');
                    }
                }));
            }
        });
    }

    //Modal
    {
        document.body.insertAdjacentHTML('beforeend',
                                                    `<div class="youTuberModal">
                                                        <div id="youtuberClose">&#215;</div>
                                                        <div id="youtuberContainer"></div>
                                                    </div>`);

        const youtuberItems = document.querySelectorAll('[data-youtuber]');
        const youtuberModal = document.querySelector('.youTuberModal');
        const youtuberContainer = document.getElementById('youtuberContainer')

        const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256],
            qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];


        const sizeVideo = () => {
            let ww = document.documentElement.clientWidth,
                wh = document.documentElement.clientHeight;

            for (let i = 0; i < qw.length; i++) {
                if (ww > qw[i]) {
                    youtuberContainer.querySelector('iframe').style.cssText = `
                            width: ${qw[i]}px;
                            height: ${qh[i]}px;
                        `;
                    youtuberContainer.style.cssText = `
                            width: ${qw[i]}px;
                            height: ${qh[i]}px;
                            top: ${(wh - qh[i]) / 2}px;
                            left: ${(ww - qw[i]) / 2}px;
                        `;
                    break;
                }
            }
        };

        youtuberItems.forEach(elem => {
            elem.addEventListener('click', () => {
                const idVideo = elem.dataset.youtuber;
                youtuberModal.style.display = "block";

                const youtuberFrame = document.createElement('iframe')
                youtuberFrame.src = `https://youtube.com/embed/${idVideo}`;
                youtuberContainer.insertAdjacentElement('beforeend', youtuberFrame);
                sizeVideo();
            });
        });

        youtuberModal.addEventListener('click', () => {
            youtuberModal.style.display = '';
            youtuberContainer.textContent = '';
            window.removeEventListener('resize', sizeVideo);
        });
    }

    //Youtube
    {
        const API_KEY = 'AIzaSyCEFg-w7uVtTV7fyLUWmt2XTWajin3FlTg';
        const CLIENT_ID = '180348839409-qugal2968hp8737d24aj2p2od2ft1nir.apps.googleusercontent.com';
    }
});