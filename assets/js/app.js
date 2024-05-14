const template = document.querySelector("#template").content;
const btnAgregar = document.querySelector(".btnAgregar");

btnAgregar.addEventListener("click", (e) => {
    console.log(e.target.dataset.nombre);
});
