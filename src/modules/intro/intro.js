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
		this.$button = this.$el.find('.button');
		this.video = this.$el.find('video')[0];
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
		m.emitter.on('intro-hide', function(){
			self.hide();
		})
		this.video.addEventListener('ended',function(){
				self.onVideoEnd();
			},
		false);
	}
	onVideoEnd(){
		this.animateOut();
	}
	hide(){
		this.$el.css('display', 'none');
	}
    animateOut(){
        m.TweenMax.to(this.$el, 0.3, {
            y:"-100%", ease:Linear.easeNone
        });
		this.video.pause();
    }
}
