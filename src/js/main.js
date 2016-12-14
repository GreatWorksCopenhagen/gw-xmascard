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

import Data from 'data/data';
import YoutubeHandler from 'modules/youtubeHandler/youtubeHandler';
import Intro from 'modules/intro/intro';
import AlbumViewer from 'modules/albumViewer/albumViewer';
import PageHandler from 'modules/pageHandler/pageHandler';
import Player from 'modules/player/player';
import PreloadImages from 'modules/preloadImages/preloadImages';


import Webgl from 'modules/webgl/webgl';


export const m = {};
export const utils = utilities;




//define generic stuff here.
m.emitter = new Emitter();
m.picture = new Picture();
m.responsive = new Responsive();
m.TweenMax = Gsap.TweenMax;
m.data = new Data();
// m.preloadImages = new PreloadImages();

// // define when to do stuff on url change.
//

m.webgl = new Webgl();

// // inView for generic elements used mostly for animations.
m.youtubeHandler = new YoutubeHandler();
m.player = new Player();
m.intro = new Intro();
m.albumViewer = new AlbumViewer();

m.pageHandler = new PageHandler();
m.router = new Router();


// m.inViewPort = new InViewPort({
// 	offsetBottom: -80,
// 	offsetTop: -80
// });


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
