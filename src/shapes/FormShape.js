var Shape = require('./Shape.js');

var FormShape = function( action, id ){
  Shape.call( this, 'form', id );

  this.action = action;
  this.method = '';
  this.encoding = '';
  this.elements = [];

};
/*OOP herency*/
FormShape.prototype = Object.create( Shape.prototype );
FormShape.prototype.contructor = FormShape;
/*OOP herency*/

FormShape.prototype.buildDom = function(){

  if( this.elementName && !this.domElement )
    this.domElement = document.createElement( this.elementName );

  if( this.id )
    this.domElement.id = this.id;

  if( this.classes )
    this.domElement.className += ' ' + this.classes;

  if( this.action )
    this.domElement.action = this.action;

  if( this.method )
    this.domElement.method = this.method;

  if( this.encoding )
    this.domElement.enctype = this.encoding;

};


FormShape.prototype.setAction = function(action){

  if( action )
    this.action = action;

};

FormShape.prototype.setMethod = function(method){

  if( method )
    this.method = method;

};

FormShape.prototype.setEncoding = function(encoding){

  if( encoding )
    this.encoding = encoding;

};

FormShape.prototype.render_ = function(){

};

module.exports = FormShape;
