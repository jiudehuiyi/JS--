/*************
 *  Object
 */
// 1._.assign,_.assignIn,_.assignInWith,_.assignWith是同一类型得,具体思想请参照前面之前得文件
_.assign = (object,...args)=>{
    if( args.length == 0 ) {
        return object;
    }
   let obj ={};
   for(let arg of args){
       obj =  Object.assign(obj,arg);
   }

   return Object.assign(object,obj);
};
// 2._.at得使用：
// var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
 
// _.at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]
_.at = (object,paths) =>{
    if( !paths ) {
        return []
    }
    if( paths.length == 0) {
        return object;
    }

    let resultArray = [];
    for( let path of paths ) {
       let str = path.replace(/(?=(\.|\[))/g,"#");//匹配位置,对属性([index],property[])进行分割
       let splitArray = str.split("#");//将匹配得属性转化为数组
       let tempObject = object;
       for( let splitValue of splitArray ) {
           splitValue = splitValue.replace(".","");
           splitValue = splitValue.replace(/\[|\]/g,"");
           tempObject = tempObject[splitValue];
       }
       resultArray.push(tempObject);
   }
   return resultArray;
}
// 3.create:
_.create = (prototype,properties)=>{
    prototype=prototype === null?null:Object(prototype);
    //创建一个对象,他是以prototype为原型得
    const result = Object.create(prototype);
    return properties == null ? result:Object.assign(prototype,result);
}
// 4._.defaults

_.defaults = (object,...sources)=>{
    if( sources == null ) {
        return object;
    }
    let tempObject = {};
    for( let source of sources ) {
        tempObject = Object.assign(tempObject,source);
    }
    return Object.assign(tempObject,object);
}
// 5.defaultsDeep跟defaults原理是一样得,只不过是多了一层或者多层循环取出值而已

// 6._.findKey
_.findKey = (object,predicate)=>{
    if( predicate == null ) {
        return object;
    }

    if( Object.prototype.toString.call( predicate ) === "[object Function]" ) {
        let keys = Object.keys(object);
        let values = Object.values(object);
        let booArray = [];
        let resultKey ;
        for( let value of values ) {
            booArray.push( predicate(value) );
        }
        //当遇到第一个符合的即不再寻找下一个
        for( let i=0;i<booArray.length;i++ ) {
            if( booArray[i] ) {
                resultKey = keys[i];
                return resultKey;
            }
        }



    }else if( Object.prototype.toString.call( predicate ) === "[object Object]" ) {
        let keys = Object.keys(object);
        let values = Object.values(object);
        let booArray = [];
        for( let value of values ) {
            //isEqual是上面判断对象是否相等或者是否包含的函数,具体实现请看这个函数
            booArray.push( isEqual(predicate,value) );
        }
        for( let i=0;i<booArray.length;i++ ) {
            if( booArray[i] ) {
                resultKey = keys[i];
                return resultKey;
            }
        }        
    }else if( Object.prototype.toString.call( predicate ) === "[object Array]" ) {
        let obj = {};
        obj[predicate[0]] = predicate[1];
        let keys = Object.keys(object);
        let values = Object.values(object);
        let booArray = [];
        for( let value of values ) {
            //isEqual是上面判断对象是否相等或者是否包含的函数,具体实现请看这个函数
            booArray.push( isEqual(obj,value) );
        }
        for( let i=0;i<booArray.length;i++ ) {
            if( booArray[i] ) {
                resultKey = keys[i];
                return resultKey;
            }
        } 
    }
}
// 7._.findLastKey跟findKy原理是一样的,只不过这个是从后面开始找
_.forIn = (object,func)=>{
    //简单来做可以这样写
    for( let key in object ) {
       func(object[key],key);
    }
}
// 8.forInRight跟forIn差不多,只是从右边开始执行
// 9.forOwn:
_.forOwn = (object,func) =>{
    //简单来做可以这样写
    for( let key in object ) {
        if( object.hasOwnProperty(key) ) {
            func(object[key],key);
        }
     }
}
// 10.forRightOwn跟forOwn差不多,只是从右边的值开始
// 11.functions
_.functions = (object) =>{
    let resultArray = [];
    
    for( let key in object ) {
        if( object.hasOwnProperty(key) ) {
            resultArray.push( object[key] );
        }
    }
    return resultArray;

}
// 12.functionsIn
_.functionsIn = (object)=>{
    let resultArray = [];
    
    for( let key in object ) {
            resultArray.push( object[key] );
    }
    return resultArray;
}
// 13. (_.get,_.has,_.hasIn) 请参考_.at函数,实现基本一样,只是at返回的是一个结果数组,而_.get返回的一个字符串结果

// 14.invert
_.invert = (object)=>{
    let keys = Object.keys(object);
    let resultObject = {};
    for(let key of keys) {
        resultObject[ object[key] ] = key; 
    }
    return resultObject;
}
// 15.invertBy:
_.invertBy = (object, iteratee)=>{
    const result = {}
  Object.keys(object).forEach((key) => {
    const value = iteratee(object[key])
    if (Object.prototype.hasOwnProperty.call(result, value)) {
      result[value].push(key)
    } else {
      result[value] = [key]
    }
  })
  return result
}
// 16._.invoke请参考_.at函数,弄懂_.at,这个自然就懂了
// 17._keys
_.keys = (object) =>{

    if(typeof object === "string") {
        let result = [];
        for( let i=0;i<str.length;i++ ) {
            result.push(i);
        }
        return result;
    }

    //这个是ES6新属性
    return Object.keys(object);
}
// 18.keysIn
_.keysIn = (object)=>{
    let result = [];
    for( var key in object ) {
        result.push(key);
    }
    return result;

}
// 19._.mapKeys:

_.mapKeys = (object,iteratee) => {
    let keysArray = [];
    let values = Object.values(object);
    let result = {};
    for( let key in object ) {
        if( object.hasOwnProperty(key) ) {
            keysArray.push( iteratee(object[key],key) );
        }
    }
    for( let [index,value] of values.entries() ) {
        result[keysArray[index]] = value;
    }
    return result;
}
// 20._.merge
_.merge = (object,other) => {
    let keys1 = Object.keys(object);
    let keys2 = Object.keys(other);
    let boo;//存储是否含有相同的值
    let  commonValues = []; 
    let result = {};
    boo = keys1.every( (x)=>{
        return keys2.includes(x);
    } )
    if(boo) {

        for( let i in other ) {
            if( i in object ) {
                let obj = other[i];
                if( Object.prototype.toString.call(obj) === "[object Object]" ) {
                    result[i] = obj
                }else if( Object.prototype.toString.call(obj) === "[object Array]" ) {
                    result[i] = object[i].concat(obj);
                }
            }else {
                object[i] = other[i];
                result[i] = object[i];
            }
        }
    }else {
        result = Object.assign( object,other );
    }
    return result;
}
// 21._.omit
_.omit = (object,paths)=>{
    if( object == null ) {
        return {}
    }
    if( paths == null ) {
        return object;
    }
    let objectKeys = Object.keys(object);
    let resultArray = [];
    let result = {};
    for( let i=0;i<objectKeys.length;i++ ) {
       if(  !paths.includes(objectKeys[i]) ) {
            resultArray.push( objectKeys[i] );
        }
    }

    for(let key of resultArray){
        result[key] = object[key];
    }
    return result;
}
// 22._.omitBy
_.omitBy = (object,iteratee) =>{
    if(object == null) {
        return {}
    }
    if( iteratee == null ) {
        return object;
    }

    let values = Object.values(object);
    let keys = Object.keys(object);
    let resultBoo = [];
    let result = {};
    for(let i=0;i<values.length;i++) {
        resultBoo.push( iteratee(values[i]) );
    }

    for( let [index,value] of resultBoo.entries() ) {
        if(!value) {
            result[keys[index]] = object[keys[index]];
        }
    }
    return result;
}
// 23._.pick
_.pick = (object,paths)=>{
    if( object == null ) {
        return {}
    }
    if( paths == null ) {
        return object;
    }
    let objectKeys = Object.keys(object);
    let resultArray = [];
    let result = {};
    for( let i=0;i<objectKeys.length;i++ ) {
       if(  paths.includes(objectKeys[i]) ) {
            resultArray.push( objectKeys[i] );
        }
    }

    for(let key of resultArray){
        result[key] = object[key];
    }
    return result;
}
// 24._.pickBy
_.pickBy = (object,iteratee) =>{
    if(object == null) {
        return {}
    }
    if( iteratee == null ) {
        return object;
    }

    let values = Object.values(object);
    let keys = Object.keys(object);
    let resultBoo = [];
    let result = {};
    for(let i=0;i<values.length;i++) {
        resultBoo.push( iteratee(values[i]) );
    }

    for( let [index,value] of resultBoo.entries() ) {
        if(value) {
            result[keys[index]] = object[keys[index]];
        }
    }
    return result;
}
// 25._.result,_.set,_.setWith,请参考_.at函数,实现思想基本一样

// 26.toPairs
_.toPairs = (object) =>{

    if(object == null) {
        return {};
    }
    let result = [];
    for( let key in object ) {
        if( object.hasOwnProperty(key) ) {
            let array = [];
            array[0] = key;
            array[1] = object[key];
            result.push(array);
        }
    }
    return result;
}
// 27._.toPairsIn(object)
_.toPairsIn = (object) =>{

    if(object == null) {
        return {};
    }
    let result = [];
    for( let key in object ) {
            let array = [];
            array[0] = key;
            array[1] = object[key];
            result.push(array);
    }
    return result;
}
// 28._.unset,_.update,_.updateWith参照_.at函数

// 29._.values
_.values = (object) => {
    if(object == null) {
        return [];
    }
    let values = [];
    for( let key in object ) {
        if(object.hasOwnProperty(key)) {
            values.push( object[key] );
        }
    }
}
// 30._.valuesIn
_.valuesIn = (object) => {
    if(object == null) {
        return [];
    }
    let values = [];
    for( let key in object ) {
            values.push( object[key] );
    }
}