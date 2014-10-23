angular.module('schemaForm-ngflow', ['schemaForm', 'flow']).config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var ng_flow = function(name, schema, options) {
    if (schema.type === 'object' && schema.format == 'ngflow') {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'ngflow';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

    schemaFormProvider.defaults.object.unshift(ng_flow);

  //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'ngflow',
    'directives/decorators/bootstrap/ngflow/ngflow.html');
    schemaFormDecoratorsProvider.createDirective('ngflow',
    'directives/decorators/bootstrap/ngflow/ngflow.html');
  }]);
