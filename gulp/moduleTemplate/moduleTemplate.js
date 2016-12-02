/**
 * Class: <%= _.capitalize(name) %>
 * Description: Her goes description
 */
import {m, utils} from '../../js/main';
export default class <%= _.capitalize(name) %> {
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
    console.log('<%= _.capitalize(name) %> inited');
    this.bindEvents();
  }
  bindEvents() {
    // bind your events here.
  }
}
