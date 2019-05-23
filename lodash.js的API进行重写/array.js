//这次我们来对lodash.js每一个向外提供的API进行解析

// loadsh.js是提供下划线(_)作为全局变量的
// 我们来简略实现一下把_传递给node.js和window
// (function(global,factory){
    
//     if(typeof module === "object" && module.exports) {
//         //node.js下的处理,将numeral变量暴露给nodeJS环境中
//         module.exports = factory();
//     }else {
//         //浏览器环境下的处理,将numeral变量暴露给window环境中
//         global.numeral = factory();
//     }
//     }
// ,(this,function(){ return _ }))



//这里是对lodash.js使用的API进行重写,主要采用ES6语法进行编写
var _;


/******************************
        Array
 * ******************************** */

//  1._.chunk()使用
//* chunk(['a', 'b', 'c', 'd'], 2)
  // => [['a', 'b'], ['c', 'd']]
 
 // chunk(['a', 'b', 'c', 'd'], 3)
  // => [['a', 'b', 'c'], ['d']]


_.chunk = (originArr,size) => {

        let newArr = [],
            arr=[];
    
        //首先对originArr进行处理,originArr是必选参数,
        if(!originArr) {
            //如果originArr为空就会报错,
            throw Error("first param is required,please check your params!");
        }else {
            //然后对size进行处理,size是可选参数
            if(!size) {
                //size不存在,就直接返回原数组
                return originArr;
            }else if(size<=0) {
                //如果size小于等于0
                newArr = [];
                return ;
            }
        }
        //对指定的size数组进行切割
        for(let i=0;i<originArr.length;i=i+size) {
            arr = originArr.slice(i,i+size);
            newArr.push( arr );
        }
        //最后返回这个新的数组,并且不会改变传进来的拿个数组
        return newArr;
    
    }


// 2._compact的使用:删除数组的所有假值
//compact([0, 1, false, 2, '', 3])
  // => [1, 2, 3]

//own:
_.compact = (originArr)=>{

        let newArr = [];
        //如果不存在(请注意这里是==,不是=== ,不要搞错,不然结果会不一样),则返回一个空数组
        if(originArr == null) {
            return [];
        }else {
            //对数组循环,如果item为true直接返回
            originArr.forEach( (item,index)=>{
                if(item){
                    newArr.push(item);
                }
            } )
        }
    
        return newArr;
    }

// 3._.concat的使用：
// var array = [1];
// var other = _.concat(array, 2, [3], [[4]]);
 
// console.log(other);
// // => [1, 2, 3, [4]]
 
// console.log(array);
// // => [1]

_.concat = (originArr,...values)=>{

        let newArray = [];
        //originArr为空时候,返回一个空数组
        if(originArr == null) {
            return [];
        }
        //遍历values数组,因为concat只会消除一层的[],所以最简单的方法是再加多一层循环
        for( const value of values ) {
            if( Object.prototype.toString.call(value) === "[object Array]" ) {
                // console.log(value)
                for( const innerValue of value ) {
                    newArray.push(innerValue);
                }
            }else {
                newArray.push(value);
            }
        }
    
        return originArr.concat(newArray);
    
}

//  4._.difference的使用:
// _.difference([2, 1], [2, 3]);
// => [1]
//originArray是必选参数,values是可选参数
_.difference = (originArray,values)=>{

        let newArray = [];
        //如果必选参数不存在,将返回空数组
        if( originArray == null ) {
            return [];
        }
        //如果可选参数不存在,将返回原始数组
        if(!values) {
            return originArray
        }
        //筛选出originArray中和values不同的值
        newArray = originArray.filter( (item,index)=>{
            for(const value of values) {
                return item !== value
            }
        } )
    
        return newArray;
}


// 5._.differenceBy的使用:
// _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2]
//originArray是一个数组,必需的参数,values是可选参数,iteratee可选参数,它是一个函数,
//这个函数跟difference差不多,差别在于它的值都会调用iteratee函数,然后返回的是没经过iteratee的那个值
_.differenceBy = (originArray,values,iteratee)=>{
        let newArray = [],//originArray经过iteratee后返回的数组
            newValues = [],//values经过iteratee后返回的数组
            tempResult = [],//经过_.difference格式化后的结果
            realResult = [],//返回的实际结果
            indexs = [];//存储实际结果的引索值
    
        //不存在格式化函数的处理
        if(iteratee == null) {
         return   _.difference(originArray,values)
        }
        //经iteratee处理
        for( const originValue of originArray ) {
            newArray.push( iteratee(originValue) );
        }
        for( const value of values ) {
            newValues.push( iteratee(value) );
        }
        tempResult= _.difference( newArray,newValues );
        //处理实际结果的引索值
        for( let i=0;i<newArray.length;i++ ) {
            for(let j=0;j<tempResult.length;j++) {
                if(newArray[i] === tempResult[j] ) {
                    indexs.push(i);
                }
            }
        }
        //得到返回的结果值
        for( const index of indexs  ) {
            realResult.push( originArray[index] )
        }
    
        return realResult;
    
}


// 6._.drop(array, [n=1])使用方法:
// _.drop([1, 2, 3]);
// => [2, 3]
 
// _.drop([1, 2, 3], 2);
// => [3]
 
// _.drop([1, 2, 3], 5);
// => []
 
// _.drop([1, 2, 3], 0);
// => [1, 2, 3]

_.drop = (originArray,n) => {
        //array为空返回一个空值
        if( originArray == null ) {
            return [];
        }
        //n为空返回n=1
        if( !n ) {
            n = 1;
        }
        //处理结果
        for( let i=0;i<n;i++ ) {
           originArray.shift();
        }
        return  originArray
}

// 7._.dropRight(array, [n=1])使用方法,跟_.drop类似,只不过是从右边开始删除
// _.dropRight([1, 2, 3]);
// => [1, 2]
 
// _.dropRight([1, 2, 3], 2);
// => [1]
 
// _.dropRight([1, 2, 3], 5);
// => []
 
// _.dropRight([1, 2, 3], 0);
// => [1, 2, 3]

// 8.dropRightWhile的使用:
// var users = [
//     { 'user': 'barney',  'active': true },
//     { 'user': 'fred',    'active': false },
//     { 'user': 'pebbles', 'active': false }
//   ];
   
//   _.dropRightWhile(users, function(o) { return !o.active; });
//   // => objects for ['barney']
   
//   // The `_.matches` iteratee shorthand.
//   _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
//   // => objects for ['barney', 'fred']
   
//   // The `_.matchesProperty` iteratee shorthand.
//   _.dropRightWhile(users, ['active', false]);
//   // => objects for ['barney']
   
//   // The `_.property` iteratee shorthand.
//   _.dropRightWhile(users, 'active');
//   // => objects for ['barney', 'fred', 'pebbles']
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

_.dropRightWhile = (originArray,predicate) => {
    let resultBoo=[],
        resultIndex=[],
        resultArray=[],
        tempObject = {},
        boo = [];
    //如果originArray为空,则返回一个空数组
    if(originArray == null) {
        return []
    }
    //如果predicate等于函数
    if(Object.prototype.toString.call(predicate)==="[object Function]"){

        resultBoo =  originArray.map( (value,index,array)=>{
             return predicate(value,index,array);
        } );
            //筛选出目标得引索值
        resultBoo.forEach( (value,index)=>{
            if(!value) {
                resultIndex.push(index);
            }
        } )
        //得到最后得结果
        for( let value of resultIndex ) {
            resultArray.push( originArray[value] )
        }
    }else if( Object.prototype.toString.call(predicate) === "[object Object]" ) {//如果predicate是对象
        for( let value of originArray  ) {
            if( !isEqual(value,predicate) ) {
                resultArray.push(value)
            }
        }
    }else if( Object.prototype.toString.call(predicate) === "[object Array]" ) {//如果predicate输数组
        //将数组转化为对象,数组的每两项代表着对象的键值对
        for( let i=0;i<= (predicate.length/2);i=i+2 ) {
            
            let arr = predicate.slice(i,i+2);
            tempObject[ arr[0] ] = arr[1];
        }
        //去除数组的项
        
        // console.log(ownPropsB)
        for( let [index,value] of originArray.entries() ) {
             let ownPropA =  Object.getOwnPropertyNames(value);
             let ownPropB = Object.getOwnPropertyNames(tempObject);
             //长度相等
             if( ownPropA.length === ownPropB.length  ) {
                if( !isEqual(tempObject,value) ) {
                    resultArray.push(value);
                }else {
                }
             }else {
                 let propObj = {};
                 let propIndex = 0 ;
                 //长度不等
                for( let tempObjectProp  of ownPropB ) {
                    propObj[tempObjectProp] = value[tempObjectProp];
                    if( JSON.stringify(propObj) !== JSON.stringify(tempObject) ) {
                        resultArray.push(originArray[propIndex])
                    }
                    propIndex++;
                }
               

            }
        }

    }else if( Object.prototype.toString.call(predicate) === "[object String]" ){//如果predicate是字符串
        // console.log( originArray.hasOwnProperty(predicate) )
        for( let [index,value] of originArray.entries() ) {
            if( value.hasOwnProperty(predicate) ){
                resultArray.push( value )
            }
        }
    }
    return resultArray;
}
// 9.dropWhile跟上面两个的API差不多的核心思想差不多,所以这里省略

// 10._fill使用:
// var array = [1, 2, 3];
 
// _.fill(array, 'a');
// console.log(array);
// // => ['a', 'a', 'a']
 
// _.fill(Array(3), 2);
// // => [2, 2, 2]
 
// _.fill([4, 6, 8, 10], '*', 1, 3);
// // => [4, '*', '*', 10]
//_.fill填充数组,array,value必选参数,start，end可选参数
_.fill = (array,value,start,end)=>{
    let resultArray = [];
    if(array == null) {
        return []
    }
    if( Object.prototype.toString.call(array) === "[object Array]" && !value ) {
        return array;
    }
    if( start && !end ) {
        resultArray = array.fill(value,start);
    }else if( start && end ) {
        resultArray = array.fill(value,start,end);
    }else {
        resultArray = array.fill(value);
    }
    return resultArray;
}

// 11._.findIndex的使用:
// var users = [
//     { 'user': 'barney',  'active': false },
//     { 'user': 'fred',    'active': false },
//     { 'user': 'pebbles', 'active': true }
//   ];
   
//   _.findIndex(users, function(o) { return o.user == 'barney'; });
//   // => 0
   
//   // The `_.matches` iteratee shorthand.
//   _.findIndex(users, { 'user': 'fred', 'active': false });
//   // => 1
   
//   // The `_.matchesProperty` iteratee shorthand.
//   _.findIndex(users, ['active', false]);
//   // => 0
   
//   // The `_.property` iteratee shorthand.
//   _.findIndex(users, 'active');
//   // => 2
//跟dropWhile的核心思想一样,可以参照dropWhile的代码结构,这里省略
// 12.findLastIndex跟findIndex差不多,这里省略

// 13._.flatten(array)的使用:这里躺平一层数组
// _.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
_.flatten = (originArray)=>{
    let resultArray = [];
    if( originArray == null ) {
        return [];
    }
    for( let value of originArray  ) {
        if(Object.prototype.toString.call(value) === "[object Array]") {
            for( let innerValue of value ) {
                resultArray.push(innerValue);
            }
        }else {
            resultArray.push(value);
        }
    }
    return resultArray;
}

//14. _.flattenDepth去除多层数组:
_.flattenArray = [];
_.flattenDepth = (array)=>{
  
    for( let value of array ) {
        if( Object.prototype.toString.call(value)==="[object Array]" ) {
            _.flattenDepth(value);
        }else {
            _.flattenArray.push(value);
        }
    }
    return _.flattenArray
}
//15._.fromPairs使用方法
// _.fromPairs([['a', 1], ['b', 2]]);
// => { 'a': 1, 'b': 2 }
_.fromPairs = (originArray)=>{
    let resultObj = {};
    if(originArray == null) {
        return {}
    }

    for( let value of originArray ) {
        let key = value[0];
        let tempValue = value[1];
        resultObj[key]=tempValue;
    }
    return resultObj;
}
// 16._.head使用方法:
// _.head([1, 2, 3]);
// // => 1
 
// _.head([]);
// // => undefined

_.head = (originArray)=>{
    if( originArray == null || originArray === [] ) {
        return ;
    }
    // 注意这里不能改变originArray,不能用队列和栈方法
    return originArray[0]
}
// 17. _.indexOf的使用：
// _.indexOf([1, 2, 1, 2], 2);
// // => 1
 
// // Search from the `fromIndex`.
// _.indexOf([1, 2, 1, 2], 2, 2);
// // => 3

_.indexOf = (originArray,value,fromIndex)=>{
    if(originArray == null) {
        return ;
    }
    if(value && fromIndex) {
        return  originArray.indexOf(value,fromIndex);
      }
    if(value) {
      return  originArray.indexOf(value)
    }

}
// 18.initial的使用
// _.initial([1, 2, 3]);
// => [1, 2]
_.initial = (array)=>{
    let resultArray = [];
    if(array == null) {
        return []
    }
    resultArray = array.slice(0,array.length-1);
    //也可以直接返回array.slice(0,array.length-1)
    return resultArray; 
}
//_.intersection([arrays])的使用
// _.intersection([2, 1], [2, 3]);
// => [2]
//求交集
_.intersection = (...originArray)=>{
    let resultArray = [];
    let length = originArray.length;
    let intersectionArray = originArray[0];
    originArray.reduce( (pre,next,index,array)=>{
        intersectionArray=intersectionArray.filter( (n)=>{
            return next.indexOf(n) != -1;
        } )
    } ) 
    
    return intersectionArray;

}

// 19._.intersectionBy(多加了一个为数组使用一个函数)和20._.intersectionWith原理基本一样,感兴趣的可以自己写,

// 21._.join的使用
// _.join(['a', 'b', 'c'], '~');
// => 'a~b~c'
_.join = (originArray,separator)=>{
    if( originArray == null ) {
        return []
    }
    if(!separator) {
        separator=",";
    }
    return originArray.join(separator);
}
// 22_.last
// _.last([1, 2, 3]);
// => 3
_.last = (originArray) =>{
    if(originArray == null) {
        return 0;
    }
    return originArray[ originArray.length-1 ];
}

// 23.lastIndexOf
_.lastIndexOf = (originArray,value,fromIndex)=>{
    if(originArray == null) {
        return ;
    }
    if(value && fromIndex) {
        return  originArray.lastIndexOf(value,fromIndex);
      }
    if(value) {
      return  originArray.lastIndexOf(value)
    }

}

// 24. _.nth
_.nth = (originArray,n)=>{
    if( originArray == null ) {
        return ;
    }
    //默认返回第一个元素
    if( !n ) {
       return originArray[0];
    }

    let length = originArray.length;
    if(n>originArray.length) {
        n = originArray.length-1;
    }
    if( n<0 ) {
        n = n+originArray.length;
    }
    return originArray[n];
}
// 25._.plull
// var array = ['a', 'b', 'c', 'a', 'b', 'c'];
 
// 26_.pull(array, 'a', 'c');的使用
// console.log(array);
// _.pull = (originArray,...str)=>{
//     console.log(str)
// }
// _.pull(array, 'a', 'c')
_.pull = (originArray,...str)=>{

    if(originArray==null) {
        return [];
    }
    if(str.length === 0) {
        return originArray
    }

    let resultArray = originArray;
    for( let i=0;i<str.length;i++ ) {
        // console.log(str[i]);
        let tempValue = str[i];
        resultArray= resultArray.filter( (item)=>{
            return item !== tempValue;
        } )
    }

    return resultArray;
}
//27.pullAll使用:
// var array = ['a', 'b', 'c', 'a', 'b', 'c'];
 
// _.pullAll(array, ['a', 'c']);
// // => ['b', 'b']
_.pullAll = (originArray,strArray)=>{
    if(originArray==null) {
        return [];
    }
    if(strArray.length === 0) {
        return originArray
    }

    let resultArray = originArray;
    for( let i=0;i<strArray.length;i++ ) {
        // console.log(str[i]);
        let tempValue = strArray[i];
        resultArray= resultArray.filter( (item)=>{
            return item !== tempValue;
        } )
    }

   return resultArray;
}

// 28.pullAllBy和pullAllWith的思想跟上面两个一样

// 29._.pullAt:
// var array = ['a', 'b', 'c', 'd'];
// var pulled = _.pullAt(array, [1, 3]);
// => ['a', 'c']
_.pullAt = (originArray,indexsArray)=>{

    var resultArray = originArray;
    for( let i=0;i<indexsArray.length;i++ ) {
       resultArray =  resultArray.filter( (item)=>{
            return item !== originArray[indexsArray[i]];
        } )
    }
    return resultArray;
}
// 30._.remove:
// var array = [1, 2, 3, 4];
// var evens = _.remove(array, function(n) {
//   return n % 2 == 0;
// });
 
// console.log(array);
// => [1, 3]
 
// console.log(evens);
// => [2, 4]
_.remove = (originArray,func)=>{
    let arrBoo = [];
    let resultArray = [];
    originArray.forEach( (item)=>{
        arrBoo.push(func(item));
    } )

    for( let [index,value] of arrBoo.entries() ) {
        if(value) {
            resultArray.push( originArray[index] );
        }else {

        }
    }

    for( let i=0;i<resultArray.length;i++ ){
        let index = originArray.indexOf( resultArray[i] )
        originArray.splice(index,1);
    }
    return resultArray;

}

// 31.reverse的使用:
// var array = [1, 2, 3];
 
// _.reverse(array);
// => [3, 2, 1]
 
// console.log(array);
// => [3, 2, 1]
_.reverse = (originArray)=>{
    if(originArray == null) {
        return [];
    }
    return originArray.reverse();
}
// 32.slice跟Array.slice差不多
_.slice = (array,start,end) => {
    let resultArray = [];
    if( array == null ) {
        return [];
    }
    if(!start) {
        start = 0;
    }
    if(!end) {
        end = array.length;
    }
    resultArray = array.slice(start,end);
    return resultArray;
}
// 33.sortedIndex的使用:
// _.sortedIndex([30, 50], 40);
// => 1
_.sortedIndex = (originArray,value) =>{
    let resultIndex ;
    originArray.sort( (pre,next)=>{
        return pre-next;
    } )
    for(let i=0;i<originArray.length;i++) {
        if( value > originArray[i] && value<=originArray[i+1] ){
            resultIndex = i+1;
        }      
    }
    return resultIndex;

}
// 34.sortedIndexBy的使用:
// var objects = [{ 'x': 4 }, { 'x': 5 }];
 
// _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
// => 0
_.sortedIndexBy = (array,obj,func)=>{
    let resultIndex;
    if(array == null) {
        return ;
    }

    for(let i=0;i<array.length;i++) {
        if(isEqual(obj,array[i])) {
            resultIndex = i;
        }
    }
    return resultIndex;
}
// 35._.sortedIndexOf(array, value)的方法与sortedIndex类似,这里省略,感兴趣可以自己尝试
// 36. _.sortedLastIndex与sortedIndex类似,只不过这个是从后面开始搜索,这里省略,感兴趣可以自己尝试
// 37.sortedLastIndexBy与sortedIndexBy类似,只不过这个是从后面开始搜索,这里省略,感兴趣可以自己尝试
// 38._.sortedUniq(array)使用：
// _.sortedUniq([1, 1, 2]);
// => [1, 2]
//排序加去重
_.sortedUniq = (originArray) =>{
    originArray.sort( (pre,next)=>{
        return pre-next;
    } )
    //ES6数组方法,当然也可以使用ES5的方法去重
    let uniqArray = new Set(originArray);
    return Array.from(uniqArray);
}
// 39.sortedUniqBy跟sortedUniq差不多,只不过是多了一个函数去处理数组的每一个值,然后排序去重在返回一个处理后的数组
// 40_.tail
// _.tail([1, 2, 3]);
// => [2, 3]

//去除数组的第一个属性
_.tail = (originArray)=>{
    let resultArray = [];
    // 这个方法是不改变orginArray的值,如果改变的话可以直接用shift
    resultArray = originArray.filter( (item,index)=>{
        return index !== 0;
    } )
    return resultArray;
}
// 41._take的使用
// _.take([1, 2, 3]);
// => [1]
 
// _.take([1, 2, 3], 2);
// => [1, 2]
 
// _.take([1, 2, 3], 5);
// => [1, 2, 3]
 
// _.take([1, 2, 3], 0);
// => []

_.take = (originArray,n) =>{
    let resultArray = [];
    if(originArray == null) {
        return [];
    }
    if(!n) {
        n=1;
    }
    n = n>originArray.length?originArray.length:n;

    for(let i=0;i<n;i++) {
        resultArray.push( originArray[i] );
    }

    return resultArray;
}
// 42._.takeRight跟take差不多:
_.takeRight = (originArray,n) =>{
    let resultArray = [];
    if(originArray == null) {
        return [];
    }
    if(!n) {
        n=1;
    }
    let realLength = originArray.length-n;
    for( let i=0;i<realLength;i++ ) {
        //这个是改变原数组(originArray)的,
        originArray.shift();
    }

    return originArray;    
}
// 43.takeRightWhile和takeWhile的核心思想跟之前写的差不多,都是根据不同的类型做出不同的处理

// 44._.union使用:
// _.union([2], [1, 2]);
// 求并集:

_.union = (...arrays)=>{
    let resultArray = [];
    
    if(arrays == null) {
        return [];
    }
    if(arrays[1] == null) {
        return arrays[0]
    }
    for(let i=0;i<arrays.length;i++) {
        resultArray.push(...new Set(arrays[i]));
    }

    return [ ... new Set(resultArray) ] ;
}

// 45.unionBy和unionWith的思想跟_.union差不多,只不过是多了一步处理而已

// 46_.uniq的使用
// _.uniq([2, 1, 2]);
// => [2, 1]
_.uniq = (originArray)=>{
    originArray.sort( (pre,next)=>{
        return pre-next;
    } )
    return originArray;
}
// 47.xor的使用:
// _.xor([2, 1], [2, 3]);
// => [1, 3]
//去除数组之间相同的元素
_.xor = (...arrays)=>{
    if(arrays==null) {
        return [];
    }
    let resultArray = [];
    //得到交集数组
    let intersectionArray =  _.intersection(...arrays);
    //得到全部数组的组合
    let allArray = [];
    for( let i=0;i<arrays.length;i++ ) {
        allArray=allArray.concat(arrays[i]);
        allArray=[...new Set(allArray)];
    }
    for( let i=0;i<intersectionArray.length;i++ ) {
        resultArray = _.pull( allArray, intersectionArray[i]);
    }
    return resultArray;
}


