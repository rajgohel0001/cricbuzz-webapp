import fetchIntercept from 'fetch-intercept';
import React, { Component }  from 'react';
 
export const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        console.log("intercepter request call");
        // Loader.show();
        document.body.classList.add('load');
        return ([url, config]);
    },
 
    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        console.log("intercepter request error call");
        return Promise.reject(error);
    },
 
    response: function (response) {
        // Modify the reponse object
        console.log("intercepter response call");
        document.body.classList.remove('load');
        return response;
    },
 
    responseError: function (error) {
        // Handle an fetch error
        console.log("intercepter response error call");
        return Promise.reject(error);
    }
});

// Call fetch to see your interceptors in action.
// fetch('http://google.com');
 
// Unregister your interceptor
// unregister();