class ProductList {
    #goods;
    #allProducts;

    constructor(container = '.products') {
        this.container = container;
        this.#goods = [];
        this.#allProducts = [];
        this.#sumProducts();
        this.#fetchGoods();
        this.#render();
    }

    #fetchGoods() {
        this.#goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }


    #render() {
        const block = document.querySelector(this.container);

        for (const good of this.#goods) {
            const productObject = new ProductItem(good);
            this.#allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
            console.log(this.#sumProducts())
        }
    }

    #sumProducts = () => {
        return this.#goods.reduce((sumProducts, {price}) => sumProducts + price, 0);

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
