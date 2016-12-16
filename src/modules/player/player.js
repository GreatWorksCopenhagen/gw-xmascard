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
			el: '.player',
			minPinRotation: 21,
			maxPinRotation: 44
		}, config);
		this.$el = $(this.config.el);
		this.$playerLeft = this.$el.find('.player__left');
		this.$togglePlay = this.$el.find('.player__toggleplay');
		this.$cover = this.$el.find('.player__playlist-cover-img');
		this.$persons = this.$el.find('.player__author');
		this.$song = this.$el.find('.player__song-title');
		this.$artist = this.$el.find('.player__song-artist');
		this.$albumcover = this.$el.find('.player__base-album-img');
		this.$progressBar = this.$el.find('.player_progress');
		this.$progressBarIndicator = this.$el.find('.player_progress-indicator');
		this.$playlistTitle = this.$el.find('.player__playlist-title');
		this.$songIndex = this.$el.find('.player__song-index');
		this.$playlistLenght = this.$el.find('.player__playlist-length');
		this.$playlist = this.$el.find('.player__playlist');
		this.songTemplate = '<li class="player__playlist-song"><div class="player__playlist-songtitle">#songtitle</div><div class="player__playlist-songartist">#songartist</div></li>';
		this.$playerPin = this.$el.find('.player__base-pin-img');
		this.playerActive = false;
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
			self.$el.removeClass('player--playing');
			self.setPlaybutton('paused');
		});
		m.emitter.on('playerPlay', function(data) {
			self.$el.addClass('player--playing');
			self.setPlaybutton('playing');
		});
		m.emitter.on('youtubeProgressUpdate', function(progress) {
			self.updateProgressBar(progress);
		})
		this.$togglePlay.on({
			click: function(e) {
				var status = m.youtubeHandler.togglePlay();
			}
		})

		m.emitter.on('keyEvent', function(key) {
			if (self.playerActive) {
				switch (key) {
					case 'space':
						m.youtubeHandler.togglePlay();
						break;
					case 'up':
						self.playPreviousSong();
						break;
					case 'down':
						self.playNextSong();
						break;
					case 'right':
						self.loadNextPlayList();
						break;
					case 'left':
						self.loadPreviousPlayList();
						break;
					default:
				}
			}
		});
	}
	setActive(activate) {
		if (activate) {
			this.playerActive = true;
		} else {
			this.playerActive = false;
		}
	}
	updateProgressBar(progress) {
		this.$progressBarIndicator.css('width', parseInt(progress) + "%");
	}
	setPlaybutton(state) {
		if (state == 'playing') {
			this.$togglePlay.find('i').addClass('pause-icon').removeClass('play-icon');
		}
		if (state == 'paused') {
			this.$togglePlay.find('i').removeClass('pause-icon').addClass('play-icon');
		}
	}
	playPreviousSong() {
		m.youtubeHandler.playPreviousSong();
	}
	playNextSong() {
		m.youtubeHandler.playNextSong();
	}
	playSongInPlaylist(index) {
		m.youtubeHandler.playSongInPlaylist(index);
	}
	togglePlay() {
			m.youtubeHandler.togglePlay();
		}
		// animatePlayList(){
		// 	var $songs = this.$playlist.find('.player__playlist-song');
		// 	m.TweenMax.staggerTo($songs, 1, {x:'110%', ease:Power2.easeOut});
		// }
	loadNextPlayList() {
		m.youtubeHandler.loadNextPlayList();
		// this.animatePlayList();
	}
	loadPreviousPlayList() {
		m.youtubeHandler.loadPreviousPlayList();
		// this.animatePlayList();
	}
	updatePlayer(data) {
		var self = this;
		self.$persons.text(data.names);
		self.$artist.text(data.tracks[data.songIndex - 1].artist);
		self.$song.text(data.tracks[data.songIndex - 1].title);
		self.$playlistTitle.text(data.playlistTitle);
		self.$songIndex.text(data.songIndex);
		self.$playlistLenght.text(data.playlistLength);
		self.$cover.attr('src', data.cover);
		self.$albumcover.attr('src', data.cover);
		self.renderSongs(data.tracks);
		self.bindDynamicEvents();
		self.setActiveSong(data.songIndex);
		self.setPin(data.songIndex / data.playlistLength);
	}
	setActiveSong(index) {
		this.$playlist.find('.player__playlist-song').eq(index - 1).addClass('player__playlist-song--playing')
	}
	renderSongs(songs) {
		var i = 0,
			appendString = "";
		while (songs[i]) {
			appendString += this.songTemplate.replace('#songtitle', songs[i].title).replace('#songartist', songs[i].artist);
			i++;
		}
		this.$playlist.html(appendString)
	}
	setPin(songIndexPercent) {
		var degVal = ((this.config.maxPinRotation - this.config.minPinRotation) * songIndexPercent) + this.config.minPinRotation;
		var transformString = 'translate(194%, -55%) rotate(' + degVal + 'deg)';
		this.setTransform(this.$playerPin, transformString);
	}
	setTransform($el, transform) {
		$el[0].style.transform = transform;
		$el[0].style.webkitTransform = transform;
		$el[0].style.mozTransform = transform;
		$el[0].style.oTransform = transform;
		$el[0].style.webkitTransform = transform;
	}
	bindDynamicEvents() {
		var self = this;
		this.$playlist.off().on({
			click: function(e) {
				var songIndex = $(this).index();
				self.playSongInPlaylist(songIndex);
			}
		}, '.player__playlist-song');
	}
}
