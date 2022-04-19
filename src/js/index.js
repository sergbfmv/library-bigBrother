import Navigo from "navigo";

const library = document.querySelector('.library')
const book = document.querySelector('.book')
const add = document.querySelector('.add')
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn')
const backBtn = document.querySelectorAll('.header__btn_back')
const searchBtn = document.querySelectorAll('.header__btn_search')
const search = document.querySelector('.search')
const fieldsBtnSort = document.querySelector('.fields__btn_sort')
const fieldsListSort = document.querySelector('.fields__list_sort')
const fieldsBtnFilter = document.querySelector('.fields__btn_filter')
const fieldsListFilter = document.querySelector('.fields__list_filter')

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
    document.body.classList.remove('body_gradient')
  },
  'book': () => {
    closeAllPAge()
    book.classList.remove('hide')
    search.classList.remove('search_active')
    document.body.classList.add('body_gradient')
  },
  'add': () => {
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

function controlField(btn, list, closeList) {
  btn.addEventListener('click', () => {
    list.classList.toggle('fields__list_active')
    closeList.classList.remove('fields__list_active')
  })

  list.addEventListener('click', ({target}) => {
    if (target.classList.contains('fields__button')) {
      list.classList.remove('fields__list_active')
    }
  })
}

controlField(fieldsBtnSort, fieldsListSort, fieldsListFilter);
controlField(fieldsBtnFilter, fieldsListFilter, fieldsListSort);

function changeFieldset() {
  const fieldsets = document.querySelectorAll('.add__fieldset')
  const addBtn = document.querySelector('.add__btn')
  const form = document.querySelector('.add__form')

  let count = 0

  addBtn.addEventListener('click', ({target}) => {
    const fieldset = fieldsets[count]

    let valid = true

    for (const elem of fieldset.elements) {
      if (!elem.checkValidity()) {
        elem.classList.add('no-validate')
        valid = false
      } else {
        elem.classList.remove('no-validate')
      }
    }

    if (valid) {
      count += 1

      if (count === fieldsets.length - 1) {
        addBtn.textContent = 'Добавить книгу'
      }

      if (count === fieldsets.length) {
        const data = true

        if (data) {
          form.reset()
          router.navigate('/')
          count = 0
          addBtn.textContent = 'Далее'
        }
      }

      fieldset.classList.add('hide')
      fieldsets[count].classList.remove('hide')
    }
  })
}

changeFieldset()
