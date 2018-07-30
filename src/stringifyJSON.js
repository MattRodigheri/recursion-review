// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var stringed = '';

  var type = typeof obj;

  if (type === 'number' || type === 'boolean' || obj === null) {
    stringed = stringed.concat(String(obj));
  } else if (type === 'string') {
    stringed = stringed.concat('"' + obj + '"');
  } else if (type === 'undefined' || type === 'function') {
    return '';
  } else if (Array.isArray(obj)) {
    stringed = stringed.concat('[');
    for (var i = 0; i < obj.length; i++) {
      stringed = stringed.concat(stringifyJSON(obj[i]), ',');
      
      /*if (typeof obj[i] === 'object') {
        stringifyJSON(obj[i]);
      } else {
        stringed.concat(processValues(val[i]));
      }
*/
    }
    if(stringed.length !== 1) {
      stringed = stringed.slice(0, stringed.length - 1);
    }
    stringed = stringed.concat(']');
  } else /*OBJECT*/ {
    stringed = stringed.concat('{');
    for (var key in obj) {
      if (stringifyJSON(obj[key]) !== '') {
        stringed = stringed.concat('\"' + String(key) + '\":' + stringifyJSON(obj[key]) + ',');
      }
    }
    if(stringed.length !== 1) {
      stringed = stringed.slice(0, stringed.length - 1);
    }
    stringed = stringed.concat('}');
  }
  return stringed;
};


/*
var processValues = function(val) {
  var type = typeof val;
  if (type === 'number') {
    return String(val);
  }

}
*/