angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/ngflow/ngflow.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div flow-init flow-files-submitted=\"$flow.upload()\"\n     flow-file-added=\"!!{png:1,gif:1,jpg:1,jpeg:1}[$file.getExtension()]\"\n     flow-drop flow-drop-enabled=\"form.flowOptions.dropEnabled\" \n     flow-drag-enter=\"flowClass=\'flow-drag-enter\'\" flow-drag-leave=\"flowClass={}\" ng-class=\"flowClass\"\n     >\n    <div class=\"img-thumbnail\" ng-hide=\"$flow.files.length\">\n      <img ng-show=\"$$value$$\" src=\"$$value$$.url\" />\n      <img ng-hide=\"$$value$$\" src=\"http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image\" />\n    </div>\n    <div >\n    </div>\n    <div class=\"img-thumbnail\" ng-show=\"$flow.files.length\">\n      <img width=\"200\" flow-img=\"$flow.files[0]\" />\n    </div>\n    <div ng-show=\"$flow.files.length\" class=\"progress progress-striped\" ng-class=\"{active: $flow.files[0].isUploading()}\">\n      <div class=\"progress-bar\" role=\"progressbar\"\n           aria-valuenow=\"{{$flow.files[0].progress() * 100}}\"\n           aria-valuemin=\"0\"\n           aria-valuemax=\"100\"\n           ng-style=\"{width: ($flow.files[0].progress() * 100) + \'%\'}\">\n        <span class=\"sr-only\">{{$flow.files[0].progress()}}% Complete</span>\n      </div>\n    </div>\n    <div class=\"buttons\">\n      <button class=\"btn btn-primary\" ng-hide=\"$flow.files.length\" flow-btn flow-attrs=\"{accept:\'image/*\'}\">Select image</button>\n      <button class=\"btn btn-info\" ng-show=\"$flow.files.length\" flow-btn flow-attrs=\"{accept:\'image/*\'}\">Change</button>\n      <button class=\"btn btn-danger\" ng-show=\"$flow.files.length\" ng-click=\"$flow.cancel()\">Remove</button>\n      <span ng-show=\"form.flowOptions.dropEnabled\">\n        <strong>OR</strong>\n        Drag And Drop your images here\n      </span>\n    </div>\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n  </div>\n</div>\n");}]);
angular.module('schemaForm-ngflow', ['schemaForm', 'flow']).config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var ng_flow = function(name, schema, options) {
    if (schema.type === 'string' && schema.format == 'ngflow') {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'ngflow';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

    schemaFormProvider.defaults.string.unshift(ng_flow);

  //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'ngflow',
    'directives/decorators/bootstrap/ngflow/ngflow.html');
    schemaFormDecoratorsProvider.createDirective('ngflow',
    'directives/decorators/bootstrap/ngflow/ngflow.html');
  }]);
