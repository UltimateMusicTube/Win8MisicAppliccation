// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    var nav = WinJS.Navigation;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            var shareImageHandler = function (event) {
                var dataRequest = event.request;

                dataRequest.data.properties.title = "Duck Enterprises Logo";
                dataRequest.data.properties.description = "The Logo of Duck Enterprises";
                dataRequest.data.properties.thumbnail =
                    Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(
                        new Windows.Foundation.Uri("ms-appx:///images/duck-logo-thumbnail.bmp")
                    );

                var bitmapStream =
                    Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(
                        new Windows.Foundation.Uri("ms-appx:///images/duck-logo.bmp")
                    );

                dataRequest.data.setBitmap(bitmapStream);
            };

            dataTransferManager.addEventListener("datarequested", shareImageHandler);

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                WinJS.Application.onsettings = function(e) {
                    e.detail.applicationcommands = {
                         "searchOptions": {
                             title: "Search Options",
                             href: "/pages/settings/searchOptions.html"
                         }
                    };
                    WinJS.UI.SettingsFlyout.populateSettings(e);
                };

                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
