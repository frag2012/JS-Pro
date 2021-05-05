const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url) => {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    rej('Error');
                } else {
                    res(xhr.responseText);
                }
            }
        };
        xhr.send();
    })
};



class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];
        this._getProducts()
            .then((data) => {
                this._goods = data;
                this._render();
            });
    }

    sum() {
        return this._goods.reduce((sum, { price }) => sum + price, 0);
    }


    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const good of this._goods) {
            const productObject = new ProductItem(good);
            // console.log(productObject);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.title}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="buy-btn">Купить</button>
                      </div>
                  </div>`;
    }
}

const pl = new ProductList();


