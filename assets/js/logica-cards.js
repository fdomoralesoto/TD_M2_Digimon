fetch('https://digimon-api.vercel.app/api/digimon/')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.container-digimon');
    let currentPage = 1;
    let digimonPorPagina = 8;
    let totalDigimon = data.length;
    let totalPages = Math.ceil(totalDigimon / digimonPorPagina);

    // función para mostrar los digimones de la página actual
    function showDigimon(page) {
      container.innerHTML = '';

      // calcular los índices de los digimones a mostrar
      let startIndex = (page - 1) * digimonPorPagina;
      let endIndex = page * digimonPorPagina;

      // crear filas para los digimones
      let row1 = document.createElement('div');
      row1.className = 'row primerafila';
      let row2 = document.createElement('div');
      row2.className = 'row segundafila';

      // recorrer los digimones de la página actual y mostrarlos en el contenedor
      for (let i = startIndex; i < endIndex && i < totalDigimon; i++) {
        const digimon = data[i];
        const { name, img, level } = digimon;
        const digimonElement = document.createElement('div');
        digimonElement.className = 'col-md-3'; // agregar clase col-md-3 para mostrar 4 elementos por fila

        // mostrar el elemento con fadein 
        let opacity = 0;
        const fadeInInterval = 20; // tiempo entre cada incremento de opacidad
        const fadeDuration = 1000; // duración total del efecto 
        const totalSteps = fadeDuration / fadeInInterval; 

        digimonElement.style.opacity = "0"; 
        digimonElement.style.display = "none"; 

        setTimeout(() => {
          digimonElement.style.display = "block"; // mostrar el elemento

          const fadeInterval = setInterval(() => {
            opacity += 1 / totalSteps; // opacidad en cada paso
            digimonElement.style.opacity = opacity.toString();

            if (opacity >= 1) {
              clearInterval(fadeInterval); 
            }
          }, fadeInInterval);
        }, 200 * ((Math.floor(i / 4) % 2) * 4 + (i % 4))); 

        digimonElement.innerHTML = `
          <div class="contenedor-cards"> 
            <div class="card">
              <img class="imagen-carta" src="${img}" alt="${name}">
              <p class="titulo-carta">${name}</p>
              <p class="level-carta">Level: ${level}</p>
            </div>
          </div>
        `;

        // agregar los elementos en  2 filas
        if (i % 8 < 4) {
          row1.appendChild(digimonElement);
        } else {
          row2.appendChild(digimonElement);
        }
      }

      // agregar las filas al contenedor
      container.appendChild(row1);
      container.appendChild(row2);
    }

    // mostrar los digimones de la primera página al cargar los datos
    showDigimon(currentPage);

    // función para ir a la página anterior
    function goToPreviousPage() {
      if (currentPage > 1) {
        currentPage--;
        showDigimon(currentPage);
      }
    }

    // función para ir a la página siguiente
    function goToNextPage() {
      if (currentPage < totalPages) {
        currentPage++;
        showDigimon(currentPage);
      }
    }

    // manejar el evento de hacer clic en el botón "Anterior"
    previous.addEventListener("click", goToPreviousPage);

    // manejar el evento de hacer clic en el botón "Siguiente"
    next.addEventListener("click", goToNextPage);
  })
  .catch(error => console.error(error));