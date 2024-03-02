let usersData = []; // Хранение данных о пользователях

// функция получения пользователей
function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      usersData = users;
      displayUsers(users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      const userList = document.getElementById('user-list');
      userList.innerHTML = '<p>Error fetching users. Please try again later.</p>';
    });
}

// функция отображение пользователей
function displayUsers(users) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';

  users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('user-card');

    const name = document.createElement('h3');
    name.textContent = user.name;

    const email = document.createElement('p');
    email.textContent = 'Email: ' + user.email;

    const phone = document.createElement('p');
    phone.textContent = 'Phone: ' + user.phone;

    card.appendChild(name);
    card.appendChild(email);
    card.appendChild(phone);

    userList.appendChild(card);
  });
}

// функция сортировки пользователей
function sortUsers() {
  const sortBy = document.getElementById('sort-select').value;
  const sortedUsers = [...usersData].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  displayUsers(sortedUsers);
}

//функция фильтрации и поиска пользователей
function filterUsers() {
  const filterValue = document.getElementById('filter-input').value.toLowerCase();
  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(filterValue) || user.email.toLowerCase().includes(filterValue)
  );
  displayUsers(filteredUsers);
}

// Загрузить пользователей при загрузке страницы
fetchUsers();
