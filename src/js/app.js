import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);
        if (error === 0) {
            let responce = await fetch('#', {
                method: 'POST',
                body: formData
            });
            if (responce.ok) {
                let result = await responce.json();
                alert(result.message);
                formPreview.innerHTM = '';
                form.reset();
            } else {
                alert('Ошибка');
            }
        } else {
            alert('Заполните обязательные поля')
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if (input.classList.contains('email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }            
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

});

let menuBurger = document.querySelectorAll('.menu__burger')[0];
let menuEl = document.querySelectorAll('.menu__item');

menuBurger.addEventListener('click', () => {
    menuBurger.classList.toggle('active');
    document.querySelector('.menuOpen').classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
    document.querySelector('.header__online').classList.toggle('active');
    document.querySelector('.contact').classList.toggle('active');
    document.querySelector('body').classList.toggle('lock');
});


[].forEach.call( menuEl, function(el) {
        el.onclick = function() {
            menuBurger.classList.remove('active');
            document.querySelector('.menuOpen').classList.remove('active');
            document.querySelector('.menu').classList.remove('active');
            document.querySelector('.header__online').classList.remove('active');
            document.querySelector('.contact').classList.remove('active');
            document.querySelector('body').classList.remove('lock');
        }});
