var Shape = require('./Shape.js');

var ButtonShape = function( buttonText, id ){
  Shape.call( this, 'button', id );
  this.textContent = buttonText;
};
/*OOP herency*/
ButtonShape.prototype = Object.create( Shape.prototype );
ButtonShape.prototype.contructor = ButtonShape;
/*OOP herency*/

ButtonShape.prototype.buildDom = function(){

  if( this.elementName && !this.domElement )
    this.domElement = document.createElement( this.elementName );

  this.buildId();
  this.buildClasses();
  this.buildAttributes();
  this.buildEvents();
  //this.buildChilds();

  this.domElement.innerHTML = this.textContent;

};

//t is a string with the text for the ButtonShape
ButtonShape.prototype.updateText = function( text ){
    if( typeof text !== 'string' )
      console.error(': argument of updateText should be a string literal');

    this.textContent = text;
    this.needsRender = true;
};

ButtonShape.prototype.render_ = function(){

  if( this.textContent )
    this.domElement.innerHTML = this.textContent;

};



module.exports = ButtonShape;
