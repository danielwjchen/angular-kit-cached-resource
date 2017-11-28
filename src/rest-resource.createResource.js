/**
 * Defines ng-kit.cached-resource.createResource
 */
(function(angular) {
    'use strict';
    angular.module('ng-kit.cached-resource')
    .factory('createResource', function(
        $http,
        $q,
        localStorageService
    ) {
        var CachedResource = function(resourceUrl) {
            this.url = resourceUrl;
        };

        CachedResource.prototype.get = function(params) {
            var key = this.url;
            if (params && typeof params === 'object') {
                var pieces = [];
                Object.keys(params).forEach(function(key) {
                    if (typeof params[key] === 'object') {
                        pieces.push(key + '=' + JSON.stringify(params[key]));
                    } else {
                        pieces.push(key + '=' + params[key]);
                    }
                });
                if (pieces.length > 0) {
                    key += '?' + pieces.join('&');
                }
            }
            var data = localStorageService.get(key);
            var defer = $q.defer();
            var self = this;
            if (data) {
                defer.resolve(data);
            } else {
                var promise = params ? 
                              $http({
                                method: 'GET',
                                url: self.url,
                                params: params,
                              }) : 
                              $http.get(this.url);

                promise.then(function(response) {
                    localStorageService.set(key, response.data);
                    defer.resolve(response.data);
                });
            }
            return defer.promise;
        };

        CachedResource.prototype.refresh = function() {
            var data = localStorageService.get(this.url);
            var defer = $q.defer();
            var self = this;
            $http.get(this.url)
            .then(function(response) {
                localStorageService.set(self.url, response.data);
                defer.resolve(response.data);
            });
            return defer.promise;
        };

        CachedResource.prototype.clear = function() {
            var self = this;
            localStorageService.keys().forEach(function(key) {
                if (key.indexOf(self.url) !== -1) {
                    localStorageService.remove(key);
                }
            });
        };
        return function(resourceUrl) {
            return new CachedResource(resourceUrl);
        };
    });
})(angular);