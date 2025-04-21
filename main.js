document.addEventListener('DOMContentLoaded', () => {
  let sectores = [
      { id: 1, nombre: 'Recursos Humanos' },
      { id: 2, nombre: 'Marketing' }
  ];
  let idContador = 3;
  let idSectorEditando = null;

  // =========================
  // Vistas (manejo unificado)
  // =========================
  const secciones = document.querySelectorAll('.seccion');
  const enlaces = document.querySelectorAll('nav ul li a[data-seccion]');

  enlaces.forEach(enlace => {
      enlace.addEventListener('click', e => {
          e.preventDefault();
          enlaces.forEach(l => l.classList.remove('activo'));
          enlace.classList.add('activo');

          const id = enlace.dataset.seccion;
          mostrarVista(id);
      });
  });

  function mostrarVista(idVista) {
      secciones.forEach(sec => sec.classList.remove('activa'));
      const vista = document.getElementById(idVista);
      if (vista) {
          vista.classList.add('activa');
      }
  }

  // =========================
  // Elementos de la interfaz
  // =========================
  const tbodyPrincipal = document.getElementById('tabla-principal-body');
  const inputBusqueda = document.getElementById('input-busqueda');

  // Agregar
  const btnAgregar = document.getElementById('btn-agregar');
  const btnGuardar = document.getElementById('btn-guardar');
  const btnCancelar = document.getElementById('btn-cancelar');
  const inputNuevoSector = document.getElementById('input-nuevo-sector');

  // Editar
  const inputEditarSector = document.getElementById('input-editar-sector');
  const btnGuardarEdicion = document.getElementById('btn-guardar-edicion');
  const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');

  // Buscar
  const btnBuscar = document.getElementById('btn-buscar');

  // =========================
  // Eventos
  // =========================

  btnAgregar.addEventListener('click', () => {
      inputNuevoSector.value = '';
      mostrarVista('vista-agregar-sector');
  });

  btnCancelar.addEventListener('click', () => {
      mostrarVista('procesos');
  });

  btnGuardar.addEventListener('click', () => {
      const nombre = inputNuevoSector.value.trim();
      if (nombre !== '') {
          sectores.push({ id: idContador++, nombre });
          renderTabla(inputBusqueda.value.trim().toLowerCase());
          mostrarVista('procesos');
      } else {
          alert('Por favor ingresa un nombre válido para el sector.');
      }
  });

  btnBuscar.addEventListener('click', () => {
      renderTabla(inputBusqueda.value.trim().toLowerCase());
  });

  inputBusqueda.addEventListener('input', () => {
      renderTabla(inputBusqueda.value.trim().toLowerCase());
  });

  btnCancelarEdicion.addEventListener('click', () => {
      idSectorEditando = null;
      mostrarVista('procesos');
  });

  btnGuardarEdicion.addEventListener('click', () => {
      const nuevoNombre = inputEditarSector.value.trim();
      if (nuevoNombre !== '' && idSectorEditando !== null) {
          const sector = sectores.find(s => s.id === idSectorEditando);
          if (sector) {
              sector.nombre = nuevoNombre;
              renderTabla(inputBusqueda.value.trim().toLowerCase());
          }
          idSectorEditando = null;
          mostrarVista('procesos');
      } else {
          alert('Por favor ingresa un nombre válido para el sector.');
      }
  });

  // =========================
  // Renderizado de la tabla
  // =========================
  function renderTabla(filtro = '') {
      tbodyPrincipal.innerHTML = '';

      sectores
          .filter(s => s.nombre.toLowerCase().includes(filtro))
          .forEach(s => {
              const fila = document.createElement('tr');
              fila.innerHTML = `
                  <td class="fila-tabla">${s.nombre}</td>
                  <td class="columna-acciones">
                      <button class="btn-editar" data-id="${s.id}">Editar</button>
                      <button class="btn-eliminar" data-id="${s.id}">x</button>
                  </td>
              `;
              tbodyPrincipal.appendChild(fila);
          });

      // Eliminar
      document.querySelectorAll('.btn-eliminar').forEach(btn => {
          btn.addEventListener('click', () => {
              const id = parseInt(btn.dataset.id);
              sectores = sectores.filter(s => s.id !== id);
              renderTabla(inputBusqueda.value.trim().toLowerCase());
          });
      });

      // Editar
      document.querySelectorAll('.btn-editar').forEach(btn => {
          btn.addEventListener('click', () => {
              const id = parseInt(btn.dataset.id);
              const sector = sectores.find(s => s.id === id);
              if (sector) {
                  idSectorEditando = id;
                  inputEditarSector.value = sector.nombre;
                  mostrarVista('vista-editar-sector');
              }
          });
      });
  }

  // Inicial
  renderTabla();
});
