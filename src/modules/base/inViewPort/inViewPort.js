/**
 * Class: InView
 * Description: Her goes description
 */
import {
	m,
	utils
} from 'js/main';
export default class InViewPort {
	/**
	 * @param {number} param this is param.
	 * @return {number} this is return.
	 */
	constructor(config) {
		//defaults
		this.config = $.extend({
			el: '.inViewPort',
			eventName: 'inViewPort/elementVisible',
			addClass: true,
			inViewClass: 'inViewPort--wasInView',
			inViewCurrentClass: 'inViewPort--isInView',
			inViewinitedClass: 'inViewPort--inited',
			offsetBottom: 1,
			offsetTop: 1
		}, config);

		this.el = this.config.el;
		this.$el = $(this.el);
		this.hasBeenVisible = [];
		this.init();
	}
	init() {
		this.bindEvents();
		this.$el.addClass(this.config.inViewinitedClass);
	}
	bindEvents() {
			var self = this;
			m.emitter.on('scroll', function(){
				setTimeout(function(){
					self.setVisibleElements();
				}, 200);
			});
			m.emitter.on('resize', function(){
				setTimeout(function(){
					self.setVisibleElements();
				}, 200);
			});
			utils.$win.trigger('scroll');
	}
		// add classes to element that are visible
	setVisibleElements() {
			var self = this;
			this.$el.each(function(i, el) {
				var $el = $(el);
				if (self.isVisible($el, true)) {
					$el.addClass(self.config.inViewCurrentClass);
					if (self.hasBeenVisible.indexOf(el) <0) {
						self.hasBeenVisible.push(el);
						if (self.config.addClass) {
							$el.addClass(self.config.inViewClass);
						}
						m.emitter.emit(self.config.eventName, el);
						if(self.config.onFirstIn){
							self.config.onFirstIn($el);
						}
					} else{
						if(self.config.onIn){
							self.config.onIn($el);
						}
					}
				} else {
					if (self.config.addClass) {
						$el.removeClass(self.config.inViewCurrentClass);
					}
					if(self.config.onOut){
						self.config.onOut($el);
					}
				}
			});
		}

		// test if specific element is visible
	isVisible($el, partial) {
		var viewTop = utils.$win.scrollTop() - this.config.offsetTop,
			viewBottom = utils.$win.scrollTop() + utils.$win.height() + this.config.offsetBottom,
			_top = $el.offset().top,
			_bottom = _top + $el.outerHeight(),
			compareTop = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;

		//$('.viewPortDebugViewport').css('top',_top ).css('bottom',_bottom);
		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
	}
	unbindEvents() {
		m.emitter.off('scroll', function(){
			self.setVisibleElements();
		});
		m.emitter.off('resize', function(){
			self.setVisibleElements();
		});
		// utils.$win.off({
		// 	'DOMMouseScroll mousewheel scroll ': utils.debounce(function() {
		// 		self.setVisibleElements();
		// 	}, 5),
		// 	'resize': utils.debounce(function() {
		// 		self.setVisibleElements();
		// 	}, 150)
		// }).trigger('scroll');
	}
	update($el) {
		this.$el.removeClass(this.config.inViewinitedClass);
		this.unbindEvents();
        this.$el = $el.find(this.el);
		self.hasBeenVisible = [];
		this.bindEvents();
	}
}
