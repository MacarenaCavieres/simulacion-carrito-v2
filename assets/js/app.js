const template = document.querySelector("#template").content;
const fragment = document.createDocumentFragment();
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
};

const pintarFruta = (arrayFrutas) => {
    carritoLista.textContent = "";
    arrayFrutas.forEach((item) => {
        const clone = template.cloneNode(true);
        clone.querySelector(".nombreFruta").textContent = item.nombre;
        clone.querySelector(".precioFruta").textContent = `Precio: $${item.precio}`;
        clone.querySelector(".cantidadFruta").textContent = `Cantidad: ${item.cantidad}`;
        clone.querySelector(".totalFruta").textContent = `Total fruta: $${item.total}`;

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
