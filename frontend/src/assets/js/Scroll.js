export function initScroll() {
  const scrollContainer = document.querySelector('.scroll-horizontal');
  const dots = document.querySelectorAll('.dot');

  function moveToSlide(index) {
    const cardWidth = document.querySelector('.tarjeta').offsetWidth + 20; // ancho tarjeta + gap
    const offset = index * cardWidth;
    scrollContainer.scrollTo({
      left: offset,
      behavior: 'smooth',
    });

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const index = parseInt(dot.getAttribute('data-index'));
      moveToSlide(index);
    });
  });

  moveToSlide(0);
}

export function initModalCloseOnOutsideClick() {
  window.onclick = function (event) {
    if (event.target.className === 'modal') {
      event.target.style.display = 'none';
    }
  };
}
