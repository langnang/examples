var ferris = $("#ferris"),
    center = $("#center"),
    tl;

TweenLite.set(center, {x:190, y:190});

//a little tricky getting the ferris wheel built, but it serves its purpose
function addArms(numArms) {
  var space = 360/numArms; 
  for (var i = 0; i < numArms; i++){
    var newArm = $("<div>", {class:"arm"}).appendTo(center)
    var newPivot = $("<div>", {class:"pivot outer"}).appendTo(center);
    var newBasket = $("<div>", {class:"basket"}).appendTo(newPivot);
    TweenLite.set(newPivot, {rotation:i*space, transformOrigin:"10px 210px"})
    TweenLite.set(newArm, {rotation:(i*space) -90, transformOrigin:"0px 3px"})
    TweenLite.set(newBasket, {rotation:  (-i * space), transformOrigin:"50% top" });
  }   
}

//Get this party started
addArms(8);//values between 2 and 12 work best
TweenLite.from(ferris, 1, {autoAlpha:0});

//Animation (super easy)
tl = new TimelineMax({repeat:-1, onUpdate:updateSlider});
tl.to(center, 20, {rotation:360,  ease:Linear.easeNone})
//spin each basket in the opposite direction of the ferris wheel at same rate (no math)
tl.to($(".basket"), 20, {rotation:"-=360",  ease:Linear.easeNone},0)


//UI Controls
$( "#slider" ).slider({
  range: false,
  min: 0,
  max: 1,
  step:.001,
  slide: function ( event, ui ) {
    tl.progress( ui.value ).pause();
  },
  stop: function( event, ui ) {tl.play()}
});	
			
function updateSlider() {
		$("#slider").slider("value", tl.progress());
}

$( "#sliderSpeed" ).slider({
  range: false,
  min: 0,
  max: 8,
  step:.02,
  value:1,
  slide: function ( event, ui ) {
    tl.timeScale( ui.value ).resume();
  }
});	


$("#playBtn").click(function(){
  tl.play();
});
$("#pauseBtn").click(function(){
	tl.pause();
});

$("#reverseBtn").click(function(){
  tl.reverse();
});
	