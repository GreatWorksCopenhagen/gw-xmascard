/**
 * Class: Intro
 * Description: Her goes description
 */
import {m, utils} from '../../js/main';
export default class Intro {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  constructor(config) { // put in defaults here
      //defaults
    this.config = $.extend({
    },config);
    this.$el = $(this.config.el);
    this.init();

  }
  init() {
    console.log('Intro inited');
    this.bindEvents();
  }
  bindEvents() {
    // bind your events here.
  }
}
