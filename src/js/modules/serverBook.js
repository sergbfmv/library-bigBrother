//export const API_URL = 'http://localhost:3024/'
export const API_URL = 'https://evening-brook-86034.herokuapp.com/'

export async function getBooks(id) {
  const res = await fetch(`${API_URL}api/books/${id || ''}`)

  if (res.ok) {
    return res.json()
  }

  throw new Error(res.statusText)
}

export async function searchBooks(search) {
  const res = await fetch(`${API_URL}api/books/?search=${search}`)

  if (res.ok) {
    return res.json()
  }

  throw new Error(res.statusText)
}

export async function addBooks(data) {
  const res = await fetch(`${API_URL}api/books/`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  if (res.ok) {
    return res.json()
  }

  throw new Error(res.statusText)
}

export async function getLabels() {
  const res = await fetch(`${API_URL}api/label`)

  if (res.ok) {
    return res.json()
  }

  throw new Error(res.statusText)
}

export async function deleteBooks(id) {
  const res = await fetch(`${API_URL}api/books/${id}`, {
    method: 'DELETE',
  })

  if (res.ok) {
    return res.json()
  }

  throw new Error(res.statusText)
}

export async function editBooks(id, data) {
  const res = await fetch(`${API_URL}api/books/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })

  if (res.ok) {
    return res.json()
  }

  throw new Error(res.statusText)
}
