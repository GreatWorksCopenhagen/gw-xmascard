/**
 * Class: VideoPlayer
 * Description: Her goes description
 */
import {
	m,
	utils
} from '../../js/main';
import Plyr from './plyr';
export default class VideoPlayer {
	/**
	 * @param {number} param this is param.
	 * @return {number} this is return.
	 */
	constructor(config) { // put in defaults here
		//defaults
		this.config = $.extend({
            playerConfig: {
				controls: false
			}
        }, config);
		this.$el = $(this.config.el);
		this.init();

	}
	init() {
        this.createPlayer(this.config);
		this.bindEvents();
	}
	createPlayer(config) {
		config.$el.append('<div class="plyr"><div data-video-id="' + config.id + '" data-type="' + config.type + '"></div></div>');
        this.playerEl = config.$el.find('.plyr')[0];
        this.playerEl.addEventListener('ready', function() {
            if(config.onReady){
                config.onReady();
            }
        });
		this.player = Plyr.setup(this.playerEl, {
			'controls': []
		});
		return this.player[0];
	}
	bindEvents() {
		// bind your events here.
	}
}
