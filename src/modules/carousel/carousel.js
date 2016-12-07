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
		var config = config ? config : {};
		this.config = $.extend({
			el: config.el || '.carousel',
			// dots: false,
			cssEase: 'ease-in-out',
			useCSS: true,
			useTransform: true,
			autoplay: false,
			speed: 300,
			// lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '20%'
		}, config);
		// console.log(this.config);
		//
		this.$el = $(this.config.el);
		this.init();
	}
	init() {
		this.bindEvents();
		this.$el.slick(this.config);
	}
	bindEvents() {
		var self = this;
	}
}
