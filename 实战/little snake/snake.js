// 蛇的自调用函数
(function(){
    var elments = [];//存放小蛇的每个身体部分
    // 蛇的构造函数 direction方向
    function Snake(width,height,direction){
        //小蛇的每个部分的宽高(由三个小方块组成)
        this.width = width || 20;//默认20
        this.height = height || 20;
        //小蛇的身体
        this.body = [
            {x:3,y:2,color:"red"},//头
            {x:2,y:2,color:"orange"},//身体
            {x:1,y:2,color:"orange"}//身体
        ];
        //小蛇的方向，默认向右
        this.direction = direction || "right";
    }
    //为原型添加方法---小蛇初始化的方法
    Snake.prototype.init = function(map){
        // 先删除之前的小蛇
        remove();
        //循环遍历创建div
        for(var i = 0;i<this.body.length;i++){
            // 数组中的每个数组元素都是一个对象
            var obj = this.body[i];
            // 创建div
            var div = document.createElement("div");
            // 将div添加到map中
            map.appendChild(div);
            // 设置div的样式宽高定位
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            // 背景颜色
            div.style.backgroundColor = obj.color;
            // 横纵坐标
            div.style.left = obj.x*this.width + "px";
            div.style.top = obj.y*this.height + "px";
            // 把div加入到elements数组中---目的为了删除
            elments.push(div);
        }

    };
    // 为原型添加方法，小蛇移动
    Snake.prototype.move = function(food,map){
        // 改变小蛇的身体的坐标位置
        var i = this.body.length - 1;//2
        for(;i>0;i--){
            // 把靠近蛇头的那个身体的横纵坐标给尾巴上的那个小方块的横纵坐标
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        // 判断方向改变小蛇头的坐标位置
        switch (this.direction) {
            case "right": this.body[0].x += 1; break;
            case "left": this.body[0].x -= 1; break;
            case "top": this.body[0].y -= 1; break;
            case "bottom": this.body[0].y += 1; break;
        }
        // 蛇移动的时候判断有没有吃到食物
        // 小蛇头的坐标和食物的坐标一致时即吃到食物了
        var headX = this.body[0].x*this.width;
        var headY = this.body[0].y*this.height;
        // 食物的横纵坐标
        var foodX = food.x;
        var foodY = food.y;
        if(headX==foodX&&headY==foodY){
            // 获取小蛇的尾巴
            var last = this.body[this.body.length-1];
            // 把最后的蛇尾复制一个重新加入到小蛇的body中
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            // 把食物删除，重新初始化食物
            food.init(map);
        }
    };
    // 删除小蛇的私有的函数
    function remove(){
        // 获取数组，从尾巴开始往头删
        var i = elments.length-1;
        for(;i>=0;i--){
            // 先从当前子元素中找到其父元素，然后删除该子元素
            var ele = elments[i];
            // 从地图上删除这个子元素div
            ele.parentNode.removeChild(ele);
            // 同时将数组中的删除
            elments.splice(i,1);//从第i个位置开始删除一个元素，即删除第i个位置的元素
        }
    };
    // 把Snake暴露给window
    window.Snake = Snake;
}());


// var sk = new Snake();
// var map = document.querySelector(".map");

// sk.init(map);
// sk.move(fd,map);
// sk.init(map);
// sk.move(fd,map);