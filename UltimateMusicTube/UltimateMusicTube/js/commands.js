(function () {

    var addAndPlay = function(invokeEvent) {
        WinJS.Navigation.navigate("/pages/videoPlayer/videoPlayer.html", {
            indexInComputersList: invokeEvent.detail.itemIndex,
        })
    };

    var getSelection = function () {
        var listview = document.getElementById("search-results-list").winControl;
        var selectionIndices = listview.selection.getIndices();
        var arr = Data.getSearchResults();
        for (var i = 0; i < selectionIndices.length; i++) {
            ViewModels.addToPlaylist(arr[selectionIndices[i]].title, arr[selectionIndices[i]].thumbnailImgUrl, arr[selectionIndices[i]].sourceUrl);
        }
        //ViewModels.loadPlaylist();
        //var player = document.getElementById("player");
        //Lyrics.getSongLyrics(arr[selectionIndices[0]].title);
        //player.src = arr[selectionIndices[0]].sourceUrl;
        WinJS.Navigation.navigate("/pages/videoPlayer/videoPlayer.html", {
        });
    };

    var playFromPlaylist = function (eventInfo) {
        var player = document.getElementById("player");
        var data = Data.getPlaylistResults();
        var url = data[eventInfo.detail.itemIndex].sourceUrl;
        player.src = url;
    }

    WinJS.Utilities.markSupportedForProcessing(addAndPlay);
    WinJS.Utilities.markSupportedForProcessing(playFromPlaylist);

    WinJS.Namespace.define("Commands", {
        addAndPlay: addAndPlay,
        getSelection: getSelection,
        playFromPlaylist: playFromPlaylist
    });
})()