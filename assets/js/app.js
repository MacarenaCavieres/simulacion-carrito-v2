const template = document.querySelector("#template").content;
const templateTotal = document.querySelector("#templateTotal").content;
const fragment = document.createDocumentFragment();
const fragmentTotal = document.createDocumentFragment();
const btnAgregar = document.querySelectorAll(".btnAgregar");
const carritoLista = document.querySelector("#carritoLista");
const subtitulo = document.querySelector(".subtitulo");

const arrayFrutas = [];

const construirObjeto = (target) => {
    const newFruta = {
        nombre: target.dataset.nombre,
        precio: +target.dataset.precio,
        cantidad: 1,
        total: +target.dataset.precio,
    };

    const indice = arrayFrutas.findIndex((item) => item.nombre === newFruta.nombre);

    if (indice === -1) {
        arrayFrutas.push(newFruta);
    } else {
        arrayFrutas[indice].cantidad++;
        arrayFrutas[indice].total = arrayFrutas[indice].cantidad * arrayFrutas[indice].precio;
    }

    pintarFruta(arrayFrutas);
    operacionSuma(arrayFrutas);
};

const pintarFruta = (arrayFrutas) => {
    carritoLista.textContent = "";
    arrayFrutas.forEach((item) => {
        const clone = template.cloneNode(true);
        clone.querySelector(".nombreFruta").textContent = item.nombre;
        clone.querySelector(".precioFruta").textContent = `Precio: $${item.precio}`;
        clone.querySelector(".cantidadFruta").textContent = `Cantidad: ${item.cantidad}`;
        clone.querySelector(".totalFruta").textContent = `Total fruta: $${item.total}`;
        clone.querySelectorAll(".btnEliminar").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                eliminar(e.target.parentNode.parentNode.parentNode.querySelector(".nombreFruta").textContent);
            });
        });

        clone.querySelectorAll(".btnMas").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                sumar(e.target.parentNode.parentNode.parentNode.querySelector(".nombreFruta").textContent);
            });
        });

        clone.querySelectorAll(".btnMenos").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                restar(e.target.parentNode.parentNode.parentNode.querySelector(".nombreFruta").textContent);
            });
        });

        fragment.appendChild(clone);
    });

    subtitulo.style.display = "block";

    carritoLista.appendChild(fragment);
};

btnAgregar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        construirObjeto(e.target);
    });
});

const operacionSuma = (arrayFrutas) => {
    let result = 0;

    arrayFrutas.forEach((item) => {
        result += item.total;
    });

    const clone = templateTotal.cloneNode(true);
    clone.querySelector(".totalCarrito").textContent = `Total compra: $${result}`;
    fragmentTotal.appendChild(clone);

    carritoLista.appendChild(fragmentTotal);
};

const eliminar = (target) => {
    const oneDelete = arrayFrutas.findIndex((item) => item.nombre === target);
    const confirmar = confirm("¿Esta seguro que quiere eliminar el item?");
    if (confirmar) {
        arrayFrutas.splice(oneDelete, 1);
        pintarFruta(arrayFrutas);
        operacionSuma(arrayFrutas);
    }
};

const sumar = (target) => {
    const onePlus = arrayFrutas.findIndex((item) => item.nombre === target);
    arrayFrutas[onePlus].cantidad++;
    arrayFrutas[onePlus].total = arrayFrutas[onePlus].cantidad * arrayFrutas[onePlus].precio;
    pintarFruta(arrayFrutas);
    operacionSuma(arrayFrutas);
};

const restar = (target) => {
    const oneLess = arrayFrutas.findIndex((item) => item.nombre === target);
    if (arrayFrutas[oneLess].cantidad > 0) {
        arrayFrutas[oneLess].cantidad--;
        arrayFrutas[oneLess].total = arrayFrutas[oneLess].cantidad * arrayFrutas[oneLess].precio;
        pintarFruta(arrayFrutas);
        operacionSuma(arrayFrutas);
    } else {
        eliminar(target);
    }
};
