/**
 * Class: AlbumViewer
 * Description: Her goes description
 */
import {m, utils} from '../../js/main';
import Carousel from '../carousel/carousel';
export default class AlbumViewer {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  constructor(config) { // put in defaults here
      //defaults
    this.config = $.extend({
        el : '.albumViewer'
    },config);
    this.$el = $(this.config.el);
    this.init();
  }
  init() {
    this.bindEvents();
    this.initCarousel();
  }
  bindEvents() {
      this.$el.on({
          click: function(e){
              var playlistIndex = $(this).data('playlist-index');
              m.router.gotoPage('player');
              m.youtubeHandler.playPlaylistByIndex(playlistIndex);
          }
      }, '.albumViewer__album')
    // bind your events here.
  }
  initCarousel(){
      this.carousel = new Carousel();
  }
}
