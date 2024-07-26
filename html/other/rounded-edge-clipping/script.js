const allCards = document.querySelectorAll(".card");
const setUpVars = (card, name) => {
  card.style.setProperty('--nameWidth', `${name.getBoundingClientRect().width}px`);
  card.style.setProperty('--nameHeight', `${name.getBoundingClientRect().height}px`);      
}

const setUpCards = () => {
  allCards.forEach(card => {
    const name = card.querySelector('.name');
    setUpVars(card, name);
    const resizeObserver = new ResizeObserver(() => {
			setUpVars(card, name);
		});
		resizeObserver.observe(name);
  })
}

setUpCards();