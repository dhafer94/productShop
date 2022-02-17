class Product {
    constructor(productName, productPrice, productAmount) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productAmount = productAmount;
    };

    substractAmount = (amount) => {
        if (this.productAmount >= amount) {
            return this.productAmount - amount;
        }
        // in case you need to know when you sold the last piece:
        // if (this.productAmount === amount) {
        //     return (this.productAmount - amount && 'last item sold now');
        // }
        //when there is not enough to meet the needed amount
        return ('There are no more of this product');
    };
}

class Order {
    constructor({ orderedProducts, totalPrice }) {
        this.orderedProducts = orderedProducts;
        this.totalPrice = totalPrice;
        this.orderDate = new Date().toLocaleDateString();
    };
}

// the user with the cart is in the bottom to avoid circular independency
class UserWithoutCart {
    constructor(userName, balance) {
        this.userName = userName;
        this.balance = balance;
        this.ordersHistory = [];
    }

    showOrderHistory = (sortingDirection, sortingField) => {
        if (sortingDirection === 'ascending') {
            // console.log(sortingField);
            return this.ordersHistory
                .sort((a, b) => a[`${sortingField}`] - b[`${sortingField}`]);
        }
        if (sortingDirection === 'descending') {
            return this.ordersHistory
                .sort((a, b) => b[`${sortingField}`] - a[`${sortingField}`]);
        }
    };
    addOrder = ({ orderedProducts, totalPrice }) => {
        const userOrder = new Order({ orderedProducts, totalPrice });
        return userOrder;
    };
};

class Cart extends User {
    constructor(userName, balance, addOrder) {
        super(userName, balance, addOrder);
        this.products = [];
        this.order = [];
    }
    addProduct = (product) => {
        this.products.push({
            name: product.name,
            price: product.price,
            amount: product.amount
        });
    };
    removeProduct = (name) => {
        const toBeRemoved = this.products.find((item, i) => {
            return item.name === name && (this.products.splice(i, 1));
        });
        //returning the removed item in case needed for further manipulations
        return toBeRemoved;
    };
    withdraw = () => {
        this.products = [];
    };
    checkout = () => {
        const totalPrice = this.products.reduce((acc, item) => (acc += item.price), 0);
        const orderedProducts = this.products;
        const order = {
            orderedProducts: orderedProducts,
            totalPrice: totalPrice,
        };
        return this.order = new Order(order);
    };
    showCart = () => {
        return this.products;
    };
};

class Admin extends User {
    constructor(userName, balance,) {
        super(userName, balance);
        this.products = [];
    }
    createProduct = (product) => {
        const newProduct = new Product(product.name, product.price, product.amount);
        this.products.push(newProduct);
    };
    showProducts = () => {
        return this.products;
    };
}

// to Avoid circular dependency between User and Cart
class UserWithCart extends UserWithoutCart {
    constructor() {
        super();
    }
    getCart = () => {
        const userCart = new Cart();
        return userCart;
    };

}


