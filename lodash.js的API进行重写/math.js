
/************
 *  Math
 *  */
// 1._.add
_.add = (...args) => {
    let addResult ;
    addResult = args.reduce( (pre,next) =>{
        return pre+next;
    } );
    return addResult;

}
//2._.ceil
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
// 3._.divide
_.divide = (dividend, divisor)=>{
    return dividend / divisor;
}
// 4._.floor与_.ceil原理相同,这里省略不写,感兴趣可以自己补充

// 5._.max
_.max  = (array) => {
    //参数为空数组
    if( Object.prototype.toString.call(array)==="[object Array]" && !array.length  ) {
        return [];
    }

    return Math.max.apply( null,array );

} 
// 6._maxBy
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
// 7._.mean(array)
_.mean = (array)=>{
    let total = 0;
    for( let value of array ) {
        total+=value;
    }
    return total/(array.length)
}
//8_.min跟_.max实现一样
_.min = (array) =>{
     //参数为空数组
     if( Object.prototype.toString.call(array)==="[object Array]" && !array.length  ) {
        return [];
    }

    return Math.min.apply( null,array );

}
// 9. _.minBy跟_.maxBy实现一样
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
//10 ._.multiply
//这里是对乘法函数进行拓展,允许传入多个参数进行相乘
_.multiply = (...args) =>{
    let result ;
    result = args.reduce( (pre,next)=>{
        return pre*next
    } )
    return result;
}
// 11._.round得思想和方法跟_.ceil和_.floor一样

// 12. _.subtract对减法进行拓展,允许传入多个参数进行相减
_.subtract =(...args)=>{
    let result ;
    result = args.reduce( (pre,next) =>{
        return pre-next;
    } )
    return result;
}
//13._.sum
_.sum = (...args) => {
    let result;
    result = args.reduce( (pre,next) =>{
        return pre+next;
    } )
    return result;
}
// 14. _.sumBy
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

