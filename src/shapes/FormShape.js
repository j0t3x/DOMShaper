var Shape = require('./Shape.js');
var TextInputShape = require('./TextInputShape.js');
var ButtonShape = require('./ButtonShape.js');
var OptionShape = require('./OptionShape.js');

var FormShape = function( id ){
  Shape.call( this, 'form', id );

  //this.action = action;
  this.method = '';
  this.encoding = '';
  this.submitTrigger;
  this.data = {}; //remember this could be a file

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

  if( !this.submitTrigger ){
    console.error('You need a submit trigger for a form');
  }


  if(this.submitTrigger)
    this.appendShape( this.submitTrigger );

  for (var i = 0; i < this.childs.length; i++) {

    if( !this.childs[i].domElement ){
      this.childs[i].buildDom();
    }

    this.domElement.appendChild( this.childs[i].domElement );

  }

  //make submitTrigger button visible or invisible according to the flag setted at creation
  if( !this.submitTrigger.visible )
    this.submitTrigger.domElement.style.visibility = "hidden";

  for( var ev in this.eventAndCallback ){
    this.domElement.addEventListener( ev, this.eventAndCallback[ev] );
  }

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

FormShape.prototype.addSection = function( childSection ){

  if( childSection instanceof Shape ){

    this.appendShape( childSection );
    console.log( this.childs );

  }else{
    console.error('The argument should be a Shape object');
  }

};

FormShape.prototype.setSubmitTrigger = function( text ){
  //un trigger puede ser un boton, como puede ser un TECLA
  if( typeof text !== 'string' )
    console.error('Argument should be a string containing text of submit button, if no text submit will be not visible');

  var st;
  if ( text !== '' ) {
    st = new ButtonShape( text );
    //lets set a flag in this object to account for ti later on buildDom
    st.visible = true;
  }else{
    st = new ButtonShape('');
  }

  this.submitTrigger = st;

  return st;
};

FormShape.prototype.sendData = function( evt ){

  evt.preventDefault();
  //TODO: lib that structure requests for our framework :)


};

FormShape.prototype.serializeForm = function(){

  this.serializeElement( this );
  return this.data;

};

FormShape.prototype.serializeElement = function( theShape ){

  for( var i = 0; i < theShape.childs.length; ++i ) {

    var name;
    var value;

    var element = theShape.childs[i];

    if( element instanceof TextInputShape ){
      name = element.id;
      value = element.getVal();

    }else if ( element instanceof OptionShape ) {
      name = element.id;
      value = element.getSelectedOptions();
    }else{
      //continue;
    }
    if( name ) {
       this.data[ name ] = value;
    }

    if( element.childs.length > 0 ){
      this.serializeElement( element );
    }

  }

};

FormShape.prototype.render_ = function(){

};

module.exports = FormShape;
