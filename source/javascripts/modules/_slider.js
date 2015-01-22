$(document).ready(function(){
	var slides = $(".slider > *").map(function(index, element){
		return $(element);
	});

	var sliderIndexes = $("[data-slider-index]");

	var sliderIndex = 0;
	var isTransitioning = false;

	$("[data-slider-action='next']").click(function(){ next(); });

	$("[data-slider-action='previous']").click(function(){ previous(); });

	$('.slider').click(function(){ next(); });

	$(".slider-bullets").each(function(index, element){
		for(var i=0;i<slides.length;i++){
			var bullet = $('<a class="bullet">&#8226;</a>').appendTo(element);
			function addClickHandler(bullet, i){
				bullet.click(function(){
					console.log("yay: " + i);
				});
			};
			addClickHandler(bullet, i);
		}
	});

	function increaseIndex(){
		sliderIndex = sliderIndex == slides.length-1 ? 0 : sliderIndex+1;
		notifyIndexChanged();
	}

	function decreaseIndex(){
		sliderIndex--;
		notifyIndexChanged();	
	}

	function notifyIndexChanged(){
		sliderIndexes.text(sliderIndex+1);
	}

	function next(){
		if(!isTransitioning) {
			var previous = sliderIndex;
			increaseIndex();
			transition(previous, sliderIndex);
		}
	}

	function previous(){
		if(!isTransitioning && 0 < sliderIndex) {
			var previous = sliderIndex;
			decreaseIndex();
			transition(previous, sliderIndex);
		}
	}

	function transition(currentIndex, nextIndex){
		isTransitioning = true;
		return hide(currentIndex, function(){
			return show(nextIndex, function(){
				isTransitioning = false;
			});
		});
	}

	function hide(index, callback){
		return slides[index].fadeOut(30, callback);
	}

	function show(index, callback){
		return slides[index].fadeIn(30, callback);
	}

	slides[0].show();
	notifyIndexChanged();
});
