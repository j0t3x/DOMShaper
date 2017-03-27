var ds = require('../bin/domshaper.js');

var form = new ds.FormShape("/report","");


var div = new ds.Shape("div");
var input = new ds.TextInputShape('name');
var label = new ds.TextShape("label");
var image = new ds.ImageShape('https://media.giphy.com/media/b09xElu8in7Lq/giphy.gif');

label.updateText("Nombre");
//label.setClass('red');
input.addAttr('maxlength',8);

div.setClass('form-controls');
div.appendShape(label);
div.appendShape(input);

image.changeImage('https://media.giphy.com/media/b09xElu8in7Lq/giphy.gif');


form.addSection( div );
form.addSection( image );

form.setSubmitTrigger("enviar").setClass('btn btn-primary');

var d = new ds.Shape( document.getElementsByTagName("body")[0] );

d.appendShape(form);

d.buildDom();

d.render();

var r = form.serializeForm();

console.log(r)
