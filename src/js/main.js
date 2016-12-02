// import * as jQuery from 'jquery'
import Router from 'modules/base/router/router';
import Picture from 'modules/base/picture/picture';
import PointerEventsPolyfill from 'js/vendors/pointer_events_polyfill';
import Emitter from 'modules/base/emitter/emitter';
import Responsive from 'modules/base/responsive/responsive';
import InViewPort from 'modules/base/inViewPort/inViewPort';
// import Storage from 'js/vendors/store2';
import * as utilities from 'modules/base/utils/utils';
import Gsap from 'gsap';
import GsapScrollTo from 'lib/bower/gsap@1.18.2/src/uncompressed/plugins/ScrollToPlugin.js';

import Carousel from 'modules/carousel/carousel';
export const m = {};
export const utils = utilities;

// local/session storage (mostly used for caching of dynamically loaded pages.)
// m.storage = store;

//define generic stuff here.
m.emitter = new Emitter();
m.picture = new Picture();
m.responsive = new Responsive();
m.TweenMax = Gsap.TweenMax;

// // define when to do stuff on url change.
m.router = new Router();
//
// // inView for generic elements used mostly for animations.
m.inViewPort = new InViewPort({
	offsetBottom: -80,
	offsetTop: -80
});
// // inView for pictures defining when to load images.
// m.pictureInViewPort = new InViewPort({
// 	el: '.picture',
// 	eventName: 'pictureInView',
// 	addClass: false,
// 	offsetBottom: 600,
// 	offsetTop: 600,
// 	onFirstIn: function($el){
// 		m.picture.loadPicture($el);
// 	}
// });
