const card = document.querySelector('.page')

const image = document.querySelector('.image')


const profile = document.querySelector('.profile')

const name = document.querySelector('.meinname')

const contact = document.querySelector('.contact')

card.addEventListener('click' , () => {
				card.classList.toggle('flip')
				profile.classList.toggle('anima')
				name.classList.toggle('anima')
				contact.classList.toggle('anima')
})


image.addEventListener('click' , () => {
				card.classList.toggle('flip') // gorilla method to isolate image - click event listener :P // should find a sophisticated way.	
})

contact.addEventListener('click' , () => {
				card.classList.toggle('flip') 
})

document.addEventListener('keydown' , (e) => {
	
	
	if(e.keyCode === 39){
		card.classList.add('flip')
	}
	
		if(e.keyCode === 37){
		card.classList.remove('flip')
	}
	
})


