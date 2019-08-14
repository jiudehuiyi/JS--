

//1.防抖；函数频繁触发,但在给定的时间内只触发一次,如果在给定的时间再次被触发,则重新计算时间

// function debounce(fn,time){

//     var timer = null;
//     return function(){
//         clearTimeout(timer);
//         timer = setTimeout(function(){
//             fn.apply(this,arguments);
//         },time);
//     }

// }
// function de(){
//     console.log("防抖成功");
// }

// var div = document.getElementById("test");

// div.addEventListener('click',debounce(de,1000));

//2.节流:在一定的时间内只触发一次,

// function throttle(fn,wait){
//     var run = true;
//     return function(){
//         if(!run) return ;
//         run=false;
//         setTimeout( function(){
//             fn.apply(this,arguments);
//             run = true;
//         },wait )
//     }
// }

// function th(){
//     console.log("节流成功");
// }
// window.addEventListener("resize",throttle(th,1000));

// 3.ES5/ES6 的继承除了写法以外还有什么区别？
// ES5的继承:
// function Parent(){
//     this.name = "huang";
//     this.age = 20;
// };
// Parent.prototype.job="web";
// function Child(){
//     Parent.apply(this,arguments);
// };
// Child.prototype = new Parent();
// let child1 = new Child();
// ES6的继承：
// class Parent{};
// class Child extends Parent{
//     constructor(props){
//         super(props);
//     }
// }

// 主要区别为：this的生成顺序是不一样的,ES5的是先生成this对象,然后在继承构造函数和原型中的方法和属性,
// ES6:则是先继承构造函数和原型中的方法,然后通过super(this)生成父类的this对象,在依靠父类构造函数修改自己的this，从而得到自己的this对象

// 4.promise:用于异步,
// 异步加载图片:
    // const syncImage = (path)=>{
    //   return new Promise( (resolve,reject)=>{
    //       const image = new Image();
    //       image.onload = resolve();
    //       image.onerror = reject();
    //       image.src = path;
    //   } )
    // }

//  5.promise的并行和串行:
// 并行:promise已经提供了两个方法(all，race)来用于并行,没有顺序要求,同时执行多个promise
// Promise.all([...p]);//当参数状态全部为resolve的时候,返回的是resolve的promise,而传递的参数是...p的每一个值
// Promise.race([...p]);//当那个promise先改变,就返回哪一个promise给Promise.race

// 串行:有顺序要求,执行完一个才到下一个,
// 采用reduce方法去实现promise的串行,但一般使用async/await去写串行更简单,但实质上还是promise,不过使用reduce耗内存和性能
// function runPromiseByQueue(myPromises){
//     myPromises.reduce( (prePromise,nextPromise)=>{
//         return prePromise.then( ()=>nextPromise(),()=>{ console.log("串行promise,执行失败") } );
//     },Promise.resolve() )
// }

// const createPromise = (time,id)=>()=>{
//     return new Promise( (resolve,reject)=>{
//         setTimeout( ()=>{
//             console.log("promise"+id);
//             resolve();
//         },time );
//     } );
// }

// runPromiseByQueue([
//     createPromise(1000,1),
//     createPromise(1000,2),
//     createPromise(1000,3),
// ]);

// 6.async/await:异步问题同步化(外异内同)
// 实现串行用async/await最简单:
// async function test(){
//     //(串行)同步化
//     const a = await Promise(111);
//     return 4444;
// }
// test().then( (val)=>{console.log(val)} );//异步,打印4444

// //串行的实际应用场景
// async function getTest(url){
//     const a = await getJSON(url);//获取json数据,这里执行完毕才会执行下一步,也就是获取到数据才会向下执行
//     const b = await getUrlMachine(a);//根据上一步获取到的json数据，来获取相对应的数据
//     return b;//返回一个最终的数据,传到then方法中
// }
// getTest(url).then( val=>console.log(val) )

// 7.携程面试题:
// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
// 例子:
// ES5,ES6简单API的运用(或者也可以使用ES6提供的扁平化函数(Array.prototype.flat(Infinity)),去重函数,和升序函数(sort)):
// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// arr.toString().split(",");扁平化  利用ES6的Set结构去重,利用sort函数排序
//  [... new Set(arr.toString().split(","))].sort( (a,b)=>a-b ) 

// 8.promise async/await 同步和异步：
// promise：
// 在构造函数中new Promise( (resolve,reject)=>{
//     这部分的同步执行的
// } )
// 但是then的回调函数中的异步的,加入到微任务中执行

// async/await:
// async函数内的await前的同步执行,而await是异步执行的,
// 返回的promise实例也是异步的,加入到微任务中 asyncCon.then(()=>{//异步执行})

// 9.实现一个new:
// 原理：
// 1.生成一个新的对象
// 2.连接原型
// 3.绑定构造函数中的this
// 4.返回this对象
// 实现：

// function similarNew (){
//     var obj = Object.create(null);//生成一个对象

//     var Con = Object.prototype.shift.call(arguments);//获取第一个参数(构造函数)

//     obj.__proto__ = Con.prototype;//连接原型;

//     Con.apply(obj,arguments);//绑定this

//     return obj;//返回一个(this)对象
// }

// 提供一个更简便的方法
// function similarNew(fn,...arg){
//     const obj = Object.create(fn.prototype);
//     fn.apply(obj,arg);
//     return obj;
// }

// 10.改造下面的代码，使之输出0 - 9
// for (var i = 0; i< 10; i++){
// 	setTimeout(() => {
// 		console.log(i);
//     }, 1000)
// }

// 有三种方法:
// 1.setTimeout的第三个参数
// for(var i=0;i<10;i++){
//     setTimeout( (j)=>{
//         console.log(j)
//     },1000*i,i )
// }
// 2.立即执行函数
// for(var i=0;i<10;i++){
//     ( (i)=>{
//         setTimeout(()=>{
//             console.log(i)
//         },i*1000);
//     } )(i);
// }
// 3.ES6新的作用域
// for( let i=0;i<10;i++ ){
//     setTimeout( ()=>{
//         console.log(i)
//     },1000*i );
// }

// 11.实现flatten函数:
// let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]
// 1.采用递归
// function flatten(arr,flatArr){
//     flatArr = flatArr || [];
//     for( let val of arr ) {
//         if( val instanceof Array ) {
//             flatten(val,flatArr);
//         }else {
//             flatArr.push(val);
//         }
//     }
//     return flatArr;
// }
// console.log(flatten(arr));
// 2.采用ES5API实现:
// console.log( arr.toString().split(",") );//但是这个方法会把里面的数据转为字符串,需要把相应的字符串转换回数字
// 3.采用ES6提供的flat:
// console.log( arr.flat(Infinity) );
// 12.BFC:称为格式化块级上下文,是一种css特别的渲染盒子模型的渲染模式,特点是是一个独立的容器,与外部元素互不影响
// 形成：float(浮动),position(除去static),overflow(不为visible),display
//作用:1.清除浮动  2.解决盒子间的上下边距重叠问题

// 13.实现一个sleep函数,例如sleep(1000)
// 1.ES5:
// function sleep(callback,time){
//     setTimeout( ()=>{
//         callback.apply(this,arguments);
//     },time );
// }
// function cb(){
//     console.log(2222)
// }
// sleep(cb,1000);

// 2.Promise
// const sleep = (time)=>{
//     return   new Promise( (resolve,reject)=>{
//         if(time) {
//             setTimeout( ()=>{
//                 resolve();
//             },time );
//         }else {
//             reject();
//         }
//     } );
// }
// sleep(1000).then( ()=>{ console.log("Promise") } )

// 3.async/await
// function cb(time){
//     return new Promise( (resolve,reject)=>{
//         setTimeout(resolve,time);
//     } )
// }
// async function sleep(time){
//     await cb(time);
//     console.log("执行完毕")
//     return;
// }
// sleep(1000)

// 14.百度面试题:实现 (5).add(3).minus(2)
// 不建议在原型上直接添加(Number.prototype.add,Number.prototype.minus),但是由于提醒特殊,只能够在原型上进行修改;
// 可参考以下代码:(下面的代码比较完善,兼容了一些浮点数的缺点)
// Number.MAX_SAFE_DIGITS = Number.MAX_SAFE_INTEGER.toString().length-2
// Number.prototype.digits = function(){
// 	let result = (this.valueOf().toString().split('.')[1] || '').length
// 	return result > Number.MAX_SAFE_DIGITS ? Number.MAX_SAFE_DIGITS : result
// }
// Number.prototype.add = function(i=0){
// 	if (typeof i !== 'number') {
//         	throw new Error('请输入正确的数字');
//     	}
// 	const v = this.valueOf();
// 	const thisDigits = this.digits();
// 	const iDigits = i.digits();
// 	const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
// 	const result = (v * baseNum + i * baseNum) / baseNum;
// 	if(result>0){ return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result }
// 	else{ return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result }
// }
// Number.prototype.minus = function(i=0){
// 	if (typeof i !== 'number') {
//         	throw new Error('请输入正确的数字');
//     	}
// 	const v = this.valueOf();
// 	const thisDigits = this.digits();
// 	const iDigits = i.digits();
// 	const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
// 	const result = (v * baseNum - i * baseNum) / baseNum;
// 	if(result>0){ return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result }
// 	else{ return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result }
// }
// 15.同步执行两秒:
// console.log("开始计时");
// (
//     function(){
//         var start = Date.now();
//        while(true){
//         if( Date.now()>=start+2000 ) {
//             return ;
//         }
//        }
//     }
// )()
// console.log("两秒后读取出来");
// 16.链式调用的实现
// class LazyManClass {
//     constructor(name){
//         console.log(`Hi I am ${name}`);
//         this.queue = [];
//         setTimeout( ()=>{
//             this.next();
//         },0 )
//     }

//     sleep(time){
//         const fn = ()=>{
//             setTimeout( ()=>{
//                 console.log("等待了"+time+"毫秒");
//                 this.next();
//             },time );
//         }
//         this.queue.push(fn);
//         return this;
//     }
//     sleepFirst(time){
//         const fn = ()=>{
//             setTimeout( ()=>{
//                 console.log(`等待了+${time}毫秒`);
//                 this.next();
//             },time );
//         }
//         this.queue.unshift(fn);
//         return this;
//     }
//     eat(food){
//         const fn = ()=>{
//             console.log(`I am eating ${food}`);
//             this.next();
//         }
//         this.queue.push(fn);
//         return this;
//     }

//     next(){
//         var fn = this.queue.shift();
//         fn && fn();
//     }

// }

// function LazyMan(name){
//     return new LazyManClass(name);
// }
// LazyMan("Tony").eat("lunch").sleep(2000).eat('dinner');;
// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(2000).sleep(3000).eat('junk food');

// 17.求数组的交集:
// function intersection(arr1,arr2){
//     let result = [];
//     if( !arr1 instanceof Array && !arr2 instanceof Array ) {
//         return;
//     }
//     //为什么要判断arr1,arr2的长度呢?因为防止一些特殊的情况出现,例如：var arr1 = [1,1],arr2 = [1]
//     result = arr1.length>arr2.length?arr2.filter( (item,index)=>{
//         return arr1.includes(item);
//     } ):arr1.filter( (item,index)=>{
//         return arr2.includes(item);
//     } )

   
//     return result;
// }
// var arr1 = [1,1],arr2 = [1];
// intersection(arr1,arr2)

// 18.抽象语法树(AST):将代码字符串拆开一个个进行解析,可以利用recase拆开和重装
// 例如:ES6转换为ES5代码原理:
// 1.ES6代码转换为ES6的抽象语法树,
// 2.对ES6抽象语法树转换为ES5的抽象语法树,
// 3.ES5的抽象语法树转换为相应的ES5字符串代码

// 18.转换大小写字母:Abc=>Abc
// function parseStr(str){
//     var strArr = str.split("");
//     var newArr = strArr.map( (item,index)=>{
//         return item === item.toUpperCase()?item.toLowerCase():item.toUpperCase();
//     } )
//     return newArr.join("");
// }
// console.log( parseStr("Abc") )
// 19.数据绑定:
// ES5:利用Object.defineProperty模拟实现双向数据绑定(单对单),
// var obj = {};
// Object.defineProperty(obj,"use",{
//     enumerable:true,
//     configurable:true,
//     get:function(){
//         return document.getElementById("test").innerHTML;
//     },
//     set:function(value){
//         document.getElementById("test").innerHTML = value;
//     }
// })
// document.getElementById("inp").addEventListener("keyup",function(){
//     document.getElementById("test").innerHTML = obj.use;
// });
// 单对多:
// var obj = {};
// Object.defineProperty(obj,"use",{
//     enumerable:true,
//     configurable:true,
//     get:function(){
//         return document.getElementById("test").innerHTML;
//     },
//     set:function(value){
//         document.getElementById("test").innerHTML = value;
//         document.getElementById("test1").innerHTML = value;
//     }
// })
// document.getElementById("inp").addEventListener("keyup",function(e){
//     obj.use=e.target.value
// })

// Proxy：
// var obj = {};
// const newObj = new Proxy( obj,{
//     get:function(target,key){
//         return Reflect.get(target,key);
//     },
//     set:function(target,key,value){
//         if(key==="text"){
//             document.getElementById("test").innerHTML = value
//         }
//         return Reflect.set(target,key,value)
//     }
// } );

// document.getElementById("inp").addEventListener("keyup",function(e){
//     newObj.text = e.target.value;
// })

// 20.有趣的面试题：
// example 1
// var a={}, b='123', c=123;  
// a[b]='b';
// a[c]='c'; 
// console.log(a[b]);//c,因为在a[var]中的变量是会调用valueOf和toString将其转化为相应的字符串,所以变量b和c是一样的key值,所以c覆盖了b

// var a={}, b=Symbol('123'), c=Symbol('123');  
// a[b]='b';
// a[c]='c';  
// console.log(a[b]);//b,Symbol值是ES6增加的一种特殊基本类型,它的值是独一无二的,b和c是不一样的,所以打印出b

// example 3
// var a={}, b={key:'123'}, c={key:'456'};  
// a[b]='b';
// a[c]='c';  
// console.log(a[b]);//c，由于变量b和c不是字符串，所以得调用对象得toString方法将其转换为字符串,得到的是[Object object]，所以转换后得值是一样得，c覆盖了b，所以打印了c


// 21.实现一个add函数,柯里化
// function add(){
//     let add_args = [].slice.call(arguments);
//     let fn = function(){
//         let fn_args = [].slice.call(arguments);
//         return add.apply(this,add_args.concat(fn_args));
//     }
//     fn.toString = ()=>{
//         return add_args.reduce( (a,b)=>{
//             return a+b;
//         } )
//     }
//     return fn;
//  }
//   add(1,2)    //3
// // add(1)(2);  	// 3
// // add(1)(2)(3);// 6
// // add(1)(2, 3); // 6
// // add(1, 2)(3); // 6
// // add(1, 2, 3); // 6

// 22.react-router中的Link和a区别:
// Link接管了a中的功能,由自己去处理(通过history),并且禁用了a中的跳转页面这个行为,即event.preventDefault(),由history去跳转，实现了不重新刷新跳转页面

// 23.算法题之「两数之和」
// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
// function getIndex(numArr,target){

//     let resultIndex = [];
//     let length=numArr.length
//     for( let i=0;i<length;i++ ) {
//         let temp = numArr[i];
//         for(let j=i+1;j<length;j++) {
//             if( temp + numArr[j] === target ) {
//                 resultIndex.push(i);
//                 resultIndex.push(j);
//                 break;
//             }
//         }
//     }
//     return resultIndex;
// }
// console.log( getIndex([3,2, 13,7,7, 11, 15],9) )





// 24.获取树状中的所有id
//value是要寻找的目标值,orginData数据,resultArray是目标数组
// function fn(value,originData,resultArray){
//      resultArray = resultArray || [];
//      originData = originData || [];
//     for( let i=0,length=originData.length;i<length;i++ ) {
//         resultArray.push( originData[i].id );
//         if( resultArray[resultArray.length-1] === value ) {
//             break;
//         }else {
//             if( originData[i].children  ) {
//                  fn(value,originData[i].children,resultArray);
//             }
//         }
     
//     }
//     return resultArray;

// }
// const data = [
//     {
//     id: '1',
//     name: 'test1',
//     children: [
//         {
//             id: '11',
//             name: 'test11',
//             children: [
//                 {
//                     id: '111',
//                     name: 'test111'
//                 },
//                 {
//                     id: '112',
//                     name: 'test112'
//                 }
//             ]

//         },
//         {
//             id: '12',
//             name: 'test12',
//             children: [
//                 {
//                     id: '121',
//                     name: 'test121'
//                 },
//                 {
//                     id: '122',
//                     name: 'test122'
//                 }
//             ]
//         }
//     ]
//     },
//     {
//         id:"2",
//         name:"test2"
//     }
// ];
// console.log( fn("12",data) );


// 25.模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况
// 这里要考虑对象相互引用以及 Symbol 拷贝的话就必需用递归实现深拷贝,代码省略

// 26.React和vue的diff算法是如何将时间复杂度O(n^3)优化成O(n)的
// react将传统的diff算法,只比较同层节点,不同层的则不比较,因为不同层在实际上涉及的非常非常少

// 27.按值传递(高程有讲到)
// function changeObjProperty(o) {
//     o.siteUrl = "http://www.baidu.com"
//     o = new Object()
//     o.siteUrl = "http://www.google.com"
//   } 
//   let webSite = new Object();
//   changeObjProperty(webSite);
//   console.log(webSite.siteUrl);//"http://www.baidu.com"
  
// 28.instanceOf的模拟实现:
// function instance_of(ins,cons){
//     let insProto = ins.__proto__;
//     let consPrototype = cons.prototype;
//     while(true) {
//         if(insProto === null ) 
//             return false;
//         if( insProto === consPrototype )
//             return true
//         insProto = insProto.__proto__;    
//     }
// }
// console.log( instance_of( {},Object ) )

// 29.判断一个变量是否为一个数组:
// let isArr = [];
// console.log( Array.isArray(isArr) )
// console.log( isArr instanceof Array )
// console.log(  Object.prototype.toString.call( isArr ) === "[object Array]"  )
// 30.类数组和数组:
// 区别:类数组拥有length属性,但是却不拥有数组的方法
// 类数组转化为数组:
// 1.Array.prototype.slice.call(similarArray);
// 2.[...similarArray]
// 3.Array.from(similarArray);
// 31.有趣的类型转换:[] == ![] //true
// 左边转化：[]会转化成 0
// 右边: 由于！优先级大于==，所以![]为false,然后比较的时候转化为0
// 所以最终都转化为0

// 32.ES5函数中this指向优先级:new绑定,显示绑定(apply,call,bind),隐式绑定(那个对象调用this指向那个对象),默认绑定(指向window)
// ES6中的箭头函数并没有this,是用外层函数的this

// 33.词法作用域和this的区别:
// 词法作用域是变量在定义的时候就已经确定作用域的
// this是调用的时候才确定其指向

// 34.call和apply作用基本相同,传参方式不一样
// call的内部实现:
// Function.prototype.call = function(context){
//     //call可以用于浏览器端和node端,当call不传值的时候,浏览器端为window,当为node端的时候为global
//     if( !context ) {
//         context = typeof window === "undefined" ? global : window; 
//     }

//     //获取后续传入的参数
//     var args = [...arguments].slice(1);
//     // 获取需要调用(执行)的函数
//     context.fn = this;//this代表是Function的一个实例

//     var result = context.fn(...args);
//     delete context.fn;
//     return result;
// }

// var name = "huang";
// function change(){
//     console.log( this.name );
// }
// var obj = {
//     name:"wei"
// }
// change.call(obj);

// apply的实现原理：
// Function.prototype.apply1 = function(context,rest){

//     if(!context) {
//         context = typeof window === "undefined" ? global : window;
//     }
//     context.fn = this;
//     var result = context.fn(rest);
//     delete context.fn;
//     return result;
// }

// var name = "huang";
// function change(){
//     console.log( this.name );
// }
// var obj = {
//     name:"wei"
// }
// change.apply(obj)

// bind的原理实现：
// Function.prototype.myBind = function(context){
//     var args = Array.prototype.slice.call( arguments,1 );
//     var self = this;
//     var Con = function(){};
//     Con.prototype = this.prototype;
//     var fn = function(){
//         var args_inner = Array.prototype.slice.call(arguments);
//         //当this instanceof fn为true的时候,返回的函数(fn)作构造函数调用，否则作一般函数调用
//         self.apply(
//             this instanceof fn ? this : context,
//             args.concat(args_inner)
//         );
//     }
//     //为什么不能用fn.prototype = this.prototype呢?因为当改变fn.prototype的时候会改变this.prototype函数的东西,所以我们需要另外创建一个控函数来实现返回的函数继承this.prototype
//     fn.prototype = new Con();
//     return fn;
// }


// 35.new的实现原理:

// function myNew(){

//     var target = {};

//     var Con = Array.prototype.shift.call(arguments);

//     target.__proto__ = Con.prototype;

//     var res = Con.apply( target,arguments );
//     //这里需要判断返回值,当构造函数中返回值为一个对象的时候,this则指向的是这个对象,当返回值不是对象的时候,返回值则是新创建的对象(target)
//     return typeof res === "object" ? res : target;
// }

// 36.使用ES5实现一个继承(第一步和第二步是组合继承代码)
// function Parent(){
//     this.name = 'huang';
// }
// Parent.prototype.sayName = function(){
//     console.log( this.name );
// }

// function Child(){
//     Parent.call(this);//1
// }
// Child.prototype = new Parent();//2
// Child.prototype.constructor = Child;

// 37.深浅拷贝:
// 浅拷贝:只复制一层
// ES6的两个方法Object.assign和拓展符...
// Object.assign
// var obj = { name:'huang',person:{ age:20 } };
// var obj2 = Object.assign({},obj);
// console.log( obj2 ) //{ name:'huang',person:{ age:20 } }
// obj.name = 'wei';
// obj.person.age = 30;
// console.log(obj2) //{ name:'huang',person:{ age:30 } }
// 拓展运算符:
// var obj = { name:"huang",person:{age:20} };
// var obj2 = { ...obj };
// console.log(obj2); //{ name:"huang",person:{age:20} }
// obj.person.age=30;
// console.log(obj2);//{ name:"huang",person:{age:30} }

// 深拷贝:
// JSON.parse( JSON.stringify(obj) );//这个方法能解决大部分情况,但是不能复制函数类型和正则类型
// var obj = { name:"huang",person:{ age:20 },fn1:function(){ console.log(1111) } };
// var result = JSON.parse( JSON.stringify( obj ) );
// obj.person.age = 30;
// console.log( result ) ;//{ name:"huang",person:{ age:20 } }

// console.log( result ) ;////{ name:"huang",person:{ age:20 } }这个是复制不了函数
// 采用递归可以拷贝所有得情况:
// function deepClone(obj){
//     if( obj === null ) return null;
//     if( obj instanceof RegExp ) return new RegExp(obj);
//     if( obj instanceof Date ) return new Date( obj );
//     if( typeof obj !== "object" ) {
//         return obj;
//     }
//     //obj.constructor为Array或者Object构造函数,result是它们的一个实例
//     var result = new obj.constructor();
//     for( let key in obj ) {
//         result[key] = deepClone( obj[key] );
//     }
//     return result;
// }
// console.log( deepClone( { name:"huang",person:{ age:20 },fn1:function(){ console.log(2222) } } )  )

// 38.取数组最大值:

// ES5:
// console.log( Math.max.apply( null,[2,4,1,null,5,9,6] ) );//但是数组中不能出现undefined和缺元素,不可以处理[2,4,1,,undefined,5,9,6]
// ES6:
// console.log( Math.max( ...[2,4,1,5,9,6] ) );////但是数组中不能出现undefined和缺元素，不可以处理[2,4,1,,undefined,5,9,6]
// 使用reduce获得最大值,这种方法可以处理,[2,4,1,,undefined,5,9,6]
// var result = [2,4,1,,undefined,5,9,6].reduce( (prev,next)=>{
//     return prev>next?prev:next;
// } )
// console.log( result )

// 39.promise:在构造函数中是同步执行的,而在promise.then则是异步微任务
// 构造函数 new Promise的实现:只要遵守promiseA/A+的准则就可以了,实现原理可以不一样,以下是给出的一个promise全部方法的一个实现
//var promise = new Promise( (resolve,reject)=>{  } );

// function Promise( executor ) {

//     var self = this;
//     self.status = "pending";//这个值是储存状态的变量;
//     self.value = undefined;//这个值是传给then中的值;
//     self.onResolveCallback = [];//成功后执行的所有回调;
//     self.onRejectCallback = [];//失败后执行的所有回调
//     function resolve(value){
//         //判断传进来的value是否是一个promise值
//         if( value instanceof Promise ) {
//             return value.then( resolve,reject )
//         }
//         //resolve是异步执行的,当setTimeout不传参数的时候,有一个最少的时间加入其任务队列中,就是4ms
//        setTimeout( function(){
//             if( self.status === "pending" ) {
//                 self.status = "fulfilled";//改变状态;
//                 self.value = value;
//                 self.onResolveCallback.forEach( fn=>fn(value) );
//             }
//        } )
//     }
//     //reject函数跟resolve函数基本一样
//     function reject(reason){

//         setTimeout( function(){
//             if( self.status === "pending" ){
//                 self.status = "rejected";
//                 self.value = reason ;
//                 self.onRejectCallback.forEach( fn=>fn(reason) )
//             }
//         } )
//     }   

//     try{
//         //executor函数需要放置在try-catch中是因为可能存在错误
//         executor(resolve,reject);
//     }catch(err){
//         reject(err);
//     }

// }

// then方法的原理实现:
// promise1.then( ()=>{},()=>{} ) 第一个参数是Promise执行resolve的时候执行,第二个参数是Promise执行reject()的时候执行;

// Promise.prototype.then = function(onResolve,onReject){

//     var self = this;
//     var promise2 ;//每个then方法都要返回一个新的promise对象
//     //防止值得穿透
//     // promise.then().catch().then( (value)=>{ console.log(value) } );和 promise.then( value=>value ).catch().then( ()=>{console.log(value)} )是一样得,所以需要处理一下
//     onResolve = typeof onResolve === "function" ? onResolve : function(value){ return value };
//     onReject = typeof onReject === "function" ? onReject : function(reason){ throw reason };

//     if( self.status === "fulfilled" ) {
//         return promise2 = new Promise( (resolve,reject)=>{
//             setTimeout( function(){
//                 try{
//                     //执行onResolve函数,并获取返回值,如果是promise则执行then,否则将值传给下一个then
//                     var x = onResolve(self.value);
//                     if( x instanceof Promise ) {
//                         x.then( resolve,reject );
//                     }
//                     resolve( x );
//                 }catch(err){
//                     reject(err);
//                 }
//             } )
//         } )
//     }
//     if( self.status === "rejected" ) {
//         return promise2 = new Promise( (resolve,reject)=>{
//             setTimeout( function(){
//                 try{
//                     var x = onReject(self.value);
//                     if( x instanceof Promise ) {
//                         x.then( resolve,reject );
//                     }
//                 }catch(err){
//                     reject(err);
//                 }
//             } )


//         } )


//     }

//     if( self.status === "pending" ) {
//         return promise2 = new Promise( (resolve,reject)=>{
//             //当为pending状态时我们还不确定时fulfilled或者rejected状态,所以我们得先将上面得逻辑加入到回调函数数组中,等状态发生改变得时候才去执行
//             self.onResolveCallback.push( function(){
//                 // 这里不需要异步处理,因为在构造函数中就已经是异步处理了
//                try{
//                     var x = onResolve(self.value);
//                     if( x instanceof Promise ) {
//                         x.then( resolve,reject );
//                     }
//                }catch(err){
//                    reject(err);
//                }
//             } )
//             self.onRejectCallback.push( function(){
//                 try{
//                     var x = onReject(self.value);
//                     if( x instanceof Promise ) {
//                         x.then( resolve,reject );
//                     }
//                 }catch(err){
//                     reject(err);
//                 }
//             } )
//         } )
//     }


// }

// catch的原理实现方法:实质上调用的是then方法

// Promise.prototype.catch = function(onReject){
//     return this.then( null,onReject )
// }

//Promise.resolve的实现原理方法:
// 1.当没有传入参数直接返回一个resolve状态的promise对象
// 2.如果是一个promise，则直接返回,不作任何修改
//3.如果是thenable对象(是一个对象,但是对象里面有then方法),执行thenable对象中的then方法;
// 4.参数不是thenable对象,promise对象,或者根本不是一个对象,将值传给then对象
// Promise.resolve = function(param){
//     if( !param ) { 
//         return   new Promise( (resolve,reject)=>{
//             resolve();
//         } )
//      }
//      if( param instanceof Promise ){
//          return param;
//      }
//      if( param && param.then && typeof param.then === "function" ) {
//         return new Promise( (resolve,reject)=>{
//             //为什么要加上setTimeout呢,因为根据测试结果发现thenable对象是异步的，你自己也可以测试一下
//             setTimeout( function(){
//                 param.then( resolve,reject );
//             } )
//         } )
//      }else {
//          return new Promise( (resolve,reject)=>{
//             resolve(param);
//          } );
//      }
// }

// Promise.reject的原理实现:
// 返回一个promise对象并且是reject状态的
// Promise.reject = function(reason){
//     return new Promise( (resolve,reject)=>{
//         reject(reason);
//     } );
// }
//Promise.finally的实现:
//无论是fulfilled或者rejected状态都会执行,并且后面可以继续接then,并且从上一个then传过来的值会原封不动的传给下一个then
// Promise.finally = function(callback){

//     return this.then( 
//         value=>Promise.resolve( callback() ).then( ()=> value ),
//         reason=>Promise.resolve( callback() ).then( ()=>{ throw reason } )
//      )

// }

// Promise.all原理和实现:
// 1.返回一个promise,如果参数为空或者不具有iterator接口的({})，则会出现错误,
// 2.如果参数是一个空数组,则返回一个状态为resolve的Promise
//3。如果参数数组中的元素如果不是promise都会转化成Promise实例(Promise.resolve())
//4.最终的返回状态:如果数组中的promise状态都是fulfilled,则返回的的promise才会是fulfilled，并且参数为它们数组的返回值
//5如果promise状态其中一个是rejected，则返回的promise是rejected,并且参数为它们数组第一个rejected的返回值

// Promise.all = function(promises){

//     if( !promises ) {
//         throw Error("this param need Promise Array");
//     }
//     if( promises.length === 0 ) {
//         return new Promise( (resolve,reject)=>{
//             resolve([]);
//         } )
//     }else {
//         return new Promise( (resolve,reject)=>{
//             var result = [];
//             for( let i=0;i<promises.length;i++ ) {
//                 //promises[i]有可能是普通值
//                 Promise.resolve( promises[i] ).then( (value)=>{
//                     result[i] = value;
//                     if( ++i === promises.length ) {
//                         resolve(result);
//                     }
//                 },(err)=>{
//                     reject( err );
//                     return ;//跳出循环,当遇到第一个状态为rejected的promise,再也不用遍历
//                 } )

//             }
//         } )
//     }

// }

//Promise.race的原理和实现:
// 1.返回一个promise,如果参数为空或者不具有iterator接口的({})，则会出现错误,
//2.如果是一个空数组,则返回一个pending状态的的promise
//3。如果参数数组中的元素如果不是promise都会转化成Promise实例(Promise.resolve())
//4.在数组中谁先完成状态,则先返回谁的状态,并且promise的返回值传给下一个then

// Promise.race = function(promises){
//     if( !promises ) {
//         throw Error( "param must be promise or have iterator" );
//     }
//     if( promises.length === 0 ) {
//         return new Promise(()=>{});
//     }else {
//         return new Promise( (resolve,reject)=>{
//             for( let i=0;i<promises.length;i++ ) {
//                 Promise.resolve( promises[i] ).then( (value)=>{
//                     resolve(value);
//                     return ;
//                 },(err)=>{
//                     reject(err);
//                     return ;
//                 } )
//             }
//         } )
//     }
// }


// 40.柯里化:将某个函数变成柯里化函数,而转变为柯里化的这个函数则可以用很多方式调用( 一个括号,两个括号,或者多个括号 )
// function curry(fn,args = []) {
//     return function(){
//         var res = [...args,...arguments];
//         if(res.length < fn.length) {
//             return curry.call(this,fn,res);
//         }else {
//             return curry.apply( this,res );
//         }
//     }
// }
