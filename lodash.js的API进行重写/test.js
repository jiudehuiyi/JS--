var _={} ;


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

//array是必选参数,而values是可选参数
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

_.dropRight = (originArray,n)=>{
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
           originArray.pop();
        }
        return  originArray
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

_.head = (originArray)=>{
    if( originArray == null || originArray === [] ) {
        return ;
    }
    // 注意这里不能改变originArray,不能用队列和栈方法
    return originArray[0]
}

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

_.initial = (array)=>{
    let resultArray = [];
    if(array == null) {
        return []
    }
    resultArray = array.slice(0,array.length-1);
    //也可以直接返回array.slice(0,array.length-1)
    return resultArray; 
}
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

_.join = (originArray,separator)=>{
    if( originArray == null ) {
        return []
    }
    if(!separator) {
        separator=",";
    }
    return originArray.join(separator);
}

_.last = (originArray) =>{
    if(originArray == null) {
        return 0;
    }
    return originArray[ originArray.length-1 ];
}

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

_.pullAt = (originArray,indexsArray)=>{

    var resultArray = originArray;
    for( let i=0;i<indexsArray.length;i++ ) {
       resultArray =  resultArray.filter( (item)=>{
            return item !== originArray[indexsArray[i]];
        } )
    }
    return resultArray;
}
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

_.reverse = (originArray)=>{
    if(originArray == null) {
        return [];
    }
    return originArray.reverse();
}

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
//排序加去重
_.sortedUniq = (originArray) =>{
    originArray.sort( (pre,next)=>{
        return pre-next;
    } )
    //ES6数组方法,当然也可以使用ES5的方法去重
    let uniqArray = new Set(originArray);
    return Array.from(uniqArray);
}

//去除数组的第一个属性
_.tail = (originArray)=>{
    let resultArray = [];
    // 这个方法是不改变orginArray的值,如果改变的话可以直接用shift
    resultArray = originArray.filter( (item,index)=>{
        return index !== 0;
    } )
    return resultArray;
}

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

_.zip = (...arrays)=>{

    let resultArray = [[],[]];

    for(let i=0;i<arrays.length;i++) {
        resultArray[0][i] = arrays[i][0];
        resultArray[1][i] = arrays[i][1]
    }
    return resultArray;
}

_.zip(['a', 'b'], [1, 2], [true, false]);
// => [['a', 1, true], ['b', 2, false]]


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

_.flatMap=(collection,iteratee)=>{
    let resultArray = [];
    collection.forEach( (item,index)=>{
        resultArray.push( iteratee(item) );
    } )
    // flatten是展平数组
    resultArray = _.flatten(resultArray);
    return resultArray;
}

_.flatMapDeep=(collection,iteratee)=>{
    let resultArray = [];
    collection.forEach( (item,index)=>{
        resultArray.push( iteratee(item) );
    } )
    // flatten是展平数组
    resultArray = _.flattenDepth(resultArray);
    return resultArray;
}

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

_.sample = (collection)=>{
    if(collection == null) {
        return "";
    }
    let length = collection.length;
    let value = collection[ Math.floor(Math.random()*length)  ];
    return value;
}

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

/*******
 *  Function
 * ******* */

_.after = (n,func)=>{

    if( typeof func != "function" ) {
        throw new TypeError("Expected a Function");
    }

    return function(...arg){
        if(--n>1) {
            return func.apply(this,arg);
        }
    }

}

_.ary = (func,...args)=>{
    if( typeof func != "function" ) {
        throw new TypeError("Expected a Function");
    }
    return function(){
        return func.apply(this);
    }
}
/*******
 *  lang
 * ******* */

_.castArray = ( value )=>{


    if( Object.prototype.toString.call( value ) === "[object Array]" ) {
        return value
    }else {
        return [ value ]
    }
}
//浅拷贝,在这里只是拓展了不只是对对象进行浅拷贝而已
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

_.eq = (value,other) => {
    if( value == null || other == null ) {
        throw Error("required a param");
    }
    if( isNaN(value) && isNaN(other)) {
        return true;
    }

    return value === other;
}

_.gt = (value,other)=>{
    if (!(typeof value == 'string' && typeof other == 'string')) {
        value = +value
        other = +other
      }
      return value > other
}

 _.gte=(value, other)=> {
    if (!(typeof value == 'string' && typeof other == 'string')) {
      value = +value
      other = +other
    }
    return value >= other
  }

_.isArguments = (value) => {
    return Object.prototype.toString.call(value) === "[object Arguments]"
}  

_.isArray = (value)=>{
    return Object.prototype.toString.call(value) === "[object Array]";
}
_.isArrayBuffer = (value) => {
    return Object.prototype.toString.call( value ) === "[object ArrayBuffer]"
}

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
_.isBoolean = (boo) => {
    return Object.prototype.toString.call(boo) === "[object Boolean]";
}

_.isDate = (date)=>{
    return Object.prototype.toString.call( date ) === "[object Date]";
}
_.isObjectLike = (value) =>{
    return typeof value == "object" && value !== null;
}
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
_.isElement = (value) =>{
    return _.isObjectLike(value) && value.nodeType === 1 && !_.isPlainObject(value);
}
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
_.isEqual=(obj1,obj2)=>{
        //isEqual函数是在array.js文件里面,详细可以看文件里面的isEqual函数
    return isEqual(obj1,obj2)
}

_.isError = (value) =>{
    if (!isObjectLike(value)) {
        return false
      }
    return Object.prototype.toString.call( value ) === "[object Error]" || Object.prototype.toString.call(value) === "[object DOMException]"  
}

_.isFinite = (value) => {
    if( typeof value === "string" ) {
        return false;
    }
    return isFinite(value)
}
_.isFunction = (value)=>{
    let type = Object.prototype.toString.call(value);
    if(value == null) {
        throw Error("Excepted a Function");
    }
    return type === "[object Function]" || type === "[object AsyncFunction]" || type === "[object GeneratorFunction]" || type === "[object Proxy]"  ;
}
_.isInteger = (value)=>{
    return Number.isInteger(value);
}

_.isLength = (value)=>{
    return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}

_.isMap = (value) => {
    return Object.prototype.toString.call( value ) === "[object Map]";
}

_.isMatch = (obj,match)=>{
    let keys = Object.keys(match);
    for( let i=0;i<keys.length;i++ ) {
        if( match[keys[i]] !== obj[ keys[i] ] ) {
            return false;
        }
    }
    return true;
}

_.isNaN = (value) =>{

    if(value === undefined) {
        return false;
    }
    return isNaN(value);
}
_.isNil = (value)=>{
    return value == null;
}
_.isNull = (value) => {
    return value === null;
}
_.isNumber = (value) =>{

    return typeof value == "number" ||
        (_.isObjectLike(value) && Object.prototype.toString.call(value) === "[object Number]" );

}
_.isObject = (value) =>{
    return typeof value != null && (typeof value == "object" || typeof value == "function" )
}
_.isObjectLike = (value) =>{
    return typeof value == 'object' && value !== null
}
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
_.isRegExp =(value) =>{
    return Object.prototype.toString.call( value ) === "[object RegExp]";
}

_.isSet = (value) =>{
    return Object.prototype.toString.call(value) === "[object Set]";
}

_.isString = (value) => {
    return typeof value === "string";
}

_.isSymbol = (value)=>{
    return Object.prototype.toString.call( value ) === "[object Symbol]";
}

_.isUndefined = (value) =>{
    return value === undefined;
}

_.isWeakMap = (value) =>{
    return Object.prototype.toString.call( value ) === "[object WeakMap]";
}
_.isWeakSet = (value) =>{
    return Object.prototype.toString.call( value ) === "[object WeakSet]"
}
_.lt = (value,other) =>{
    if (!(typeof value == 'string' && typeof other == 'string')) {
        value = +value
        other = +other
      }
      return value < other
}

_.lte = (value,other) =>{
    if (!(typeof value == 'string' && typeof other == 'string')) {
        value = +value
        other = +other
      }
      return value <= other
}
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
_.toInteger = (value) =>{
    const result = toFinite(value);
    const remainder = result%1;

    return remainder?result-remainder:result;
}
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
_.toPlainObject = (value) =>{
    let obj = Object(value);
    let resultObj = {};
    for( let key in obj ) {
        if( obj.hasOwnProperty(key) ) {
            resultObj[key] = obj[key];
        }
    }
}

_.toString = (value) =>{
    if( value == null ) {
        return String(value)
    }
    return value.toString(value);
}


/***************
 *   Math
 * 
 */

_.add = (...args) => {
    let addResult ;
    addResult = args.reduce( (pre,next) =>{
        return pre+next;
    } );
    return addResult;

}

_.ceil = (value,n) =>{
    const func = Math.ceil;
    return (number, precision) => {
      precision = precision == null ? 0 : (precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292))
      if (precision) {
        let pair = `${number}e`.split('e')
        const value = func(`${pair[0]}e${+pair[1] + precision}`)
  
        pair = `${value}e`.split('e')
        return +`${pair[0]}e${+pair[1] - precision}`
      }
      return func(number)
    }
}

_.divide = (dividend, divisor)=>{
    return dividend / divisor;
}

_.max  = (array) => {
    //参数为空数组
    if( Object.prototype.toString.call(array)==="[object Array]" && !array.length  ) {
        return [];
    }

    return Math.max.apply( null,array );

} 

_.maxBy = (values,iteratee) =>{

    if( Object.prototype.toString.call( iteratee ) === "[object Function]" ) {
        let result = [];
        let number,index ;
        for( let value of values ) {
            result.push( iteratee(value) );
        }
        number = _.max(result);
        index = result.indexOf(number);
        return values[index];
    }else if( Object.prototype.toString.call( iteratee ) === "[object String]" ) {
        let key = iteratee;
        let result=[];
        let number,index ;
        for( let value of values ) {
            result.push( value[key] );
        }
        number = _.max( result );
        index = result.indexOf(number);
        return values[index];
    }



}

_.mean = (array)=>{
    let total = 0;
    for( let value of array ) {
        total+=value;
    }
    return total/(array.length)
}

_.min = (array) =>{
    //参数为空数组
    if( Object.prototype.toString.call(array)==="[object Array]" && !array.length  ) {
       return [];
   }

   return Math.min.apply( null,array );

}
_.minBy = (values,iteratee) =>{
   

   if( Object.prototype.toString.call( iteratee ) === "[object Function]" ) {
       let result = [];
       let number,index ;
       for( let value of values ) {
           result.push( iteratee(value) );
       }
       number = _.min(result);
       index = result.indexOf(number);
       return values[index];
   }else if( Object.prototype.toString.call( iteratee ) === "[object String]" ) {
       let key = iteratee;
       let result=[];
       let number,index ;
       for( let value of values ) {
           result.push( value[key] );
       }
       number = _.min( result );
       index = result.indexOf(number);
       return values[index];
   }



}

_.multiply = (...args) =>{
    let result ;
    result = args.reduce( (pre,next)=>{
        return pre*next
    } )
    return result;
}

_.subtract =(...args)=>{
    let result ;
    result = args.reduce( (pre,next) =>{
        return pre-next;
    } )
    return result;
}

_.sum = (array) => {
    let result;
    result = array.reduce( (pre,next) =>{
        return pre+next;
    } )
    return result;
}

_.sumBy = (array,iteratee) =>{

    if(array == null) {
        return "";
    }
    if( iteratee == null ) {
        return array;
    }

    if( Object.prototype.toString.call( iteratee ) === "[object Function]" ) {
        let resultArray = [];
        for(let value of array) {
            resultArray.push( iteratee(value) );
        }
       return _.sum( resultArray );
    }else if( Object.prototype.toString.call( iteratee ) === "[object String]" ) {
        let resultArray = [];
        for( let value of array ) {
            resultArray.push( value[iteratee] );
        }
        return _.sum( resultArray );
    }

}
/*********
 * Number
 * 这个模块只有三个函数,比较简单
 */

 _.clamp = (...args) =>{
    let resultArray = [];
    resultArray = args.sort(  (pre,next) =>{
        return pre-next;
    }  );
    return resultArray[1];
 }

 _.inRange=(arg1,arg2,arg3)=>{
    return arg1>arg2&&arg1<arg3
 }
 _.random = (start,end,floating) =>{
     if( !start ) {
         start = 0;
     }
     if( !end ) {
         end = 1;
     } 
     if( floating ) {
         //返回浮点数
         let result ;
         result = Math.random()*(end-start);
         return result.toFixed(2);//这里取多少为小数由你决定,
     }else {
         return Math.floor( Math.random()*(end-start) );
     }
 }
/*************
 *  Object
 */


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

_.create = (prototype,properties)=>{
    prototype=prototype === null?null:Object(prototype);
    //创建一个对象,他是以prototype为原型得
    const result = Object.create(prototype);
    return properties == null ? result:Object.assign(prototype,result);
}

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

_.forIn = (object,func)=>{
    //简单来做可以这样写
    for( let key in object ) {
       func(object[key],key);
    }
}

_.forOwn = (object,func) =>{
        //简单来做可以这样写
        for( let key in object ) {
            if( object.hasOwnProperty(key) ) {
                func(object[key],key);
            }
         }
}

_.functions = (object) =>{
    let resultArray = [];
    
    for( let key in object ) {
        if( object.hasOwnProperty(key) ) {
            resultArray.push( object[key] );
        }
    }
    return resultArray;

}
_.functionsIn = (object)=>{
    let resultArray = [];
    
    for( let key in object ) {
            resultArray.push( object[key] );
    }
    return resultArray;
}

_.invert = (object)=>{
    let keys = Object.keys(object);
    let resultObject = {};
    for(let key of keys) {
        resultObject[ object[key] ] = key; 
    }
    return resultObject;
}
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
_.keysIn = (object)=>{
    let result = [];
    for( var key in object ) {
        result.push(key);
    }
    return result;

}

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
_.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
    return key + value;
})
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
_.valuesIn = (object) => {
    if(object == null) {
        return [];
    }
    let values = [];
    for( let key in object ) {
            values.push( object[key] );
    }
}
_.values({name:"huang",age:20})


/*****
 * String
 * ***** */

_.camelCase = (string) => {
    if( string == null ) {
        return "";
    }
    let str = "";
    str = string.replace( /[-_\s]+(.)?/g,(match,c)=>{
        return c?c.toLowerCase():"";
    } );
    return str.replace(/^\w/,str[0].toLowerCase())
}
_.capitalize = (string) =>{

    let str = "";
    for( let i=0;i<string.length;i++ ) {
        if( i===0 ) {
            str += string[0].toUpperCase();
        }else {
            str += string[i].toLowerCase();
        }
    }
    return str;
}

_.endsWith = (string,target,position)=>{

    if(position == null) {
        position = string.length;
    }
    let length = position-1;
    let endStr = string[length];

    if( endStr === target ) {
        return true;
    }
    return false;

}

_.kebabCase = (string)=>{
    return str.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}

_.pad = (string,length,chars) =>{

    if(string.length<length) {
        let resultArray = new Array(length);
        if(!chars) {
            chars = " ";
        }
        resultArray = string.split("");
        for( let i=0;i<length-string.length;i++ ) {
            if( chars.length >(length-string.length)  ) {
                return string
            }else {
                resultArray.unshift(chars);
                i = i+chars.length;
                resultArray.push(chars);
                i = i+chars.length;
            }
        }
        return resultArray.join(",").replace(/,/g,"");

    }else {
        return string;
    }
}

_.parseInt = (string,radix) =>{
    if( radix == null ) {
        radix = 10;
    }
    return parseInt(string,radix);
}

_.repeat = (string,n)=>{
    let str = "";
    if(n == null) {
        n=1;
    }
    if( n == 0) {
        return ""
    }
    for(let i=0;i<n;i++) {
        str += string;
    }
    return str;
}

_.replace = (string,pattern,replacement)=>{
    return string.replace(pattern,replacement);
}

_.split = (string,separator,limit)=>{

    if(!limit) {
        return string.split(separator);
    }else {
        let arr = string.split(separator);
        arr.splice(limit,1)
        return arr;
    }

}

_.toLower = (string) =>{
    return string.toLowerCase()
}
_.toUpper = (string) =>{
    return string.toUpperCase();
}

_.trim = (string,chars) => {
    if(chars == null) {
        chars = " ";
    }
    if( Object.prototype.toString.call( string ) === "[object String]" ) {
        let regExp = new RegExp(chars,"gi");
        return string.replace(regExp,"");
    }else if( Object.prototype.toString.call( string ) === "[object Array]" ) {
        let result = [];
        let regExp = new RegExp(chars,"gi");
        for( let value of string ) {
            result.push( string.replace(regExp,"") );
        }
        return result;
    }
}

