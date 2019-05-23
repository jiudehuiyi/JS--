


// 1._countBy的使用：
// _.countBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': 1, '6': 2 }
 
// The `_.property` iteratee shorthand.
// _.countBy(['one', 'two', 'three'], 'length');
// => { '3': 2, '5': 1 }
_.countBy = (collection,predicate) => {
    let resultCollection = {};
    if(collection == null) {
        return {};
    }
    if( Object.prototype.toString.call(predicate) === "[object Function]" ) {
        for(let i=0;i<collection.length;i++) {
            // tempCollection.push( predicate(collection[i]) );
            let key = predicate(collection[i]);
           if( resultCollection.hasOwnProperty(key) ) {
                let value = resultCollection[key]+1;
                resultCollection[key] = value;
            }else {
               resultCollection[key] = 1;
           }

        }
    }
    return resultCollection;
}
//对象的深度比较
let isEqual = (obj1,obj2)=> {
    var keys1 = Object.getOwnPropertyNames(obj1);
    var keys2 = Object.getOwnPropertyNames(obj2);
    var arr = [] ;
    for( let [index,value] of keys1.entries() ){
        
        var ownPropA = obj1[value];
        var ownPropB = obj2[value];


        if( Object.prototype.toString.call(ownPropA) === "[object Object]" ) {
           var c =  isEqual(ownPropA,ownPropB);
           arr.push(Boolean(c));
        }else {
            if(ownPropA === ownPropB) {
              arr.push(true)
            }else {
                arr.push(false)
            }
        }
    }

    return arr.every( (item,index)=>{
        return item
    } )

}
// 2._.every(collection, [predicate=_.identity])的使用:
// _.every([true, 1, null, 'yes'], Boolean);
// // => false
 
// var users = [
//   { 'user': 'barney', 'age': 36, 'active': false },
//   { 'user': 'fred',   'age': 40, 'active': false }
// ];
 
// // The `_.matches` iteratee shorthand.
// _.every(users, { 'user': 'barney', 'active': false });
// // => false
 
// // The `_.matchesProperty` iteratee shorthand.
// _.every(users, ['active', false]);
// // => true
 
// // The `_.property` iteratee shorthand.
// _.every(users, 'active');
// // => false
//而相对的some核心思想也是跟every一样的,所以every则省略不写
_.every = (collection,predicate)=>{
    if(collection == null) {
        return ;
    }

    if( Object.prototype.toString.call(predicate) === "[object Function]" ) {
        return collection.every( (item)=>{
            return predicate(item)
        } );
    }else if( Object.prototype.toString.call(predicate) === "[object Object]" ) {
        for( let i=0;i<collection.length;i++ ) {
            if( !isEqual(predicate,collection[i]) ) {
                return false;
            }
        }
        return true;
    }else if( Object.prototype.toString.call(predicate) === "[object Array]" ) {
        let key = predicate[0];
        let value = predicate[1];
        for(let i=0;i<collection.length;i++) {
            if( collection[i][key] !== value ) {
                return false;
            }
        }
        return true;
    }else if( Object.prototype.toString.call(predicate) === "[object String]" ) {
        for(let i=0;i<collection.length;i++) {
            if( !collection[i].hasOwnProperty(predicate) ) {
                return false;
            }
        }
        return true;
    }
}
// 2.filter,find,findLast跟every核心一样,都是分成不同的类型进行处理,这里的就不写了,懂了every其他就应该会写了

// 3._.flatMap(collection, [iteratee=_.identity])的使用:
// function duplicate(n) {
//     return [n, n];
//   }
   
//   _.flatMap([1, 2], duplicate);
  // => [1, 1, 2, 2]

  _.flatMap=(collection,iteratee)=>{
    let resultArray = [];
    collection.forEach( (item,index)=>{
        resultArray.push( iteratee(item) );
    } )
    // flatten是展平数组,_.flatten是array.js的一种方法
    resultArray = _.flatten(resultArray);
    return resultArray;
}
// 4.flatMapDeep是flatMap的深层解构,只需要将flatten换成flattenDepth就可以了,这两个API来自于array.js,当然也可以在test.js中找到
_.flatMapDeep=(collection,iteratee)=>{
    let resultArray = [];
    collection.forEach( (item,index)=>{
        resultArray.push( iteratee(item) );
    } )
    // flatten是展平数组
    resultArray = _.flattenDepth(resultArray);
    return resultArray;
}

// 5._.forEach(collection, [iteratee=_.identity])和array.forEach功能基本一样
// _.forEach([1, 2], function(value) {
//     console.log(value);
//   });
//   // => Logs `1` then `2`.
   
//   _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
//     console.log(key);
//   });
  // => Logs 'a' then 'b' (iteration order is not guaranteed).
_.forEach = (collection,iteratee)=>{
    if( collection == null ) {
        return "";
    }
    if(!iteratee) {
        return collection;
    }
    if( Object.prototype.toString.call(collection) === "[object Array]" ) {
        collection.forEach( (item)=>{
            iteratee(item);
        } )
    }else if( Object.prototype.toString.call(collection) === "[object Object]" ) {
        let array = Object.keys(collection);
        array.forEach( (item)=>{
            iteratee(item);
        } )

    }
}

// 6._.forEachRight和_.forEach的作用一样,只不过是从右边开始而已
_.forEachRight = (collection,iteratee)=>{
    if( collection == null ) {
        return "";
    }
    if(!iteratee) {
        return collection;
    }
    if( Object.prototype.toString.call(collection) === "[object Array]" ) {
        collection.reverse().forEach( (item)=>{
            iteratee(item);
        } )
    }else if( Object.prototype.toString.call(collection) === "[object Object]" ) {
        let array = Object.keys(collection).reverse();
        array.forEach( (item)=>{
            iteratee(item);
        } )

    }
}
// 7._.includes(collection, value, [fromIndex=0])的使用:
// _.includes([1, 2, 3], 1);
// // => true
 
// _.includes([1, 2, 3], 1, 2);
// // => false
 
// _.includes({ 'a': 1, 'b': 2 }, 1);
// // => true
 
// _.includes('abcd', 'bc');
// // => true
_.includes = (collection,value,fromIndex)=>{
    let resultBoo ;
    if( collection == null || !value ) {
        throw Error("first Param and second Param is required!!!");
    }
    if( Object.prototype.toString.call(collection) === "[object Array]" ) {
        resultBoo =  collection.includes(value,fromIndex);
    }else if( Object.prototype.toString.call(collection) === "[object Object]" ) {
        let array = Object.values(collection);
        resultBoo = array.includes(value,fromIndex);
    }else if( Object.prototype.toString.call(collection) === "[object String]" ) {
        if( collection.indexOf(value) !== -1 ) {
            return true
        }
        return false;
    }

    return resultBoo;
}

// 8._.invokeMap的使用:
// _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
// => [[1, 5, 7], [1, 2, 3]]
 
// _.invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]

_.invokeMap = (collection,path,arg)=>{
    let resultArray = [];
    if( Object.prototype.toString.call(path) === "[object Function]" ) {
        for( let value of collection ) {
            value = value.toString();
            resultArray.push( path.call( value,arg ) );
        }
    }else if( Object.prototype.toString.call(path) === "[object String]" ) {
        for( let value of collection ) {
            if( Object.prototype.toString.call(value) === "[object Array]" ) {
                resultArray.push( value[path]() );
            }
        }
    }else {
        return [];
    }
    return resultArray;

}
// 9._.keyBy(collection, [iteratee=_.identity])的使用:

// var array = [
//     { 'dir': 'left', 'code': 97 },
//     { 'dir': 'right', 'code': 100 }
//   ];
   
//   _.keyBy(array, function(o) {
//     return String.fromCharCode(o.code);
//   });
  // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
   
//   _.keyBy(array, 'dir');
  // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
  _.keyBy=( collection,iteratee ) =>{
    let keyArray = [];
    let resultObject = {};
    if( Object.prototype.toString.call(iteratee) === "[object Function]" ) {
        for( let [index,value] of collection.entries() ) {
            // keyArray.push( iteratee(value) );
           let key = iteratee(value);
           resultObject[key] = value;
        }

    }else if( Object.prototype.toString.call(iteratee) === "[object String]" ) {
        for( let [index,value] of collection.entries() ) {
            let key = value[iteratee];
           resultObject[key] = value;
        }
    }
    return resultObject;
}
// 10._.map跟原生的map差不多,就是参数的位置不同了而已,还有是对象和字符串也是可以传进去的
// function square(n) {
//     return n * n;
//   }
   
//   _.map([4, 8], square);
//   // => [16, 64]
   
//   _.map({ 'a': 4, 'b': 8 }, square);
//   // => [16, 64] (iteration order is not guaranteed)
   
//   var users = [
//     { 'user': 'barney' },
//     { 'user': 'fred' }
//   ];
   
//   // The `_.property` iteratee shorthand.
//   _.map(users, 'user');
//   // => ['barney', 'fred']
_.map = (collection,iteratee) => {
    let resultArray = [];
    // let tempArray = [];
    if(collection == null) {
        return [];
    }
    if(!iteratee) {
        return collection;
    }
    if( Object.prototype.toString.call( collection ) === "[object Array]" && typeof iteratee !== "string" ) {
        collection.map( (item,index)=>{
            resultArray.push( iteratee( item ) )
        } )
    }if( Object.prototype.toString.call(collection) === "[object Object]" ) {
        let tempArray = Object.values(collection);
        tempArray.map( (item,index)=>{
            resultArray.push( iteratee( item ) )
        } )
    }else {
        for(let value of collection) {
            resultArray.push( value[iteratee] );
        }
    }

    return resultArray;
}

// 11._.partition(collection, [predicate=_.identity])的使用：
// var users = [
//     { 'user': 'barney',  'age': 36, 'active': false },
//     { 'user': 'fred',    'age': 40, 'active': true },
//     { 'user': 'pebbles', 'age': 1,  'active': false }
//   ];
   
//   _.partition(users, function(o) { return o.active; });
//   // => objects for [['fred'], ['barney', 'pebbles']]
   
//   // The `_.matches` iteratee shorthand.
//   _.partition(users, { 'age': 1, 'active': false });
//   // => objects for [['pebbles'], ['barney', 'fred']]
   
//   // The `_.matchesProperty` iteratee shorthand.
//   _.partition(users, ['active', false]);
//   // => objects for [['barney', 'pebbles'], ['fred']]
   
//   // The `_.property` iteratee shorthand.
//   _.partition(users, 'active');
//   // => objects for [['fred'], ['barney', 'pebbles']]
_.partition = (collection,predicate)=>{
    let resultArray = [];
    if(collection == null) {
        return [];
    }
    if(!predicate) {
        return collection;
    }

    if( Object.prototype.toString.call(predicate) === "[object Function]" ) {
        let arr1 = [],
            arr2 = [];

        for(let value of collection) {
            if( predicate(value) ) {
                arr1.push(value);
            }else {
                arr2.push(value)
            }
        }
        resultArray.push( arr1 );
        resultArray.push(arr2)
    }else if( Object.prototype.toString.call(predicate) === "[object Object]" ) {
        let keys = Object.keys(predicate);
        let array = [];
        let arr1 = [],
            arr2 = [];
        //抽出predicate中collection相对应的值
        for( let value of collection ) {
            let obj = {};
           for(let key of keys) {
               obj[key] = value[key];
               array.push( obj );
           }
        }
        //因为循环多了,所以要去重
        array = [...new Set( array )];
        for( let [index,value] of array.entries() ) {
            if( isEqual(value,predicate) ) {
                arr1.push( collection[index] );
            }else {
                arr2.push( collection[index] );
            }
        }
        resultArray.push(arr1);
        resultArray.push( arr2 )
    }else if( Object.prototype.toString.call(predicate) === "[object Array]" ) {
        //这里提供一种思路,不提供具体实现,因为这是实现是跟 predicate是Object是一样的
        //将其转化为对象,然后按照predicate=Object方法实现
    }else {
        //字符串的实现跟上面的一样,这里也不提供具体的实现方法
    }
    // console.log(resultArray)
    return resultArray;
}
// 12._.reduce(collection, [iteratee=_.identity], [accumulator])跟原生数组的reduce功能一样
// 使用:
// _.reduce([1, 2], function(sum, n) {
//     return sum + n;
//   }, 0);
//   // => 3
   
//   _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
//     (result[value] || (result[value] = [])).push(key);
//     return result;
//   }, {});
_.reduce = (collection,iteratee,accumulator) =>{
    let result ;
    if(collection == null) {
        return ;
    }

    collection.reduce( (pre,next)=>{
        result = iteratee(pre,next);
    },accumulator );

    return result; 
}
// 14._.reduceRight只是跟_.reduce顺序不一样
_.reduceRight = (collection,iteratee,accumulator) =>{
    let result ;
    if(collection == null) {
        return ;
    }

    collection.reduceRight( (pre,next)=>{
        result = iteratee(pre,next);
    },accumulator );

    return result; 
}

// 15._.reject的思想跟_.partition是一样的,因为他们都是分类处理的

// 16._.sample(collection)
// _.sample([1, 2, 3, 4]);
// => 2
_.sample = (collection)=>{
    if(collection == null) {
        return "";
    }
    let length = collection.length;
    let value = collection[ Math.floor(Math.random()*length)  ];
    return value;
}

// 17._.sampleSize的使用：
// _.sampleSize([1, 2, 3], 2);
// => [3, 1]
 
// _.sampleSize([1, 2, 3], 4);
// => [2, 3, 1]
_.sampleSize = (collection,n) =>{
    let resultArray = [];
    if(collection == null) {
        return "";
    }
    if(!n){
        n=1;
    }
    if( n>collection.length ) {
        n= collection.length;
    }
    for( let i=0;i<n;i++ ) {
        let length = collection.length;
        let value = collection[ Math.floor(Math.random()*length)  ];
        resultArray.push(value);
    }
    return resultArray;
}
// 18._.shuffle的实现方法有很多,可以参照一下源码:
function shuffle(array) {
    const length = array == null ? 0 : array.length
    if (!length) {
      return []
    }
    let index = -1
    const lastIndex = length - 1
    const result = copyArray(array)
    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
      const value = result[rand]
      result[rand] = result[index]
      result[index] = value
    }
    return result
  }
//   19._size的使用方法：
//   _.size([1, 2, 3]);
// // => 3
 
// _.size({ 'a': 1, 'b': 2 });
// // => 2
 
// _.size('pebbles');
// => 7
_.size = (collection)=>{
    if( collection == null ) {
        return 0;
    }
    if( Object.prototype.toString.call(collection) === "[object Array]" ) {
        return collection.length;
    }else if( Object.prototype.toString.call( collection ) === "[object Object]" ) {
        let keys = Object.hasOwnProperty(collection);
        return keys.length;
    }else if( Object.prototype.toString.call( collection ) === "[object String]" ) {
        return collection.length;
    }
}