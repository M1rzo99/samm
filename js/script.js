'use strict'
window.addEventListener('DOMContentLoaded', () => {
    const tabheaderItems = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        loader = document.querySelector('.loader'),
        modaCloseBtn = document.querySelector('[modal-close ]'),
        modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal')

    //Loader
    setTimeout(() => {
        loader.style.opacity = '0'
        setTimeout(() => {
            loader.style.display = 'none'
        }, 500)
    }, 2000)

    // Tabs
    function hidetabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active')
        })
    }
    hidetabContent()

    function showTabsContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')

        tabs[i].classList.add('tabheader__item_active')
    }
    showTabsContent()

    tabheaderItems.addEventListener('click', (event) => {
        const target = event.target
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, idx) => {
                if (target === item) {
                    hidetabContent() // bu yerda showTabsContent() oxirda chaqirilishi kk
                    showTabsContent(idx)
                }
            })
        }
    })

    // Timer

    const dedline = '2023-08-11'

    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds
        const timer = Date.parse(endTime) - Date.parse(new Date()) // parse() - hozirgi sanadan parse() ga ebrilgan sanai orqligidagi sanasini aniqlab beradi.
        if (timer < 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {;
            (days = Math.floor(timer / (1000 * 60 * 60 * 24))),
            (hours = Math.floor((timer / (1000 * 60 * 60)) % 24)),
            (minutes = Math.floor((timer / (1000 * 60)) % 60)),
            (seconds = Math.floor((timer / 1000) % 60))
        }

        return { timer, days, hours, minutes, seconds } // return qilganini sababi functionni ichidag bolgani un loacl hisobbblanadi.Uni globla qilish un return qilin yuboramiz.
    }
    // birlik raqamlar oldiga 0 ni qoyish un
    function getZero(num) {
        if (num > 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)

        function updateClock() {
            const t = getTimeRemaining(endTime);
            (days.innerHTML = getZero(t.days)),
            (hours.innerHTML = getZero(t.hours)),
            (minutes.innerHTML = getZero(t.minutes)),
            (seconds.innerHTML = getZero(t.seconds))

            if (t.timer <= 0) {
                clearInterval(timeInterval)
            }
        }
        updateClock()
    }
    setClock('.timer', dedline)

    // Modal 2023/05/06

    function closeModal() {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ''
    }

    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        clearInterval(showModal)
    }

    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal)
    })

    modaCloseBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            // bu yerda e.code yozilishini sababi "Escape" btn ni tagida e.code degan nom yotadi
            closeModal()
        }
    })

    const showModal = setTimeout(openModal, 5000)

    // 2023/05/06

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >
            document.documentElement.scrollHeight - 1
        ) {
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
    window.addEventListener('scroll', showModalByScroll)

    // Class 2023/05/12

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSel, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.classes = classes
            this.parentSel = document.querySelector(parentSel)
            this.transfer = 13000
            this.changeToUsd()
        }

        changeToUsd() {
            this.price = this.price * this.transfer
        }

        render() {
            const el = document.createElement('div')

            if (this.classes.length === 0) {
                this.el = 'menu__item'
                el.classList.add(this.el)
            } else {
                this.classes.forEach((className) => el.classList.add(className))
            }

            el.innerHTML = `
               
                    <img src=${this.src} alt= ${this.alt}/>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">
                       ${this.descr}
                    </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> month</div>
                    </div>
                
            `
            this.parentSel.append(el)
        }
    }

    new MenuCard(
        'img/tabs/1.png',
        'vegy',
        'Plan Universal',
        ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        10,
        '.menu .container',
        'menu__item',
    ).render()

    new MenuCard(
        '"img/tabs/2.jpg" ',
        'vegy',
        'Plan Good',
        ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        12,
        '.menu .container',
        'menu__item',
    ).render()

    new MenuCard(
        '"img/tabs/3.jpg"',
        'vegy',
        'Plan NotBad',
        ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        3,
        '.menu .container',
        'menu__item',
    ).render()

    // Rest Operator 2023/05/12
    // rest (...) bizga ma'lumotlarimizi bir massivni ichiga yig'ib beradi,va uni oxirgi parametr difatida yozamiz
    // function logger(a, bn, ...rest) {
    //     console.log(a, bn, rest);
    // }
    // logger(1, 2, 3, 4, 5, 6, 67)

    function clac(num, def = 12) {
        console.log(num + def)
    }
    console.log(clac(1, 10))

    //Form. 2023/06/08.
    // serverga so'rov mavzusi yani sorov yuborganimizda googleda local host dab chiqarishi kk,bizni ma'lumotlarimizi emas.

    const forms = document.querySelectorAll('form')

    //  sent buttonni bosganda ma'lumotla ketganini bildirish un birontas ma'lumot kiritib qo'yishimz kk
    const msg = {
        loading: 'Loading..',
        success: 'Thanks for submitting our form',
        failure: 'Somthing went wrong',
    }

    forms.forEach((form) => {
        postData(form) // bu holatda forms ni ichidagi har bitta element postData(form)ni ichga kelib tushadi.Ham massivni obj ga iteratsiya qb beradi.
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            // bu yerda event(e) bravuzerni odatiy holatini yo'otish un qo'lladik
            e.preventDefault()

            // submit buttonni bosganda loading 1. yoki 2 sekunt oraliqida load bo'ladi.
            const statusMessage = document.createElement('div')
            statusMessage.textContent = msg.loading
            form.append(statusMessage) // form.append ga statusMessage dagi ma;lumotlar ketadi

            const request = new XMLHttpRequest()
            request.open('POST', 'server.php') // post ni sababi ma'lumotni yuborish
            request.setRequestHeader('Content-Type', 'application/json') // request.setRequestHeader sarlavha qo'yishdir.formData bn ishlaganda sarlavha avtomatik ravishda qoyiladi.setRequestHeader orqali sarlavha qoyish kk emas

            const obj = {}
            const formData = new FormData(form) // formData oddiy constructor(object) hisoblanadi.Buning ishlashi html da inputdagi name larga qarab ishlaydi.Va formData bn ishlayotganda bu juda ham muhim
            formData.forEach((val, key) => {
                obj[key] = val
            })

            const json = JSON.stringify(obj)

            request.send(json) // inputni ichidagi malumotlar(name,succses,limit)

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response)
                    statusMessage.textContent = msg.success // textContent ishlaganda msg.succes dagi ma'lumotlar ko'rinadi
                    form.reset()
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 2000)
                } else {
                    statusMessage.textContent = msg.failure // textContent ishlamaganda msg.succes dagi ma'lumotlar ko'rinadi
                }
            })
        })
    }
})