    

// 1.async/await是Generator的语法糖,只是把async替换了*,await替换了yield,并且内置了执行器,Generator是没有内置执行器的,他是可以依靠co模块来达到跟async/await一样的作用


// 2.iterator接口是可以被for of循环的,就必需在其或者其原型链实现一个Symbol.iterator方法,
// 而能被for of循环的实质是具有next方法,每次调用next方法就会返回一个对象,包括value和done两个属性

//直接为一个对象实现一个iterator接口：
// let obj = {
//     name:"huang",
//     age:18,
//     job:"Web",
//     [Symbol.iterator](){
//         let that = this;
//         let key = Object.keys(this);
//         let index = 0;
//         return {
//             next(){
//                 if( index < key.length ) {
//                     return {  
//                         value:that[ key[index++] ],
//                         done:false
//                     }
//                 }else {
//                     return {
//                         value:undefined,
//                         done:true
//                     }
//                 }
//             }
//         }

//     }
// }

// for( let key of obj ){
//     console.log( key )
// }

// 在对象的原型链部署一个iterator接口
// Object.prototype[Symbol.iterator] = function(){
//     let that = this;
//     let key = Object.keys(that);
//     let index = 0;
//     return {
//         next(){
 
//             if( index < key.length ) {
//                 return {
//                     value:that[ key[index++] ],
//                     done:false
//                 }
//             }else {
//                 return {
//                     value:undefined,
//                     done:true
//                 }
//             }
//         }
//     }

// }

// let obj = {
//     name:"huang",
//     age:20
// }

// for( let value of obj ) {
//     console.log( value )
// }

// 3.requestAnimationFrame比setTimeout/setInterval的好处:
// 采用的是系统的时间间隔,而不是最短的时间间隔,以达到最佳的性能效果,
// requestAnimationFrame会把所有的dom集中起来,以一次的重绘或者回流一次进行，以达到性能的最优
// 使用例子:
// function requestAnimationFrameCallback(){

//     let div = document.querySelector("#test2");
//     div.style.width = parseInt( div.style.width )+1+"px";
//     if( parseInt( div.style.width ) < 200 ) {
//         window.requestAnimationFrame( requestAnimationFrameCallback )
//     }

// }
// window.requestAnimationFrame( requestAnimationFrameCallback )


// 4.webWorker：在标准中是可以开启一个子线程,但是它是受主线程控制,并且不可以操作DOM的,只有主线程可以操作DOM，所以本质上还是单线程,并不是表面上的多线程,它们的通信是通过postMessage/onmessage进行通信的
// 例如:
// 在主线程中:
// let worker = new Worker("./new.js");//创建一个子线程
// worker.postMessage("Hello!!");//向子线程发送消息
// //接收子线程的消息
// worker.onmessage = function(e){
//     console.log( e.data );//HI
//     worker.terminate();//结束线程
// }

// // 子线程
// onmessage = function(e){
//     console.log( e.data );//Hello
//     postMessage( "HI" );//向主线程发送消息
// }

// 5.事件代理:
// 事件处理是经过三个阶段:捕获阶段=>目标阶段=>捕获阶段.
// 而事件代理又称事件代理,是将其事件绑定在它的祖先元素DOM中，通过冒泡去触发事件,事件代理应用广泛,react的事件处理机制也是这样,在顶层只有一个事件处理器,这样有什么好处呢?
// 首先是避免绑定过多事件，导致网页性能下降,可以通过这样去减少注册事件数
// 然后是当添加DOM子节点的时候,是不在需要再次绑定事件,
// 最后是当删除DOM节点的时候,我们不用担心事件无法被回收,导致性能有所下降

// 例如将页面上所有的点击事件都绑定在document上:
// document.addEventListener("click",function(){
    //在document下的所有节点触发了click事件,都会冒泡到document中，从而触发指定的函数
// })

// 6.跨域:只要协议,主机,端口其中一个不一样都可以称为跨域
// 跨域的方法主要有以下三种常用的:
// 1.jsonp:它是通过script标签来进行的,因为一般标签有src属性是不受跨域限制,例如img标签也一样,但是jsonp只支持get方法,且数据量少.
// // 2.cors：这种方法是最常用的,但是需要后台配置,前端并不需要做什么工作
// 例如node中这样设置:
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'XXX');
//     res.setHeader('Access-Control-Allow-Headers', 'XXX'); //允许返回的头
//     res.setHeader('Access-Control-Allow-Methods', 'XXX');//允许使用put方法请求接口
//     res.setHeader('Access-Control-Max-Age', 6); //预检的存活时间
//     if(req.method === "OPTIONS") {
//         res.end(); //如果method是OPTIONS，不做处理
//     }
// });
// 3.nginx反向代理:需要修改nginx配置即可解决跨域问题

// 7.异步加载script脚本的方式:

//7.1.使用script标签中的defer属性(HTML4增加的):
// 特点:等页面渲染完毕才执行,当多个script且属性为defer的时候,是能保证执行顺序的
// 7.2:使用script标签中的async属性(HTML5增加的):
// 特点：当脚本下载完毕就可以立即执行,当多个script且属性为async的时候,是不能保证执行顺序的
// 7.3.动态创建加载script脚本:例如
// function loadScript(){
//     let sc = document.createElement("script");
//     sc.src = "xx.js";
//     document.body.appendChild(sc);
// }
// 8.一道难以理解而且知识点深一点的题:
// 以下什么情况打印出1
// if(a == 1 && a == 2 && a == 3) {
//     console.log(1);
// }
// 8.1：a为基本类型是不可能存在这样的数,当a为对象的时候,才有那么一点可能,
// 当对象遇到==会进行隐式转换的,对象转换为基本类型一般通过toString,valueOf进行转换,但是深入一点,当对象存在toPrimitive方法的优先级是最高的,会执行此方法进行转换,所以目的就很明显,可以对此方法操作,当然也可以重写toString,valueOf方法
// 我们来实现一下这个toPrimitive方法
// let a = {
//     //采取一个闭包存储i的值
//     [Symbol.toPrimitive]:(function(){
//         let i = 1;
//         return function(){ 
//             return i++;
//          }
//     })()
// }
// if(a == 1 && a == 2 && a == 3) {
//     console.log(1);
// }

// 8.2在window对象中定义一个a属性:Object.defineProperty或者用ES6的代理(Proxy)更强大更方便
// let val = 1;
// Object.defineProperty( window,a,{
//     get:function(){
//         return val++;
//     }
// } )

// 9.一道来自阿里巴巴的面试题:
// 下面这段代码的输出是什么:
// function Foo() {
//     getName = function() {console.log(1)};
//     return this;
// }
// Foo.getName = function() {console.log(2)};
// Foo.prototype.getName = function() {console.log(3)};
// var getName = function() {console.log(4)};
// function getName() {console.log(5)};

// Foo.getName();//2
// getName();//4
// Foo().getName();//1
// getName();//1
// new Foo.getName();//2
// new Foo().getName();//3
// new new Foo().getName();//3

// 10.new的实现原理:
// 1.创建一个对象
// 2.连接原型
// 3.绑定构造函数this
// 4.返回这个对象(如果构造函数返回的不是对象或者没有返回值)  

// function myNew(){
//     let target = {};

//     let [Con,...args] = [...arguments];//获取构造函数和其余参数

//     target.__proto__ = Con.prototype;//连接原型

//     let result = Con.apply(target,args);//绑定this,并且获取构造函数中的返回值

//     return typeof result === "object"?result : target;
// }

// 11.实现一个深浅拷贝:
// 浅拷贝:使用Object.assign或者...
// 深拷贝:
// function deepClone(obj){
//     if( obj instanceof Date ) { return new Date(obj); }
//     if( obj instanceof RegExp ) { return new RegExp(obj); }

//     if( obj === null || typeof obj !== "object" ) {
//         return obj;
//     }

//     //新建一个对象或者数组,简便就这样写obj.constructor,不用在判断是对象或者数组
//     let result = new obj.constructor();

//     for( let key in obj ){
//         if(obj.hasOwnProperty(key)){
//             result[key] = deepClone(obj[key]);
//         }
//     }
//     return result;
// }
// 12.获取指定字符串的值
// function getUrlParam(sUrl, sKey) {
    
//     if(sKey == null){ return {} };
   
//     let result = [];
//     sUrl.replace( /(\w+)=(\w+)/g,function(w,k,v){

//         if( sKey == k ){
//             result.push( parseInt(v) );
//         }
//     } );
//     return result;
// }


// console.log( getUrlParam("http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe","key") )

// 13.实现一个once函数,传入的函数只执行一次:
// function once(func){

//     let flag = true;
//     return function(){
//         if(flag){
//             func.apply(this,arguments);
//             falg = false;
//         }
//         return undefined;
//     }

// }

// 14.使用setTimeout实现setInterval:
// setTimeout( function(){
//     //code here
//     setTimeout(arguments.callee,2000);//arguments.callee指代的是arguments参数的函数,也就是setTimeout第一个参数
// },2000 )

// 15.实现一个sleep效果:例如在ms毫秒后输出2222
//使用while循环阻塞主进程一定的时间
// function sleep(ms){
//     let start = Date.now();
//     while( Date.now()-start < ms );
//     console.log( 222 )
//     return;
// }
// sleep(1000)

//使用promise间接阻塞
// function sleep(ms){
//     let p1 = new Promise( (resolve,reject)=>{
//         setTimeout(resolve,ms);
//     } );
//     return p1;
// }
// sleep(1000).then( ()=>{
//     //code here
//     console.log(2222)
// } )


// 16.代码异常与监控:
// try catch：只能处理同步错误,并不能处理异步错误
// 看下面两个例子:
// 同步：运行正常,可以监控到报错行为
// try {
//     let name = 'huang';
//     console.log( nam );
// } catch (error) {
//     console.log( "异常为:"+error )
// }

// //异步:直接报错,并不会捕获错误
// try {
//     setTimeout( ()=>{
//         undefined.map( (value,index)=>value )
//     },0 )
// } catch (error) {
//     console.log( "异常为:",error )
// }

//资源请求：并不能捕获资源请求错误
// try{
//     fetch( "http:www.jidehuiyi.com/logo.png" )
//     .then( (response)=>{
//         return response.json()
//     } ).then( (myJson)=>{
//         console.log( myJson )
//     } )   
// }catch(error) {
//     console.log( "错误为：",error )
// } 


// window.onerror：当JS代码运行错误会触发EventError接口的onerror函数,并且会执行
//同步:可以捕获到相应的错误
// window.onerror = function(message,source,lineno,colno,error){
//     //message表示错误信息
//     //source表示出错文件
//     //lineno表示出错行号
//     //colno表示出错列号
//     //error表示错误对象
//     console.log( "捕获到错误为",{message,source,lineno,colno,error} )
//     return true;//返回return,用于处理错误不会向上抛出
// };

// console.log( name );
// let name = 'huang'

//异步:也可以捕获到相应的错误的
// window.onerror = function(message,source,lineno,colno,error){
//     console.log("捕获到错误:",{message,source,lineno,colno,error})
//     return true;//用于处理错误不会向上抛出
// }

// setTimeout( function(){
//     undefined.map( (value,index)=>value )
// },0 )

// 资源请求:

// window.onended = function(message,source,lineno,colno,error){
//     console.log( "捕获到错误",{message,source,lineno,colno,error} )
//      return true;
// }

//     fetch( "http://www.jiudehuiyi.com/logo.png" )
//     .then( (response)=>{
//         return response.json()
//     } ).then( (myJson)=>{
//         console.log( myJson )
//     } )  

// window.addEventListener//这个事件可以用来处理事件冒泡或者事件捕获的,而on的方法只能用来处理事件冒泡的

// 同步:会对错误进行捕抓

// window.addEventListener("error",function(error){
//     console.log( "error",error );
// },true)
// console.log( name );
// let name = "huang";

// 异步:也会对错误进行捕抓
// window.addEventListener("error",function(error){
//     console.log( 'error',error );
// })
// setTimeout( ()=>{
//     undefined.map( (value,index)=>value )
// },0 )

//资源请求异常:只在捕获阶段进行,不会再冒泡阶段进行,所以处理资源请求错误的话就需要再捕获阶段进行,因此addEventListener的第三个参数是true
// window.addEventListener('error',function(error){
//     console.log( 'error',error );
// },true)

// fetch("http://www.jiudehuiyi.com/logo.png")
// .then( (response)=>{
//     return response.json();
// } ).then( (myJson)=>{
//     console.log( myJson )
// } )

// 使用promise来进行异步错误处理:

// let p1 = new Promise( (resolve,reject)=>{
//     reject("error")
// } )
// p1.then( ()=>{
//     console.log("成功")
// } ).catch( (err)=>{
//     console.log("错误:",err)
// } )

// 17.事件:
// 事件流:事件捕获=>目标对象=>事件冒泡

// 事件的常用属性:
// ev.preventDefault();//阻止默认行为(标准)
// 例如:阻止一个a链接的跳转:
// let docA = document.querySelector("#a");
// docA.addEventListener("click",function(ev){
//     ev.preventDefault();
// })

// ev.stopPropagation();//阻止冒泡(标准)
// 例如阻止某个li标签向上冒泡到ul标签上:
// let docLi = document.querySelector("#li");
// docLi.addEventListener("click",function(ev){
//     ev.stopPropagation();
// })

// ev.stopImmediatePropagation();//阻止冒泡且阻止后续事件处理
// 例如:为li添加两个点击事件,一个打印1，一个打印2,当加上ev.stopImmediatePropagation的时候,打印2的事件就会被阻止

// let docLi = document.querySelector("#li");

// docLi.addEventListener("click",function(ev){
//     ev.stopImmediatePropagation();
//     console.log(1)
// })
// docLi.addEventListener("click",function(ev){
//     console.log(2);//不打印
// })

// event.currentTarget:这个是获取绑定事件的哪一个元素
// event.target:这个是触发事件的哪一个元素

// 自定义事件:有三种方式可以创建,下面示范一种:

// var event = new Event("build");//创建一个事件,Event构造函数的参数是事件名
// //为某个元素绑定这个事件：例如给div绑定这个事件
// var docDiv = document.querySelector("#div");
// docDiv.addEventListener("build",function(ev){
//     console.log( "新创建一个事件,事件名为build" )
// })
// //触发这个事件
// docDiv.dispatchEvent(event);

// 18.深浅拷贝的实现:
// 浅拷贝:只拷贝一层的值
// 使用Object.assign:
// let obj = {
//     name:"huang",
//     age:"20",
//     job:{
//         position:"web",
//         jobAge:{ num:3 }
//     }
// }
// let shadowObj = Object.assign({},obj);
// shadowObj.name = 'wei'
// shadowObj.job.position = "java"

// console.log( obj )
// console.log( shadowObj )

// 使用:拓展符...
// let obj = {
//     name:"huang",
//     age:"20",
//     job:{
//         position:"web",
//         jobAge:{ num:3 }
//     }
// }

// let shadowObj = { ...obj }
// shadowObj.name = 'wei'
// shadowObj.job.position = "java"

// console.log( obj )
// console.log( shadowObj )


// // 深拷贝：对每一层都需要拷贝,这样就需要使用递归的方法去实现了:
// function deepClone( obj ){

//     if( obj instanceof Date ){ return new Date(obj) };

//     if( obj instanceof RegExp ){ return new RegExp(obj); }

//     if( typeof obj !== "object" ) {
//         return obj;
//     }

//     //构建一个数组实例或者对象实例

//     let result = new obj.constructor();

//     for( let key in obj ) {
//         if( obj.hasOwnProperty(key) ) {
//              result[key] =  deepClone(obj[key]);
//         }
//     }
//     return result;
// }

// let obj = {
//     name:"huang",
//     age:"20",
//     job:{
//         position:"web",
//         jobAge:{ num:3 }
//     }
// }
// let copyObj = deepClone(obj);
// copyObj.name = 'wei'
// copyObj.job.position = "java"
// console.log( obj )
// console.log( copyObj )

// 19.遍历一个dom树
// function travel(node){//传入的node是一个根节点

//     if( node && node.nodeType === 1 ){
//         //如果node是一个元素,而不是属性(nodeType=2),内容(nodeType=3)
//         console.log( node.tagName );//打印标签
//     }
//     //遍历节点
//     for( let i=0;i<node.childNodes.length;i++ ){
//         let temp = node.childNodes[i];
//         if( temp.nodeType === 1 ){
//             travel(temp);
//         }
//     }
// }

