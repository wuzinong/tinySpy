;(function(){
  
  var domCollection = {
    stage:document.querySelector(".tinySpy"),
    screen:document.querySelector(".spyScreen"),
    closeBtn:document.querySelector("#spyHide")
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
      clearScreen:function(){
        domCollection.screen.innerHTML="";
      }
  };
  var eventHandler = {
      
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
      }
  };

  eventHandler.init();
  var tinySpy = function(){
  }
  tinySpy.prototype = commonTool;
  tinySpy.prototype.constructor = tinySpy;
  window.tinySpy = new tinySpy();
})(window);