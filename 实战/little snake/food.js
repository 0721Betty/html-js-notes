// 自调用函数创建食物对象，分号不能少
(function(){
    var elements = [];//用来保存每个小方块食物的数组
    //食物的构造函数
    function Food(x,y,width,height,color){
        // 横纵坐标
        this.x = x || 0;
        this.y = y || 0;
        // 宽高背景颜色
        this.width = width || 20;//默认为20
        this.height = height || 20;
        this.color = color || "blue";//默认为绿色
    };
    // 食物显示在地图上，所以需要map该参数
    Food.prototype.init = function(map){
        // 先删除食物
        remove();
        // 为食物创建一个div并且给其设置样式
        var div = document.createElement("div");
        // 把div加入到map中
        map.appendChild(div);
        // 设置div的样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        div.style.position = "absolute";//绝对定位，脱离文档流
        // 横纵坐标随机产生
        this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        // 把div加入到elements数组中
        elements.push(div);
    };
    // 私有的函数删除食物,外面不能访问
    function remove(){
        // elements数组中有这个食物
        for(var i = 0;i<elements.length;i++){
            var ele = elements[i];
            // 找到ele这个自己元素的父级元素然后删掉这个子元素
            ele.parentNode.removeChild(ele);
            // 再次把elements数组中的ele子元素也删除
            elements.splice(i,1);
        }
    };
    // 让Food暴露为全局构造函数，外部也能调用
    window.Food = Food;
}());

// 外部测试代码
// var fd = new Food();
// //获取地图对象，是init方法中的参数
// var map = document.querySelector(".map");
// fd.init(map);
// fd.init(map);
// fd.init(map);
// 无论调用多少次init方法始终只有一个食物在地图上，因为init方法中最开始调用了remove()方法,删除了食物