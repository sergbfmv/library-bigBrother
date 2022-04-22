import {getBooks, getLabels, API_URL} from './serverBook.js'

const libraryList = document.querySelector('.library__list')

function getStars(rating) {
  const stars = []

  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      stars.push(`<img class="cart__rating-star" src="img/star.svg" alt="Рейтинг ${rating}">`)
    } else if (i < rating) {
      stars.push(`<img class="cart__rating-star" src="img/star.svg" alt="">`)
    } else {
      stars.push(`<img class="cart__rating-star" src="img/star-o.svg" alt="">`)
    }
  }

  return stars
}

export async function renderListBooks() {
  const [books, labels] = await Promise.all([getBooks(), getLabels()])

  libraryList.textContent = ''

  books.forEach(data => { //data may be destructurized like .....(({author, description, id, etc...}) => {your code})
    const item = document.createElement('li')
    item.classList.add('library__item')
    item.innerHTML = `
      <a href="/#/book?id=${data.id}">
        <article class="cart">
          <div class="cart__wrapper">
            <img src="${API_URL}${data.image}" alt="Обложка книги ${data.title}" class="cart__image">
            <p class="cart__label">${labels[data.label]}</p>
          </div>
          <div class="cart__content">
            <h3 class="cart__title">${data.title}</h3>
            <p class="cart__author">${data.author}</p>
            <p class="cart__description">${data.description.substring(0, 100)}...</p>
            <div class="cart__rating">
              ${getStars(data.rating).join('')}
            </div>
          </div>
        </article>
      </a>
    `

    libraryList.append(item)
  });
}

//substring a cut string for parametrs - start 0 to 80
