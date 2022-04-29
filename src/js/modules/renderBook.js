import {getBooks, getLabels, API_URL} from './serverBook.js'
const container = document.querySelector('.book__container')
const btnDelete = document.querySelector('.header__btn')
const footerBookLabel = document.querySelector('.footer__btn.book__label')

function getStars(rating) {
  const stars = []

  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      stars.push(`<img class="book__rating-star" src="img/star.svg" alt="Рейтинг ${rating}">`)
    } else if (i < rating) {
      stars.push(`<img class="book__rating-star" src="img/star.svg" alt="">`)
    } else {
      stars.push(`<img class="book__rating-star" src="img/star-o.svg" alt="">`)
    }
  }

  return stars
}

export async function renderBook(id) {
  const [books, labels] = await Promise.all([getBooks(id), getLabels()])

  container.textContent = ''

  const {author, title, description, label, image, rating} = books

  const btnLabel = document.createElement('button')
  btnLabel.className = 'book__label book__label_img'
  btnLabel.textContent = labels[label]
  btnLabel.dataset.label = label

  container.innerHTML = `
    <div class="book__wrapper">
      <img class="book__image" src="${API_URL}${image}" alt="Обложка книги ${title}">
      ${btnLabel.outerHTML}
    </div>

    <div class="book__content">
      <h2 class="book__title">${title}</h2>
      <p class="book__author">${author}</p>

      <div class="book__rating">
        ${getStars(rating).join('')}
      </div>
      <h3 class="book__subtitle">Описание</h3>
      <p class="book__description">${description}</p>
    </div>
  `

  btnDelete.dataset.id = id
  footerBookLabel.dataset.label = label
  footerBookLabel.textContent = labels[label]
}
