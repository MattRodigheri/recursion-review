// If life was easy, we could just do things the easy way:
/*
 var getElementsByClassName = function (className) {
   console.log(document.getElementsByClassName(className));
  return;
 };
*/
var flattenDeep = function(arr) {
  return arr.reduce(function(acc, item) {
    if (Array.isArray(item)) {
      return acc.concat(flattenDeep(item));
    }
    return acc.concat(item);
  }, []);
};

var processChildNodes = function(elem, className) {
  var childElems = [];
  if (elem.classList) {
    var classes = elem.classList;
    
    if (classes.contains(className)) {
      childElems.push(elem);
    }
  }
  if (elem.hasChildNodes()) {
    var nestedChildren = elem.childNodes;
    for (var i = 0; i < nestedChildren.length; i++) {
      childElems.push(processChildNodes(nestedChildren[i], className));
      
    }
  }
  return childElems;
}; 

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var body = document.body;
  var elements = [];
  
  if (body.classList) {
    var classes = body.classList;
    
    if (classes.contains(className)) {
      elements.push(body);
    }
  }

  if (body.hasChildNodes()) {
    var children = body.childNodes;

    for (var i = 0; i < children.length; i++) {
      elements.push(processChildNodes(children[i], className));
      if (elements[elements.length - 1].length === 0) {
        elements.pop();
      }
    }
  }
  console.log(flattenDeep(elements));
  return flattenDeep(elements);
};



