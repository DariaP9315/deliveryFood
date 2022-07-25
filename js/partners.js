const partners = () => {
  const cardsRestaurants = document.querySelector('.cards-restaurants');

  const renderItems = (data) => {
    data.forEach((element) => {
      const a = document.createElement('a');
      a.setAttribute('href', '/restaurant.html');
      a.classList.add('card');
      a.classList.add('card-restaurant');
      a.dataset.products = element.products;

      a.innerHTML = `<img src="${element.image}" alt="image" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${element.name}</h3>
        <span class="card-tag tag">${element.time_of_delivery} мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          ${element.stars}
        </div>
        <div class="price">От ${element.price} ₽</div>
        <div class="category">${element.kitchen}</div>
      </div>
    </div>`;

      a.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.setItem('restaurant', JSON.stringify(element));
        window.location.pathname = 'deliveryFood/restaurant.html';
      });

      cardsRestaurants.append(a);
    });
  };

  fetch('./db/partners.json')
    .then((response) => response.json())
    .then((data) => renderItems(data));
};

partners();
