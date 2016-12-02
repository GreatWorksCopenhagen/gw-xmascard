/**
 * Class: Picture
 * Description: Her goes description
 */
import {m, utils} from 'js/main';
import './picturefill.min';
export default class Picture {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  constructor(config){
    this.config = config;
    this.init();
    this.$win = $(window);
  }
  init () {
    // this.bindEvents();
  }
  loadPicture($el){
      let $image;
      let $picture = $el.hasClass('picture') ? $el : $el.find('.picture');
      // is there an picture
      if( $picture.length >=0 ) {

        $image = $picture.find('.picture__image');
        // does the picture have a pseudo image
        if($image.length>0){
          // copy relevant attr's
          const classes = $image.attr('class');
          const srcset = $image.attr('data-srcset');
          const alt = $image.attr('alt');
          // create new image-tag
          let $img = $('<img>', {
            srcset :srcset,
            alt : alt
          }).addClass(classes);
          // remove old image-tag
          $image.remove();

          this.$win.trigger('scroll');
          $img.load(function (e) {
            $picture.addClass('picture--loaded');
            // notify
            m.emitter.emit('picture/update', $img);
            picturefill({
              reevaluate: true,
              elements: [$img[0]]
            });
          });
          $el.append($img);
        }
      }
  }
  bindEvents(){
    var self = this;
  }
  replaceTag (element, tagName, withDataAndEvents, deepWithDataAndEvents) {
      var newTag = $("<" + tagName + ">")[0];
      // From [Stackoverflow: Copy all Attributes](http://stackoverflow.com/a/6753486/2096729)
      $.each(element.attributes, function() {
        newTag.setAttribute(this.name, this.value);
      });
      $(element).children().clone(withDataAndEvents, deepWithDataAndEvents).appendTo(newTag);
      return newTag;
  }
}
