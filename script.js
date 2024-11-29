const BASE_URL = 'http://localhost:3000/api';

// Register a new user
function registerUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then(response => response.json())
    .then(data => alert('Registration Successful!'))
    .catch(error => console.error('Error:', error));
}

// Login a user
function loginUser() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.token);
      alert('Login Successful!');
    })
    .catch(error => console.error('Error:', error));
}

// Create a new task
function createTask() {
  const taskName = document.getElementById('task-name').value;
  const token = localStorage.getItem('token');

  fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: taskName }),
  })
    .then(response => response.json())
    .then(data => {
      const taskList = document.getElementById('task-list');
      const li = document.createElement('li');
      li.textContent = data.name;
      taskList.appendChild(li);
    })
    .catch(error => console.error('Error:', error));
}
