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

  this.buildId();
  this.buildClasses();
  this.buildAttributes();
  this.buildEvents();
  //this.buildChilds();

};

//t is a string with the text for the TextInputShape
TextInputShape.prototype.getVal = function(){
    if( !this.domElement )
      console.error(': first build object DOM ->  buildDom()');

    return this.domElement.value;
};


TextInputShape.prototype.setValue = function( value ){
    if( typeof value !== 'string' )
      console.error(': argument of updateText should be a string literal');

    this.textContent = value;
    this.needsRender = true;
};

TextInputShape.prototype.render_ = function(){

  if( this.textContent )
    this.domElement.value = this.textContent;

};

module.exports = TextInputShape;
