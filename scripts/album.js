var setSong = function (songNumber) {
	if (currentSoundFile) {
         currentSoundFile.stop();
     }
		setSong(songNumber) = parseInt(songNumber);
		currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
		currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
		 	formats: [ 'mp3' ],
         	preload: true
		});

};

var getSongNumberCell = function (number) {
	return $('.song-item-number[data-song-number="' + number + '"]');
};
var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '  <td class="song-item-title">' + songName + '</td>' + '  <td class="song-item-duration">' + songLength + '</td>' + '</tr>';

    var $row = $(template);
    var clickHandler = function () {
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (setSong(songNumber) !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(setSong(songNumber););
        }
        if (setSong(songNumber) !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            setSong(songNumber);
			currentSoundFile.play();
			$(this).html(pauseButtonTemplate);			
			currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
			updatePlayerBarSong();
        } else if (setSong(songNumber) == songNumber) {
            if (currentSoundFile.isPaused()) {
+                $(this).html(pauseButtonTemplate);
+                $('.main-controls .play-pause').html(playerBarPauseButton);
+                currentSoundFile.play();
+            } else {
+                $(this).html(playButtonTemplate);
+                $('.main-controls .play-pause').html(playerBarPlayButton);
+                currentSoundFile.pause();   
+            }
        }
   };
	

    var onHover = function (event) {
        var songNumberCell = parseInt($(this).find('.song-item-number'));
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== setSong(songNumber)) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function (event) {
        var songNumberCell = parseInt($(this).find('.song-item-number'));
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== setSong(songNumber)) {
            songNumberCell.html(songNumber);
        }
    console.log("songNumber type is " + typeof songNumber + "\n and setSong(songNumber); type is " + typeof setSong(songNumber);

	};
    // #1
    $row.find('.song-item-number').click(clickHandler);
    // #2
    $row.hover(onHover, offHover);
    // #3
    return $row;

};

var setCurrentAlbum = function (album) {
	currentAlbum = album
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
	
	$albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);

    };
};

var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };
var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    setSong(songNumber) = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};
var previousSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're decrement the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0 ) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    setSong(songNumber) = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
	$('.main-controls .play-pause').html(playerBarPauseButton);


};    //    var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
    //    var songRows = document.getElementsByClassName('album-view-song-item');

   

//album button templates 
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
// store state of current playing song
var currentAlbum = null;
var setSong(songNumber) = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
	
//play bar play-pause buttons
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function () {
    setCurrentAlbum(albumPicasso);
    var albums = [albumPicasso, albumMarconi, albumShawn];
    var index = 1;
    $('.album-cover-art').click(function () {
        setCurrentAlbum(albums[index]);
        index++
        if (index == albums.length) {
            index = 0;
        }
    });

	$previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
