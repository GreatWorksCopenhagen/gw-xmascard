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
    this.$persons = this.$el.find('.persons');
    this.$song = this.$el.find('.song-title');
    this.$playlistTitle = this.$el.find('.playlist-title');
    this.$songIndex = this.$el.find('.song-index');
    this.$playlistLenght = this.$el.find('.playlist-length');
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
  }
}
