Array.from(document.querySelectorAll('li')).forEach(li => {
  li.addEventListener('click', e => {
    li.classList.toggle('active');
    return false;
  });
});