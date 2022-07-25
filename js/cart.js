const cart = () => {
  const buttonCart = document.querySelector('#cart-button');
  const modalCart = document.querySelector('.modal-dialog');
  const overlay = document.querySelector('.modal-cart');
  const buttonSend = document.querySelector('.button-order');
  const modalBody = document.querySelector('.modal-body');
  const totalCostSign = document.querySelector('.modal-pricetag');

  const clearCart = document.querySelector('.clear-cart');

  const resetCart = () => {
    modalBody.innerHTML = '';

    localStorage.removeItem('cart');
    overlay.classList.remove('is-open');
    modalCart.classList.remove('is-open');
    totalCostSign.textContent = '0 ₽';
  };

  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));
    cartArray.map((item) => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
  };
  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));
    cartArray.map((item) => {
      if (item.id === id) {
        item.count++;
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  //   const changeTotalCost = (cartItem) => {
  //     const cartArray = JSON.parse(localStorage.getItem('cart'));
  //     const results = cartArray.reduce(function (previousValue, currentElem) {
  //       return previousValue + currentElem;
  //     }, 0);

  //     totalCostSign.textContent = results.value;

  //     console.log(totalCostSign.textContent);
  //   };

  const renderItems = (data) => {
    const prices = [];
    modalBody.innerHTML = '';
    data.forEach((cartItem) => {
      const cartEl = document.createElement('div');
      cartEl.classList.add('food-row');
      cartEl.innerHTML = `<span class="food-name">${cartItem.name}</span>
      <strong class="food-price">${+cartItem.price * +cartItem.count} ₽</strong>
      <div class="food-counter">
          <button class="counter-button btn-dec" data-index=${cartItem.id}>-</button>
          <span class="counter">${cartItem.count}</span>
          <button class="counter-button btn-inc" data-index=${cartItem.id}>+</button>
      </div>`;

      modalBody.append(cartEl);

      prices.push(cartItem.price * cartItem.count);
    });
    let priceTotal = prices.reduce((prev, current) => prev + current, 0);

    totalCostSign.innerHTML = `${priceTotal} ₽`;
  };

  modalBody.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('btn-dec')) {
      decrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains('btn-inc')) {
      incrementCount(e.target.dataset.index);
    }
  });

  buttonSend.addEventListener('click', () => {
    const cartArray = localStorage.getItem('cart');

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: cartArray,
    })
      .then((res) => {
        if (res.ok) {
          resetCart();
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //console.log('push me');
  });

  clearCart.addEventListener('click', () => {
    resetCart();
    overlay.classList.remove('is-open');
    modalCart.classList.remove('is-open');
  });

  buttonCart.addEventListener('click', () => {
    overlay.classList.toggle('is-open');

    if (localStorage.getItem('cart')) {
      renderItems(JSON.parse(localStorage.getItem('cart')));
    }
  });

  overlay.addEventListener('click', (event) => {
    const target = event.target;
    if (target === overlay || target.closest('.close')) {
      overlay.classList.remove('is-open');
      modalCart.classList.remove('is-open');
    }
  });
};

cart();
