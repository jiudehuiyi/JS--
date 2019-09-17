/*
 *  
 *  本系列对react进行深度理解而且并配合一些面试题来进行理解  
 *  第一节:
 */

// 一.JSX并不是模板语言,他只是一种语法糖(React.createElement( component|Element,props,children )),
// 并且如果是大写字母开头的话就会被当成一个组件进行编译,如果开头是小写字母开头,则会被当成DOM元素进行编译,注意这两种编译机制是不一样的,例如:div是被当成DOM元素进行渲染,而Div则会被当成组件进行渲染

// 1.当使用jsx编写<div className="myTag">222</div>标签的时候它会被编译为:
// React.createElement( "div",{className:"myTag"},"222" );

// 如果当一个标签没有子代会被编译为第三个参数为null:
// 例如：<img src="http://www.jiudehuiyi.com"/>编译为:React.createElement( "img",{src:"http://www.jiudehuiyi.com"},null );

// 2.当标签嵌套标签的时候react是这样去编译的：
// 例如:<div className="div1" > <div className="div2" >2222</div> </div>
// 被编译为: React.createElement("div",{className:"div1"},React.createElement("div",{className:"div2"},"2222"));

// 3.当需要渲染一个组件:
// 例如渲染的组件为:<MyComponent color="red">MyComponent</MyComponent>,则会被编译为 React.createElement(MyComponent,{color:"red"},"MyComponent");

// 二.JSX会返回一个对象,这也就是经常所说的虚拟DOM对象,因为直接操作对象比直接操作DOM节点性能要高得多:
// 2.1比如: <button class="btn btn-blue"> <em>Confirm</em><a href="www.baidu.com">jiudehuiyi</a> </button>这个button首先会条用React.createElement方法,然后返回一个类似这样得对象:
// {
//     type:"button",
//     props:{
//         className:"btn btn-blue",
//         children:[ 
//             { type:"em",props:{ children:"Confirm" } }, 
//             { type:"a",props:{ href:"www.baidu.com",children:"jiudehuiyi" } } 
//         ]
//     }
// }
// 2.2:如果是一个组件的话,返回得对象也类似于元素:例如 <Button className="primary">Submit</Button>
// 返回得对象为：
    // {
    //     type:Button,
    //     props:{
    //         className:"primary",
    //         children:"Submit"
    //     }
    // }

// 使用jsx得注意点:
// 1.class属性在JSX应使用className代替,label标签中得for属性应写为htmlFor,其它得大致和html标签差不多,
// 2.jsx中需要输入输出显示到DOM节点的,jsx内部已经进行转义,是为了防止xss(代码注入),如果需要使用实际字符,react提供了一个dangerouslySetInnerHTML方法去避免jsx转义字符

// 三.组件大多数的组件是采用组合的方式去组装一个应用,而不是通过继承组件方式去产生,在react中都是继承React.Component或者React.PureComponent组件,
// React.Component实现了一些最基本的的属性和函数,例如定义了context,ref,props等属性,在其原型上定义了setState,forUpdate等函数,
// React.Component和React.PureComponent基本一样,唯一的区别在于shouldComponentUpdate,在React.Component中shouldComponentUpdate生命周期中默认返回的是true,而React.PuerComponent在shouldComponentUpdate中默认是进行了浅比较,这样性能会更好一些,但是还是有缺点,只能对一些进行浅比较,遇到一些复杂得应用会遇到意想不到得错误,而且如果一个组件用了PureComponent的话,它的后代组件也必需用PureComponent
// 现代的react应用中主要有两种方式创建组件:
// 3.1 ES6的类去创建

// class MyComponent extends React.Component{
//     constructor(props){
//         super(props);//必需需要这项,因为子类是没有this,需要继承父类得this,所以必需在组件中写这个,才可以使用this这个关键字
//     }

//     render(){//这是一个必需得生命周期
//         return (
//             <div>MyComponent</div>
//         )
//     }
// }
// // 3.2无状态组件,性能比ES6类组件要好,因为它始终保持了一个实例,避免了不必要得内存,但是却没有state和生命周期,所以可以适当使用这个组件,可以提高性能
// function Button({ color="red" }){
//     return (
//         <button>
//             <em>22222</em>
//         </button>
//     )
// }

// 四:生命周期(version>16.5)分为三个阶段:挂载阶段,更新阶段,卸载阶段
// 4.1 挂载阶段:
// constructor(){};//生成实例得时候调用,相当于构造函数,可以在这个生命周期内进行一些数据初始化,函数事件绑定等
// static getDerivedStateFromProps(){}//这个生命周期是react新版本新增得,组件实例化和更新数据得时候调用
// render(){}//渲染UI视图,
// componentDidMount(){};//DOM节点真实得挂载在页面上调用,可以在这个生命周期执行数据请求(ajax,fetch)等

// 4.2更新阶段:

// static getDerivedStateFromProps(){};////这个生命周期是react新版本新增得,组件实例化和更新数据得时候调用
// shouldComponentUpdate();//这个是性能优化的组件
// render(){}//渲染UI的组件
// getSnapshotBeforeUpdate();//在render后调用,而且它的返回值,传给componentDidUpdate的死三个参数
// componentDidUpdate();//更新完毕后调用

// 4.3卸载阶段:
// componentWillUnmount() { }//DOM卸载完毕调用,可以在这个生命周期做一些释放内存的操作,如事件回收,清除定时器

// 五.ref：新版本react主要有两种方法操作ref：一种是回调函数,另一种是React.ref();
// 5.1回调函数:例如获取一个div的dom节点
/* <div ref={ (param)=>this.myRef=param }>2222</div>//this.myRef则是代表此节点 */
// 5.2 React.ref:例如获取一个div的dom节点
// constructor(props){
//     super(props);
//     this.myRef = React.createRef();
// }
// componentDidMount(){
//     console.log( this.myRef.current );//输出div节点
// }
// render(){
//     return (
//         <div ref={this.myRef}></div>
//     )
// }

// 5.3当需要跨节点获取的话可以使用转发(React.forward()),例如父组件要获取子组件中的某个节点,这就是跨组件,当然这个情况特别少,如果需要的话可以采用React.forward()这个方法
// 5.4值得注意的是,react不是每个节点都能抽象成一个虚拟对象,避免操作DOM节点,有一些情况下还是得需要直接操作dom节点,例如window对象,input标签得focus方法,HTML5得Audio/Video得play方法

// 六:事件系统:
// react对原生得事件系统进行了封装,实现了一个叫合成事件(SyntheticEvent),并且这个事件系统是没有兼容性问题的,
// 并且对事件系统进行了一些优化,最显著的是实现了事件委托,它并不是将事件处理函数直接绑定在真实的DOM节点上,而是将其绑定到最外层的结构,使用一个统一的事件监听器,通过冒泡行为去触发事件,
// 6.1 事件绑定:主要有两种，在构造函数中使用bind进行绑定,或者直接使用ES6新语法
// 第一种构造函数使用bind绑定:例如为一个div绑定一个事件
// constructor(props){
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
// }
// handleClick(){
//     console.log(22222)
// }
// render(){
//     return(
//         <div onClick={ this.handleClick }>222</div>
//     )
// }

// 第二种箭头函数,箭头函数里面已经自动绑定this,并不需要我们手动去绑定
// constructor(props){
//     super(props);
// }

// handleClick(){
//     console.log( 22222 )
// }
// render(){
//     return (
//         <div handleClick={ ()=>this.handleClick() }></div>
//     )
// }
// 6.2 react的合成事件系统已经很完备了,但是我们也可以不使用合成系统事件,可以使用原生的事件,但是如果使用原生的合成事件久必需在节点已经装载完毕后的节点上进行节点的处理,例如在componentDidMount上去执行节点操作,而且我们也必需在卸载节点生命周期去手动移除,否则有可能会内存泄漏,而react则不需要,它已经妥善的处理了

// class App extends React.Component{

//     constructor(props){
//       super(props)
//       this.myRef = React.createRef();
//     }
  
  
//     componentDidMount(){
//       this.myRef.current.addEventListener("click",function(){
//         console.log(2222)
//       })
//     }
  
//     componentWillUnmount(){
//       this.myRef.current.removeEventListener("click");
//     }  
//     render(){
//       return (
//         <div  className="App"   >
//           <div  >333</div>
//           <div ref={this.myRef}>
//            2222
//           </div>
//        </div>
//       )
//     }
  
//   }

// 6.3:react和原生的事件混用需要注意的:
// 用ev.nativeEvent.stopPropagation()react合成事件方法是不能阻止绑定了原生事件冒泡行为,因为原生事件中的ev实例并没有nativeEvent属性
// 例如:
//  componentDidMount(){
//      document.body.addEventListener("click",function(ev){
//          ev.stopPropagation();//这是正确的,调用的是自己原生的方法
//          ev.nativeEvent.stopPropagation();//这是错误的,在原生绑定方法中是不能调用合成事件
//      })
//  }
//  但是在react事件中可以调用ev.nativeEvent.stopPropagation()或者ev.stopPropagation()去阻止事件冒泡的
//  例如:
//  handleClick=(ev)=>{
//      ev.stopPropagation();//这是正确的
//      ev.nativeEvent.stopPropagation();//这也是正确的
//  }

// 6.4: JS原生事件和react合成事件的区别和联系:
// react只实现了冒泡机制,因为捕获机制兼容是有问题的,并且在很多应该程序中是不会使用捕获阶段的,
// 原生事件机制:捕获阶段=>目标节点=>冒泡机制

// react的事件机制,事件类型是原生JS事件的一个子集

// 事件绑定机制：
// 原生:dom.onClick=function(){}dom.addEventListener("click",function(){})
// react:bind绑定和箭头函数绑定

// 七.表单:
// 受控组件和非受控组件:
// 受控组件是由React去控制,或者说由我们去控制,受控组件必需有一个value和一个控制函数:
// 例如：
// class App extends React.Component{

//     constructor(props){
//       super(props)
//       this.state={
//         value:"请输入值"
//       }
//     }
  
//     handleChange(ev){
//       this.setState({
//         value:ev.currentTarget.value
//       })
//     }  
//     render(){
//       return (
//         <div  className="App"   >
//           <input value={ this.state.value } onChange={ (ev)=>this.handleChange(ev) } />
//        </div>
//       )
//     }
  
//   }
  
// 非受控组件:是由原生DOM去控制的,它是没有控制函数的,并且value应该变成defaultValue
// 例如:<input  defaultValue="2222" />

// 八.组件通信:react数据是单向传递的

// 8.1.父子组件通信(父传子)
// 例如父组件向子组件传递一个name属性
// class Child extends React.Component{

//     render(){
//       return (
//         <div> {this.props.name} </div>
//       )
//     }
//   }
// class App extends React.Component{

//   constructor(props){
//     super(props)
//   }

 
//   render(){
//     return (
//       <div  className="App"   >
//         <Child name="huang"/>
//      </div>
//     )
//   }
// }

// 8.2:子组件向父组件传递信息：因为react数据是单项传递的,所以没有直接的API可以调用，只能通过比较迂回的方式去进行
// 回调函数：
// class Child extends React.Component{

//     handleClick=()=>{
//       this.props.deliverDataCallback("需要传递给父组件的数据")
//     }
  
//     render(){
//       return (
//         <div onClick={ ()=>this.handleClick() }> Child </div>
//       )
//     }
//   }
  
  
  
//   class App extends React.Component{
  
//     constructor(props){
//       super(props)
//     }
  
//     deliverDataCallback=(param)=>{
//       console.log( param )
//     }
   
//     render(){
//       return (
//         <div  className="App"   >
//           <Child  deliverDataCallback={ (param)=>this.deliverDataCallback(param) } />
//        </div>
//       )
//     }
  
//   }
// 跨组件通信(有嵌套关系的组件)则需要使用context,利用const con = React.createContext创建一个context,con.Provider提供数据,con.Consumer接收数据

// 没有嵌套关系的组件通信,需要用到发布/订阅模式去实现,即利用全局对象来保存事件,用广播模式去处理事件,redux或者flux也是可以处理这种关系的

// 九.高阶组件:就是一个函数接受一个组件,并且返回一个组件,而在react中一般就是返回传进来的那个组件,并且对其加上对应的属性，这叫做增强(enhanced)组件
// 因此高阶组件最重要的是增强其复用性,其次是逻辑性和抽象性,对render劫持,可以操作state,props
// 例如:为传入的组件传入一个name属性
// function HighComponent( WrapComponent,name ){
//     return class extends React.Component{
//         constructor(props){
//             super(props);
//         }
//         /*
//             在这里可以定义生命周期或者操作一些组件的方法
//         */
//        render(){
//            return (
//                <WrapComponent name={name} />
//            )
//        }
//     }
// }

// 9.1 实现高阶组件一般有两种方法:属性代理和反向继承

// 属性代理:高阶组件通过被包裹的React组件来操作props
// 例子:向需要包装的组件(WrappedComponent)增加属性,当然也可以对需要包装的组件的属性进行删除,改变
// const MyContainer = (WrappedComponent,name)=>{
//     return class extends React.Component{
//        render(){
//          return (
//            <WrappedComponent {...this.props} name={name}/>
//          )
//        }
//      }
//    }
   
// class MyComponent extends React.Component{

//     render(){
//       console.log(this.props)
//       return (
//         <div>222222</div>
//       );
//     }
//   }
  
//   const Com  =  MyContainer(MyComponent,"huang");

// 当然我们也能操作state:
// 上述Mycontainer组件修改成:
// const MyContainer = (WrappedComponent,name)=>{
//     return class extends React.Component {
//         constructor(props){
//             super(props);
//             this.state={
//                 name:"wei",
//                 age:18,
//                 job:"web"
//             }
//         }
//         render(){
//             let newState = Object.assign( {},{...this.state} )
//             return <WrappedComponent  {...this.props} {...newState} />
//         }
//     }
// }

// 反向继承:就是继承传进来的组件,拥有父组件的一切
// 例如:
// const MyContainer = (WrappedComponent)=>{
//     return class extends WrappedComponent{

//         render(){
//             console.log( this.props );
//             console.log( this.state );
//             return super.render();//条用父类的render函数
//         }

//     }
// }

// class MyComponent extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             name:"xiaohuang",
//             age:18
//         }
//     }
//     render(){
//         return (
//             <div>2222</div>
//         )
//     }
// }

// const Con = MyContainer(MyComponent);

// class App extends React.Component{

//     constructor(props){
//       super(props)
//     }
  
    
   
//     render(){
//       return (
//         <div  className="App"   >
//           <Con job="web"/>
//        </div>
//       )
//     }
  
//   } 

// 十.纯函数(PureRender)：
// 三大原则:
// 给定相同的输入,总是返回相同的输出:
// 例如:数组方法的slice方法,它给定相同的输出,返回相同的输出:
// let arr = [ "xiaohuang","xiaowei","xiaojian" ];
// arr.slice(0,2);//["xiaohuang","xiaowei"]
// arr.slice(0,2);//["xiaohuang","xiaowei"]
// arr.slice(0,2);//["xiaohuang","xiaowei"]
// // 在比如splice给定相同的输入,但是输出却不相同,跟splice方式类似的还有Math.random,Date.now()等等
// let arr=["xiaohuang","xiaowei","xiaojian","xiaoqiu","xiaojia","xiaohui"];
// arr.splice(0,2);//["xiaohuang","xiaowei"]
// arr.splice(0,2);//["xiaojian","xiaoqiu"];
// arr.splice(0,2);//["xiaojia","xiaohui"]

// 过程没有副作用:就是不能改变外部状态
// 举改变外部状态的一个函数:
// function add(arr){
//     arr.push("huang");
//     return arr;
// }
// 举不能改变外部状态的一个函数：
// function add(arr){
//     let newArr = [...arr];
//     newArr.push( "huang" );
//     return newArr;
// }


// 没有额外的依赖状态:就是指方法内的状态都只在生命周期内存活



