
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('eam.account')
        .controller('AccountController','AccountService', AccountController);

    AccountController.$inject = ['$log'];
    function AccountController($log,AccountService) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');

          var accountObj={ title: "The Hobbit", author: "J.R.R Tolkien" }
          AccountService.addAccount(accountObjs);
        }
    }
})();
