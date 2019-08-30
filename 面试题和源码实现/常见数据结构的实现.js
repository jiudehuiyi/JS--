/*
    这一份JS，我们来用JS实现一下各种数据结构,包括栈,队列,链表等等
*/


// 1.数组:
// 数组是JS最基本的数据类型(结构),JS已经帮我们实现了,我不再去写一个数组,但是值得注意的是:
// 1.1:数组是最连续(顺序)的线性表,因为它的内存地址都是连续的,还有队列,栈,链表也是线性表的一种。
// 1.2:数组和链表相比,随机访问的时间复杂度为:O(1),数组访问的寻址为：基址(也就是数组被分配到的数组地址)+下标*每个数组位置的大小,
// 而链表的随机访问复杂度为:O(n),链表的访问则是每一个都需要访问,直到找到元素才会停止寻找,所以最优时间复杂度为:O(n),最差时间复杂度为O(n),平均时间复杂度为:O(n),所以数组随机访问的性能优于链表的
// 1.3但是插入和删除数组的时间复杂度为:O(n),因为当插入和删除的时候,每个位置都可能需要左移或者右移,最优时间复杂度:O(1),最差时间复杂度为:O(n),平均时间复杂度为:O(n);
// 而插入和删除链表的时间复杂度为:O(n),因为可以直接得到元素的值或者地址(因为它的储存不是连续的)
// 所以当时插入和删除操作的时候,则是链表比数组的性能更好。


// 2.栈是一个先进后出,后进先出的数据结构,最常用的是浏览器的历史纪录
// 使用数组实现一个栈:
// 其中方法有push(elements),添加一个或者几个元素,pop()移除栈顶元素,peek()返回栈顶元素,isEmpty()判断栈是否为空,clear清除栈的所有元素,size（）返回栈里元素个数

// class MyStack{
//    constructor(){
//        this.item = [];
//    }

//    push(...args){
//        //该方法是向栈顶(只有这一个方向)添加一个或者多个元素
//         if(args.length === 0) {
//             throw Error("param is not empty ,please add element!");
//         }
//         for(let value of args) {
//             this.item.push(value);
//         }
//     }

//   pop(){
//       //该方法时移除一个栈顶元素
//       this.item.pop();
//   }  

//   peek(){
//       //该方法时查看栈顶方法
//       return this.item[this.item.length-1];
//   }

//   isEmpty(){
//       //该方法是检查栈是否为空
//       return this.item.length === 0;
//   }

//   size(){
//       //该方法时获取栈的长度
//       return this.item.length;
//   }

//   clear(){
//       //该方法时清空栈,当清空完成返回true.
//     this.item = [];
//     if( this.item.length === 0 ) {
//         return true;
//     }else {
//         return false;
//     }
//   }
// }

// let myStack = new MyStack();
// console.log( myStack )
// myStack.push(1,2,3,4,5);

//使用对象实现一个栈:实际上跟数组基本一样,只不过它的key用数字(this.count)去代替了,但是使用对象的性能更好,因为使用数组的大部分方法时间复杂度都是O(n).但是当使用对象时,除了toString方法外其他方法的时间复杂度为:O(1),可以直接找到元素,而不需要去遍历每个元素去寻找所需要的元素;

// const _item = Symbol("stackItems");
// const _count = Symbol("stackCount");

// class MyStack {
//     constructor(){

//         //但是直接使用this.count和this.item存在一个问题:就是变量没有实现私有化,暴露了两个全局变量,可以有一下三种方法进行改写
//         // 1.在ES6之前都是使用下划线默认变量私有化(this._count=0;this._item={}),但是在实际上还是不能实现私有变量,这只是开发者默认的而已,你访问this._count和this._item一样可以访问得到
//         //ES6之后可以通过Symbol基本类型和WeakMap去实现真正的私有化:
//         // 2.使用Symbol去储存item和count值,那么就可以将原先this.count和this.item实现私有化
//         // 3.使用ES6的weak~的类似数组和对象的也可以分别模拟,感兴趣的可以自行编写
//         this[_count] = 0;//这个变量用来记录栈的大小
//         this[_item] = {};
//     }
//     push(...args){
//         //此方法添加一个或者多个元素

//         if( args.length === 0 ) {
//             throw Error("param must be at least 1,please add!");
//         }

//         for( let value of args ) {
//             this[_item][this[_count]] = value;
//             this[_count]++;
//         }
//     }

//     isEmpty(){
//         return this[_count] === 0;
//     }

//     size(){
//         return this[_count];
//     }

//     pop(){
//         //这个方法是移除栈顶元素,由于对象并没有提供移除最后一个属性的方法,所以我们得自己实现一个
//         if( this[_count] === 0 ) {//也可以调用this.isEmpty方法
//             return undefined;
//         }

//         let result = this[_item][this[_count]-1];//存储起来,返回这个被删除得元素得值
//         delete this[_item][ this[_count]-1 ];
//         this[_count]--;
//         return result;
//     }

//     peek(){
//         //查看栈顶元素
//         if( this[_count] === 0 ) {
//             return undefined;
//         }
//         return this[_item][this[_count]-1];
//     }
    
//     clear(){
//         //清除栈
//         if( this[count] !== 0 ) {
//             this[_count] = 0;
//             this[_item] = {};
//             return true;
//         }else if( this[_count] === 0 ) {
//             return true;
//         }else {
//             return false;
//         }
//     }

//     toString(){
//         //重写toString方法,在数组实现得栈中已经有toString方法，所以需要重写,
//         if( this[_count] === 0 ) {
//             return "";
//         }
//         let str = "";
//         //遍历对象及其原型链的属性和方法
//         for( let key in this[_item] ) {
//            str += `${key}:${this[_item][key]},`;
//         }
//         str = str.replace(/,$/,"");
//         return str;
//     }

// }

// let myStack = new MyStack();
// console.log( myStack )
// myStack.push("aaa","bbbb");
// console.log( Object.keys(myStack) )


// 3.队列:是一种先进先出,后进后出的一种数据结构,
//可以使用数组和对象去实现,但是数组的效率比对象效率要低一点

// 使用数组去实现一个队列,方法包括有:enqueue()向队列尾部添加一个元素,dequeue()删除队头的一个元素,peekFront返回队列头部的一个元素,peekEnd返回队尾的一个元素,size()返回队列的长度,isEmpty()判断队列是否为空


// let _item = Symbol("queueItem");//私有化

// class MyQueue{
//     constructor(){
        
//         this.item = [];//数组模拟队列
//     }
    
//     enqueue(...args){
//         //向队尾添加一个或者多个元素
//         if(args.length === 0) {
//             throw Error("enqueue method must at least 1 param,please add");
//         }
//         for( let value of args ) {
//             this.item.push(value);
//         }
//     }

//     dequeue(){
//         //移除队头的一个元素
//         if( this.item.length === 0 ) {
//             return undefined;
//         }
//         let result = this.item.shift();
//         return result;
//     }

//     peekFront(){
//         //返回队头元素
//         let frontElement = this.item[0];
//         return frontElement;
//     }

//     peekEnd(){
//         //返回队尾元素
//         let endElement = this.item[this.item.length-1];
//         return endElement;
//     }

//     size(){
//         return this.item.length;
//     }

//     isEmpty(){
//         return this.item.length === 0;
//     }
// }

// let myQueue = new MyQueue();
// console.log( myQueue )
// myQueue.enqueue("aaaa","bbbb");
// console.log( myQueue )

// 使用对象实现队列：
//私有化
// let _count = Symbol("queueCount");
// let _item = Symbol("queueItem");
// let _lower = Symbol("queueLower");
// class MyQueue{
//     constructor(){
//         this[_count] = 0;
//         this[_item] = {};
//         this[_lower] = 0;//记录队列头部元素序号
//     }

//     enqueue(...args){
//         if(args.length === 0) {
//             throw Error("enqueue method must at least 1 param,please add");
//         }

//         for(let value of args) {
//             this[_item][ this[_count] ] = value;
//             this[_count]++;
//         }

//     }

//     dequeue(){
//         if( this[_count] === 0 ) {
//             return undefined;
//         }

//         let result = this[_item][ this[_lower] ];
//         delete this[_item][ this[_lower] ];//删除队头元素
//         this[_count]--;
//         this[_lower]++;
//         return result;
//     }

//     peekFront(){
//         //查看队列头部元素
//         return this[_item][ this[_lower] ];
//     }

//     peekEnd(){
//         //查看队列尾部元素
//         return this[_item][ this[_count]-1 ];
//     }

//     isEmpty(){
//         return this[_count] === 0;
//     }

//     size(){
//         return this[_count];
//     }

//     clear(){
//         //清空队列
//         this[_count] = 0;
//         this[_lower] = 0;
//         this[_item] = {};
//     }

//     toString(){
//         //这个方法和栈的方法一样
                
//                     if( this[_count] === 0 ) {
//                         return "";
//                     }
//                     let str = "";
//                     //遍历对象及其原型链的属性和方法
//                     for( let key in this[_item] ) {
//                        str += `${key}:${this[_item][key]},`;
//                     }
//                     str = str.replace(/,$/,"");
//                     return str;
//                 }

// }

// let myQueue = new MyQueue();
// console.log( myQueue );
// myQueue.enqueue("aaa","bbbbb");

// console.log( myQueue.peekFront() );

// 4.链表:是一种不连续(元素不是连续放置的)的线性表,插入和删除效率高,查找效率低,并且储存空间是动态扩容的,
// 实现一个单向链表:

//创建一个节点类:
// class Node {
//     constructor(element){
//         this.element = element;//储存一个元素
//         this.next = null;//储存指向下一个元素的指针
//     }
// }
// //创建链表类
// class LinkedList {
//     constructor(){
//         //将this.count喝this.head私有化可以自己实现,可以用symbol的方法
//         this.count = 0;//链表数量
//         this.head = null;//链表头指针
//     }

//     push(element) {
//         //向链表尾部添加一个元素
//         let node = new Node(element);
//         let current ;
//         if( this.head === null ) {//如果是空链
//             this.head = node;
//         }else {

//             current = this.head;
//             //获取最后一项
//             while( current.next  !== null ){
//                 current = current.next;
//             }
//             current.next = node;
//             this.count++;
//         }
//     }
//     insert(element, index){
//         //向链表的特定位置插入一个新元素。
//         if( index >= 0 && index <this.count ) {
//             let node = new Node(element);
//             let current = this.head;
//             if(index === 0) {
//                 node.next = current;
//                 this.head = node;
//             }else {
//                 let pervious;
//                 for( let i=0;i<index;i++ ) {//获取要插入节点
//                     pervious = current;
//                     current = current.next;
//                 }
//                 //接入新节点
//                 node.next = pervious.next;
//                 pervious.next = node;
//                 this.count++;//更新链长度
//                 return true;//返回true表示插入成功
//             }

//         }else {
//             return false;
//         }
//     }
//     getElementAt(index){
//         //返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回undefined
//         //判断是否越界
//         if( index >=0 && index < this.count ){
//             let current = this.head;
//             if( index === 0 ) {
//                 return current;
//             }else {
//                 for( let i=0;i<index;i++ ) {
//                     current = current.next;
//                 }
//                 return current;
//             }


//         }else {
//             return undefined;
//         }

//     }
//     remove(element){
//         //从链表中移除一个元素,移除成功返回true,移除失败返回false
//         let current = this.head;
//         let pervious;
//         for( let i=0;i<this.count;i++ ) {
//             if( current.element === element ) {
//                 pervious.next = current.next;
//                 current.next = null;
//                 return true;
//             }
//             pervious = current;
//             current = current.next;
//         }
//         return false;

//     }
//     indexOf(element){
//         //返回元素在链表中的索引。如果链表中没有该元素则返回-1
//         let current = this.head;
//         for( let i=0;i<this.count;i++ ) {
//             if( current.element === element ){//这里的相等可以自己写一个浅相等或者 深度相等
//                 return i;
//             }
//             current = current.next;
//         }
//         return -1;
//     }
//     removeAt(index){
//         //从链表的特定位置移除一个元素
//         if( index >= 0 && index < this.count ) {//检查是否越接删除
//             let current = this.head;
//             //当删除的是链头
//             if(index === 0){
//                 this.head = current.next;//删除头节点
//             }else {
//                 let pervious;//删除节点的前一个节点
//                 //寻找删除节点,删除节点胃current
//                 for(let i=0;i<index;i++) {
//                     pervious = current;
//                     current = current.next;
//                 }
//                 pervious.next = current.next;
//             }
//             this.count--;
//             return current.element;//返回节点值

//         }else {
//             return undefined;
//         }

//     }
//     isEmpty(){
//         //如果链表中不包含任何元素，返回true，如果链表长度大于0 则返回false
//         return this.count === 0;
//     }
//     size(){
//         //返回链表包含的元素个数，与数组的length 属性类似
//         return this.count;
//     }
//     toString(){
//         //返回表示整个链表的字符串。由于列表项使用了Node 类，就需要重写继承自JavaScript 对象默认的toString 方法，让其只输出元素的值
//         if (this.head == null) {
//         return '';
//         }
//         let objString = `${this.head.element}`; 
//         let current = this.head.next; 
//         for (let i = 1; i < this.size() && current != null; i++) { 
//         objString = `${objString},${current.element}`;
//         current = current.next;
//         }
//         return objString;   
//     }
// }


//实现一个双向链表:

// class DoubleNode{
//     constructor(element){
//         this.element = element;//节点值
//         this.previous = null;//节点指向前一个的指针
//         this.next = null;//节点指向下一个的指针
//     }
// }

// class DoubleLinkedList{
//     constructor(){
//         this.count = 0;//链表数量
//         this.head = null;//链表头指针
//         this.tail = null;//链表尾指针
//     }

//     push(element){//向双向队列尾部添加一个节点
//         let doubleNode = new DoubleNode(element);
//         if( this.head === null ) {//如果是空链
//             this.head = doubleNode;
//             this.tail = doubleNode;//这步可以要可以不要
//             this.count++;
//             return true;
//         }else {
//             let tail = this.tail;
//             tail.next = doubleNode.previous;
//             this.tail = doubleNode;
//             this.count++;
//             return true;
//         }
//     }

//     insert(element,index) {//向特定的位置插入一个节点
    
//         //判断插入位置是否越界
//         if( index >0 && index < this.count ){
//             let doubleNode = new  DoubleNode(element);
//             //可以使用一个current变量储存this.head和this.tail进行变量的赋值,也可以不使用
//             if( index === 0 ){
//                 if(this.head === null){
//                     this.head = doubleNode;
//                     this.tail = doubleNode;
//                 }else {
//                     doubleNode.next = this.head;
//                     this.head.previous = doubleNode;
//                     this.head = doubleNode;
//                 }
//             }else if(index === this.count){
//                 this.tail.next = doubleNode;
//                 doubleNode.previous = this.tail;
//                 this.tail = doubleNode;
//             }else {
//                 let pre,current=this.head;
//                 //寻找要插入的节点,current为插入的节点的后一个节点,而pre为要插入的节点的前一个节点,这里可以连续找两个节点也可以，找一个节点也可以,因为找到一个节点就等于找到其前后节点,这里为了便于理解找了两个节点
//                 for( let i=0;i<index;i++ ){
//                     pre=current;
//                     current = current.next;
//                 }
//                 //加入节点
//                 doubleNode.next = current;
//                 current.previous = doubleNode;
//                 doubleNode.previous = pre;
//                 pre.next = doubleNode;
//             }
//             this.count++;
//             return true;

//         }
//         return false;

//     }

//     removeAt(index){//从任意位置移除元素
        
//         //检测越界
//         if( index >=0 && index < this.count ){

//             //这个也存在三种情况,移除头元素,移除尾元素,移除中间元素
//             let current = this.head;
//             if( index === 0 ){
//                 this.head = current.next;
//                 //丢弃第一个节点有两种分类:只有一项和多余一项
//                 if( this.count === 1 ) {
//                     this.tail = null;
//                 }else {
//                     this.head.previous = null;
//                 }
//             }else if( index === this.count-1 ){
//                 current = this.tail;
//                 this.tail = current.previous;
//                 this.tail.next = null;//丢弃节点，等待自动回收
//             }else {
//                 //这里采用找单个节点,当然你也可以找两个节点,这样写起来方便一点
                
//                 for( let i=0;i<index;i++ ){
//                     current = current.next;
//                 }
//                 let pre = current.previous;
//                 pre.next = current.next;
//                 current.next.previous = pre;
//             }
//             this.count--;
//             return current.element;

//         }
//         return false;


//     }

//     //其他方法跟单项链表都差不多,自己可以实现

// }

//循环单项链表和循环双向链表原理也是差不多,自己可以实现一下

// 6.集合:是一种不允许重复值的顺序数据结构

//实现一个集合:类似这种结构得{1,2,3,"a","b"},就跟ES6得Set数据结构类似
// class MySet{
//     constructor(){
//         this.item = {};
//     }

//     add(element){//向集合添加一个新元素
//         //因为要添加得都是不重复得元素,所以先判断是否存在此元素
//         if( !this.has(element) ){
//             this.item[element] = element;
//             return true;
//         }
//         return false;

//     }
//     delete(element){//从集合移除一个元素
//         //element存在则删除,不存在则返回false
//         if( this.has(element) ) {
//             delete this.item[element];
//             return true;
//         }
//         return false;

//     }
//     has(element){//如果元素在集合中,返回true，否则返回false
//         // return element in this.item;或者下面这种(更好),因为使用in会遍历原型链,而使用hasOwnProperty则只会遍历此对象
//         return Object.prototype.hasOwnProperty.call( this.element,element );
//     }
//     clear(){//移除集合所有元素
//         this.item = {};
//     }
//     size(){//返回集合中元素的数量,
//         //最简单得方式就是使用ES6得Object.keys得方法
//         return Object.keys(this.item).length;
//     }
//     values(){//返回一个包含集合所有值得数组
//         return Object.values( this.item )
//     }
// }

// 7.树:是一种非顺序结构,二叉树:只有左右节点的树,二叉搜索树：他是二叉树而且值得大小:左=>中=>右

// 创建一个树得节点

// class TreeNode{
//     constructor(key){
//         this.key = key;
//         this.left = left;
//         this.right = right;
//     }
// }
//实现一个二叉搜索树(值得大小顺序:左根右)
// class MyTree{
//     constructor(){
//         this.root = null;//根节点变量
//     }

//     insert(key){ //向树中插入一个新的键
//         if( this.root === null  ){
//             this.root = new TreeNode(key);
//         }else {
//             this.insertNode(this.root,key);
//         }

//     }

//     insertNode(node,key){//插入节点的辅助方法
//         //比较判断是否比根节点大或者小
//         if( key < node.key ){//比根节点小,插入根节点的左边
//             if( node.left === null ) {
//                 node.left = new TreeNode(key);
//             }else {
//                 this.insertNode(node.left,key);//递归寻找下一个空的左侧节点
//             }
//         }else {//比跟节点大,插入根节点的右边
//             if( node.right === null ){
//                 node.right = new TreeNode(key);
//             }else {
//                 this.insertNode(node.right,key);
//             }
//         }
//     }

//     search(key){//在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false
//         return this.searchNode( this.root,key );
//     }

//     searchNode(node,key){
//         if(node == null){ return false }
//         if( key < node.key ) {
//             return this.searchNode(node.left,key)
//         }else if( key > node.key ) {
//             return this.searchNode(node.right,key);
//         }else{
//             return true;
//         }
//     }
    
//     inOrderTraverse(callback){//通过中序遍历方式遍历所有节点,遍历左根右节点

//         this.inOrderTraverseNode(this.root,callback);
//     }

//     inOrderTraverseNode(node,callback){
//         if( node != null ) {
//             this.inOrderTraverseNode(node.left,callback);
//             callback(node.key);
//             this.inOrderTraverseNode(node.right,callback);

//         }
//     }

//     preOrderTraverse(callback){//通过先序遍历方式遍历所有节点
//         this.preOrderTraverseNode(this.root,callback);
//     }

//     preOrderTraverseNode(node,callback){
//         if( node != null ) {
//             callback(node.key);
//             this.inOrderTraverseNode(node.left,callback);
//             this.inOrderTraverseNode(node.right,callback);

//         }
//     }

//     postOrderTraverse(callback){//通过后序遍历方式遍历所有节点
//         this.postOrderTraverseNode(node,callback);
//     }

//     postOrderTraverseNode(node,callback){
//         if( node != null ) {
//             this.inOrderTraverseNode(node.left,callback);
//             this.inOrderTraverseNode(node.right,callback);
//             callback(node.key);
//         }
//     }

//     min(){//返回树中最小的值/键
//         return this.minNode( this.root );
//     }
//     minNode(node){
//         let current = node;//current为最小值变量
//         while( node != null && node.left != null  ) {
//             current = current.left;
//         }
//         return current;
//     }
//     max(){//返回树中最大的值/键
//         return this.maxNode(this.root);
//     }

//     maxNode(node){
//         let current = node;
//         while( current != null && current.right != null ) {
//             current = current.right;
//         }
//         return current;
//     }

//     remove(key){//从树中移除某个键
//         this.root = this.removeNode(this.root, key);
//     }
//     removeNode(node, key) {
//         if (node == null) { 
//         return null;
//         }
//         if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
//         node.left = this.removeNode(node.left, key); 
//         return node; 
//         } else if (
//         this.compareFn(key, node.key) === Compare.BIGGER_THAN
//         ) { 
//         node.right = this.removeNode(node.right, key); 
//         return node; 
//         } else {
      
//         if (node.left == null && node.right == null) { 
//         node = null; 
//         return node; 
//         }
//         // 第二种情况
//         if (node.left == null) { 
//         node = node.right; 
//         return node; 
//         } else if (node.right == null) { 
//         node = node.left;
//         return node; 
//         }
//         // 第三种情况
//         const aux = this.minNode(node.right); 
//         node.key = aux.key; 
//         node.right = this.removeNode(node.right, aux.key);
//         return node; 
//         }
//         }

// }



