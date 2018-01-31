;(function(){
  var commandHistory=[];
  var domCollection = {
    stage:document.querySelector(".tinySpy"),
    screen:document.querySelector(".spyScreen"),
    closeBtn:document.querySelector("#spyHide"),
    inputArea:document.querySelector("#spyInput")
  };
  var commandList = {
    endTag:"spydone"
  };
  var tipList = {
    commandTip:"Use: -c spydone to check the command",
    commands:"tinyspy.print() "+commandList.endTag+":print messages<br/>"
            +"tinyspy.clear() "+commandList.endTag+"spydone:clear screen",
            
  };
  var commonTool = {
      print:function(context){
          var dom = this.getDom("p",context);
          this.appendScreen(dom);
      },
      appendScreen:function(dom){
        domCollection.screen.appendChild(dom);  
      },
      getDom:function(type,context){
        var dom = document.createElement(type);
        dom.innerHTML = context;
        return dom;
      },
      clear:function(){
        domCollection.screen.innerHTML="";
      },
      command:function(text){
          window.eval(text);
      }
  };
  var eventHandler = {
      listenInputArea:function(){
        var that = this;
        this.bindEvent(domCollection.inputArea,"keyup",function(){
              that.handleInput(domCollection.inputArea.value);
        });
        this.bindEvent(domCollection.inputArea,"paste",function(e){
            var timeout = setTimeout(function(){
              that.handleInput(domCollection.inputArea.value);
            },100);
         }); 
      },
      allocatFunc:function(text){
          switch (text){
             case "-c":this.showCommand();break;
             default:this.runCommand(text);break;
          }
      },
      showCommand:function(){
        window.tinyspy.print(tipList.commands);
      },
      handleInput:function(text){
        if(text.indexOf(commandList.endTag)>=0){
          var str = "\\s+("+commandList.endTag+"){1}";
          var reg = new RegExp(str);
          var dealedText = text.replace(reg,"");
          domCollection.inputArea.value = "";
          commandHistory.push(dealedText);//Record
          this.allocatFunc(dealedText); 
        }
      },
      runCommand:function(text){
        commonTool.command(text);
      },
      close:function(){
        this.bindEvent(domCollection.closeBtn,"click",function(){
            domCollection.stage.classList.toggle("hideSpyDiv");
            domCollection.closeBtn.classList.toggle("spyHideStyle");
        });
      },
      bindEvent:function(ele,event,func){
        ele.addEventListener(event,func);
      },
      init:function(){
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