/**=========================================================
 * Module: config.js
 * eam routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('eam.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){
        
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/eam/singleview');

        // 
        // eamlication Routes
        // -----------------------------------   
        $stateProvider
          .state('eam', {
              url: '/eam',
              abstract: true,
              templateUrl: helper.basepath('eam.html'),
              resolve: helper.resolveFor('modernizr', 'icons')
          })
          .state('eam.singleview', {
              url: '/singleview',
              title: 'Single View',
              templateUrl: helper.basepath('singleview.html')
          })
          .state('eam.submenu', {
              url: '/submenu',
              title: 'Submenu',
              templateUrl: helper.basepath('submenu.html')
          })
           .state('eam.accounts-registration', {
              url: '/accounts-registration',
              title: 'Account Registration View',
              templateUrl: helper.basepath('account-registration.html')
          })
          .state('eam.departments', {
              url: '/departments',
              title: 'Departments View',
              templateUrl: helper.basepath('departments.html')
          })
           .state('eam.form-standard', {
              url: '/form-standard',
              title: 'Form Standard',
              templateUrl: helper.basepath('form-standard.html')
          })
          .state('eam.form-extended', {
              url: '/form-extended',
              title: 'Form Extended',
              templateUrl: helper.basepath('form-extended.html'),
              resolve: helper.resolveFor('colorpicker.module', 'codemirror', 'moment', 'taginput','inputmask','localytics.directives', 'ui.bootstrap-slider', 'ngWig', 'filestyle', 'textAngular')
          })
          .state('eam.form-validation', {
              url: '/form-validation',
              title: 'Form Validation',
              templateUrl: helper.basepath('form-validation.html'),
              resolve: helper.resolveFor('ui.select', 'taginput','inputmask','localytics.directives')
          })
          .state('eam.form-parsley', {
              url: '/form-parsley',
              title: 'Form Validation - Parsley',
              templateUrl: helper.basepath('form-parsley.html'),
              resolve: helper.resolveFor('parsley')
          })
          .state('eam.form-wizard', {
              url: '/form-wizard',
              title: 'Form Wizard',
              templateUrl: helper.basepath('form-wizard.html'),
              resolve: helper.resolveFor('parsley')
          })
          .state('eam.form-upload', {
              url: '/form-upload',
              title: 'Form upload',
              templateUrl: helper.basepath('form-upload.html'),
              resolve: helper.resolveFor('angularFileUpload', 'filestyle')
          })
          .state('eam.form-xeditable', {
              url: '/form-xeditable',
              templateUrl: helper.basepath('form-xeditable.html'),
              resolve: helper.resolveFor('xeditable')
          })
          .state('eam.form-imagecrop', {
              url: '/form-imagecrop',
              templateUrl: helper.basepath('form-imagecrop.html'),
              resolve: helper.resolveFor('ngImgCrop', 'filestyle')
          })
          .state('eam.form-uiselect', {
              url: '/form-uiselect',
              templateUrl: helper.basepath('form-uiselect.html'),
              controller: 'uiSelectController',
              controllerAs: 'uisel',
              resolve: helper.resolveFor('ui.select')
          })
          .state('eam.table-standard', {
              url: '/table-standard',
              title: 'Table Standard',
              templateUrl: helper.basepath('table-standard.html')
          })
          .state('eam.table-extended', {
              url: '/table-extended',
              title: 'Table Extended',
              templateUrl: helper.basepath('table-extended.html')
          })
          .state('eam.table-datatable', {
              url: '/table-datatable',
              title: 'Table Datatable',
              templateUrl: helper.basepath('table-datatable.html'),
              resolve: helper.resolveFor('datatables')
          })
          .state('eam.table-xeditable', {
              url: '/table-xeditable',
              templateUrl: helper.basepath('table-xeditable.html'),
              resolve: helper.resolveFor('xeditable')
          })
          .state('eam.table-ngtable', {
              url: '/table-ngtable',
              templateUrl: helper.basepath('table-ngtable.html'),
              resolve: helper.resolveFor('ngTable', 'ngTableExport')
          })
          .state('eam.table-nggrid', {
              url: '/table-nggrid',
              templateUrl: helper.basepath('table-ng-grid.html'),
              resolve: helper.resolveFor('ngGrid')
          })
          .state('eam.table-uigrid', {
              url: '/table-uigrid',
              templateUrl: helper.basepath('table-uigrid.html'),
              resolve: helper.resolveFor('ui.grid')
          })
          .state('eam.table-angulargrid', {
              url: '/table-angulargrid',
              templateUrl: helper.basepath('table-angulargrid.html'),
              resolve: helper.resolveFor('angularGrid')
          })    
          ;

    } // routesConfig

})();

