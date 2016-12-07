/**
 * Class: Intro
 * Description: Her goes description
 */
import {
	m,
	utils
} from '../../js/main';
export default class Intro {
	/**
	 * @param {number} param this is param.
	 * @return {number} this is return.
	 */
	constructor(config) { // put in defaults here
		//defaults
		this.config = $.extend({
			el: '.intro'
		}, config);
		this.$el = $(this.config.el);
		this.init();

	}
	init() {
		this.bindEvents();
	}
	bindEvents() {
        var self = this;
		this.$el.on({
            click: function(){
                self.animateOut();
            }
        })
	}
    animateOut(){
        m.TweenMax.to(this.$el, 0.3, {
            y:"-100%", ease:Linear.easeNone
        });
    }
}
