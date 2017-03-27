var Shape = require('./Shape.js');
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
