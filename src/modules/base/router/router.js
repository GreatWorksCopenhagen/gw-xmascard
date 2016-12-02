/**
 * Class: Router
 * Description: Her goes description
 */
import {
	m,
	utils
} from 'js/main';
import Page from './page';
export default class Router {
	/**
	 * @param {number} param this is param.
	 * @return {number} this is return.
	 */
	constructor(config) { // put in defaults here
		//defaults
		this.config = $.extend({}, config);
		this.$el = $(this.config.el);
		this.page = Page;
		this.init();
	}
	init() {
		this.defineRoutes();
	}
	defineRoutes() {
		var self = this;
		if(utils.isFrontend){
			this.page.base('/pages');
		} else {
			this.page.base('');
		}
		this.page('/', function(page){
			console.log('helloe');
		});
		// instantiate pages.
		this.page();
	}
}
