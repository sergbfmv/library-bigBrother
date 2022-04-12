import Navigo from "navigo";

const library = document.querySelector('.library')
const book = document.querySelector('.book')
const add = document.querySelector('.add')
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn')
const backBtn = document.querySelectorAll('.header__btn_back')

const router = new Navigo('/', {
  hash: true,
})

function closeAllPAge() {
  library.classList.add('hide')
  book.classList.add('hide')
  add.classList.add('hide')
}

router.on({
  '/': () => {
    closeAllPAge()
    library.classList.remove('hide')
  },
  'book': () => {
    closeAllPAge()
    book.classList.remove('hide')
  },
  'add': () => {
    closeAllPAge()
    add.classList.remove('hide')
  }
}).resolve()

addBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate('add')
  })
})

backBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate('/')
  })
})
