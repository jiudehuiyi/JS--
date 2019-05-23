/*******
 *  String
 * ***********8 */
// 1._.camelCase
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
// 2._.capitalize
// 这里提供两种方法
// 第一种是简单容易理解的
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
_.capitalize = (string) =>{
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
        return c.toUpperCase();
        });
}

// 3._.endsWith([string=''], [target], [position=string.length])
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
// 4.escape源码如下
// 关于字符转义
// 将HTML特殊字符转换成等值的实体
function escapeHTML (str) {
    var escapeChars = {
    '<' : 'lt',
    '>' : 'gt',
    '"' : 'quot',
    '&' : 'amp',
    '\'' : '#39'
    };
    return str.replace(new RegExp('[' + Object.keys(escapeChars).join('') +']', 'g'),
    function (match) {
    return '&' + escapeChars[match] + ';';
    });
    }
    // 实体字符转换为等值的HTML。
function unescapeHTML (str) {
    var htmlEntities = {
    nbsp: ' ',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: '\''
    };
    return str.replace(/\&([^;]+);/g, function (match, key) {
    if (key in htmlEntities) {
    return htmlEntities[key];
    }
    return match;
    });
    }
// 5.  kebabCase实际上是camelCase方法的反方法  
_.kebabCase = (string)=>{
    return str.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}
// 6.lowerCase方法跟camelCase差不多

// 7._.pad([string=''], [length=0], [chars=' '])
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
// 8.padEnd和padStart跟pad方法一样,只是pad在前后加,而padStart在前面加,padEnd在后面加
// 9._parseInt
_.parseInt = (string,radix) =>{
    if( radix == null ) {
        radix = 10;
    }
    return parseInt(string,radix);
}
// 10 _.repeat
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
// 11.replace
_.replace = (string,pattern,replacement)=>{
    return string.replace(pattern,replacement);
}
// 12.snakeCase跟camelCase实现的思想差不多

// 13._split
_.split = (string,separator,limit)=>{

    if(!limit) {
        return string.split(separator);
    }else {
        let arr = string.split(separator);
        arr.splice(limit,1)
        return arr;
    }

}
// 14.startCase跟第6，8，类型都是一样的

// 15.toLower
_.toLower = (string) =>{
    return string.toLowerCase()
}
// 16.toUpper
_.toUpper = (string) =>{
    return string.toUpperCase();
}
// 17._.trim
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
// 18. _.trimStart和trimEnd跟trim原理是一样的

// 19.upperCase跟第6，8，类型都是一样的