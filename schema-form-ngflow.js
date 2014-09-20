angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/ngflow/ngflow.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div flow-init flow-files-submitted=\"$flow.upload()\"\n     flow-file-added=\"!!{png:1,gif:1,jpg:1,jpeg:1}[$file.getExtension()]\"\n     flow-drop flow-drop-enabled=\"form.flowOptions.dropEnabled\" \n     flow-drag-enter=\"!!form.flowOptions.dropEnabled ? flowClass=\'flow-drag-enter\' : flowClass={}\" flow-drag-leave=\"flowClass={}\" ng-class=\"flowClass\"\n     flow-file-success=\"form.flowOptions.fileSuccess\"\n     >\n    <div class=\"img-thumbnail\" ng-hide=\"$flow.files.length\" ng-init=\"src=(!!$$value$$ ? $$value$$ : \'data:image/gif;base64,R0lGODdhyACWAOMAAO/v76qqqubm5t3d3bu7u7KystXV1cPDw8zMzAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAyACWAAAE/hDISau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3TAMFBQO4LAUBAQW+K8DCxCoGu73IzSUCwQECAwQBBAIVCMAFCBrRxwDQwQLKvOHV1xbUwQfYEwIHwO3BBBTawu2BA9HGwcMT1b7Vw/Dt3z563xAIrHCQnzsAAf0F6ybhwDdwgAx8OxDQgASN/sKUBWNmwQDIfwBAThRoMYDHCRYJGAhI8eRMf+4OFrgZgCKgaB4PHqg4EoBQbxgBROtlrJu4ofYm0JMQkJk/mOMkTA10Vas1CcakJrXQ1eu/sF4HWhB3NphYlNsmxOWKsWtZtASTdsVb1mhEu3UDX3RLFyVguITzolQKji/GhgXNvhU7OICgsoflJr7Qd2/isgEPGGAruTTjnSZTXw7c1rJpznobf2Y9GYBjxIsJYQbXstfRDJ1luz6t2TDvosSJSpMw4GXG3TtT+hPpEoPJ6R89B7AaUrnolgWwnUQQEKVOAy199mlonPDfr3m/GeUHFjBhAf0SUh28+P12QOIIgDbcPdwgJV+Arf0jnwTwsHOQT/Hs1BcABObjDAcTXhiCOGppKAJI6nnIwQGiKZSViB2YqB+KHtxjjXMsxijjjDTWaOONOOao44489ujjj0AGKeSQRBZp5JFIJqnkkkw26eSTUEYp5ZRUVmnllVhmqeWWXHbp5ZdghinmmGSW6UsEADs=\')\">\n      <img ng-src=\"{{src}}\" />\n    </div>\n    <div class=\"img-thumbnail\" ng-show=\"$flow.files.length\">\n      <img width=\"200\" flow-img=\"$flow.files[0]\" />\n    </div>\n    <div ng-show=\"$flow.files.length\" class=\"progress progress-striped\" ng-class=\"{active: $flow.files[0].isUploading()}\">\n      <div class=\"progress-bar\" role=\"progressbar\"\n           aria-valuenow=\"{{$flow.files[0].progress() * 100}}\"\n           aria-valuemin=\"0\"\n           aria-valuemax=\"100\"\n           ng-style=\"{width: ($flow.files[0].progress() * 100) + \'%\'}\">\n        <span class=\"sr-only\">{{$flow.files[0].progress()}}% Complete</span>\n      </div>\n    </div>\n    <div class=\"buttons\">\n      <button class=\"btn btn-primary\" ng-hide=\"$flow.files.length\" flow-btn flow-attrs=\"{accept:\'image/*\'}\">Select image</button>\n      <button class=\"btn btn-info\" ng-show=\"$flow.files.length\" flow-btn flow-attrs=\"{accept:\'image/*\'}\">Change</button>\n      <button class=\"btn btn-danger\" ng-show=\"$flow.files.length\" ng-click=\"$flow.cancel()\">Remove</button>\n      <span ng-show=\"form.flowOptions.dropEnabled\">\n        <strong>OR</strong>\n        Drag And Drop your images here\n      </span>\n    </div>\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n  </div>\n</div>\n");}]);
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
