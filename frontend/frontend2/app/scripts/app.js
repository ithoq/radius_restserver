'use strict';

/**
 * @ngdoc overview
 * @name frontend2App
 * @description
 * # frontend2App
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'config',
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'angular-storage',
    'djangoRESTAuth',
    'amChartsDirective',
    'ordinal'
  ])
  .service('urls',function(ENV) { this.API = ENV.API_BASE + ENV.API_EXTENSION;})
  .config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        resolve: {
            authenticated: function(djangoAuth, $state) {
                return djangoAuth.authenticationStatus(true)
                    .then(function() {
                        console.log('Already logged in!');
                        $state.go('main.dashboard');
                    }, function() {
                        return;
                });
            },
        },
        controller: 'LoginCtrl'
      })
      .state('logout', {
        url: '/logout',
        controller: "LogoutCtrl",
      })

    // Main abstract state
    .state('main', {
        abstract: true,
        templateUrl: "views/main.html",
        resolve: {
            authenticated: function(djangoAuth) {
                return djangoAuth.authenticationStatus(true);
            },
        },
    });

  })
  .run(function($rootScope, djangoAuth, $state, ENV) {
        djangoAuth.initialize(ENV.API_BASE, false);

      djangoAuth.authenticationStatus(true)
        .then(function() {
          $rootScope.login_status = true;
        }, function() {
          $rootScope.login_status = false;
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'UserNotLoggedIn') {
                event.preventDefault();
                console.log(error);
                $state.go('login');
            }
        });

  });
