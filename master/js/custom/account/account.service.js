/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('eam.account')
        .service('AccountService', AccountService);

    AccountService.$inject = ['$log','$rootScope'];
    function AccountService($log,$rootScope) {

      var service = { 
        books: [],

        addAccount: function(account){
          $log.info('adding department ' + JSON.stringify(department));
          service.books.push(account);
          $rootScope.$broadcast('department.udate');
        }
      }
      return service;
    }
})();