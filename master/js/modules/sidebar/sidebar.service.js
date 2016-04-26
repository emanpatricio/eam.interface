(function() {
    'use strict';

    angular
        .module('eam.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
           

          onError = onError || function(err) { alert('Failure loading menu: ' + err); };

          $http.get(menuURL).success(onReady).error(onError);

          // $http.get({
          //    method: "GET",
          //    url : menuURL
          // }).then(function success(response){
          //   console.log("success: " +response);
          // }, function myError(response){
          //   console.log("failed : " + JSON.stringify(response));
          // });
        }
    }
})();