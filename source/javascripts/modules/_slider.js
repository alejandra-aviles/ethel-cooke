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
					notifyIndexChanged(i);
					console.log("yay: " + i);
				});
			};
			addClickHandler(bullet, i, notifyIndexChanged);
		}
	});

	function increaseIndex(){
		newIndex = sliderIndex == slides.length-1 ? 0 : sliderIndex+1;
		notifyIndexChanged(newIndex);
	}

	function decreaseIndex(){
		notifyIndexChanged(sliderIndex-1);	
	}

	function updateBullets(){
		$('.slider-bullets').each(function(index, sliderBullets){
			$('.bullet').removeClass("active");
			var activeBullet = $('.bullet', sliderBullets)[sliderIndex];
			$(activeBullet).addClass("active");
		});
	}

	function notifyIndexChanged(index){
		var previousIndex = sliderIndex;
		sliderIndex = index;
		sliderIndexes.text(sliderIndex+1);
		updateBullets();
		transition(previousIndex, sliderIndex);
	}

	function next(){
		if(!isTransitioning) {
			var previous = sliderIndex;
			increaseIndex();
		}
	}

	function previous(){
		if(!isTransitioning && 0 < sliderIndex) {
			var previous = sliderIndex;
			decreaseIndex();
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
	notifyIndexChanged(0);
});
