define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SbolDesign = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var SbolDesign = exports.SbolDesign = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.BindingEngine), _dec(_class = function () {
        function SbolDesign(bindingEngine) {
            _classCallCheck(this, SbolDesign);

            this.properties_src = 'll_sbol';

            this.be = bindingEngine;
        }

        SbolDesign.prototype.activate = function activate(model) {
            this.model = model;
            if (!this.model.properties[this.properties_src]) {
                this.model.properties[this.properties_src] = {};
            }
            this.data = this.model.properties[this.properties_src];
        };

        SbolDesign.prototype.updateDesign = function updateDesign(event) {
            var _this = this;

            var fileToRead = event.originalTarget.files[0];
            var name = fileToRead.name.split('.');
            var ext = name[name.length - 1].toLowerCase();
            if (ext == 'sbol') {
                this.data.design_file_extension = 'csv';
            } else if (['gb', 'genbank', 'gen'].indexOf(ext) !== -1) {
                this.data.design_file_extension = 'gb';
            } else {
                this.data.design_file_extension = 'csv';
            }
            var reader = new FileReader();
            reader.onload = function (fileData) {
                _this.data.design_file = fileData.target.result;
            };
            reader.readAsText(fileToRead);
        };

        return SbolDesign;
    }()) || _class);
});