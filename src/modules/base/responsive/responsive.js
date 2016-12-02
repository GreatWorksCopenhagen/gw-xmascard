/**
 * Class: Responsive
 * Description: Her goes description
 */
import {m, utils} from 'js/main';
export default class Responsive {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  constructor(config){
    this.config = config;
    this.size = '';
    this.lastSize='';
    this.init();
  }
  init () {
    this.bindEvents();
  }
  bindEvents(){
    var self = this;
    $(window).on({
      'resize': utils.debounce(function () {
        const size = self.getSize();
        if(size !==self.lastSize){
          m.emitter.emit('responsive/sizechange', size);
          self.lastSize = size;
        }
      }, 150)
    }).resize();
  }
  getSize(){
    return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
  }
}
