import Navigo from "navigo";

const library = document.querySelector('.library')
const book = document.querySelector('.book')
const add = document.querySelector('.add')
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn')
const backBtn = document.querySelectorAll('.header__btn_back')
const searchBtn = document.querySelectorAll('.header__btn_search')
const search = document.querySelector('.search')

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
    search.classList.remove('search_active')
  },
  'book': () => {
    closeAllPAge()
    book.classList.remove('hide')
    search.classList.remove('search_active')
  },
  'add': () => {
    closeAllPAge()
    add.classList.remove('hide')
    search.classList.remove('search_active')
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

function closeSearch({target}) { //вытвщиили таргет из ивента деструктуризацией
  if (target.closest('.search, .header__btn_search')) {
    return
  }

  search.classList.remove('search_active')
  document.body.removeEventListener('click', closeSearch)
}

searchBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    search.classList.add('search_active')
    document.body.addEventListener('click', closeSearch)
  })
})
