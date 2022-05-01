import {getBooks, getLabels, API_URL} from './serverBook.js'
import {declOfNum} from './declOfNum.js'

const libraryList = document.querySelector('.library__list')
const fieldList = document.querySelector('.fields__list_filter')
const libraryCount = document.querySelector('.library__count')

export const data = {
  books: [],
  labels: [],
  sortBook(sort) {
    return this.books.sort((a, b) => {
      if (sort === 'up') return a.rating > b.rating ? 1 : -1
      if (sort === 'down') return a.rating < b.rating ? 1 : -1
    })
  },
  filterBook(value) {
    return this.books.filter(book => book.label === value)
  }
}

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

export function renderList(books = data.books) {
  libraryList.textContent = ''
  libraryCount.textContent = declOfNum(books.length, ['книга', 'книги', 'книг'])

  const items = books.map(({author, description, id, image, label, rating, title}) => { //data may be not-destructurized like .....(data => {your code})
    const item = document.createElement('li')
    item.classList.add('library__item')
    item.innerHTML = `
      <a href="/#/book?id=${id}">
        <article class="cart">
          <div class="cart__wrapper">
            <img src="${API_URL}${image}" alt="Обложка книги ${title}" class="cart__image">
            <p class="cart__label">${data.labels[label]}</p>
          </div>
          <div class="cart__content">
            <h3 class="cart__title">${title}</h3>
            <p class="cart__author">${author}</p>
            <p class="cart__description">${description.substring(0, 100)}...</p>
            <div class="cart__rating">
              ${getStars(rating).join('')}
            </div>
          </div>
        </article>
      </a>
    `

    return item
  });

  libraryList.append(...items)
}

function renderFields(labels) {
  fieldList.textContent = ''

  for (let key in labels) {
    const item = document.createElement('li')
    item.className = 'fields__item'

    const btn = document.createElement('button')
    btn.className = 'fields__button'

    btn.dataset.filter = key
    btn.textContent = labels[key]

    item.append(btn)
    fieldList.append(item)
  }
}

export async function renderListBooks() {
  const [books, labels] = await Promise.all([getBooks(), getLabels()])

  data.books = books
  data.labels = labels

  renderList(books)
  renderFields(labels)
}

//substring a cut string for parametrs - start 0 to 80
