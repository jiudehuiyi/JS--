// ( function(global,factory){
//      //amd下的处理
//      if(typeof define === "function" && define.amd) {
//         define(factory);
//     }else if(typeof module === "object" && module.exports) {
//         //node.js下的处理
//         module.exports = factory();
//     }else {
//         //浏览器环境下的处理,在window变量中定义了一个变量numeral
//         global.numeral = factory();
//     }
// }(this,function(){
//     return 2222
// }) )
// console.log( numeral(1024).format("10kb") )
