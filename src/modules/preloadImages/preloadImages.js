/**
 * Class: PreloadImages
 * Description: Her goes description
 */
import {m, utils} from '../../js/main';
export default class PreloadImages {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  constructor(config) { // put in defaults here
      //defaults
    this.config = $.extend({
    },config);
    this.$el = $(this.config.el);
    this.imagesArr = [''];

    this.init();

  }
  init() {
    // this.bindEvents();
    this.createImagesArr();
  }
  createImagesArr(){
      var self = this;
      $.each(m.data, function(i, el){
          self.imagesArr.push(el.cover);
      })
      this.preload(self.imagesArr);
  }
  preload(images) {
      var i = 0;
      for (i; i < images.length; i++) {
          images[i] = new Image()
          images[i].src = images[i];
      }
  }
}
