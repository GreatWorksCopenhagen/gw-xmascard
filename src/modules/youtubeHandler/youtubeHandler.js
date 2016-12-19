/**
 * Class: YoutubeHandler
 * Description: Her goes description
 */
import {
	m,
	utils
} from '../../js/main';
export default class YoutubeHandler {
	/**
	 * @param {number} param this is param.
	 * @return {number} this is return.
	 */
	constructor(config) { // put in defaults here
		//defaults
		this.config = $.extend({
			el: '.videoPlayer'
		}, config);
		this.$el = $(this.config.el);
        this.currentPlayListIndex = 0;
        this.currentPlayList = null;
		this.progressTimer = null;
		this.init();
	}
	init() {
		this.bindEvents();
		this.importApi();
	}
	bindEvents() {
		var self = this;
		// bind your events here.
		window.onYouTubeIframeAPIReady = function() {
			self.playerEl = new YT.Player('player', {
				height: '1',
				width: '1',
				playerVars: {
					listType: 'playlist',
					list: m.data[self.currentPlayListIndex].playlist
				},
				events: {
					'onReady': function(e){
                        self.onPlayerReady(e, self);
						m.emitter.emit('playerReady');
                    },
					'onStateChange': function(e){
                        self.onPlayerStateChange(e, self);
                    }
				}
			});
		}
	}
	playPlaylistByIndex(index){
		this.currentPlayListIndex = index;
		var playlistID = m.data[index].playlist;
		this.playerLoadPlayList(playlistID);
	}
	importApi() {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	onPlayerReady(event, scope) {
        this.player = event.target;
		// event.target.playVideo();
        this.currentPlayList = this.player.getPlaylist();
	}
	onPlayerStateChange(event, self) {
        if(event.data == -1){ // unstarted
            var songIndexInPlaylist = this.getPlayList().indexOf(this.player.getVideoData()['video_id']),
                    playListLength = this.getPlayList().length - 1;
            self.currentSong = self.player.getVideoData();
            var songObject = $.extend(self.currentSong, m.data[self.currentPlayListIndex]);
            $.extend(songObject, {songIndex:songIndexInPlaylist+1, playlistLength: playListLength+1});
            m.emitter.emit('playerChange', songObject);
			// m.emitter.emit('playerPause');
        } else if(event.data === 0) { // ended
			self.stopProgressTimer();
			this.playNextSong();
        } else if(event.data === 2){ // paused
			self.stopProgressTimer();
			m.emitter.emit('playerPause');
		} else if(event.data === 1){ // playing
			self.startProgressTimer();
			m.emitter.emit('playerPlay');
		}
	}
	startProgressTimer(){
		var self = this;
		var playerTotalTime = self.player.getDuration();
		this.progressTimer = setInterval(function() {
	        var playerCurrentTime = self.player.getCurrentTime();
	        var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
			m.emitter.emit('youtubeProgressUpdate', playerTimeDifference);
      }, 1000);
	}
	stopProgressTimer(){
		 clearTimeout(this.progressTimer);
	}
    loadNextPlayList(){
        this.currentPlayListIndex++;
        var next = this.getSafePlaylist(this.currentPlayListIndex);
		m.router.gotoUrl('/player/'+next);
        // this.playerLoadPlayList(next);
    }
    loadPreviousPlayList(){
        this.currentPlayListIndex--;
		var prev = this.getSafePlaylist(this.currentPlayListIndex);
		m.router.gotoUrl('/player/'+prev);
        // var prev = this.getPlayListByIndex(this.currentPlayListIndex);
        // this.playerLoadPlayList(prev);
    }
	playerLoadPlayList(id) {
		var self = this;
		if(this.player){
			this.player.loadPlaylist({list: id});
		} else {
			m.emitter.on('playerReady', function(){
				self.player.loadPlaylist({list: id});

			});
		}
	}
    getPlayList(){
        return this.player.getPlaylist();
    }
	playSongInPlaylist(index){
		this.player.playVideoAt(index)
	}
	togglePlay(){
		if(this.player.getPlayerState()==1){
			this.player.pauseVideo();
			return 'paused';
		} else if(this.player.getPlayerState()==2){
			this.player.playVideo();
			return 'playing';
		} else {
			this.player.playVideo();
			return 'playing';
		}
	}
	pausePlay(){
		if(this.player){
			this.player.pauseVideo();
		}
	}
    playNextSong(){
        if(this.isSongValid('next')){
            this.player.nextVideo();
        } else{
            this.loadNextPlayList();
        }
    }
    playPreviousSong(){
        if(this.isSongValid('prev')){
            this.player.previousVideo();
        } else{
            this.loadPreviousPlayList();
        }
    }
    getPlayListByIndex(id){
        if(id > m.data.length-1){
            this.currentPlayListIndex = 0;
        } else if(id <0){
            this.currentPlayListIndex = m.data.length-1;
        }
        id = this.currentPlayListIndex;
        return m.data[id].playlist;
    }
	getSafePlaylist(id){
		if(id > m.data.length-1){
            this.currentPlayListIndex = 0;
        } else if(id <0){
            this.currentPlayListIndex = m.data.length-1;
        }
		return this.currentPlayListIndex;
	}
    isSongValid(direction){
        var songIndexInPlaylist = this.getPlayList().indexOf(this.player.getVideoData()['video_id']),
                playListLength = this.getPlayList().length - 1;
            if(direction == 'next'){
                songIndexInPlaylist++;
            } else if(direction == 'prev'){
                songIndexInPlaylist--;
            }
            if(songIndexInPlaylist>=0 && songIndexInPlaylist<=playListLength){
                return true;
            } else {
                return false;
            }
    }
}
