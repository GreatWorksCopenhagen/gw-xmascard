/**
 * Class: Player
 * Description: Her goes description
 */
import {
	m,
	utils
} from '../../js/main';
export default class Player {
	/**
	 * @param {number} param this is param.
	 * @return {number} this is return.
	 */
	constructor(config) { // put in defaults here
		//defaults
		this.config = $.extend({
			el: '.player'
		}, config);
		this.$el = $(this.config.el);
        this.$togglePlay = this.$el.find('.player__controls-pauseplay');
		this.$cover = this.$el.find('.player__playlist-cover-img');
		this.$persons = this.$el.find('.player__author');
		this.$song = this.$el.find('.player__song-title');
		this.$artist = this.$el.find('.player__song-artist');
		this.$playlistTitle = this.$el.find('.player__playlist-title');
		this.$songIndex = this.$el.find('.player__song-index');
		this.$playlistLenght = this.$el.find('.player__playlist-length');
		this.$playlist = this.$el.find('.player__playlist');
		this.songTemplate = '<li class="player__playlist-song"><span class="player__playlist-songartist">#songartist</span><span class="player__playlist-songtitle">#songtitle</span></li>';
		this.init();

	}
	init() {
		this.bindEvents();
	}
	bindEvents() {
		var self = this;
		m.emitter.on('playerChange', function(data) {
			self.updatePlayer(data);
		});
        this.$togglePlay.on({
            click: function(e){
                m.youtubeHandler.togglePlay();
            }
        })
		$(window).keydown(function(e) {
			// uparrow
			if (e.which === 38) {
				e.preventDefault();
				self.playPreviousSong();
			}
			//downarrow
			if (e.which === 40) {
				e.preventDefault();
				self.playNextSong();
			}
			// arrowRight
			if (e.which === 39) {
				e.preventDefault();
				self.loadNextPlayList();
			}
			// arrowLeft
			if (e.which === 37) {
				e.preventDefault();
				self.loadPreviousPlayList();
			}
		});
	}
	playPreviousSong() {
		m.youtubeHandler.playPreviousSong();
	}
	playNextSong() {
		m.youtubeHandler.playNextSong();
	}
    playSongInPlaylist(index){
        m.youtubeHandler.playSongInPlaylist(index);
    }
    togglePlay(){
        m.youtubeHandler.togglePlay();
    }
	loadNextPlayList() {
		m.youtubeHandler.loadNextPlayList();
	}
	loadPreviousPlayList() {
		m.youtubeHandler.loadPreviousPlayList();
	}
	updatePlayer(data) {
		this.$persons.text(data.names);
		this.$artist.text(data.tracks[data.songIndex - 1].artist);
		this.$song.text(data.tracks[data.songIndex - 1].title);
		this.$playlistTitle.text(data.playlistTitle);
		this.$songIndex.text(data.songIndex);
		this.$playlistLenght.text(data.playlistLength);
		this.$cover.attr('src', data.cover);
		this.renderSongs(data.tracks);
        this.bindDynamicEvents();
	}
	renderSongs(songs) {
		var i = 0,
			appendString = "";
		while (songs[i]) {
			appendString += this.songTemplate.replace('#songtitle', songs[i].title).replace('#songartist',songs[i].artist);
			i++;
		}
        this.$playlist.html(appendString)
	}
    bindDynamicEvents(){
        var self = this;
        this.$playlist.on({
            click: function(e){
                var songIndex = $(this).index();
                self.playSongInPlaylist(songIndex);
            }
        }, '.player__playlist-song');
    }
}
