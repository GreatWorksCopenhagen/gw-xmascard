/**
 * Class: Utils
 * Description: Utilities functions
 */
import {
	m,
} from 'js/main';

export const $win = $(window);
export const $html = $('html');
export const isIe9 = $html.hasClass('ie9');
export const $mainContainer = $('#mainContainer');
export const isFrontend = location.port == 3000;


export function getDevice() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
		return 'ios';

	} else if (userAgent.match(/Android/i)) {

		return 'android';
	} else {
		return 'unknown';
	}
}

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait || 200);
		if (callNow) {
			func.apply(context, args);
		}
	};
}





// SCROLLTO
// easing functions http://goo.gl/5HLl8
Math.easeInOutQuad = function(t, b, c, d) {
	t /= d / 2;
	if (t < 1) {
		return c / 2 * t * t + b
	}
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function(t, b, c, d) {
	var tc = (t /= d) * t * t;
	return b + c * (tc);
};

Math.inOutQuintic = function(t, b, c, d) {
	var ts = (t /= d) * t,
		tc = ts * t;
	return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

export function scrollTo(to, duration, callback) {
	// because it's so fucking difficult to detect the scrolling element, just move them all
	function move(amount) {
		document.documentElement.scrollTop = amount;
		document.body.parentNode.scrollTop = amount;
		document.body.scrollTop = amount;
	}

	function position() {
		return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
	}
	var start = position(),
		change = to - start,
		currentTime = 0,
		increment = 20;
	duration = (typeof(duration) === 'undefined') ? 300 : duration;
	if (Modernizr.touch) {
		duration = duration / 4;
	}
	var animateScroll = function() {
		// increment the time
		currentTime += increment;
		// find the value with the quadratic in-out easing function
		var val = Math.easeInOutQuad(currentTime, start, change, duration);
		// move the document.body
		move(val);
		// do the animation unless its over
		if (currentTime < duration) {
			requestAnimFrame(animateScroll);
		} else {
			if (callback && typeof(callback) === 'function') {
				// the animation is done so lets callback
				callback();
			}
		}
	};
	animateScroll();
}

export function disableBodyScroll() {
	if (!$('body').hasClass('body-no-scroll')) {
		$('body').addClass('body-no-scroll');
	}
}
export function enableBodyScroll() {
	if ($('body').hasClass('body-no-scroll')) {
		$('body').removeClass('body-no-scroll');
	}
}


export function equalheight(container) {
	var currentTallest = 0,
		currentRowStart = 0,
		rowDivs = new Array(),
		$el,
		topPosition = 0;
	$(container).each(function() {

		$el = $(this);
		$($el).height('auto')
		topPostion = $el.position().top;

		if (currentRowStart != topPostion) {
			for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			currentTallest = $el.height();
			rowDivs.push($el);
		} else {
			rowDivs.push($el);
			currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		}
		for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
	});
}


// scroll disable and enable
var keys = {
	37: 1,
	38: 1,
	39: 1,
	40: 1
};

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

export function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}

export function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}
export function scrollTop() {
	return document.body.scrollTop || document.documentElement.scrollTop;
}
export function isIos(){
	return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// notify modules that scroll or resize has happened (this way we only have one scroll/resize event listener)
$win.on({
	'DOMMouseScroll mousewheel scroll ': debounce(function() {
		m.emitter.emit('scroll', $win.scrollTop());
	}, 5),
	'resize': debounce(function() {
		this.viewportHeight = $html.outerHeight();
		m.emitter.emit('resize', {
			'height': $html.outerHeight(),
			'width': $html.width()
		});
	}, 150)
}).trigger('scroll').trigger('resize');
