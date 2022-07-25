const menu = () => {
  const cardsMenu = document.querySelector('.cards-menu');

  const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  const changeTitle = (restaurant) => {
    const restaurantRate = document.querySelector('.rating');

    const restaurantPrice = document.querySelector('.price');
    const restaurantKitchen = document.querySelector('.category');

    const restaurantTitle = document.querySelector('.restaurant-title');
    restaurantTitle.textContent = restaurant.name;
    restaurantRate.textContent = restaurant.stars;
    restaurantPrice.textContent = restaurant.price;
    restaurantKitchen.textContent = restaurant.kitchen;
  };

  const addToCart = (cartItem) => {
    if (cartArray.some((item) => item.id === cartItem.id)) {
      cartArray.map((item) => {
        if (item.id === cartItem.id) {
          item.count++;
        }
        return item;
      });
    } else {
      cartArray.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartArray));
  };

  const renderItems = (data) => {
    data.forEach((element) => {
      //console.log(element);
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `<img src="${element.image}" alt="image" class="card-image" />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${element.name}</h3>
        </div>
       
        <div class="card-info">
          <div class="ingredients">${element.description}
          </div>
        </div>
       
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">${element.price} ₽</strong>
        </div>`;

      card.querySelector('.button-card-text').addEventListener('click', () => {
        const cartItem = {
          name: element.name,
          price: element.price,
          count: 1,
          id: element.id,
        };
        addToCart(cartItem);
      });

      cardsMenu.append(card);
    });
  };

  if (localStorage.getItem('restaurant')) {
    const restaurant = JSON.parse(localStorage.getItem('restaurant'));
    changeTitle(restaurant);
    fetch(`./db/${restaurant.products}`)
      .then((response) => response.json())
      .then((data) => renderItems(data))
      .catch((err) => err.message);
  } else {
    //window.location.href = '/';
  }
};

menu();
