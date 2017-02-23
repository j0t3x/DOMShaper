var Shape = require('./Shape.js');

var TextInputShape = function( id ){
  Shape.call( this, 'input', id );
  this.textContent = '';
  this.name = '';
};
/*OOP herency*/
TextInputShape.prototype = Object.create( Shape.prototype );
TextInputShape.prototype.contructor = TextInputShape;
/*OOP herency*/

TextInputShape.prototype.buildDom = function(){

  if( this.elementName && !this.domElement )
    this.domElement = document.createElement( this.elementName );

  this.domElement.type = 'text';
  this.domElement.value = this.textContent;

  if( this.id )
    this.domElement.id = this.id;

  if( this.classes )
    this.domElement.className += ' ' + this.classes;

  if( this.name )
      this.domElement.setAttribute('name', this.name);

  for( var attr in this.attributes){
    this.domElement.setAttribute(attr,this.attributes[attr]);
  }

};

//t is a string with the text for the TextInputShape
TextInputShape.prototype.getVal = function(){
    if( !this.domElement )
      console.error(': first build object DOM ->  buildDom()');

    return this.domElement.value;
};

//t is a string with the text for the TextInputShape
TextInputShape.prototype.setValue = function( value ){
    if( typeof value !== 'string' )
      console.error(': argument of updateText should be a string literal');

    this.textContent = value;
};

TextInputShape.prototype.render_ = function(){

  if( this.textContent )
    this.domElement.value = this.textContent;

};

TextInputShape.prototype.setName = function(){

  //you can set several classes like this 'clas1 class2 class3'

  for ( var i = 0; i < arguments.length ; i++ ) {

    if( typeof arguments[i] !== 'string' )
      console.error(': Name should be a string literal');

    this.name = arguments[i];
  }

};

module.exports = TextInputShape;
