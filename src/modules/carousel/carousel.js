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
			dots: false,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			cssEase: 'ease-in-out',
			useCSS: true,
			useTransform: true,
			autoplay: false,
			responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						centerPadding: '0%'
					}
				}, {
					breakpoint: 769,
					settings: {
						slidesToShow: 1,
						centerPadding: '15%'
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						centerPadding: '15%'
					}
				}
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
			]
		}, config);
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
