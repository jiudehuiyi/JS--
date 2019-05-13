//numeral.js是一个用于格式和操作数字的javascript库,功能十分强大。
//目的:通过本次源码的解析,可以加深对JS各项技能的认识,让大家能更好的理解实现原理


//numeral.js由于编写的时间比较长远,因此是没有采用模板化的,并且采用的是ES5标准来编写的


//立即执行函数函数表达式基础知识概括:
//立即执行函数函数表达式只适用于函数表达式,不适用于函数声明(报错),常用的有两种方式,1.(function(){})(),2.(function(){}()) 再这里是加上了"()"使其变成了函数表达式
//立即执行函数函数表达式(IIFE),是将内部变量lock住(即将变量常驻内存中),ES5采用这种方式可以使变量私有化,ES6则提供了const,let对变量私有化。
//下面举个例子：
//有问题的代码：
// var elementA = document.getElementsByTagName("a");

// for( var i=0; i<elementA.length; i++ ) {
//     elementA[i].onclick = function(e){
//         e.preventDefault();
//         console.log("I am Link #"+i); //这里输出永远是"I am Link #"+elementA.length，因为i并不是function的私有变量,循环执行是使用的同一个i,所以最后循环出来的每一个i都是elementA.length
//     }
// }

//ES5代码解决方法,通过立即执行表达式传入参数i解决
// var elementA = document.getElementsByTagName("a");
// for( var i=0; i<elementA.length; i++ ) {
//     (
//         function(lockedI){
//             elementA[i].onclick = function(e){
//                 e.preventDefault();
//                 console.log("I am Link #"+lockedI);
//             }
//         }
//     )(i)
// }
//ES6的解决方法,const,let的出现是为了解决这种问题的解决方案,ES代码:
// var elementA = document.getElementsByTagName("a");
// for( let i=0; i<elementA.length; i++ ) {
//     elementA[i].onclick = function(e){
//         e.preventDefault();
//         console.log("I am Link #"+i);
//     }
// }

//通过立即执行函数,不会暴露全局变量,不会使全局变量得到污染,只暴露一个变量(numeral)给window对象
//通过传参的方式:将this(再浏览器环境下this就是window),function(){}分别传递给global,factory
(function(global,factory){
    
    //amd下的处理,将numeral变量暴露给amd环境
    if(typeof define === "function" && define.amd) {
        define(factory);
    }else if(typeof module === "object" && module.exports) {
        //node.js下的处理,将numeral变量暴露给nodeJS环境中
        module.exports = factory();
    }else {
        //浏览器环境下的处理,将numeral变量暴露给window环境中
        global.numeral = factory();
    }

}(this,function(){

    var numeral,//定义numeral变量,该变量是唯一向外暴露的变量
        _,//定义一个下划线对象
        VERSION="2.0.6",//定义numeral的版本变量,常见是建议全部大写的
        //定义formats对象,是格式类型的集合
        formats={
        },
        //本地化配置对象,是一系列根据不同地区所用到的配置不一样的集合,例如是 "en"地区的,所使用的货币符号是$，如果是中国地区的所使用的货币符号是:￥
        locales={},
        //定义选项的默认值
        defaults={
            currentLocale:"en",//默认本地化为en,
            zeroFormat:null,
            nullFormat:null,
            defaultFormat:"0,0",//默认的格式化格式
            scalePercentBy100: true,//用于百分数
        },
        //定义一个选项对象
        options={
            currentLocale:defaults.currentLocale,//设置本地化
            zeroFormat:defaults.zeroFormat,
            nullFormat:defaults.nullFormat,
            defaultFormat:defaults.defaultFormat,
            scalePercentBy100: defaults.scalePercentBy100
        };
     


     //定义一个Numeral.js的构造函数,通过调用numeral(arg)后返回一个这样的构造函数,input是需要格式化的值,number是格式化后的值
     function Numeral(input,number){
        //_input带有下划线_的变量默认约定使在内部使用,而不会向外面进行暴露,input表示的是输入的参数,
        this._input = input;
        //number表示的是经过格式化后的值
        this._value = number;
     }

     //为numeral赋值一个函数,参数为input,input使调用时输入的值
     numeral = function(input) {
        var value,
            kind,
            regexp,
            unformatFunction;
        
        //判断input是不是Numeral的实例,如果是实例的话,则直接调用value()函数,
        if(numeral.isNumeral(input)) {
            //当input是Numeral实例时,调用的时numeral的原型中value(),而不是调用构造函数中的value()
            //input.value()返回的值是this._value，也就是经过格式化后的值
            value = input.value();
        }else if( input === 0 || typeof input === "undefined" ){ //处理undefined 和 0
            value = 0;
        }else if( typeof input === null && _.isNaN(input) ) { //处理null和NaN
            value = null;
        }else if(typeof input === "string") {//处理字符串

            if(options.zeroFormat && input === options.zeroFormat) {
                //当options.zeroFormat是自定义的一个值,当定义了一个值的时候,这个值就跟0差不多,就好像定义了一个0值
                value = 0;
            }else if(options.nullFormat && input === options.nullFormat||!input.replace(/[^0-9]+/g, '').length) {
                //options.nullFormat一样,只不过是相当于null
                value=null;
            }else {
                //遍历formats对象,formats对象储存着多种格式
                for( kind in  formats ) {
                    //获取还没有经过格式化的正则表达式,
                    regexp = typeof formats[kind].regexps.unformat === "function"?formats[kind].regexps.unformat():formats[kind].regexps.unformat;
                    //处理没有经过格式化
                    if(regexp && input.match(regexp)){
                        //将未经过格式化函数进行赋值,也就是将format中的unformat函数赋值
                        unformatFunction = formats[kind].unformat;
                        //找到了对应的方法,跳出此循环
                        break;
                    }
                }
                //当存在unformatFunction时,则调用此方法,当没有此方法的时候,默认执行numeral字符串转化为数字的方法
                unformatFunction = unformatFunction || numeral._.stringToNumber;
                //最后将input,作为参数传入函数进行相应的处理,
                value = unformatFunction(input);

                //总结,当调用numeral(arg)的时候默认调用format对象中的uformat(如果存在)方法,当unformat不存在的时候,默认调用stringToNumber方法,
                //当调用numberal(arg).format(argFormat)的时候,会调用format对象中的format方法,理解这一点非常重要
            }

        }else{//处理其他类型的,如果时number类型,则用Number进行转化,如果是对象的话则返回null
            value = Number(input) || null;
        }
        //返回一个Numeral实例,实际上是返回了一个对象,类似这样的:{_input:这是输入的值,_value:这是经过函数处理后的值}
        return new Numeral(input,value)
     }

     //判断传入的参数是否为Numeral的实例,是就返回true,不是就返回false
     numeral.isNumeral = function(input) {
         //tip:instanceof操作符中左边是一个对象,右边是一个构造函数
         return input instanceof Numeral;
     }
     //定义功能函数
     numeral._ = _ ={
         //对数字进行格式化,
        numberToFormat:function(value,format,roundFunction){
            var locale = locales[numeral.options.currentLocale],
                negP = false,
                optDec = false,
                leadingCount = 0,
                abbr = '',
                trillion = 1000000000000,
                billion = 1000000000,
                million = 1000000,
                thousand = 1000,
                decimal = '',
                neg = false//用去确定最后结果的格式化,
                abbrForce, // force abbreviation
                abs,
                min,
                max,
                power,
                int,
                precision,
                signed//用去确定最后结果的格式化,
                thousands,
                output;
            
            //给value设置一个默认值,防止在调用时候报错
            value = value || 0;
            
            //获取value的绝对值,传进来的value可能是负数
            abs = Math.abs(value);


            //对解析规则(format)进行解析
            //当format解析规则有"("的时候,
            if( numeral._.include(format,"(") ) {
                negP = true;
                //去除"("和")"符号
                format = format.replace(/[\(|\)]/g,"");
            }else if( numeral._.include(format,"+"),numeral._.include(format,"-")  ) {//当format解析规则有+,-的时候执行下面代码
                //当含有+获取+的位置,当有-时获取-的位置
                signed = numeral._.includes(format, '+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
               //去除+,-符号
                format = format.replace(/[\+|\-]/g,"");
            }


            //对解析规则带有"a"的进行解析
            if( numeral._.include(format,"a") ) {
                //因为默认的locale的abbreviations对象{thousand:"k",million: 'm',billion: 'b'，trillion: 't'},这是一个默认的配置,所以可能胡含有kmbt四个字符其中的一个
                abbrForce = format.match(/a(k|m|b|t)?/);//a可能是k,m,b,t其中一个的缩写
                //获取缩写字母,abbrForce[0]是获取匹配到整个正则的字符串,例如:ak,而abbrForce[1],则则是匹配()里面的字符串,例如:k
                abbrForce = abbrForce?abbrForce[1]:false;

                //检查缩写前面的空格,因为输入将要格式化的格式有可能是有空格和没空格的,以便格式化之后也将其保留下来,
                //例如:numeral(1230974).format('0.0a')是没有空格的,所以格式化之后是数值和单位之间是不存在空格的,1.2m
                //而numeral(1460).format('0 a')是由空格的,所以格式化之后数值和单位之间是存在空格的:1 k
                if(numeral._.include(format," a")) {
                    abbr = " ";
                }
                format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

                //对value的绝对值大于trillion或者解析规则带有t的进行格式化
                if (abs >= trillion && !abbrForce || abbrForce === 't') {
                    // trillion,locale.abbreviations.trillion是一个默认配置,trillion的单位是t,即这句话代码意思是获取/" "?t/
                    abbr += locale.abbreviations.trillion;
                    //得到真正的数值
                    value = value / trillion;
                } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === 'b') {
                    // billion,locale.abbreviations.billion是一个默认配置,billion的单位是b,即这句话代码意思是获取/" "?b/
                    abbr += locale.abbreviations.billion;
                    value = value / billion;
                } else if (abs < billion && abs >= million && !abbrForce || abbrForce === 'm') {
                    // million,locale.abbreviations.million是一个默认配置,million的单位是b,即这句话代码意思是获取/" "?m/
                    abbr += locale.abbreviations.million;
                    value = value / million;
                } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === 'k') {
                    // thousand,locale.abbreviations.thousand是一个默认配置,thousand的单位是t,即这句话代码意思是获取/" "?t/
                    abbr += locale.abbreviations.thousand;
                    value = value / thousand;
                }

            }

            //对解析规则带有[.]的进行解析,例如numeral(10000.1234).format('0[.]00000')得到的是10000.12340
            if( numeral._.include( format,"[.]" ) ) {
                optDec = true;
                format = format.replace("[.]",".");
            }

            //获取传入值得整数部分
            int = value.toString().split(".")[0];
            //获取精度(小数部分),小数与整数是以.分割的,
            precision = format.split(".")[1];
            //获取,字符串所在的位置,因为10000格式化为10,00;
            thousands = format.indexOf(",");
            //获取,前面数字的长度,例如:0,0.0 format.split(".")则是将字符串分为["0,0","0"] format.split(".")[0].split(",")分为["0","0"]
            leadingCount = (format.split(".")[0].split(",")[0].match(/0/g)||[]).length;

            if (precision) {//如果传入的format带有.则执行下面的代码
                //如果传入的precision有[
                if (numeral._.includes(precision, '[')) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    //需要保留小数的位数
                    decimal = numeral._.toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    decimal = numeral._.toFixed(value, precision.length, roundingFunction);
                }
                //获取精度的左边部分
                int = decimal.split('.')[0];

                if (numeral._.includes(decimal, '.')) {
                    // locale.delimiters.decimal默认为,
                    decimal = locale.delimiters.decimal + decimal.split('.')[1];
                } else {
                    decimal = '';
                }

                if (optDec && Number(decimal.slice(1)) === 0) {
                    decimal = '';
                }
            } else {
                int = numeral._.toFixed(value, 0, roundingFunction);
            }

            // check abbreviation again after rounding,单位转换处理代码
            if (abbr && !abbrForce && Number(int) >= 1000 && abbr !== locale.abbreviations.trillion) {
                int = String(Number(int) / 1000);

                switch (abbr) {
                    case locale.abbreviations.thousand:
                        abbr = locale.abbreviations.million;
                        break;
                    case locale.abbreviations.million:
                        abbr = locale.abbreviations.billion;
                        break;
                    case locale.abbreviations.billion:
                        abbr = locale.abbreviations.trillion;
                        break;
                }
            }
            
            // format number,当数值是负数,则获取其绝对值
            if (numeral._.includes(int, '-')) {
                int = int.slice(1);
                neg = true;
            }
            //int.length < leadingCount的时候,也就是整数部分小于1,将整数部分加上0
            //例如:numeral(0.23).format('0.0[0000]'),输出为:0.23
            if (int.length < leadingCount) {
                for (var i = leadingCount - int.length; i > 0; i--) {
                    int = '0' + int;
                }
            }
            //格式化thousand            
            if (thousands > -1) {
                int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locale.delimiters.thousands);
            }            
             //如果.是在format第一位的话，则是格式化的是一个小数,例如：numeral(-0.23).format(.00')结果为:-.23
            if (format.indexOf('.') === 0) {
                int = '';
            }
            //output为总输出结果
            output = int + decimal + (abbr ? abbr : '');
            
            if (negP) {
                output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
            } else {
                if (signed >= 0) {
                    output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
                } else if (neg) {
                    output = '-' + output;
                }
            }            
            return output;
        },

        //字符串转化为数字:
        stringToNumber: function(string) {
            var locale = locales[options.currentLocale],
                stringOriginal = string,
                abbreviations = {
                    thousand: 3,
                    million: 6,
                    billion: 9,
                    trillion: 12
                },
                abbreviation,
                value,
                i,
                regexp;

            //处理特殊值
            if (options.zeroFormat && string === options.zeroFormat) {
                value = 0;
            } else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, '').length) {
                value = null;
            } else {
                //赋一个默认值
                value = 1;
                //locale.delimiters.decimal默认值为",",处理string
                if (locale.delimiters.decimal !== '.') {
                    string = string.replace(/\./g, '').replace(locale.delimiters.decimal, '.');
                }

                for (abbreviation in abbreviations) {
                    //locale.currency.symbol是一种货币符号
                    regexp = new RegExp('[^a-zA-Z]' + locale.abbreviations[abbreviation] + '(?:\\)|(\\' + locale.currency.symbol + ')?(?:\\))?)?$');

                    if (stringOriginal.match(regexp)) {
                        value *= Math.pow(10, abbreviations[abbreviation]);
                        break;
                    }
                }

                // check for negative number
                value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1;

                // remove non numbers
                string = string.replace(/[^0-9\.]+/g, '');

                value *= Number(string);
            }

            return value;
        },

         //判断value值必需是NaN才会返回true,如果不加typeof value === "number"的时候,则当时非空字符串也有可能返回的true
        isNaN:function(value){
            return typeof value === "number" && isNaN(value)
        },
        //判断string中是否包含search
        include:function(string,search){
            return string.indexOf(search) !== -1;
        },
        //在某个字符串插入一段子字符串,string是被插入的字符串,subString是插入到string的字符串,start是插入开始的位置
        insert:function(string,subString,start) {
            return string.slice(0,start)+subString+string(start);
        },
        reduce: function(array, callback /*, initialValue*/) {
            if (this === null) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }

            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            var t = Object(array),
                len = t.length >>> 0,
                k = 0,
                value;

            if (arguments.length === 3) {
                value = arguments[2];
            } else {
                while (k < len && !(k in t)) {
                    k++;
                }

                if (k >= len) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }

                value = t[k++];
            }
            for (; k < len; k++) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        },
        
        multiplier: function (x) {
            var parts = x.toString().split('.');

            return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
        },
        correctionFactor: function () {
            //将类数组arguments转化为数组
            var args = Array.prototype.slice.call(arguments);
            return args.reduce(function(accum, next) {
                var mn = _.multiplier(next);
                return accum > mn ? accum : mn;
            }, 1);
        },
        toFixed: function(value, maxDecimals, roundingFunction, optionals) {
            var splitValue = value.toString().split('.'),
                minDecimals = maxDecimals - (optionals || 0),
                boundedPrecision,
                optionalsRegExp,
                power,
                output;

            // Use the smallest precision value possible to avoid errors from floating point representation
            if (splitValue.length === 2) {
              boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
            } else {
              boundedPrecision = minDecimals;
            }

            power = Math.pow(10, boundedPrecision);

            // Multiply up by precision, round accurately, then divide and use native toFixed():
            output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);

            if (optionals > maxDecimals - boundedPrecision) {
                optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
                output = output.replace(optionalsRegExp, '');
            }

            return output;
        }


     }

     //定义numeral的版本
     numeral.version = VERSION;

     //向numeral添加属性
     numeral.options = options;

     numeral.locales = locales;

     numeral.formats = formats;

     //本地化配置,将代码特定的国家,地区,进行加工,numeral.locale可以让你自由设置本地化配置
     numeral.locale = function(key) {
         //当传入一个参数的时候,为options对象设置指定的配置,
         if(key) {
             options.currentLocale = key.toLowerCase();
         }
         //当不传入参数的时候,使用默认值:en
         return options.currentLocale;
     }

     //获取locale数据
     numeral.localeData = function(key) {
         //如果不传参数,则默认使用当前的locale
         if(!key) {
             return locales[options.currentLocale];
         }
         key = key.toLowerCase();
         //如果想要查询(传进来的参数)不存在,就会报错
         if(!locales[key]){
            throw new Error("unknown locale"+key);
         }

         //如果参数不为空,且在locales存在的话,则返回locales中指定的数据
         return locales[key];
     }

     //重新设置options选项,将defaults对象中所有属性赋值给options

     numeral.options = function() {
         for( var property in defaults ) {
            options[property] = defaults[property];
         }
     }

     //自定义就是定义一个format,当numeral(input),input等于format的时候,就相当于给this._value赋上0;也就是相当于这个值相当于0
     numeral.zeroFormat = function(format){
        options.zeroFormat = typeof format === "string"?format:null;
     }
     //跟numeral.zeroFormat一样,只不过是这个值代替了null
     numeral.nullFormat = function(format){
         options.nullFormat = typeof format === "string"?format:null;
     }
     //设置默认格式
     numeral.defaultFormat = function(format){
         options.defaultFormat = typeof format === "string"?format:"0.0";
     }

     //自定义格式化类型,type是类型,name是名字,format是怎样对数据进行格式化
     numeral.register = function(type,name,format) {
        name = name.toLowerCase();
        //判断该类型是否已经存在,特别注意的是此处的this不是指向window,而是指向的是numeral函数
        if(this[type+'s'][name]) {
            throw new Error(name + ' ' + type + ' already registered.')
        }
        //如果不存在,则将类型,名字,格式化写入相对应的的函数
        this[type+"s"][name] = format;

        //返回一个format,但是format一般要包括三个属性:format函数(格式化数据),regexps,unformat
        return format;

     }

     numeral.validate = function(val, culture) {
        var _decimalSep,
            _thousandSep,
            _currSymbol,
            _valArray,
            _abbrObj,
            _thousandRegEx,
            localeData,
            temp;

       //当val不为字符串,将其变成字符串
        if (typeof val !== 'string') {
            val += '';

            if (console.warn) {
                console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
            }
        }

        //去除val两边空格
        val = val.trim();

        //如果val是一个整数,则返回true
        if (!!val.match(/^\d+$/)) {
            return true;
        }

       //val是一个空值,则返回false
        if (val === '') {
            return false;
        }

        //get the decimal and thousands separator from numeral.localeData
        try {
             //获取指定culture的数据,如果发生错误,则采用默认配置化
            localeData = numeral.localeData(culture);
        } catch (e) {
            localeData = numeral.localeData(numeral.locale());
        }

        //setup the delimiters and currency symbol based on culture/locale
        _currSymbol = localeData.currency.symbol;//获取货币符号
        _abbrObj = localeData.abbreviations;////获取abbreviations集合,是一个对象
        _decimalSep = localeData.delimiters.decimal;//获取decimal,默认是",""
        if (localeData.delimiters.thousands === '.') {
            _thousandSep = '\\.';
        } else {
            _thousandSep = localeData.delimiters.thousands;
        }

        // 验证货币符号
        temp = val.match(/^[^\d]+/);
        if (temp !== null) {
            val = val.substr(1);
            if (temp[0] !== _currSymbol) {
                return false;
            }
        }

         //验证货币单位
        temp = val.match(/[^\d]+$/);
        if (temp !== null) {
            val = val.slice(0, -1);
            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
                return false;
            }
        }

        _thousandRegEx = new RegExp(_thousandSep + '{2}');

        if (!val.match(/[^\d.,]/g)) {
            _valArray = val.split(_decimalSep);
            if (_valArray.length > 2) {
                return false;
            } else {
                if (_valArray.length < 2) {
                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
                } else {
                    if (_valArray[0].length === 1) {
                        return ( !! _valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    } else {
                        return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    }
                }
            }
        }

        return false;
    };


    //定义numeral的原型对象,
    //使用方法,numeral(param).fn(),为什么这里是可以这样使用了呢,因为numeral(param)返回的是一个Numeral的实例,而且JS是依据原型继承的,所以是能才原型中找到方法的

    numeral.fn = Numeral.prototype={
        //对Numeral实例进行复制一份
        clone:function(){
            return numeral(this);//我觉得这里返回this也是可以的,numeral(this)只是返回了一个_value,而this则是原封不动的返回了_input _value
        },
        //对Numeral进行格式化,inputString是格式化的格式,roundFunction是自定义取整的函数
        format:function(inputString,roundFunction){
            var value = this._value,
            format = inputString||options.defaultFormat,
            kind,
            output,
            formatFunction;

            roundFunction = roundFunction || Math.round();//当不存在roundFunction的时候,默认采用Math.round()四舍五入的方式

            //对一些特殊的值进行处理
            if( value === 0 && options.zeroFormat !== null ) {
                output = options.zeroFormat;
            }else if( value === null && options.zeroFormat !==null ) {
                output = options.nullFormat;
            }else {
                //这个是遍历所有的formats中定义的格式,当找到符合inputString的时候,就会采用formats中的函数对value进行格式化
                for(kind in formats) {
                    if(format.match(formats[kind].regexps.format)) {
                        formatFunction = formats[kind].format;

                        //当找到符合的直接跳出循环
                        break;
                    }
                }
                //当formatFunction不存在的时候,就默认采用numberToFormat
                formatFunction = formatFunction || numeral._.numberToFormat;
                //对其进行格式化
                output = formatFunction(value, format, roundingFunction);
            }
            return output;

        },
        //获取Numeral实例的值
        value:function(){
            return this._value;
        },
        //获取Numeral实例的输入的值
        input:function(){
            return this._input;
        },
        //设置Numeral实例的值(value)
        set:function(value){
            return this._value=Number(value);
            return this;
        },
        //为Numeral实例的_value加上add函数参数,实现可以多种方式，例如:numeral(100).add(10).value()它的值为110
        add:function(value){
            var corrFactor = _.correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum + Math.round(corrFactor * curr);
            }

            this._value = _.reduce([this._value, value], cback, 0) / corrFactor;

            return this;
        },
        //减法,跟add函数原理一样
        subtract: function(value) {
            var corrFactor = _.correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum - Math.round(corrFactor * curr);
            }

            this._value = _.reduce([value], cback, Math.round(this._value * corrFactor)) / corrFactor;

            return this;
        },
        //乘法
        multiply: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = _.correctionFactor(accum, curr);
                return Math.round(accum * corrFactor) * Math.round(curr * corrFactor) / Math.round(corrFactor * corrFactor);
            }

            this._value = _.reduce([this._value, value], cback, 1);

            return this;
        },
        //除法
        divide: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = _.correctionFactor(accum, curr);
                return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
            }

            this._value = _.reduce([this._value, value], cback);

            return this;
        },
        //找出this._value与传入参数value之间的差异,返回的是一个绝对值,这里跟减法是有区别的
        //var number = numeral(-1000), value = 100;var difference = number.difference(value);结果仍然是900
        difference: function(value) {
            return Math.abs(numeral(this._value).subtract(value).value());
        }
    };

    //定义默认locale

    numeral.register("locale","en",{
        //分隔符
        delimiters:{
            thousands:",",
            decimal:"."
        },
        //默认格式化的字符
        abbreviations:{
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        
        ordinal: function(number) {
            var b = number % 10;
            return (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        //或不符号
        currency: {
            symbol: '$'
        }


    })



    //定义一个比特率的转换(bps),bps用得不多就不详细讲
    ( function(){

        numeral.register("format","bps",{

            regexps:{
                format:/(BPS)/,
                unformat:/(BPS)/,
            },
            format: function(value, format, roundingFunction) {
                var space = numeral._.includes(format, ' BPS') ? ' ' : '',
                    output;

                value = value * 10000;

                // check for space before BPS
                format = format.replace(/\s?BPS/, '');

                output = numeral._.numberToFormat(value, format, roundingFunction);

                if (numeral._.includes(output, ')')) {
                    output = output.split('');

                    output.splice(-1, 0, space + 'BPS');

                    output = output.join('');
                } else {
                    output = output + space + 'BPS';
                }

                return output;
            },
            unformat: function(string) {
                return +(numeral._.stringToNumber(string) * 0.0001).toFixed(15);
            }

        })




    } )()


    //字节的转化
    ( function(){

        //首先简略说kb和kib的区别,kb=1000bytes,是以十进制换算的,kib=1024byte,是以2进制算的

        //定义没有i的十进制换算
        var decimal = {
            base:1000,
            suffixes:['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        };
        //定义有i的二进制换算
        var binary = {
            base:1024,
            suffixes:['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        };

        //获取所有进制的总集合,实际上是将decimal,binary中的suffixes中的除去一个"B"就可以了,实际上就是数组去重,方法有许多,不一定要用源码中的,源码时这样实现的
        var allSuffixes = decimal.suffixes.concat( binary.suffixes.filter( function(item){
                return decimal.suffixes.indexOf(item) < 0;
        } )  );

        var unformatRegex = allSuffixes.split("|");
        // Allow support for BPS (http://www.investopedia.com/terms/b/basispoint.asp)
        unformatRegex = '(' + unformatRegex.replace('B', 'B(?!PS)') + ')';

        //定义字节的处理函数
        numeral.register("format","bytes",{
            regexps:{
                format:/([0\s]i?b)/,//format(param)函数中输入的参数依据这个正则进行编写,就是说传入的参数格式,必须与这个正则像匹配
                unformat:new RexExp(unformatRegex)//这个时没有格式化传入的格式
            },
            //当选用regexps.format中调用format函数(即调用numeral(param).format(param2)--传参,单位是i,ib),当选用regexps.unformat时调用unformat(即调用numeral(param).format()--不传参或者可以传入相对应的单位,例如kb,kib这样的单位等等，返回的是最小单位的数值),
            format:function(value,format,roundFunction){
                var output,//格式化后的数值
                bytes = numeral._.include(format,"ib")?binary:decimal,
                suffix = numeral._.includes(format, ' b') || numeral._.includes(format, ' ib') ? ' ' : '',
                pow,
                min,
                max;
                //处理单位和空格问题
                format = format.replace(/\s?i?b/,"");

                //确定value的单位
                for( pow=0; pow < bytes.suffixes.length;pow++ ) {
                    //min,max确定value是否在min-max的范围内
                    min = Math.pow(bytes.base,pow);
                    max = Math.pow(bytes.base,pow+1);
                    if( value === null || value ===0 || value >= min || value <max  ) {
                        suffix += bytes.suffixes[pow];//得到字节的单位
                        if (min > 0) {
                            value = value / min;
                        }
    
                        break;
                    }

                }

                // 获取输出的值output
                output = numeral._.numberToFormat(value,format,roundFunction);
                return output+suffix;//数值+单位
            },
            unformat:function(string){
                var value = numeral._.stringToNumber(string),
                    power,
                    bytesMultiplier;

                    if(value) {
                        for(power=decimal.suffixes.length-1;power>=0;i--) {
                            //如果string有传入单位的话,
                            if( numeral._.include(string,decimal.suffixes[power]) ) {
                                bytesMultiplier = Math.pow(decimal.base,power); 
                                break;
                            }
                            if( numeral._.include(string,binary.suffixes[power]) ) {
                                bytesMultiplier = Math.pow(binary.base,power);
                                break;
                            }
                        }
                    }
                    value *= (bytesMultiplier||1);
                    return value;
            }
        })

    } )()

    //货币的转化,默认是美元$,但是可以通过本地化进行不同货币的配置

    ( function(){

        numeral.register("format","currency",{
            regexps:{
                format:/(\$)/
            },
            format:function(value,format,roundFunction){
                var locale = numeral.locales[numeral.options.currentLocale],//本地化配置;
                symbols = {
                    before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
                    after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0]
                },
                output,
                symbol,
                i;

                format = format.replace(/\s?\$\s?/);

                output = numeral._.stringToNumber(value,format,roundFunction);
                            // update the before and after based on value
            if (value >= 0) {
                symbols.before = symbols.before.replace(/[\-\(]/, '');
                symbols.after = symbols.after.replace(/[\-\)]/, '');
            } else if (value < 0 && (!numeral._.includes(symbols.before, '-') && !numeral._.includes(symbols.before, '('))) {
                symbols.before = '-' + symbols.before;
            }
            // loop through each before symbol
            for (i = 0; i < symbols.before.length; i++) {
                symbol = symbols.before[i];

                switch (symbol) {
                    case '$':
                        output = numeral._.insert(output, locale.currency.symbol, i);
                        break;
                    case ' ':
                        output = numeral._.insert(output, ' ', i + locale.currency.symbol.length - 1);
                        break;
                }
            }

             // loop through each after symbol
             for (i = symbols.after.length - 1; i >= 0; i--) {
                symbol = symbols.after[i];

                switch (symbol) {
                    case '$':
                        output = i === symbols.after.length - 1 ? output + locale.currency.symbol : numeral._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
                        break;
                    case ' ':
                        output = i === symbols.after.length - 1 ? output + ' ' : numeral._.insert(output, ' ', -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
                        break;
                }
            }

            return output;
            }
        })

    } )();

    (function() {
        numeral.register('format', 'ordinal', {
        regexps: {
            format: /(o)/
        },
        format: function(value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
                output,
                ordinal = numeral._.includes(format, ' o') ? ' ' : '';

            // check for space before
            format = format.replace(/\s?o/, '');

            ordinal += locale.ordinal(value);

            output = numeral._.numberToFormat(value, format, roundingFunction);

            return output + ordinal;
        }
    });
})();

    //格式化百分数

    ( function(){
        numeral.register("format","percentage",{

            regexps:{
                format:/(%)/,
                unformat:/(%)/,
            },
            format:function(){
                var space=numeral.include(format," %")?" ":"",
                output;

                //因为传进来的是小数或者1,所以将数值提高100倍
                if(numeral.options.scalePercentBy100) {
                    value = value*100;
                }

                format = format.replace(/\s?\%/,"");

                output = numeral._.numberToFormat(value,format,roundFunction);

                //为数值添加%
                if (numeral._.includes(output, ')')) {
                    output = output.split('');
    
                    output.splice(-1, 0, space + '%');
    
                    output = output.join('');
                } else {
                    output = output + space + '%';
                }
                return output;
            },
            unformat:function(string){
                var number = numeral.stringToNumber(string);

                if(numeral.options.scalePercentBy100) {
                    number = number *0.01
                }
                return number;
            }


        })

    } )();

    //格式化时间

    ( function(){

        numeral.register( "format","time",{
            regexps:{
                format:/(:)/,
                unformat:/(:)/
            },
            format:function(value,format,roundFunction){
                var hours = Math.floor(value/60/60),
                    minutes = Math.floor( (value-hours*60*60)/60 ),
                    seconds = Math.floor( value-(hours*60*60)-(minutes*60) );
                    return hours+":"+(minutes<10?(0+minutes):minutes)+":"+(seconds<10?(0+seconds):seconds);
            },
            unformat:function(string){
                var timeArray = string.split(":"),
                seconds=0;
                if(timeArray.length===3) {

                    seconds = seconds+( Number(timeArray[0])*60*60 );

                    seconds = seconds + ( Number(timeArray[1]*60) );

                    seconds = seconds+Number(timeArray[2])

                }else if (timeArray.length === 2) {
                    // minutes
                    seconds = seconds + (Number(timeArray[0]) * 60);
                    // seconds
                    seconds = seconds + Number(timeArray[1]);
                }
                return Number(seconds)
            }
        } )

    } )()

















     return numeral;


}))




