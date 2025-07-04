document.addEventListener("DOMContentLoaded", function() {
    const scrollContainer = document.querySelector('.scroll-horizontal');
    const dots = document.querySelectorAll('.dot');
  
    // Función para mover el scroll a la tarjeta seleccionada
    function moveToSlide(index) {
      const cardWidth = document.querySelector('.tarjeta').offsetWidth + 20; // Ancho de una tarjeta más el gap
      const offset = index * cardWidth;
      scrollContainer.scrollTo({
        left: offset,
        behavior: 'smooth'
      });
  
      // Actualiza los puntos de navegación
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }
  
    // Asignar evento a los puntos de navegación
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const index = parseInt(dot.getAttribute('data-index'));
        moveToSlide(index);
      });
    });
  
    // Mover el scroll al primer punto por defecto
    moveToSlide(0);
});


function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
  }

  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }

  // Cuando el usuario haga clic fuera del modal, cerrarlo
  window.onclick = function(event) {
    if (event.target.className === "modal") {
      event.target.style.display = "none";
    }
  }

  

  /*Question*/

  const questions = document.querySelectorAll(".faq-question");

questions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;

    // Cierra otras respuestas
    document.querySelectorAll(".faq-answer").forEach((ans) => {
      if (ans !== answer) ans.style.display = "none";
    });

    // Toggle de la actual
    answer.style.display = (answer.style.display === "block") ? "none" : "block";
  });
});


