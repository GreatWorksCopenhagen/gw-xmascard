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
		this.isActive = false;
		this.init();
	}
	init() {
		this.bindEvents();
		this.initCarousel();
	}
	bindEvents() {
		var self = this;
		m.emitter.on('keyEvent', function(key) {
			if (self.isActive) {
				switch (key) {
					case 'enter':
						var playlistIndex = self.$carousel.find('.slick-current').data('playlist-index');
						m.router.gotoUrl('/player/' + playlistIndex);
						break;
					case 'right':
						self.$carousel.slick('slickNext');
						break;
					case 'left':
						self.$carousel.slick('slickPrev');
						break;
					default:
				}
			}
		});

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
