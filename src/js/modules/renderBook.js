import { router } from './router.js'
import {getBooks, getLabels, API_URL, deleteBooks, editBooks} from './serverBook.js'
const container = document.querySelector('.book__container')
const btnDelete = document.querySelector('.header__btn_delete')
const footerBookLabel = document.querySelector('.footer__btn.book__label')
let timerId

btnDelete.addEventListener('click', async () => {
  await deleteBooks(btnDelete.dataset.id)
  router.navigate('/')
})

const changeLabel = async ({target}) => {
  const labels = await getLabels()
  const labelKeys = Object.keys(labels)
  const labelNow = target.dataset.label
  const index = labelKeys.indexOf(labelNow)
  const indexNext = (index + 1) % labelKeys.length

  let labelNext = labelKeys[indexNext]

  document.querySelectorAll('.book__label').forEach(btn => {
    btn.dataset.label = labelNext
    btn.textContent = labels[labelNext]
  })

  clearInterval(timerId)

  timerId = setTimeout(() => {
    editBooks(target.dataset.id, {label: labelNext})
  }, 1000)
}

footerBookLabel.addEventListener('click', changeLabel)

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

  container.innerHTML = `
    <div class="book__wrapper">
      <img class="book__image" src="${API_URL}${image}" alt="Обложка книги ${title}">
      <button class="book__label book__label_img" data-label="${label} data-id="${id}"">${labels[label]}</button>
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

  const btnLabel = document.querySelector('.book__label_img')
  btnLabel.addEventListener('click', changeLabel)
  btnDelete.dataset.id = id
  footerBookLabel.dataset.id = id
  footerBookLabel.dataset.label = label
  footerBookLabel.textContent = labels[label]
}
