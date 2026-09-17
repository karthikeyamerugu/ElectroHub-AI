"use strict";


const CACHE_NAME =
    "electrohub-ai-v2";


const APP_FILES = [

    "./",

    "./index.html",

    "./style.css",

    "./app.js",

    "./manifest.json",

    "./icon-192.png",

    "./icon-512.png"

];


self.addEventListener(
    "install",
    function(event) {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(function(cache) {

                    return cache.addAll(
                        APP_FILES
                    );

                })

        );


        self.skipWaiting();

    }
);


self.addEventListener(
    "activate",
    function(event) {

        event.waitUntil(

            caches
                .keys()
                .then(function(cacheNames) {

                    return Promise.all(

                        cacheNames.map(
                            function(cacheName) {

                                if (
                                    cacheName !==
                                    CACHE_NAME
                                ) {

                                    return caches.delete(
                                        cacheName
                                    );

                                }

                            }
                        )

                    );

                })

        );


        self.clients.claim();

    }
);


self.addEventListener(
    "fetch",
    function(event) {

        const request =
            event.request;


        /*
         * The AI request uses POST.
         * We don't cache API requests.
         */

        if (
            request.method !== "GET"
        ) {

            return;

        }


        /*
         * Only cache files belonging
         * to this website.
         */

        const url =
            new URL(
                request.url
            );


        if (
            url.origin !==
            self.location.origin
        ) {

            return;

        }


        event.respondWith(

            caches
                .match(request)
                .then(function(cachedResponse) {

                    if (cachedResponse) {

                        return cachedResponse;

                    }


                    return fetch(request)
                        .then(function(response) {

                            if (
                                !response ||
                                response.status !== 200 ||
                                response.type !== "basic"
                            ) {

                                return response;

                            }


                            const responseClone =
                                response.clone();


                            caches
                                .open(
                                    CACHE_NAME
                                )
                                .then(
                                    function(cache) {

                                        cache.put(
                                            request,
                                            responseClone
                                        );

                                    }
                                );


                            return response;

                        });

                })

        );

    }
);
