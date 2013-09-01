(function () {

    var getSongLyrics = function (songTitle) {

        songTitle = songTitle.replace(/ *\([^)]*\) */g, "");
        var dashIndex = songTitle.indexOf('-');
        var artist = "";
        var song= "";
        if (dashIndex != -1) {
            song = songTitle.substring(dashIndex + 1, songTitle.length);
            artist = songTitle.substring(0, dashIndex);
        }
        else{

            song = songTitle;
        }

        var lyricsContainer = document.getElementById("lyrics");
        var songLyrics = "";
        var mainUrl = "http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?";
        
        WinJS.xhr({
            url: mainUrl + "artist=" + artist + "&song=" + song,
            responseType: "document"

        }).then(function (result) {
            return new WinJS.Promise(function (complete, error) {
              
                try {
                    var lyricsXML = result.responseXML;
                    songLyrics = lyricsXML.getElementsByTagName("Lyric")[0].childNodes[0].nodeValue;
                    complete(songLyrics);
                }
                catch (e) {
                    error("Lyrics not found");
                }
            }).then(function complete(lyr) {
                lyricsContainer.innerText = lyr;
            }, function error(err) {
                lyricsContainer.innerText = err;
            });

        }, function (error) {
            lyricsContainer.innerText = "Lyrics not found";
        });
        
    };   

    WinJS.Namespace.define("Lyrics", {
        getSongLyrics: getSongLyrics
    })
})()