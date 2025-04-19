const enlaces = document.querySelectorAll("nav ul li a[data-seccion]");
const secciones = document.querySelectorAll(".seccion");

enlaces.forEach(enlace => {
  enlace.addEventListener("click", e => {
    e.preventDefault();

    enlaces.forEach(l => l.classList.remove("activo"));

    enlace.classList.add("activo");

    secciones.forEach(sec => sec.classList.remove("activa"));

    
    const id = enlace.dataset.seccion;
    document.getElementById(id).classList.add("activa");
  });
});
