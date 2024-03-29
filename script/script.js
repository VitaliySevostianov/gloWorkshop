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

    


    const youtuber = () => {
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

    //API
    {
        const API_KEY = 'AIzaSyCEFg-w7uVtTV7fyLUWmt2XTWajin3FlTg';
        const CLIENT_ID = '180348839409-qugal2968hp8737d24aj2p2od2ft1nir.apps.googleusercontent.com';
        //Auth
        {
            const buttonAuth = document.getElementById('authorize'),
                authBlock = document.querySelector('.auth');

            gapi.load("client:auth2", function () {
                gapi.auth2.init({client_id: CLIENT_ID});
            });

            const authenticate = () => gapi.auth2.getAuthInstance()
                    .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
                    .then(() => console.log("Sign-in successful"))
                    .catch(errorAuth);
                    
            

            const loadClient = () => {
                gapi.client.setApiKey(API_KEY);
                return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                    .then(() => console.log("GAPI client loaded for API"))
                    .then(() => authBlock.style.display = 'none')
                    .catch(errorAuth)
                // Make sure the client is loaded and sign-in is complete before calling this method.

            }

            const errorAuth = err => {
                console.error('Вы не авторизовались');
                authBlock.style.display = '';
            }

            buttonAuth.addEventListener('click', () => {
                authenticate().then(loadClient);
            });


        }
    }

        //Request
        {
            const gloTube = document.querySelector('.logo-academy'),
                trends = document.getElementById('yt_trend'),
                like = document.getElementById('yt_like'),
                main = document.getElementById('yt_main'),
                subscriptions = document.getElementById('yt_subscriptions'),
                searchForm = document.querySelector('.search-form');
            

            const request = options => gapi.client.youtube[options.method]
                .list(options)
                .then(response => response.result.items)
                .then(data => options.method === "subscriptions" ? renderSub(data) : render(data))
                // .then(youtuber)
                .catch(err => console.error(`Во время запроса произошла ошибка ${err}`))

                const renderSub = data => {
                    //console.log(data);
                    const ytWrapper = document.getElementById('yt-wrapper');
                    ytWrapper.textContent = '';
                    data.forEach(item => {
                        try {
                            //console.log(item);
                            const {
                                snippet: {
                                    resourceId: {
                                        channelId
                                    },
                                    description,
                                    title,
                                    thumbnails: {
                                        high: {
                                            url
                                        }
                                    }
                                }
                            } = item;
                            ytWrapper.innerHTML += `
                                    <div class="yt" data-youtuber = "${channelId}">
                                        <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                                            <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
                                        </div>
                                        <div class="yt-title">${title}</div>
                                        <div class="yt-channel">${description}</div>
                                    </div>
                                    `;
                            } catch (err) {
                                console.error(err);
                            }
                    });
    
                    ytWrapper.querySelectorAll('.yt').forEach(item => {
                        item.addEventListener('click', () => {
                            request({
                                method: 'search',
                                part: 'snippet',
                                channelId: item.dataset.youtuber,
                                order: 'date',
                                maxResults: 6,
                            })
                        })
                    });
                };

            const render = data => {
                const ytWrapper = document.getElementById('yt-wrapper');
                ytWrapper.textContent = '';
                data.forEach(item => {
                    const {id, id: {videoId}, snippet: {
                        channelTitle, 
                        title, 
                        resourceId: {
                            videoId: likedVideoId
                        } = {},
                        thumbnails:{
                            high: {
                                url
                            }

                        }
                    }} = item;
                    ytWrapper.innerHTML += 
                    `
                    <div class="yt" data-youtuber="${likedVideoId || videoId || id}">
                        <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                            <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
                        </div>
                        <div class="yt-title">${title}</div>
                        <div class="yt-channel">${channelTitle}</div>
                    </div>
                    `
                });
                youtuber();
            }

            gloTube.addEventListener('click', () => {
                request({
                    method: 'search',
                    part: 'snippet',
                    channelId: 'UCVswRUcKC-M35RzgPRv8qUg',
                    order: 'date',
                    maxResults: '6',
                });
            });

            trends.addEventListener('click', () => {
                request({
                    method: 'videos',
                    part: 'snippet',
                    chart: 'mostPopular',
                    maxResults: '6',
                    regionCode: 'RU',
                });
            });

            like.addEventListener('click', () => {
                request({
                    method: 'playlistItems',
                    part: 'snippet',
                    playlistId: 'LLpRtYqgAUCDSyDHQUYmSNyQ',
                    maxResults: '6',
                });
            });

            main.addEventListener('click', () => {
                request({
                    method: 'playlistItems',
                    part: 'snippet',
                    playlistId: 'PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH',
                    maxResults: '6',
                });
            });

            subscriptions.addEventListener('click', () => {
                request({
                    method: 'subscriptions',
                    part: 'snippet',
                    mine: true,
                    maxResults: '6',
                });
            });

            searchForm.addEventListener('submit', event => {
                event.preventDefault();
                const valueInput = searchForm.elements[0].value;
                if (!valueInput) {
                    searchForm.style.border = '1px solid red';
                    return;
                }
                searchForm.style.border = '';
                request({
                    method: 'search',
                    part: 'snippet',                    
                    order: 'relevance',
                    maxResults: 6,
                    q: valueInput,
                });
                searchForm.elements[0].value = '';
            });

        }
        
    
});