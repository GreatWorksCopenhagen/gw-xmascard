/**
 * Class: Player
 * Description: Her goes description
 */
import {m, utils} from '../../js/main';
export default class Player {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  constructor(config) { // put in defaults here
      //defaults
    this.config = $.extend({
        el:'.player'
    },config);
    this.$el = $(this.config.el);
    this.$cover = this.$el.find('.player__playlist-cover-img');
    this.$persons = this.$el.find('.player__author');
    this.$song = this.$el.find('.player__song-title');
    this.$playlistTitle = this.$el.find('.player__playlist-title');
    this.$songIndex = this.$el.find('.player__song-index');
    this.$playlistLenght = this.$el.find('.player__playlist-length');
    this.init();

  }
  init() {
    this.bindEvents();
  }
  bindEvents() {
      var self = this;
      m.emitter.on('playerChange', function(data){
        self.updatePlayer(data);
      });
  }
  updatePlayer(data){
      this.$persons.text(data.names);
      this.$song.text(data.title);
      this.$playlistTitle.text(data.playlistTitle);
      this.$songIndex.text(data.songIndex);
      this.$playlistLenght.text(data.playlistLength);
      this.$cover.attr('src', data.cover);
  }
}
