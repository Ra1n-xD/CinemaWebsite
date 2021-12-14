/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const ad = document.querySelectorAll('.promo__adv img'),
    genre = document.querySelector('.promo__genre'),
    bog = document.querySelector('.promo__bg'),
    addForm = document.querySelector('form.add'),
    addInput = addForm.querySelector('.adding__input'),
    checkBox = addForm.querySelector('[type="checkbox"]'),
    movieList = document.querySelector('.promo__interactive-list');

const deleteAdv = (arr) => {
    arr.forEach(element => {
        element.remove();
    });
};

const makeChanges = () => {
    genre.textContent = "драма";
    bog.style.cssText = "background: url('../img/bg.jpg') center center / cover no-repeat";
};

const sortArr = (arr) => {
    arr.sort();
};

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let newFilm = addInput.value;
    const favorite = checkBox.checked;


    if (newFilm) {

        if (newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`;
        }

        if (favorite) {
            console.log('Добавляем любимый фильм');
        }

        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);
        createMovieList(movieDB.movies, movieList);
    }

    event.target.reset();
});

function createMovieList(films, parent) {
    sortArr(films);
    parent.innerHTML = "";

    films.forEach((element, i) => {
        parent.innerHTML += `
            <li class="promo__interactive-item">${i+1}) ${element}
                <div class="delete"></div>
            </li>
        `;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);
            createMovieList(films, parent);
        });
    });
}

deleteAdv(ad);
makeChanges();
createMovieList(movieDB.movies, movieList);