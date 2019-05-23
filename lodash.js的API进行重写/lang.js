/*******
 *  lang
 * ******* */
// _.castArray的使用：
// _.castArray(1);
// // => [1]
 
// _.castArray({ 'a': 1 });
// // => [{ 'a': 1 }]
 
// _.castArray('abc');
// // => ['abc']
 
// _.castArray(null);
// // => [null]
 
// _.castArray(undefined);
// // => [undefined]
 
// _.castArray();
// // => []
_.castArray = ( value )=>{


    if( Object.prototype.toString.call( value ) === "[object Array]" ) {
        return value
    }else {
        return [ value ]
    }
}
// 2._.clone(value)的使用:
//关于拷贝问题:1.是基本类型的基本赋值,引用类型的直接赋值,使用=,2.遍历对象或者数组,在进行赋值,也就是浅拷贝3.对象或者数组也是一样的,也就是深拷贝
//这里我是对_.clone 和_.cloneDeep进行第二和第三步的,而lodash.js应该是第一步和第二步,这里我认为这是没什么意义的,所以对clone,cloneDeep进行改写
_.clone = (value)=>{
    if( value == null ) {
        throw TypeError("Expected a value");
    }
    if( Object.prototype.toString.call( value ) === "[object Object]" ) {
      let objResult = {};
      for( let key in value ){
          if( value.hasOwnProperty(key) ) {
              objResult[key] = value[key];
          }
      }
      return objResult;
    }else if( Object.prototype.toString.call( value ) === "[object Array]" ) {
        let resultArray = [];
        for( let tempValue of value  ) {
            resultArray.push(tempValue);
        }
    }else {
        let str ;
        str = value;
        return str;
    }
}
// 3._.cloneDeep(value)
_.cloneDeep  = (value) => {

    if(value == null) {
        return {}
    }
    if( Object.prototype.toString.call( value ) === "[object Object]" ) {
        let result={};
        for(let key in value) {
            if(value.hasOwnProperty(key)) {
                //如果value的子元素是对象则执行递归操作
                if(value[key] && typeof value[key]==="object" ) {
                    result[key] = _.cloneDeep(value[key]);
                }else {
                    result[key] =value[key];
                }
            }
        }
        return result;
    }else if( Object.prototype.toString.call( value ) === "[object Array]" ) {
        let resultArray = [];
        for( let arrayValue of value ) {
            let result={};
            for(let key in arrayValue) {
                 
                if(arrayValue.hasOwnProperty(key)) {
                    //如果value的子元素是对象则执行递归操作
                    if(arrayValue[key] && typeof arrayValue[key]==="object" ) {
                        result[key] = _.cloneDeep(arrayValue[key]);
                    }else {
                        result[key] =arrayValue[key];
                    }
                }
            }
            // console.log(result)
            resultArray.push( result );

        }
        return resultArray;
    }

}

// 4.cloneWith和cloneDeepWith原理跟上面的差不多,这里就省略,感兴趣的自行书写

// 5.conformsTo的使用:
// _.conformsTo(object, { 'b': function(n) { return n > 1; } });
// // => true
 
// _.conformsTo(object, { 'b': function(n) { return n > 2; } });
// // => false
_.conformsTo = (object,source) => {
    if( object == null || source == null ) {
        throw Error("Expected some Param");
    }

    let keys = Object.keys(source);
    let key = keys[0];
    let value = object[key];
    let func = source[key];
    let resultBoo;
    resultBoo = func(value);

    return resultBoo;
}

// 6._.eq的使用方法:
// var object = { 'a': 1 };
// var other = { 'a': 1 };
 
// _.eq(object, object);
// // => true
 
// _.eq(object, other);
// // => false
 
// _.eq('a', 'a');
// // => true
 
// _.eq('a', Object('a'));
// // => false
 
// _.eq(NaN, NaN);
// // => true
_.eq = (value,other) => {
    if( value == null || other == null ) {
        throw Error("required a param");
    }
    if( isNaN(value) && isNaN(other)) {
        return true;
    }

    return value === other;
}
// 7.gt的使用方法:
// _.gt(3, 1);
// // => true
 
// _.gt(3, 3);
// // => false
 
// _.gt(1, 3);
// // => false
_.gt = (value,other)=>{
    if (!(typeof value == 'string' && typeof other == 'string')) {
        value = +value
        other = +other
      }
      return value > other
}
// 8._.gte(value, other)的使用方法"
_.gte=(value, other)=> {
    if (!(typeof value == 'string' && typeof other == 'string')) {
      value = +value
      other = +other
    }
    return value >= other
  }
// 9.isArguments的使用：
//   _.isArguments(function() { return arguments; }());
// // => true
 
// _.isArguments([1, 2, 3]);
// // => false
_.isArguments = (value) => {
    return Object.prototype.toString.call(value) === "[object Arguments]"
} 
// 10._.isArray的使用:
// _.isArray([1, 2, 3]);
// // => true
 
// _.isArray(document.body.children);
// // => false
 
// _.isArray('abc');
// // => false
 
// _.isArray(_.noop);
// // => false 
_.isArray = (value)=>{
    return Object.prototype.toString.call(value) === "[object Array]";
}
// 11.isArrayBuffer：
_.isArrayBuffer = (value) => {
    return Object.prototype.toString.call( value ) === "[object ArrayBuffer]"
}
// 12.isArrayLike类数组对象我们根据《权威指南》给出的例子来实现
_.isArrayLike = (o) =>{
    if( o &&
        typeof o === "object" &&
        isFinite(o.length) &&
        o.length >0 &&
        o.length === Math.floor(o.length) &&
        o.length < 4294967296
        ){
            return true;
        }
        else {
            return false;
        }
}
// 13.isArrayLikeObject检查传入的参数是否是对象,而在_.isArrayLike已经检查完毕,

// 14._isBoolean
// _.isBoolean(false);
// // => true
 
// _.isBoolean(null);
// // => false
_.isBoolean = (boo) => {
    return Object.prototype.toString.call(boo) === "[object Boolean]";
}
// 15._.isBuffer直接给出源码：因为Buffer是node.js的处理二进制的方法,在浏览器不可以用
// /** Detect free variable `exports`. */
// const freeExports = typeof exports == 'object' && exports !== null && !exports.nodeType && exports

// /** Detect free variable `module`. */
// const freeModule = freeExports && typeof module == 'object' && module !== null && !module.nodeType && module

// /** Detect the popular CommonJS extension `module.exports`. */
// const moduleExports = freeModule && freeModule.exports === freeExports

// /** Built-in value references. */
// const Buffer = moduleExports ? root.Buffer : undefined

// /* Built-in method references for those with the same name as other `lodash` methods. */
// const nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined
// const isBuffer = nativeIsBuffer || (() => false)
// 16。_.isDate:
_.isDate = (date)=>{
    return Object.prototype.toString.call( date ) === "[object Date]";
}
// 17.isObjectLike:
_.isObjectLike = (value) =>{
    return typeof value == "object" && value !== null;
}
// 18.isPlainObject 
_.isPlainObject= (value)=>{
    if (!isObjectLike(value) || getTag(value) != '[object Object]') {
        return false
      }
      if (Object.getPrototypeOf(value) === null) {
        return true
      }
      let proto = value
      while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
      }
      return Object.getPrototypeOf(value) === proto
}
// 19._isElement:
_.isElement = (value) =>{
    return _.isObjectLike(value) && value.nodeType === 1 && !_.isPlainObject(value);
}
//20 _.isEmpty:
_.isEmpty = (value) =>{
    let toString = Object.prototype.toString;
    if(value == null) {
        return true;
    }
    if( value == undefined ) {
        return true;
    }
    if( toString.call(value) === "[object Boolean]" || toString.call(value) === "[object Number]" ||toString.call(value) === "[object String]"  ) {
        return true;
    }
    //Set Map的ES6新增的数据结构,!value.length则是取布尔值,如果value.length为0,则!value.length为false,如果value.length不为0,则！value.length为true
    if( Object.prototype.toString.call(value) === ["object Set"] || Object.prototype.toString.call(value) === "[object Map]" ) {
        return !value.length;
    }
    if( toString.call(value) === "[object Array]" ) {
        return !value.length;
    }
    if( toString.call(value) === "[object Object]" ) {
        return !value.hasOwnProperty(value).length > 0
    }
}
//21._.isEqual:

_.isEqual=(obj1,obj2)=>{
    //isEqual函数是在array.js文件里面,详细可以看文件里面的isEqual函数
    return isEqual(obj1,obj2)
}
// 22._.isError:
_.isError = (value) =>{
    if (!isObjectLike(value)) {
        return false
      }
    return Object.prototype.toString.call( value ) === "[object Error]" || Object.prototype.toString.call(value) === "[object DOMException]"  
}
//23.isFinite
_.isFinite = (value) => {
    if( typeof value === "string" ) {
        return false;
    }
    return isFinite(value)
}
// 24._.isFunction:
_.isFunction = (value)=>{
    let type = Object.prototype.toString.call(value);
    if(value == null) {
        throw Error("Excepted a Function");
    }
    return type === "[object Function]" || type === "[object AsyncFunction]" || type === "[object GeneratorFunction]" || type === "[object Proxy]"  ;
}
//25.isInteger
_.isInteger = (value)=>{
    return Number.isInteger(value);
}
// 26.isLength：
_.isLength = (value)=>{
    return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}
// 27.isMap(map是ES6一种新的数据结构,跟对象差不多):
_.isMap = (value) => {
    return Object.prototype.toString.call( value ) === "[object Map]";
}
// 28. _.isMatch
// var object = { 'a': 1, 'b': 2 };
 
// _.isMatch(object, { 'b': 2 });
// // => true
 
// _.isMatch(object, { 'b': 1 });
// => false
_.isMatch = (obj,match)=>{
    let keys = Object.keys(match);
    for( let i=0;i<keys.length;i++ ) {
        if( match[keys[i]] !== obj[ keys[i] ] ) {
            return false;
        }
    }
    return true;
}
// 29.isNaN:
_.isNaN = (value) =>{

    if(value === undefined) {
        return false;
    }
    return isNaN(value);
}
// 30._.isNative在lodash的实现：
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g

/** Used to detect if a method is native. */
const reIsNative = RegExp(`^${
  Function.prototype.toString.call(Object.prototype.hasOwnProperty)
    .replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
}$`)
 _.isNative = (value)=> {
    return isObject(value) && reIsNative.test(value)
  }
//   31._.isNil:
_.isNil = (value)=>{
    return value == null;
}
// 32._.isNull :
_.isNull = (value) => {
    return value === null;
}
// 33. _.isNumber:
_.isNumber = (value) =>{

    return typeof value == "number" ||
        (_.isObjectLike(value) && Object.prototype.toString.call(value) === "[object Number]" );

}
// 34._.isObject
_.isObject = (value) =>{
    return typeof value != null && (typeof value == "object" || typeof value == "function" )
}
// 35. _.isObjectLike
_.isObjectLike = (value) =>{
    return typeof value == 'object' && value !== null
}
// 36._.isPlainObject 
_.isPlainObject = (value) =>{
    if( !_.isObjectLike(value) || Object.prototype.toString.call(value) === "[object Object]" ) {
        return false;
    }
    if( Object.getPrototypeOf(value) === null ) {
        return true;
    }
    let proto = value
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(value) === proto
}
// 37._isRegExp
_.isRegExp =(value) =>{
    return Object.prototype.toString.call( value ) === "[object RegExp]";
}

// 38.isSet
_.isSet = (value) =>{
    return Object.prototype.toString.call(value) === "[object Set]";
}
// 39._.isString
_.isString = (value) => {
    return typeof value === "string";
}
// 40. _.isSymbol
_.isSymbol = (value)=>{
    return Object.prototype.toString.call( value ) === "[object Symbol]";
}
// 41._.isUndefined
_.isUndefined = (value) =>{
    return value === undefined;
}
// 42._.isWeakMap
_.isWeakMap = (value) =>{
    return Object.prototype.toString.call( value ) === "[object WeakMap]";
}
// 43.isWeakSet
_.isWeakSet = (value) =>{
    return Object.prototype.toString.call( value ) === "[object WeakSet]"
}
// 44._.lt
_.lt = (value,other) =>{
    if (!(typeof value == 'string' && typeof other == 'string')) {
        value = +value
        other = +other
      }
      return value < other
}

// 45.lte
_.lte = (value,other) =>{
    if (!(typeof value == 'string' && typeof other == 'string')) {
        value = +value
        other = +other
      }
      return value <= other
}
// 46.toArray的使用:
// _.toArray({ 'a': 1, 'b': 2 });
// // => [1, 2]
 
// _.toArray('abc');
// // => ['a', 'b', 'c']
 
// _.toArray(1);
// // => []
 
// _.toArray(null);
// // => []
_.toArray = (value)=>{

    if( value == null ) {
        return [];
    }
    if( Object.prototype.toString.call( value ) === "[object Array]" ) {
        return value;
    }else if( Object.prototype.toString.call( value ) === "[object Object]" ) {
        let values = Object.values(value);
        return values;
    }else if( Object.prototype.toString.call( value ) === "[object String]" ) {
        let length = value.length;
        let resultArray = [];
        for( let i=0;i<length;i++ ) {
            resultArray.push(value[i]);
        }
        return resultArray;
    }else if( Object.prototype.toString.call( value ) === "[object Nunber]" ) {
        return [];
    }

}

// 47.toFinite:
_.toFinite = (value)=>{
    if (!value) {
        return value === 0 ? value : 0
      }
      value = toNumber(value)
      if (value === INFINITY || value === -INFINITY) {
        const sign = (value < 0 ? -1 : 1)
        return sign * MAX_INTEGER
      }
      return value === value ? value : 0
}
// 48.toInteger
_.toInteger = (value) =>{
    const result = toFinite(value);
    const remainder = result%1;

    return remainder?result-remainder:result;
}
// 49.toLength
_.toLength = (value) =>{
    if (!value) {
        return 0
      }
      value = _.toInteger(value)
      if (value < 0) {
        return 0
      }
      if (value > MAX_ARRAY_LENGTH) {
        return MAX_ARRAY_LENGTH
      }
      return value
}
// 50.toNumber个人觉得源码中这个写得复杂一点
_.toNumber = (value) =>{
    if (typeof value == 'number') {
        return value
      }
      if (_.isSymbol(value)) {
        return NAN
      }
      if (_.isObject(value)) {
        const other = typeof value.valueOf == 'function' ? value.valueOf() : value
        value = _.isObject(other) ? `${other}` : other
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value
      }
      value = value.replace(reTrim, '')
      const isBinary = reIsBinary.test(value)
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value)
}
// 51.toPlainObject
_.toPlainObject = (value) =>{
    let obj = Object(value);
    let resultObj = {};
    for( let key in obj ) {
        if( obj.hasOwnProperty(key) ) {
            resultObj[key] = obj[key];
        }
    }
}
// 52.toString
_.toString = (value) =>{
    if( value == null ) {
        return String(value)
    }
    return value.toString(value);
}


