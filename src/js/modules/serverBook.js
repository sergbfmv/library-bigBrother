export const API_URL = 'http://localhost:3024/'

export async function getBooks(id) {
  const res = await fetch(`${API_URL}api/books/${id || ''}`)

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
