(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'eam',
            // or just modules
            'eam.core',
            'eam.sidebar'
            /*...*/
        ]);
})();