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

const btnAgregar = document.querySelector(".agregar");
const formAuditoria = document.getElementById("form-auditoria");

btnAgregar.addEventListener("click", () => {
  formAuditoria.style.display = formAuditoria.style.display === "none" ? "block" : "none";
});



function crearBotonEditar(fila) {
  const btn = document.createElement("button");
  btn.textContent = "Editar";
  btn.classList.add("btn-editar");

  btn.addEventListener("click", () => {
    const celdas = fila.querySelectorAll("td");
    const campos = [
      "tipo", "subtipo", "auditoria", "proceso", "lider_proceso",
      "personal_a_auditar", "lider_auditor", "auditor", "estado", "fecha"
    ];

    
    campos.forEach((campo, i) => {
      formAuditoria[campo].value = celdas[i].innerText.replace(/\n/g, "\n");
    });

   
    formAuditoria.style.display = "block";

   
    fila.remove();
  });

  const td = document.createElement("td");
  td.appendChild(btn);
  fila.appendChild(td);
}



formAuditoria.addEventListener("submit", function (e) {
  e.preventDefault();

  const nuevaFila = document.createElement("tr");

  const datos = [
    this.tipo.value,
    this.subtipo.value,
    this.auditoria.value,
    this.proceso.value,
    this.lider_proceso.value,
    this.personal_a_auditar.value,
    this.lider_auditor.value,
    this.auditor.value,
    this.estado.value,
    this.fecha.value,
  ];

  datos.forEach(texto => {
    const td = document.createElement("td");
    td.innerHTML = texto.replace(/\n/g, "<br>");
    nuevaFila.appendChild(td);
  });

  crearBotonEditar(nuevaFila); 
  document.querySelector(".tabla-auditoria tbody").appendChild(nuevaFila);
  this.reset();
  this.style.display = "none";
});
