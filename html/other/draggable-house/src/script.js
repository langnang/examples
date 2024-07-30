console.clear();
$('.building').resizable({
	handles: "n",
	minHeight: 60,
	grid: 60
});

$('.building').resize(function() {
	stop();
});

const floor = '<div class="floor"><div class="window"></div><div class="window"></div><div class="window"></div><div class="window"></div></div>';
const classes = ["", "open", ""];

const stop = () => {
	let buildingHeight = $('.building').outerHeight() - 40;
	let floorHeight = $('.floor').outerHeight();
	
	// check how many floors fit the building ... Math.floor ( ͡° ͜ʖ ͡°)
	let floors = Math.floor(buildingHeight / floorHeight);
	let currentFloors = $('.building .floor').length;
	
	// get the difference
	let diff = floors - currentFloors;
	
	if (diff < 0) {
		diff = -diff;
		
		for (let i = 0; i < diff; i++) {
			// remove top floor
			$('.building').find('.floor:first').remove();
		}
	} else {
		for (let i = 0; i < diff; i++) {
			$('.building').prepend(floor);
		}
	}
	
	// show price tag
	let price = Math.round(floors / 2);
	let pricetag = [];
	
	for (let i = 0; i < price; i++) {
		pricetag.push('$');
	}
	
	$('.price').html(pricetag);
	
	// randomly open windows
	$('.window').each(function() {
		$(this).removeClass(classes[~~(Math.random()*classes.length)]);
		$(this).addClass(classes[~~(Math.random()*classes.length)]);
	})
}

// Particles by Zed Dash https://codepen.io/z-/pen/bpxgWZ
const initparticles = () => leaves();

const rnd = (m, n) => {
	return Math.floor(Math.random() * (parseInt(n) - parseInt(m) + 1)) + parseInt(m);
}

const leaves = () => {
	$('.tree').each(function() {
		let count = ($(this).width() / 20) * 5;
		for (let i = 0; i <= count; i++) {
			let size = (rnd(60, 120) / 10);
			$(this).append(`<span class="particle" style="left:${rnd(-70, 70)}px;width:${size}px;height:${size}px;animation-delay:${(rnd(0, 30) / 10)}s;"></span>`);
		}
	});
}

initparticles();


// hide ui
let uis = 0;
const keydown = (e) => {
	let key = e.which;
	
	if (key === 32) {
		if (uis == 0) {
			$('.ui').css('opacity', '0');
			uis = 1;
		} else {
			$('.ui').css('opacity', '1');
			uis = 0;
		}
	}
}

$(document).on('keydown', keydown);