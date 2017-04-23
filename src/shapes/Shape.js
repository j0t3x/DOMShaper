var Shape = function( elem, id ){

  this.id = ( id )? id : null;
  this.domElement;
  this.childs = [];
  this.classes = '';
  this.parent;
  this.needsRender = true;
  this.attributes = {};

  //fo the eventa
  this.eventAndCallback = {};


  if( !elem ){
    console.error('Element should be a DOM node or a string literal');
  }

  if( typeof elem === 'string' ){
    this.elementName = ( elem )? elem : null;
  }

  if( elem.nodeName ){
    this.domElement = elem;
  }

};

Shape.prototype.appendShape = function( shapeToAppend ){

  if( shapeToAppend instanceof Shape ){

    //add the Shape object to the childs array
    shapeToAppend.parent  = this;
    this.childs.push( shapeToAppend );

  }else if( typeof shapeToAppend === 'string' ){

    var childShape = new Shape( shapeToAppend, null );
    childShape.parent = this;
    this.childs.push( childShape );

  }else{
    console.error('only shape or string as arguments, gtfo');
    //we dont want to stop the main thread for this misuse
  }

};

Shape.prototype.buildDom = function(){

  if( this.elementName && !this.domElement )
    this.domElement = document.createElement( this.elementName );

    this.buildId();
    this.buildClasses();
    this.buildAttributes();
    this.buildEvents();
    this.buildChilds();

};

Shape.prototype.buildId = function(){
  if( this.id )
    this.domElement.id = this.id;
};

Shape.prototype.buildClasses = function(){
  if( this.classes )
    this.domElement.className = this.classes;
};

Shape.prototype.buildAttributes = function(){
  for( var attr in this.attributes){
    this.domElement.setAttribute(attr,this.attributes[attr]);
  }
};

Shape.prototype.buildEvents = function(){
  for( var ev in this.eventAndCallback ){
    this.domElement.addEventListener( ev, this.eventAndCallback[ev] );
  }
};

Shape.prototype.buildChilds = function(){
  for (var i = 0; i < this.childs.length; i++) {
    if( !this.childs[i].domElement ){
      this.childs[i].buildDom();
    }
    this.domElement.appendChild( this.childs[i].domElement );
  }
};

Shape.prototype.render = function(){

  if( !this.needsRender ){
    this.render_();
  }

  if( this.childs ){
    for (var i = 0; i < this.childs.length; i++) {
      //render all childs shit
      this.childs[i].render();
    }
  }

  this.needsRender = false;

};

Shape.prototype.render_ = function(){

};

//event listener
//choose your listener using a string
Shape.prototype.on = function( event, callback ){
  //all listener here? maybe :)
  if( typeof event !== 'string' ){
    console.error('use string identifiers for events');
  }

  this.eventAndCallback[event] = callback;

};

Shape.prototype.removeAllChilds = function(){

  while (this.domElement.firstChild) {
    this.domElement.removeChild(this.domElement.firstChild);
  }

  for (var i = this.childs.length - 1; i >= 0 ; i--) {
    this.childs[i].parent = null;
    this.childs.splice(i, 1);
  }

};


Shape.prototype.removeShape = function( childShape ){

  var reference;
  if( childShape instanceof Shape ){
    //add the Shape object to the childs array
    for (var i = this.childs.length - 1; i >= 0; i--) {
      if( this.childs[i] === childShape){
        reference = this.childs.splice( i, 1 )[0];
        break;
      }
    }

  }else{
    console.error(': argument should be a Shape object');
  }

  //remove interface
  if( reference )
    this.domElement.removeChild( reference.domElement );

  //return reference; this only make sense if the argument is a string literal referring a dom element name

};

Shape.prototype.setClass = function(){

  //you can set several classes like this 'clas1 class2 class3'

  for ( var i = 0; i < arguments.length ; i++ ) {

    if( typeof arguments[i] !== 'string' )
      console.error(': className should be a string literal');

    this.classes += ( arguments[i] +  ' ' );
  }
  //this.classes = classes;

};

Shape.prototype.setId = function( id ){

  //you can set several classes like this 'clas1 class2 class3'
  if( typeof id !== 'string' )
    console.error(': id should be a string literal');

  this.id = id;

};

Shape.prototype.addAttr = function( name , value ){

  //you can set several classes like this 'clas1 class2 class3'
  if( typeof name !== 'string' )
    console.error(': name should be a string literal');

  if( !value || (typeof value !== 'string' && typeof value !== 'number') )
    console.error(': value shouldnt be empty, use number or string');

  this.attributes[name] = value;

};


module.exports = Shape;
