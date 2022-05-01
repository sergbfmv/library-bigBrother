import { renderList } from "./renderListBooks.js"
import { searchBooks } from "./serverBook.js"

const search = document.querySelector('.search')
const searchBtn = document.querySelectorAll('.header__btn_search')
const searchForm = document.querySelector('.search__form')

function closeSearch({target}, flag) { //вытвщиили таргет из ивента деструктуризацией
  if (target.closest('.search, .header__btn_search') && !flag) {
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

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const books = await searchBooks(searchForm.input.value)
  e.target.reset()
  renderList(books)
  closeSearch(e, true)
})
