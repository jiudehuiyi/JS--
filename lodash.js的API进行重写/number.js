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