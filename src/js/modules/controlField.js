import { data, renderList } from './renderListBooks.js'

const fieldsBtnSort = document.querySelector('.fields__btn_sort')
const fieldsListSort = document.querySelector('.fields__list_sort')
const fieldsBtnFilter = document.querySelector('.fields__btn_filter')
const fieldsListFilter = document.querySelector('.fields__list_filter')

function controlField(btn, list, closeList) {
  btn.addEventListener('click', () => {
    list.classList.toggle('fields__list_active')
    closeList.classList.remove('fields__list_active')
  })

  list.addEventListener('click', ({target}) => {
    if (target.classList.contains('fields__button')) {
      list.classList.remove('fields__list_active')

      if (target.dataset.sort) {
        data.sortBook(target.dataset.sort)
        renderList()
      }

      if (target.dataset.filter) {
        const filteredData = data.filterBook(target.dataset.filter)
        renderList(filteredData)
      }
    }
  })
}

controlField(fieldsBtnSort, fieldsListSort, fieldsListFilter);
controlField(fieldsBtnFilter, fieldsListFilter, fieldsListSort);
