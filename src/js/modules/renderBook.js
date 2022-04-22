import {getBooks, getLabels, API_URL} from './serverBook.js'


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

export async function renderBook(id) {
  const [books, labels] = await Promise.all([getBooks(id), getLabels()])

}
