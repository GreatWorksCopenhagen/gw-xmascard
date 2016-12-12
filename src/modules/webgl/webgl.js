/**
 * Class: Webgl
 * Description: Her goes description
 */
import {m, utils} from '../../js/main';
// import threejs;
export default class Webgl {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  constructor(config) { // put in defaults here
      //defaults
    this.config = $.extend({
      el:'.webgl'
    },config);

    this.$el = $(this.config.el);

    this.init();

  }
  init() {
    console.log('Webgl inited');
    this.bindEvents();
  }
  bindEvents() {
    // bind your events here.
  }
}
