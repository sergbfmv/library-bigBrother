import {router} from './router.js'
import { addBooks } from './serverBook.js'
import toBase64 from './toBase64.js'
import { clearPreview } from './upload.js'

const fieldsets = document.querySelectorAll('.add__fieldset')
const addBtn = document.querySelector('.add__btn')
const form = document.querySelector('.add__form')
const btnBack = document.querySelector('.add__btn_back')

let count = 0

async function sendBook() {
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)
  data.image = await toBase64(data.image)
  const book = await addBooks(data)


  if (book) {
    form.reset()
    clearPreview()
    router.navigate('/')
    addBtn.textContent = 'Далее'
  }
}

function changeFieldset() {
  if (count === fieldsets.length - 1) {
    addBtn.textContent = 'Добавить книгу'
  } else {
    addBtn.textContent = 'Далее'
  }

  fieldsets[count].classList.remove('hide')
}

function initFieldset() {
  addBtn.addEventListener('click', () => {
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

    if (!valid) return

    fieldset.classList.add('hide')
    count += 1

    if (count === fieldsets.length) {
      sendBook()
    }

    changeFieldset()
  })

  btnBack.addEventListener('click', () => {
    if (count === 0) {
      form.reset()
      router.navigate('/')
      clearPreview()
      return
    }

    fieldsets[count].classList.add('hide')
    count--
    changeFieldset()
  })
}

export default initFieldset
