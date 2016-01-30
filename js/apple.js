$(function(){
    var clientH,clientW;
    $(window).resize(function(){
        clientW=$(window).width();
        clientH=$(window).height();
        console.log(clientW);
        if(clientW<730){
            $(".son").css({height:clientH,width:clientW});
            $(".header1").css("display","none");
            $(".header2").css("display","block");

            $(".dir-title").click(function(){
                $(this).next($(".dir-view")[0]).finish();
                $(this).toggleClass("bold");
                $(this).next($(".dir-view")[0]).slideToggle(200);
            });
        }else{

            $(".header1").css("display","block");
            $(".header2").css("display","none");

        }

    });
    $(window).resize();
    $(".menu").click(function(){
        $(".son").finish();
        //$("body").css("overflow","hidden");
        $(".son").slideToggle(200);

        $(".son").eq(0).height(clientH);

    });
    $(".son").click(function(e){
        e.stopPropagation();
    });
    $("h3 a").hover(function () {
        $(this).css("color","#000");
    }, function () {
        $(this).css("color","#08c");
    });


    //-----lunbo--------
    var index= 0;
    var lunbo=function () {
        index++;
        if(index==$(".list").length-1){
            $(".box").animate({
                left:-index*$(".list").width()}, function () {
                $(".box").css({left:0});
            });
            index=0;

        }else{
            $(".box").animate({
                left:-index*100+'%'
            });
        }
        $(".cir").removeClass("now-cir").eq(index).addClass("now-cir");
    };
    var timerId=setInterval(lunbo,2000);

    $(".cir").click(function(){
        var num=$(this).index();
        index=num;
        $(".cir").removeClass("now-cir").eq(num).addClass("now-cir");
        $(".box").animate({
            left:-index*100+'%'
        });

    });


    $(".banner").hover(function(){
        clearInterval(timerId);
    },function(){
        timerId=setInterval(lunbo,2000);
    });


    $(".box").mousedown(function(e){
        e.preventDefault();
    });

    //================拖拽开始时触发=================
    var margin;
    touch.on(".box","dragstart",function(){
        margin=$(".box").position().left;    //margin是box据邮箱相对定位复元素的left
        console.log(margin);
    })
    touch.on(".box","dragend", function (e) {
        if(Math.abs(e.x)>300|| e.factor<5){
            if(e.direction=="left"){
                index++;
                if(index==$(".list").length-1){
                    $(".box").animate({left:-index*100+'%'}, function () {
                        $(".box").css({left:0});
                    });
                    index=0;
                }else{
                    $(".box").animate({
                        left:-index*100+'%'
                    });
                }
                $(".cir").removeClass("now-cir").eq(index).addClass("now-cir");

            }else if(e.direction=="right"){
                index--;
                if(index==-1){
                    index=0;
                    $(".box").animate({left:0});
                    return;

                }else{
                    $(".box").animate({
                        left:-index*100+'%'
                    });
                    $(".cir").removeClass("now-cir").eq(index).addClass("now-cir");
                }
            }
        }else{
            $(".box").animate({
                left:-index*$(".list").width()
            },2000);
        }
    });
    //=========拖拽过程中中触发================
    touch.on(".box","drag",function(e){
        $(".box").css("left", margin+e.x);   //e.x拖拽的距离

    });



})