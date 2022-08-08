define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.OptimisedForOrganism = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var OptimisedForOrganism = exports.OptimisedForOrganism = function () {
        function OptimisedForOrganism() {
            _classCallCheck(this, OptimisedForOrganism);

            this.properties_src = 'optimised_for_organism';
        }

        OptimisedForOrganism.prototype.activate = function activate(model) {
            this.model = model;
        };

        return OptimisedForOrganism;
    }();
});