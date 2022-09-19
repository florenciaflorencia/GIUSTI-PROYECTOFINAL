let carrito = [];

class Producto {
    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

//constantes
const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

const productos = [];
const elementosCarrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

//funciones

cargarProductos();
cargarCarrito();
dibujarCarrito();
dibujarCatalogoProductos();



function cargarProductos() {
    productos.push(new Producto(1, "BOWL DE VIDRIO", 3600, "../imagenes/bazar1.jpg"));
    productos.push(new Producto(2, "BOWL BASE DE COLOR x 3", 10000, "../imagenes/bazar6.jpg"));
    productos.push(new Producto(3, "BOWL BASE DE COLOR", 3500, "../imagenes/bazar3.jpg"));
    productos.push(new Producto(4, "TABLA", 1500, "../imagenes/bazar2.jpg"));
    productos.push(new Producto(5, "MOLDE DE HELADOS COLORES", 2500, "../imagenes/helad1.jpg"));
    productos.push(new Producto(6, "MOLDE DE HELADOS ", 2500, "../imagenes/helad2.jpg"));
    productos.push(new Producto(7, "ORGANIZADOR PASTEL",4500,"../imagenes/organizadores1.jpg"));
    productos.push(new Producto(8, "ORGANIZADOR MARRON", 3500, "../imagenes/organizadores2.jpg"));
    productos.push(new Producto(9, "ORGANIZADOR x 3", 9900, "../imagenes/organizadores3.jpg"));
    productos.push(new Producto(10, "ORGANIZADOR GOMA x 3", 4800, "../imagenes/organizadores4.jpg"));
    productos.push(new Producto(11, "CUBIERTOS x 6", 5300, "../imagenes/vajilla1.jpg"));
    productos.push(new Producto(12, "SET CUBIERTOS PASTEL x 4", 10500, "../imagenes/vajilla5.jpg"));
}

function cargarCarrito() {
 
}

function dibujarCarrito() {

    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.id}</td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                <td>$ ${elemento.producto.precio}</td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito+=elemento.cantidad*elemento.producto.precio;

            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            
            
            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });

        }
    );

    
    if(elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `;
    } else {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Total de la compra: $${estandarDolaresAmericanos.format(sumaCarrito)}</th>
        `;
    }

}

function crearCard(producto) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";


    //Cuerpocarta
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio}</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //Carta
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);

   


    botonAgregar.onclick = () => {
   

        let elementoCarrito = new ElementoCarrito(producto, 1);
        elementosCarrito.push(elementoCarrito);

        dibujarCarrito();

        swal({
            title: "¡Producto agregado!",
            text: `${producto.nombre} agregado al carrito de compra.`,
            icon: "success",
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Ir a carrito",
                    value: true
                }
            }
        }).then((irACarrito) => {

            if(irACarrito) {
                //swal("Vamos al carrito!");
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);

            }
        });

    } 
    
    return carta;

}

function dibujarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            contenedorProductos.append(contenedorCarta);
        }
    );

}

//json 
function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(elementosCarrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    elementosCarrito = storage;
    dibujarCarrito()
  }
}





  
  