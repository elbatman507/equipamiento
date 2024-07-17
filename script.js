    const d = document;

    d.addEventListener("DOMContentLoaded", (e) =>{
    slider();
    });
    function slider() {
    const $nextBtn = d.querySelector(".slider-btns .next"),
        $prevBtn = d.querySelector(".slider-btns .prev"),
        $slides = d.querySelectorAll(".slider-slide");

    let i = 0;
    d.addEventListener("click", (e) => {
        if (e.target === $prevBtn) {
        console.log(e.target);
        e.preventDefault();
        $slides[i].classList.remove("active");
        i--;

        if (i < 0) {
            i = $slides.length - 1;
        }

        $slides[i].classList.add("active");
        }

        if (e.target === $nextBtn) {
        e.preventDefault();
        $slides[i].classList.remove("active");
        i++;

        if (i > $slides.length - 1) {
            i = 0;
        }

        $slides[i].classList.add("active");
        }
    });
    }

    // productos

    var productoUrl = "";
    var carrito = []; 
    
    function cambiarContenido(imgElement) {
        var armaPrincipal = document.getElementById('arma_principal');
        var titulo = document.getElementById('producto_titulo');
        var descripcion = document.getElementById('producto_descripcion');
        var precio = document.getElementById('producto_precio');
    
        armaPrincipal.src = imgElement.src;
        titulo.textContent = imgElement.getAttribute('data-title');
        descripcion.textContent = imgElement.getAttribute('data-description');
        precio.textContent = imgElement.getAttribute('data-price');
        
        
        productoUrl = imgElement.getAttribute('data-url');
    }
    
    function agregarAlCarrito() {
        var confirmarCompra = document.getElementById('confirmar_compra').checked;
        if (confirmarCompra) {
            var armaPrincipalSrc = document.getElementById('arma_principal').src;
            var titulo = document.getElementById('producto_titulo').textContent;
            var descripcion = document.getElementById('producto_descripcion').textContent;
            var precio = document.getElementById('producto_precio').textContent;
    
            var producto = {
                imagen: armaPrincipalSrc,
                titulo: titulo,
                descripcion: descripcion,
                precio: precio,
                url: productoUrl
            };
    
            carrito.push(producto);
            actualizarCarrito();
            document.getElementById('confirmar_compra').checked = false; 
        } else {
            alert("Por favor, confirma que deseas comprar este producto.");
        }
    }
    
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }
    
    function actualizarCarrito() {
        var carritoContenido = document.getElementById('carrito_contenido');
        carritoContenido.innerHTML = ""; // Limpiar el carrito
    
        carrito.forEach(function(producto, index) {
            var productoCarrito = document.createElement('div');
            productoCarrito.classList.add('producto-carrito');
            productoCarrito.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <div>
                    <h4>${producto.titulo}</h4>
                    <p>${producto.precio}</p>
                </div>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            carritoContenido.appendChild(productoCarrito);
        });
    }
    
    function redirigirCompra() {
        if (carrito.length > 0) {
            
            localStorage.setItem('carrito', JSON.stringify(carrito));
            window.location.href = "compra.html";
        } else {
            alert("Tu carrito está vacío. Por favor, agrega un producto antes de comprar.");
        }
    }
    
    document.getElementById('confirmar_compra').addEventListener('change', agregarAlCarrito);


    // COMPRA DEL PRODUCTO FINALIZADO
document.addEventListener('DOMContentLoaded', function() {
    var carrito = JSON.parse(localStorage.getItem('carrito'));
    if (carrito && carrito.length > 0) {
        var precioTotal = 0;
        carrito.forEach(function(producto) {
            var precioProducto = parseFloat(producto.precio.replace('$', '')); // Convertir el precio a un número
            precioTotal += precioProducto;
        });

        var precioTotalElement = document.getElementById('precio_total');
        precioTotalElement.textContent = `Precio Total: $${precioTotal.toFixed(2)}`;
    }
});

function mostrarTarjeta(mostrar) {
    var tarjetaInfo = document.getElementById('tarjeta_info');
    tarjetaInfo.style.display = mostrar ? 'block' : 'none';
}

function finalizarCompra(event) {
    event.preventDefault();
    alert("Compra finalizada");
}