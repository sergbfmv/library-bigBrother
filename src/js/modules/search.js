const search = document.querySelector('.search')
const searchBtn = document.querySelectorAll('.header__btn_search')

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
