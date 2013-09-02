(function () {

    var applicationData = Windows.Storage.ApplicationData.current;
    var localFolder = applicationData.localFolder;

    var savePlaylist = function (savePicker) {

        var data = Data.getPlaylistResults();
        var playlist = {
            videos: []
        };

        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            playlist.videos.push({ 
                "title" : item.title,
                "thumbnailImgUrl" : item.thumbnailImgUrl,
                "sourceUrl" : item.sourceUrl 
            });    
        }

        savePicker.pickSaveFileAsync().then(function (file) {
            var contentToWrite = JSON.stringify(playlist.videos);
            if (file.fileType == ".json") {
                Windows.Storage.FileIO.writeTextAsync(file, contentToWrite);
            }
        });
        
        //localFolder.createFileAsync("nekavplaylist.txt", Windows.Storage.CreationCollisionOption.replaceExisting).done(
        //    function (file) {
        //        Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(playlist.videos));
        //    });       
    }
  
    //var loadPlaylistVideos = function (videoTitle, duration, videoUrl) {
    //    var video = VideoEntries.newVideo(videoName, duration, videoUrl);
    //    VideoEntries.videosList.push(video);
    //    VideoEntries.videosArr.push(video);
    //}

    var loadPlaylist = function (storageFile) {
        Windows.Storage.FileIO.readTextAsync(storageFile).done(function (content) {
            var loadedPlaylistData = JSON.parse(content);
            Data.clearPlaylistModels();

            for (var i = 0; i < loadedPlaylistData.length; i++) {
                var title = loadedPlaylistData[i].title;
                var thumbnailImgUrl = loadedPlaylistData[i].thumbnailImgUrl;
                var sourceUrl = loadedPlaylistData[i].sourceUrl;
                ViewModels.addToPlaylist(title, thumbnailImgUrl, sourceUrl);
            }
            ViewModels.loadPlaylist();
            var currTitle = loadedPlaylistData[0].title;
            var currUrl = loadedPlaylistData[0].sourceUrl;
            CurrentVideo.Set(currTitle, currUrl);
        });
    }
        
    //    //storageFile.
    //    //var fileUrl = URL.createObjectURL(storageFile);
    //    //var fileName = storageFile.displayName;
    //    //storageFile.properties.getVideoPropertiesAsync().then(function (properties) {
    //    //    var duration = parseDuration(properties.duration);
    //    //    addVideoListEntry(fileName, duration, fileUrl);
    //    //});
    //}

    WinJS.Namespace.define("FileSystem", {
        savePlaylist: savePlaylist,
        loadPlaylist: loadPlaylist
    });
}())