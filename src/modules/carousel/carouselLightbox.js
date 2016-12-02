/**
 * Class: CarouselLightbox
 * Description: Her goes description
 */
import * as utils from '../utils/utils';
import './slick-lightbox.min';
import {
  m
} from '../../js/main';
export default class CarouselLightbox {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  constructor(config) { // put in defaults here
    //defaults
    this.config = $.extend({
      slick: {
        dots: true,
        cssEase: 'ease-in-out',
        useCSS: true,
        useTransform: true,
        rtl: $('html[dir=rtl]').length > 0 ? true : false,
        nextArrow: '<i class="slick-next icon icon-arrowRight"></i>',
        prevArrow: '<i class="slick-prev icon icon-arrowLeft"></i>',
        responsive: [{
          breakpoint: 1025,
          settings: {}
        }, {
          breakpoint: 600,
          settings: {
            arrows: false
          }
        }]
      }
    }, config);

    this.$el = $(this.config.el);
    console.log(this.$el);
    this.config.images = this.$el.data('images').split(',') || false;

    // if there are images in the data-images -attr init lightboxcarousel.
    if(this.config.images.length>0){
      this.init();
    } else {
      this.$el.hide();
    }


  }
  init() {
    this.$el.slickLightbox(this.config);
    this.bindEvents();
  }
  bindEvents() {
    // bind your events here.
  }
}
