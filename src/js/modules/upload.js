import toBase64 from '../modules/toBase64.js'

const label = document.querySelector('.upload__label')
const preview = document.querySelector('.upload__preview')
const previewSrc = preview.src
const file = document.querySelector('.upload__file')

file.addEventListener('change', async () => {
  if (file.files.length > 0) {
    const base64 = await toBase64(file.files[0])
    preview.style.display = 'block'
    label.classList.add('upload__label_active')
    preview.src = base64
    console.log(base64)
  }
})

export function clearPreview() {
  preview.style.display = ''
  label.classList.remove('upload__label_active')
  preview.src = previewSrc
}
