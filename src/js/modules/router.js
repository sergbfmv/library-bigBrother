import Navigo from "navigo";
import {renderListBooks} from './renderListBooks.js'
import {renderBook} from './renderBook.js'

const search = document.querySelector('.search')
const library = document.querySelector('.library')
const book = document.querySelector('.book')
const add = document.querySelector('.add')
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn')
const backBtn = document.querySelector('.book__btn_back')

export const router = new Navigo(location.pathname, {
  hash: true,
})

function closeAllPAge() {
  library.classList.add('hide')
  book.classList.add('hide')
  add.classList.add('hide')
}

router.on({
  [location.pathname]: () => {
    closeAllPAge()
    library.classList.remove('hide')
    search.classList.remove('search_active')
    document.body.classList.remove('body_gradient')
    renderListBooks()
  },
  [location.pathname + 'book']: ({params: {id}}) => {
    closeAllPAge()
    book.classList.remove('hide')
    search.classList.remove('search_active')
    document.body.classList.add('body_gradient')
    renderBook(id)
  },
  [location.pathname + 'add']: () => {
    closeAllPAge()
    add.classList.remove('hide')
    search.classList.remove('search_active')
    document.body.classList.add('body_gradient')
  }
}).resolve()

addBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate('add')
  })
})

backBtn.addEventListener('click', () => {
    router.navigate('/')
  })
