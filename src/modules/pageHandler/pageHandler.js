/**
 * Class: PageHandler
 * Description: Her goes description
 */
import {
	m,
	utils
} from '../../js/main';
export default class PageHandler {
	/**
	 * @param {number} param this is param.
	 * @return {number} this is return.
	 */
	constructor(config) { // put in defaults here
		//defaults
		this.config = $.extend({
			el: '.pageHandler'
		}, config);
		this.$el = $(this.config.el);
		this.$albumsPage = $('.albumViewer');
		this.$playerPage = $('.playerView');
		this.init();

	}
	init() {
		this.bindEvents();
	}
	bindEvents() {}
	showPage(page, id) {
        var self = this;
		setTimeout(function() {
			if (page == 'albums') {
				//   this.$albumsPage.show();
				//   this.$playerPage.hide();
				m.player.setActive(false);
				m.albumViewer.setActive(true);
				self.$el.removeClass('pageHandler--show-player');
				self.$el.addClass('pageHandler--show-albums');
				m.albumViewer.updateCarousel();
				m.youtubeHandler.pausePlay();
			} else if (page == 'player') {
				m.player.setActive(true);
				m.albumViewer.setActive(false);
				//   this.$albumsPage.hide();
				//   this.$playerPage.show();
				self.$el.removeClass('pageHandler--show-albums');
				self.$el.addClass('pageHandler--show-player');
				if (id) {
					m.youtubeHandler.playPlaylistByIndex(id);
				}
			}
		}, 300);
	}
}
