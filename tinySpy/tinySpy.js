;(function(){
  var commandHistory=[];
  var domCollection = {
    stage:document.querySelector(".tinySpy"),
    screen:document.querySelector(".spyScreen"),
    closeBtn:document.querySelector("#spyHide"),
    inputArea:document.querySelector("#spyInput")
  };
  var commandList = {
    endTag:"spd",
    help:"-c",
    back:"-b"
  };
  var tipList = {
    commandTip:"Use:"+commandList.help+" "+commandList.endTag+" to check the command</br>"+
               "Use:"+commandList.back+" "+commandList.endTag+" to get latest history",
    commands:"Run tinyspy.print() "+commandList.endTag+":print messages<br/>"+
            "Run tinyspy.clear() "+commandList.endTag+":clear screen<br/>"+
            "Input codes end with "+commandList.endTag+":execute the codes",
            
  };
  var commonTool = {
      print:function(context){
          var dom = this.getDom("p",context);
          this.appendScreen(dom);
      },
      appendScreen:function(dom){
        document.querySelector(".spyScreen").appendChild(dom);  
      },
      getDom:function(type,context){
        var dom = document.createElement(type);
        dom.innerHTML = context;
        return dom;
      },
      clear:function(){
        document.querySelector(".spyScreen").innerHTML="";
      },
      command:function(text){
          window.eval(text);
      }
  };
  var eventHandler = {
      listenInputArea:function(){
        var that = this;
        this.bindEvent(document.querySelector("#spyInput"),"keyup",function(){
              that.handleInput(document.querySelector("#spyInput").value);
        });
        this.bindEvent(document.querySelector("#spyInput"),"paste",function(e){
            var timeout = setTimeout(function(){
              that.handleInput(document.querySelector("#spyInput").value);
            },100);
         }); 
      },
      allocatFunc:function(text){
          switch (text){
             case commandList.help:{
               this.showCommand();
               commandHistory.push(text);//Record
              }break;
             case commandList.back:this.getCommand();break;
             default:{
               this.runCommand(text);
               commandHistory.push(text);//Record
              }break;
          }
      },
      showCommand:function(){
        window.tinyspy.print(tipList.commands);
      },
      getCommand:function(text){
        document.querySelector("#spyInput").value = commandHistory.pop();
      },
      handleInput:function(text){
        if(text.indexOf(commandList.endTag)>=0){
          var str = "\\s+("+commandList.endTag+"){1}";
          var reg = new RegExp(str);
          var dealedText = text.replace(reg,"");
          document.querySelector("#spyInput").value = "";
          this.allocatFunc(dealedText); 
        }
      },
      runCommand:function(text){
        commonTool.command(text);
      },
      close:function(){
        this.bindEvent(document.querySelector("#spyHide"),"click",function(){
            document.querySelector(".tinySpy").classList.toggle("hideSpyDiv");
            document.querySelector("#spyHide").classList.toggle("spyHideStyle");
        });
      },
      bindEvent:function(ele,event,func){
        ele.addEventListener(event,func);
      },
      insertDom:function(){
         var str = '<div class="tinySpy hideSpyDiv">\
         <div class="spyScreen" id="spyScreen"></div>\
         <textarea type="text" id="spyInput"></textarea>\
     </div>\
     <span class="spyHide" id="spyHide">+</span>';
         var dom = commonTool.getDom("div",str);
         document.querySelector("body").appendChild(dom);
      },
      insertStyle:function(){

         var str = ".tinySpy{\
          width:100%;\
          height:50%;\
          min-height: 300px;\
          background-color:black;\
          position: absolute;\
          bottom:0;\
          z-index: 99999;\
      }\
      .tinySpy .spyScreen{\
          width:100%;\
          height:80%;\
          overflow-y:scroll;\
          color:white;\
          word-break: break-all;\
          padding:0 3px;\
      }\
      .tinySpy #spyInput{\
          width:100%;\
          height:20%;\
          color:black;\
          overflow-y:scroll;\
      }\
      .spyHide{\
        color:green;\
        position: absolute;\
        right: 0px;\
        font-size: 35px;\
        bottom:47%;\
        z-index: 999999;\
        animation:closeAnim 1.3s ease infinite;\
    }\
    .spyHideStyle{\
      transform: rotate(45deg);\
    }\
    .hideSpyDiv{\
        display: none;\
    }\
    @keyframes closeAnim{\
        0%{opacity: 1;}\
        50%{opacity: .7;}\
        100%{opacity: .5;}\
    }";


         var dom = commonTool.getDom("style",str);
         document.querySelector("head").appendChild(dom);
      },
      init:function(){
        this.insertDom();
        this.insertStyle();
        this.close();
        this.listenInputArea();
      }
  };

  
  var tinyspy = function(){
    //Todo
  };
  tinyspy.prototype = commonTool;
  tinyspy.prototype.constructor = tinyspy;
  window.tinyspy = new tinyspy();
  eventHandler.init();
  window.tinyspy.print(tipList.commandTip);
})(window);