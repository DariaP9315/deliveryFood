const auth = () => {
  const buttonAuth = document.querySelector('.button-auth');
  const buttonCart = document.querySelector('.button-cart');

  const overlay = document.querySelector('.modal-auth');
  const closeBtn = document.querySelector('.close-auth');
  const auth = document.querySelector('.modal-dialog');
  const loginForm = document.querySelector('#logInForm');

  const inputLogin = document.getElementById('login');
  const inputPass = document.getElementById('password');

  const buttonOut = document.querySelector('.button-out');
  const userName = document.querySelector('.user-name');

  const login = (user) => {
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'block';
    userName.style.display = 'block';
    buttonCart.style.display = 'flex';
    userName.textContent = user.login;
    overlay.classList.remove('is-open');
    auth.classList.remove('is-open');
  };

  const logout = () => {
    buttonAuth.style.display = 'flex';
    buttonOut.style.display = 'none';
    buttonCart.style.display = 'none';
    userName.style.display = 'none';
    userName.textContent = '';
    localStorage.removeItem('user');
  };

  buttonAuth.addEventListener('click', () => {
    overlay.classList.toggle('is-open');
  });
  buttonOut.addEventListener('click', () => {
    logout();
  });

  overlay.addEventListener('click', (event) => {
    const target = event.target;
    if (target === overlay || target.closest('.close-auth')) {
      overlay.classList.remove('is-open');
      auth.classList.remove('is-open');
    }
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = {
      login: loginForm.login.value,
      password: loginForm.password.value,
    };

    login(user);
    localStorage.setItem('user', JSON.stringify(user));

    //console.log(user);
  });
  if (localStorage.getItem('user')) {
    console.log(JSON.parse(localStorage.getItem('user')));
    login(JSON.parse(localStorage.getItem('user')));
  }
};

auth();
