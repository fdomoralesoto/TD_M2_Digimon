// Seleccion individual de Digimon
document.addEventListener('DOMContentLoaded', function() {
    const selectDigimon = document.getElementById('selectDigimon');
    const contenedorCartas = document.getElementById('contenedorCartas');
    
    fetch('https://digimon-api.vercel.app/api/digimon/')
      .then(response => response.json())
      .then(data => {
        data.forEach(digimon => {
          const option = document.createElement('option');
          option.value = digimon.name;
          option.textContent = digimon.name;
          selectDigimon.appendChild(option);
        });
      })
      .catch(error => {
        console.log('Error:', error);
      });
    
    selectDigimon.addEventListener('change', function() {
      const selectedDigimon = selectDigimon.value;
    
      if (selectedDigimon) {
        fetch(`https://digimon-api.vercel.app/api/digimon/name/${selectedDigimon}`)
          .then(response => response.json())
          .then(data => {
            const digimon = data[0];
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <div class="contenedor-cards-individual"> 
            <div class="card">
              <img src="${digimon.img}" class="imagen-carta" alt="${digimon.name}">
              <p class="titulo-carta-individual">${digimon.name}</p>
              <p class="level-carta-individual">Level: ${digimon.level}</p>
              </div>
              </div>
            `;
            contenedorCartas.innerHTML = '';
            contenedorCartas.appendChild(card);
            fadeIn(card);
          })
          .catch(error => {
            console.log('Error:', error);
          });
      } else {
        contenedorCartas.innerHTML = '';
      }
    });
    
    function fadeIn(element) {
      let opacity = 0;
      const fadeInInterval = 10; // incremendo de opacidad
      const fadeDuration = 2000; //duracion del fadein
      const totalSteps = fadeDuration / fadeInInterval; 
    
      element.style.display = 'block';
    
      const timer = setInterval(function() {
        if (opacity >= 1) {
          clearInterval(timer);
        }
        element.style.opacity = opacity.toString();
        opacity += 1 / totalSteps;
      }, fadeInInterval);
    }
})