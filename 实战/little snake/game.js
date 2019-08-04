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

// 自调用函数游戏对象
(function(){
    var that = null;
    // 游戏的构造函数
    function Game(map){
        // 创建食物对象
        this.food = new Food();
        // 小蛇对象
        this.snake = new Snake();
        this.map = map;
        that = this;//将实例对象保存到that中
    };
    // 游戏对象添加原型方法
    Game.prototype.init = function(){
        // 初始化游戏,让食物和小蛇都出现在地图上
        // 食物初始化
        this.food.init(this.map);
        // 小蛇初始化
        this.snake.init(this.map);
        
        //调用自动移动小蛇的方法
        this.runSnake(this.food,this.map); 
        // 调用按键的方法
        this.bindKey();

        // setInterval(function(){
        //     // 下面的this是window
        //     // this.snake.move(this.food,this.map);//小蛇移动
        //     that.snake.move(that.food,that.map);
        //     that.snake.init(that.map);
        // },150);

    };
    // 添加原型方法，设置小蛇可以自动的跑起来
    Game.prototype.runSnake = function (food, map) {
        // 自动的去移动
        var timeId = setInterval(function () {
            // 此时的this代表的是window

            // 移动小蛇
            this.snake.move(food, map);
            // 初始化小蛇
            this.snake.init(map);
            // 横坐标的最大值，最小值就是0
            var maxX = map.offsetWidth / this.snake.width;
            // 纵坐标的最大值，最小值就是0
            var maxY = map.offsetHeight / this.snake.height;
            // 获取小蛇的头的坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            // bind(that)改变了上面定时器中this的指向
            // 判断横坐标
            if (headX < 0 || headX >= maxX) {
                // 说明撞墙了，蛇停止移动，并且弹框说明游戏结束
                clearInterval(timeId);
                alert("Game over");
            }
            // 判断纵坐标
            if (headY < 0 || headY >= maxY) {
                clearInterval(timeId);
                alert("Game over");
            }
        }.bind(that), 150);
    };
    // 添加原型方法---设置用户按键，改变小蛇移动的方向
    Game.prototype.bindKey = function(){
        document.addEventListener("keydown",function(e){
            // 这里的this应该是触发keydown的事件的对象---document,所以需要用bind(that)
            // 获取按键的值
            switch(e.keyCode){
                case 37: this.snake.direction = "left";break;
                case 38: this.snake.direction = "top";break;
                case 39: this.snake.direction = "right";break;
                case 40: this.snake.direction = "bottom";break;
            }
        }.bind(that),false);
    };
    // 将游戏对象暴露给window
    window.Game = Game;
}());
