//Fetches the API from the given link to the JSON file
fetch('https://www.course-api.com/javascript-store-products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response down ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const products = data;
        const container = document.getElementById('product-container');
//Grabs each part of the API, such as price, image, and title
        products.forEach(product => {
            const price = product.fields.price;
            if (typeof price === 'undefined' || isNaN(price)) {
                console.error('Price isn't available:', product);
                return;
            }
//Creates a method to organize the data in HTML
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <h2>${product.fields.name}</h2>
                <p><strong>Company:</strong> ${product.fields.company}</p>
                <p><strong>Price:</strong> $${price.toFixed(2)}</p>
                <img src="${product.fields.image}" alt="${product.fields.name}" style="width: 100px; height: auto;">
                <p>${product.fields.description}</p>
                <hr>
            `;
            container.appendChild(productElement);
        });
    })
//Catches Error codes
    .catch(error => {
        console.error('Error fetching products:', error);
    });
