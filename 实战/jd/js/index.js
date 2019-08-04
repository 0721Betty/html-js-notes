window.onload = function(){
// 小圆点实现banner轮播图的js

    //实现点击中间的小圆点，小圆点改变背景颜色
    //找到包含小圆点的ol标签
    var circle = document.getElementById("circle");
    //先找到所有的ol中的li标签
    var lis = circle.getElementsByTagName("li");
    //找到所有的包含banner图片的ul标签
    var banner = document.getElementById("banner");
    //找到所有包含banner图片的li标签
    var list = banner.getElementsByTagName("li");
    //循环遍历为每个li添加鼠标进入事件
    for(var i=0;i<lis.length;i++){
        //为每个li设置索引值
        lis[i].setAttribute("index",i);
        //添加鼠标进入事件
        lis[i].onmouseenter=function(){
            //先清除所有li的类样式
            for(var j=0;j<lis.length;j++){
                lis[j].removeAttribute("class");
            }
            //为当前的li添加类样式
            this.className="current";
            //取得当前小圆点的索引值，下面让其对应的banner图片显示出来
            var index = this.getAttribute("index");
            //先把所有的banner中的li标签隐藏起来
            for(var k=0;k<list.length;k++){
                list[k].removeAttribute("class");
            }
            //对应索引值的banner显示出来
            list[index].className="selected";
        }
    }
//动画函数 任意元素移动到任意的距离
// function animate(element,target){

// }

//左右箭头点击实现轮播图


}

