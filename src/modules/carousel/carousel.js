/**
 * Class: Carousel
 * Description: Her goes description
 */
import {
	m,
	utils
} from '../../js/main';
import slick from './slick.min';
export default class Carousel {
	/**
	 * @param {number} param this is param. web
	 * @return {number} this is return.
	 */
	constructor(config) { // put in defaults here
		//defaults
		this.config = $.extend({
			el: config.el || $('.carousel'),
			dots: true,
			cssEase: 'ease-in-out',
			useCSS: true,
			useTransform: true,
			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 8000
		}, config);

		this.$el = $(this.config.el);
		this.$imgs = this.$el.find('img');
		
		this.init();
	}
	init() {
		this.bindEvents();
		this.$el.slick(this.config);
	}
	bindEvents() {
		var self = this;
		m.emitter.on('picture/update', function(img) {
			// $(window).trigger('resize');
			//update slider height on imageload.
		});
		// bind your events here.
	}
}
