/**
 * Class: AlbumViewer
 * Description: Her goes description
 */
import {
	m,
	utils
} from '../../js/main';
import Carousel from '../carousel/carousel';
export default class AlbumViewer {
	/**
	 * @param {number} param this is param.
	 * @return {number} this is return.
	 */
	constructor(config) { // put in defaults here
		//defaults
		this.config = $.extend({
			el: '.albumViewer'
		}, config);
		this.$el = $(this.config.el);
		this.$carousel = this.$el.find('.carousel');
		this.$playBtn = this.$el.find('.albumViewer__play-btn');
		this.isActive = false;
		this.init();
	}
	init() {
		this.bindEvents();
		this.initCarousel();
	}
	gotoCurrentAlbum(){
		var playlistIndex = this.$carousel.find('.slick-current').data('playlist-index');
		m.router.gotoUrl('/player/' + playlistIndex);
	}
	bindEvents() {
		var self = this;
		m.emitter.on('keyEvent', function(key) {
			if (self.isActive) {
				switch (key) {
					case 'enter':
						self.gotoCurrentAlbum();
						break;
					case 'right':
						m.webgl.addWind();
						self.$carousel.slick('slickNext');
						break;
					case 'left':
						m.webgl.addWind();
						self.$carousel.slick('slickPrev');
						break;
					default:
				}
			}
		});
		this.$playBtn.on({
			click: function(e){
				e.preventDefault();
				self.gotoCurrentAlbum();
			}
		})

		this.$el.on({
			click: function(e) {
				var playlistIndex = $(this).data('playlist-index');
				m.router.gotoUrl('/player/' + playlistIndex);
			}
		}, '.albumViewer__album')
	}
	setActive(isActive) {
		this.isActive = isActive;
	}
	initCarousel() {
		this.carousel = new Carousel();
	}
	updateCarousel() {
		$(window).trigger('resize');
	}
}
