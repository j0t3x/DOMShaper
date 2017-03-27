(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("domshaper", [], factory);
	else if(typeof exports === 'object')
		exports["domshaper"] = factory();
	else
		root["domshaper"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Shape = __webpack_require__(1);
	var ButtonShape = __webpack_require__(2);
	var OptionShape = __webpack_require__(3);
	var ImageShape = __webpack_require__(4);
	var TextInputShape = __webpack_require__(5);
	var TextShape = __webpack_require__(6);
	var FormShape = __webpack_require__(7);
	
	exports.Shape = Shape; 
	exports.ButtonShape = ButtonShape;
	exports.OptionShape = OptionShape;
	exports.ImageShape = ImageShape;
	exports.TextInputShape = TextInputShape;
	exports.TextShape = TextShape;
	exports.FormShape = FormShape;


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	    this.domElement.className += this.classes;
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
	
	  if( this.id )
	    this.domElement.id = this.id;
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Shape = __webpack_require__(1);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//this is a bad example of  a shape, its poorly written. It builds an option group for bootstrap css, lame... i can do better
	// buuut, and this is a big but, it worked for what was intended so dont judge XD
	var Shape = __webpack_require__(1);
	
	var OptionShape = function( name, type ){
	
	  Shape.call( this, 'div', name );
	  if( typeof type !== 'string' )
	      console.error('indicate wether this is a radio or check group of options with a string');
	
	  this.type = '';
	  //setting input type, dom style
	  if( type === 'radio' )
	      this.type = 'radio';
	  else if( type === 'check' )
	      this.type = 'checkbox';
	
	  this.groupName = name;
	  this.structure = [];
	  this.domElements = [];
	  this.domElement;
	  this.changedOptionsValues = [];
	
	};
	/*OOP herency*/
	OptionShape.prototype = Object.create( Shape.prototype );
	OptionShape.prototype.contructor = OptionShape;
	/*OOP herency*/
	
	OptionShape.prototype.addOption = function( displayText, value, classForName, classForInput ){
	
	     if( !displayText || !value )
	          console.error('you should add an option with display and value arguments...');
	
	     this.structure.push({
	          display: displayText,
	          value: value,
	          classForName: ( classForName ) ? classForName : '',
	          classForInput: ( classForInput ) ? classForInput : ''
	     });
	
	};
	
	OptionShape.prototype.buildDom = function(){
	
	     this.domElement = document.createElement('div');
	
	     for (var i = 0; i < this.structure.length; i++ ) {
	
	          var optionUnit = {
	               container: document.createElement('div'),
	               input: null,
	               label: null,
	               name: null,
	               indicator: null
	          };
	
	          optionUnit.input = document.createElement('input');
	          optionUnit.input.type = this.type;
	          optionUnit.input.name = this.groupName;
	          optionUnit.input.value = this.structure[i].value;
	          optionUnit.input.className = this.structure[i].classForInput;
	          //optionUnit.container.appendChild( optionUnit.input );
	
	          optionUnit.label = document.createElement('label');
	          //optionUnit.label.innerHTML = this.structure[i].display;
	          optionUnit.label.className = this.structure[i].classForName;
	          optionUnit.label.appendChild( optionUnit.input );
	
	          optionUnit.name = document.createElement('span');
	          optionUnit.name.innerHTML = this.structure[i].display;
	          optionUnit.name.className = 'custom-control-description';
	          optionUnit.label.appendChild( optionUnit.name );
	
	          optionUnit.indicator = document.createElement('span');
	          optionUnit.indicator.className = 'custom-control-indicator';
	          optionUnit.label.appendChild( optionUnit.indicator );
	
	          optionUnit.container.appendChild( optionUnit.label );
	
	          optionUnit.container.className = 'form-check';
	
	          this.domElements.push( optionUnit );
	          //add the root dom element to attach to page
	          this.domElement.appendChild( optionUnit.container );
	
	     }
	
	     if( this.id )
	          this.domElement.id = this.id;
	
	     if( this.classes )
	          this.domElement.className += ' ' + this.classes;
	
	};
	
	//t is a string with the text for the OptionShape
	OptionShape.prototype.getSelectedOptions = function(){
	
	    var res = [];
	
	     for (var i = this.domElements.length; i--; ) {
	
	          if( this.domElements[i].input.checked )
	               res.push( this.domElements[i].input.value )
	
	     }
	
	     return res;
	};
	
	OptionShape.prototype.render_ = function(){
	
	     //no render need, yet
	
	};
	
	
	module.exports = OptionShape;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Shape = __webpack_require__(1);
	
	var ImageShape = function( src, id ){
	  Shape.call( this, 'img', id );
	
	  if( typeof src !== 'string' )
	    console.error(': image src should be a string literal');
	
	  if( src ){
	    this.src = src;
	  }else{
	    console.error(': 3rd input shouldnt be null');
	  }
	
	  this.width;
	  this.height;
	
	};
	/*OOP herency*/
	ImageShape.prototype = Object.create( Shape.prototype );
	ImageShape.prototype.contructor = ImageShape;
	/*OOP herency*/
	
	ImageShape.prototype.buildDom = function(){
	
	  if( this.elementName && !this.domElement )
	    this.domElement = document.createElement( this.elementName );
	
	  this.domElement.src = this.src;
	
	  this.buildId();
	  this.buildClasses();
	  this.buildAttributes();
	  this.buildEvents();
	  //this.buildChilds();
	
	  if( this.width )
	    this.domElement.width = this.width;
	
	  if( this.height )
	    this.domElement.height = this.height;
	
	};
	
	ImageShape.prototype.render_ = function(){
	
	  this.domElement.src = this.src;
	
	  if( this.width )
	    this.domElement.style.width = this.width + 'px';
	
	  if( this.height )
	    this.domElement.style.height = this.height + 'px';
	
	};
	
	ImageShape.prototype.changeImage = function( src ){
	
	  if( typeof src !== 'string' )
	    console.error(': image src should be a string literal');
	
	  this.src = src;
	  this.needsRender = true;
	};
	
	ImageShape.prototype.setWHpx = function( w, h ){
	
	  if( w && typeof w === 'number' ){
	    this.width = w;
	  }
	
	  if( h && typeof h === 'number' ){
	    this.height = h;
	  }
	
	  this.needsRender = true;
	
	};
	
	module.exports = ImageShape;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Shape = __webpack_require__(1);
	
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Shape = __webpack_require__(1);
	var TextShape = function(elem, id) {
	    Shape.call(this, elem, id);
	    this.textContent = '';
	};
	/*OOP herency*/
	TextShape.prototype = Object.create(Shape.prototype);
	TextShape.prototype.contructor = TextShape;
	/*OOP herency*/
	TextShape.prototype.buildDom = function() {
	    if (this.elementName && !this.domElement)
	      this.domElement = document.createElement(this.elementName);
	
	    this.domElement.innerHTML = this.textContent;
	
	    this.buildId();
	    this.buildClasses();
	    this.buildAttributes();
	    this.buildEvents();
	    this.buildChilds();
	
	};
	
	TextShape.prototype.updateText = function(textContent, method) {
	    this.needsRender = true;
	    if( !method )
	      method = "replace";
	
	    if (typeof textContent !== 'string') {
	        console.error(': first argument of updateText should be a string literal');
	    }
	    switch (method) {
	        case "replace":
	            this.textContent = textContent;
	            break;
	        case "append":
	            this.textContent = this.textContent + textContent;
	            break;
	        case "prepend":
	            this.textContent = textContent + this.textContent;
	            break;
	        default:
	            console.error(': method of updateText invalid, valid methods : [default] "replace","append","prepend"');
	    }
	};
	TextShape.prototype.render_ = function() {
	    if (this.textContent) this.domElement.innerHTML = this.textContent;
	};
	module.exports = TextShape;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Shape = __webpack_require__(1);
	var TextInputShape = __webpack_require__(5);
	var ButtonShape = __webpack_require__(2);
	var OptionShape = __webpack_require__(3);
	
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
	
	  this.buildId();
	  this.buildClasses();
	
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
	
	  this.buildChilds();
	
	  //make submitTrigger button visible or invisible according to the flag setted at creation
	  if( !this.submitTrigger.visible )
	    this.submitTrigger.domElement.style.visibility = "hidden";
	
	  this.buildAttributes();
	  this.buildEvents();
	  
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=domshaper.js.map