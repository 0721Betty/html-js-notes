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
function animateRetardation(element,target){
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

//获取任意一个元素element的任意一个属性attr的值
function getStyle(element,attr){
    //判断浏览器是否支持这个方法
    return window.getComputedStyle ? window.getComputedStyle(element,null)[attr] : 
    element.currentStyle[attr];
}

//缓动动画任意增加一个属性attr，根据该属性的值进行相应的变化（依赖于上述getStyle函数）
function animateAddAttr(element,attr,target){
    //清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function(){
        //获取此时元素当前的attr属性的值
        var current = parseInt(getStyle(element,attr));//将获取到的字符串类型转为数字类型
        //每次变化的大小
        var step = (target-current)/10;
        //Math.ceil(step)向下取整  Math.floor(step)向上取整
        step = step>0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        element.style[attr] = current + "px";
        if(current == target){
            //清理定时器
            clearInterval(element.timeId);
        }
        //测试代码
        console.log("目标位置："+target+"，当前的位置："+current+"，每次移动的位置"+step);
    },20);
}

//缓动动画函数增加任意多个属性
var json = {
    "width" : 300,
    "height" : 400
};
function animateAddMoreAttr(element, json) {
    //清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //flag用于判断是否所有的属性到达对应的位置，先假设全部属性到达相应的值
        var flag = true;
        for (var attr in json) {
            //获取当前元素的attr属性的值
            var current = parseInt(getStyle(element, json));//将获取到的字符串类型转为数字类型
            //当前属性对应的值
            var target = json[attr];
            //每次变化的大小
            var step = (target - current) / 10;
            //Math.ceil(step)向下取整  Math.floor(step)向上取整
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            current += step;
            element.style[json] = current + "px";
            //判断是否所有的属性到达相对应的值
            if(current!=target){
                flag = false;
            }
        }
        if (flag) {
            //清理定时器
            clearInterval(element.timeId);
        }
        //测试代码
        console.log("目标位置：" + target + "，当前的位置：" + current + "，每次移动的位置" + step);
    }, 20);
}

//终极版动画函数
function finalAnimate(element,json,fn){
    //清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function(){
        
    },20);
}