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
        this.$togglePlay = this.$el.find('.player__toggleplay');
		this.$cover = this.$el.find('.player__playlist-cover-img');
		this.$persons = this.$el.find('.player__author');
		this.$song = this.$el.find('.player__song-title');
		this.$artist = this.$el.find('.player__song-artist');
		this.$playlistTitle = this.$el.find('.player__playlist-title');
		this.$songIndex = this.$el.find('.player__song-index');
		this.$playlistLenght = this.$el.find('.player__playlist-length');
		this.$playlist = this.$el.find('.player__playlist');
		this.songTemplate = '<li class="player__playlist-song"><div class="player__playlist-songtitle">#songtitle</div><div class="player__playlist-songartist">#songartist</div></li>';
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
		m.emitter.on('playerPause', function(data) {
			self.setPlaybutton('paused');
		});
		m.emitter.on('playerPlay', function(data) {
			self.setPlaybutton('playing');
		});
        this.$togglePlay.on({
            click: function(e){
                var status = m.youtubeHandler.togglePlay();
            }
        })
		$(window).keydown(function(e) {
			//space
			if (e.which === 32) {
				e.preventDefault();
				m.youtubeHandler.togglePlay();
			}
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
	setPlaybutton(state){
		if(state == 'playing'){
			this.$togglePlay.find('i').addClass('pause-icon').removeClass('play-icon');
		}
		if(state=='paused'){
			this.$togglePlay.find('i').removeClass('pause-icon').addClass('play-icon');
		}
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
		this.setActiveSong(data.songIndex);
	}
	setActiveSong(index){
		this.$playlist.find('.player__playlist-song').eq(index-1).addClass('player__playlist-song--playing')
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
