// 根据id获取元素，封装成一个函数
function my$(id){
    return document.getElementById(id);
}

//浏览器兼容问题，给标签里面添加文本内容，属性innerText和属性textContent
//如果这个属性在浏览器中不支持那么这个属性的类型是undefined
//判断这个属性的类型就知道浏览器支不支持
//兼容代码

//设置任意的标签中间的任意文本内容
function setInnerText(element,text){
    if(typeof element.textContent == "undefined"){//说明不支持
        element.innerText = text;
    }else{
        //说明支持属性textContent
        element.textContent = text;
    }
}

//获取任意标签中间的任意文本内容
function getInnerText(element){
    if(typeof element.textContent == "undefined"){
        //说明不支持
        return element.innerText;
    }else{
        //说明支持属性textContent
        return element.textContent;
    }
}
//innerHTML是可以设置文本内容，主要作用是在标签中设置新的html标签内容，是具有标签效果的
//综上所述推荐使用innerHTML设置标签中文本内容，但是获取标签中文本内容及标签用innerHTML,只是设置文本用innerText和textContent


//获取任意一个父级元素的第一个子级元素  参数element是父级元素
function getFirstElementChild(element){
    if(element.firstElementChild!="undefined"){
        //说明浏览器支持该方法
        return element.firstElementChild;
    }else{
        //不支持
        var node=element.firstChild;//第一个节点
        while(node&&node.nodeType!=1){
            node=node.nextSibling;
        }
        return node;
    }
}

//获取任意一个父级元素的最后一个子级元素  参数element是父级元素
function getLastElementChild(element){
    if(element.lastElementChild!="undefined"){
        //说明浏览器支持该方法
        return element.lastElementChild;
    }else{
        //不支持
        var node=element.lastChild;//第一个节点
        while(node&&node.nodeType!=1){
            node=node.previousSibling;
        }
        return node;
    }
}

//为任意元素绑定任意事件的兼容代码,参数1：任意的元素，参数2：事件类型，参数3：事件处理函数
//可以为一个元素绑定相同的多个事件
function addEventListener(element,type,fn){
    //判断浏览器是否支持这个方法
    if(element.addEventListener){
        element.addEventListener(type,fn,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,fn);
    }else{
        element["on"+type]=fn;
    }
}

//解绑事件的兼容
//为任意的元素解绑对应的事件 fnName是命名函数的名字
function removeEventListener(element,type,fnName){
    //判断浏览器是否支持这个方法
    if(element.removeEventListener){
        element.removeEventListener(type,fnName,false);
    }else if(element.detachEvent){
        element.detachEvent("on"+type,fnName);
    }else{
        element["on"+type]=null;
    }
}

//匀速动画函数---任意一个元素移动到指定的目标位置
function animate(element,target){
    //先清理定时器,保证点击按钮只产生一个定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function(){
        //获取元素的当前的位置
        var current = element.offsetLeft;//数字类型没有单位px
        //元素每次移动多少像素---步数
        var step = 10;
        //当前位置小于目标位置则走正数，反之走负数即往相反的方向走
        step = current<target?step:-step;
        //每次移动后的距离，即当前移动到的位置
        current += step;
        //判断当前移动的位置是否到达目标位置
        if(Math.abs(target-current)>Math.abs(step)){
            element.style.left = current+"px";
        }else{
            //清理定时器
            clearInterval(element.timeId);
            //说明马上到达目标，就直接到达目标因为当target与step直接不是除数和被除数的关系则总是接近target而到不了
            element.style.left=target+"px";
        }
    },20);  
}
//缓速动画函数
function animate1(element,target){
    //清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function(){
        //获取元素的当前的位置
        var current = element.offsetLeft;
        //移动的步数
        var step = (target-current)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        current += step;
        element.style.left = current + "px";
        if(current == target){
            //清理定时器
            clearInterval(element.timeId);
        }
        //测试代码
        console.log("目标位置："+target+"，当前的位置："+current+"，每次移动的位置"+step);
    },20);
}
//获取浏览器向上卷曲出去的距离的值，向左卷曲出去的值

// function getScroll() {
//     var obj = {};
//     //向上卷曲出去的距离
//     var top1 = window.pageYOffset || document.documentElement
//         .scrollTop || document.body.scrollTop || 0;
//     //向左卷曲出去的距离
//     var left = window.pageXOffset || document.documentElement.scrollTop
//         || document.body.scrollTop || 0;
//     obj.left = left;
//     obj.top = top1;
//     return obj;
// }
function getScroll() {
    return{
        left :window.pageXOffset || document.documentElement.scrollLeft|| document.body.scrollLeft || 0,
        top :window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    }
}


//获取任意一个元素element的任意一个属性attr的值
// function getStyle(element,attr){
//     //判断浏览器是否支持这个方法
//     if(window.getComputedStyle){
//         return window.getComputedStyle(element,null)[attr];
//     }else{
//         return element.currentStyle[attr];
//     }
// }

function getStyle(element,attr){
    //判断浏览器是否支持这个方法
    return window.getComputedStyle ? window.getComputedStyle(element,null)[attr] : 
    element.currentStyle[attr];
}