/**
 * Class: PageHandler
 * Description: Her goes description
 */
import {m, utils} from '../../js/main';
export default class PageHandler {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  constructor(config) { // put in defaults here
      //defaults
    this.config = $.extend({
    },config);
    this.$el = $(this.config.el);
    this.$albumsPage = $('.albumViewer');
    this.$playerPage = $('.playerView');
    this.init();

  }
  init() {
    this.bindEvents();
  }
  bindEvents() {
  }
  showPage(page, id){
      if(page == 'albums'){
          this.$albumsPage.show();
          this.$playerPage.hide();
          m.albumViewer.updateCarousel();
      } else if(page == 'player'){
          this.$albumsPage.hide();
          this.$playerPage.show();
          if(id){
              m.youtubeHandler.playPlaylistByIndex(id);
          }
      }
  }
}
