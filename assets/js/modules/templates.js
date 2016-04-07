'use strict';

core.modules.template = (function() {
  var Template = function(config){
    this.name = config.name || '';
    this.path = config.path || '';
    this.raw  = config.raw  || '';
  };

  var Templates = function(){
    this.templates = {};
    this.ready    = false;
  };
  Templates.prototype.Template = Template;
  
  Templates.prototype.add = function(name) {
    this.templates[ name ] = new this.Template({ name: name });
  };

  Templates.prototype.init = function() {

    var templates = ['core-loading'];
    for (var i = templates.length - 1; i >= 0; i--) {
      this.add( templates[i] );
    };

    core.events.publish( "core::templates:load", this.templates );
  };

  Templates.prototype.bindEvents = function() {
    core.events.subscribe("core::templates:load::success", function ( tmp ){
      console.log( 'Load::',tmp );
    });
    core.events.subscribe("core::templates:load::fails",   function ( e ){
      throw new Error(e);
    });
  };
  

  Templates.prototype.start = function() {
    this.init();
    this.bindEvents();
  };

  Templates.prototype.stop = function() {
    // console.log( 'Templates: stop' );
  };

  Templates.prototype.destroy = function() {
    // console.log( 'Templates: destroy' );
  };

  var templates = new Templates();

  core.events.subscribe("core::start:all", function(){
    console.log('core::start:templates');
    templates.start();
  });

  return templates;
}());