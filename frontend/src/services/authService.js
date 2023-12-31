const API_URL = `${import.meta.env.VITE_API_URL}/auth`

export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })

  const data = await res.json()
  
  localStorage.setItem('token', data.token) 
  
  return {
    status: res.status,
    data: data
  }
}

export async function register(username, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })

  return {
    status: res.status
  }
}

export async function check(token) {
  const res = await fetch(`${API_URL}/check`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const data = await res.json()

  return {
    status: res.status,
    data: data
  }
}