interface Product {
    Id: number;
    Name: string;
    Price: number;
    Image: string;
    InStock: boolean;
    amountInStock: number;
}
let products: Product[] = [
    {
        Id: 1,
        Name: "adidas Originals ballet fine knit t-shirt in cream",
        Price: 345,
        Image: "./top3-1.jpeg",
        InStock: true,
        amountInStock: 100
    },
    {
        Id: 2,
        Name: "Beauty of Joseon Relief Rice & Probiotics Sun Cream SPF 50 50ml",
        Price: 100,
        Image: "./top3-2.jpeg",
        InStock: true,
        amountInStock: 50
    },
    {
        Id: 3,
        Name: "ASOS DESIGN slim oval sunglasses in tort",
        Price: 80,
        Image: "./top3-3.jpeg",
        InStock: true,
        amountInStock: 60
    }
];

let nextId = 4;

//view function
function htmlProduct(product: Product): string {
    return `
        <div class="topsales__top3__item" data-product-id="${product.Id}">
            <img src="${product.Image}" alt="${product.Name}" />    

            <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #333;">
                ${product.Name}
            </h3>

            <p style="font-size: 16px; color: #007bff; font-weight: bold; margin-bottom: 8px;">
                ₪${product.Price}
            </p>

            <p style="font-size: 14px; color: ${product.InStock ? '#28a745' : '#dc3545'}; margin-bottom: 5px;">
                ${product.InStock ? '✓ In Stock' : '✗ Out of Stock'}
            </p>

            <button class="delete-button" data-id="${product.Id}">
                ❌ Delete
            </button>

            <p style="font-size: 14px; color: #666;">
                Quantity: ${product.amountInStock}
            </p>
        </div>
    `;
}

function renderProducts(): void {
    try {
        const topSalesContainer = document.getElementById("topSalesContainer");
        const sortPriceBtn = document.getElementById('sortByPrice') as HTMLButtonElement;
        const sortStockBtn = document.getElementById('sortByStock') as HTMLButtonElement;

        if (!topSalesContainer) throw new Error("topSalesContainer element not found");

        topSalesContainer.innerHTML = products.map(product => htmlProduct(product)).join('');
        sortPriceBtn.textContent = 'Sort by Price (Low to High)';
        sortStockBtn.textContent = 'Sort by stock (Low to High)';

        const deleteButton = topSalesContainer.querySelectorAll(".delete-button")
        deleteButton.forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt((button as HTMLElement).dataset.id || "");
                handleDeleteButton(id);
            })
        })

    } catch (error) {
        console.error("Error rendering products:", error);
    }
}

//control function
function handleAddProduct(): void {
    const imageUrlElement = document.getElementById('imageUrl') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const priceElement = document.getElementById('price') as HTMLInputElement;
    const inStockElement = document.getElementById('inStock') as HTMLInputElement;
    const quantityElement = document.getElementById('quantity') as HTMLInputElement;

    const productData = {
        Name: nameElement.value,
        Price: parseFloat(priceElement.value),
        Image: imageUrlElement.value,
        InStock: inStockElement.checked,
        amountInStock: parseInt(quantityElement.value),
    };

    const newProduct = addProduct(products, productData);
    console.log('Added product:', newProduct);
    renderProducts();
}

function handleDeleteButton(id: number): void {
    products = products.filter(p => p.Id !== id);
    renderProducts();
}


function handleSortByPrice(): void {
    sortProductsByPrice(products);
    renderProducts();
}
function handleSortByStock(): void {
    sortProductsByStock(products);
    renderProducts();
}
//model function
function addProduct(productsArray: Product[], productData: Omit<Product, 'Id'>): Product {
    const newProduct: Product = {
        Id: nextId++,
        Name: productData.Name,
        Price: productData.Price,
        Image: productData.Image,
        InStock: productData.InStock,
        amountInStock: productData.amountInStock
    };

    productsArray.push(newProduct);
    return newProduct;
}
function sortProductsByPrice(productsArray: Product[]): void {
    productsArray.sort((a, b) => a.Price - b.Price);
}
function sortProductsByStock(productsArray: Product[]): void {
    productsArray.sort((a, b) => a.amountInStock - b.amountInStock);
}
function initializeApp(): void {

    renderProducts();

    const addBtn = document.getElementById('addProductBtn') as HTMLButtonElement;
    const sortPriceBtn = document.getElementById('sortByPrice') as HTMLButtonElement;
    const sortStockBtn = document.getElementById('sortByStock') as HTMLButtonElement;

    if (addBtn) {
        addBtn.addEventListener('click', function (e: Event): void {
            e.preventDefault();
            handleAddProduct();
        });
    }

    if (sortPriceBtn) {
        sortPriceBtn.addEventListener('click', function(e: Event): void {
            e.preventDefault();
            handleSortByPrice();
        });
    }
    if (sortStockBtn) {
        sortStockBtn.addEventListener('click', function(e: Event): void {
            e.preventDefault();
            handleSortByStock();
        });
    }
    
    console.log('Product management system initialized');
}
document.addEventListener('DOMContentLoaded', initializeApp);