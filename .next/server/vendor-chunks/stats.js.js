/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/stats.js";
exports.ids = ["vendor-chunks/stats.js"];
exports.modules = {
  /***/ "(ssr)/./node_modules/stats.js/build/stats.min.js":
    /*!**************************************************!*\
  !*** ./node_modules/stats.js/build/stats.min.js ***!
  \**************************************************/
    /***/ function (module) {
      eval(
        '// stats.js - http://github.com/mrdoob/stats.js\n(function(f,e){ true?module.exports=e():0})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();\nu(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/\n1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);\nb.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RhdHMuanMvYnVpbGQvc3RhdHMubWluLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsZUFBZSxLQUFzRCxvQkFBb0IsQ0FBNEQsQ0FBQyxrQkFBa0IsaUJBQWlCLGNBQWMscUJBQXFCLFNBQVMsY0FBYyxZQUFZLG9CQUFvQixxREFBcUQsSUFBSSx3Q0FBd0MsZ0NBQWdDLE1BQU0sT0FBTyxlQUFlLFlBQVksZUFBZSx1Q0FBdUM7QUFDbGYseUJBQXlCLEtBQUssbUhBQW1ILHNGQUFzRixLQUFLLE9BQU8sMERBQTBELDRCQUE0QixnQkFBZ0IsSUFBSSxnQ0FBZ0Msa0JBQWtCLG1EQUFtRCx5QkFBeUI7QUFDM2QsbUNBQW1DLFNBQVMsbUJBQW1CLGFBQWEsMEJBQTBCLHdCQUF3Qix3SkFBd0osVUFBVSxXQUFXLDRCQUE0QixhQUFhLHlCQUF5QixtREFBbUQscUJBQXFCLGNBQWMsb0JBQW9CLGNBQWM7QUFDcmUsb0JBQW9CLGNBQWMsaUJBQWlCLG9CQUFvQixPQUFPLDJCQUEyQixnQkFBZ0IsZ0JBQWdCLGNBQWMsZ0JBQWdCLG9CQUFvQixjQUFjLGtEQUFrRCxxQ0FBcUMsd0JBQXdCLGNBQWMsaUJBQWlCLHNDQUFzQyxTQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2EtcHJvai1jYW5ub24tbG9sLy4vbm9kZV9tb2R1bGVzL3N0YXRzLmpzL2J1aWxkL3N0YXRzLm1pbi5qcz9mZGU5Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIHN0YXRzLmpzIC0gaHR0cDovL2dpdGh1Yi5jb20vbXJkb29iL3N0YXRzLmpzXG4oZnVuY3Rpb24oZixlKXtcIm9iamVjdFwiPT09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKTpmLlN0YXRzPWUoKX0pKHRoaXMsZnVuY3Rpb24oKXt2YXIgZj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoYSl7Yy5hcHBlbmRDaGlsZChhLmRvbSk7cmV0dXJuIGF9ZnVuY3Rpb24gdShhKXtmb3IodmFyIGQ9MDtkPGMuY2hpbGRyZW4ubGVuZ3RoO2QrKyljLmNoaWxkcmVuW2RdLnN0eWxlLmRpc3BsYXk9ZD09PWE/XCJibG9ja1wiOlwibm9uZVwiO2w9YX12YXIgbD0wLGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtjLnN0eWxlLmNzc1RleHQ9XCJwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMFwiO2MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oYSl7YS5wcmV2ZW50RGVmYXVsdCgpO1xudSgrK2wlYy5jaGlsZHJlbi5sZW5ndGgpfSwhMSk7dmFyIGs9KHBlcmZvcm1hbmNlfHxEYXRlKS5ub3coKSxnPWssYT0wLHI9ZShuZXcgZi5QYW5lbChcIkZQU1wiLFwiIzBmZlwiLFwiIzAwMlwiKSksaD1lKG5ldyBmLlBhbmVsKFwiTVNcIixcIiMwZjBcIixcIiMwMjBcIikpO2lmKHNlbGYucGVyZm9ybWFuY2UmJnNlbGYucGVyZm9ybWFuY2UubWVtb3J5KXZhciB0PWUobmV3IGYuUGFuZWwoXCJNQlwiLFwiI2YwOFwiLFwiIzIwMVwiKSk7dSgwKTtyZXR1cm57UkVWSVNJT046MTYsZG9tOmMsYWRkUGFuZWw6ZSxzaG93UGFuZWw6dSxiZWdpbjpmdW5jdGlvbigpe2s9KHBlcmZvcm1hbmNlfHxEYXRlKS5ub3coKX0sZW5kOmZ1bmN0aW9uKCl7YSsrO3ZhciBjPShwZXJmb3JtYW5jZXx8RGF0ZSkubm93KCk7aC51cGRhdGUoYy1rLDIwMCk7aWYoYz5nKzFFMyYmKHIudXBkYXRlKDFFMyphLyhjLWcpLDEwMCksZz1jLGE9MCx0KSl7dmFyIGQ9cGVyZm9ybWFuY2UubWVtb3J5O3QudXBkYXRlKGQudXNlZEpTSGVhcFNpemUvXG4xMDQ4NTc2LGQuanNIZWFwU2l6ZUxpbWl0LzEwNDg1NzYpfXJldHVybiBjfSx1cGRhdGU6ZnVuY3Rpb24oKXtrPXRoaXMuZW5kKCl9LGRvbUVsZW1lbnQ6YyxzZXRNb2RlOnV9fTtmLlBhbmVsPWZ1bmN0aW9uKGUsZixsKXt2YXIgYz1JbmZpbml0eSxrPTAsZz1NYXRoLnJvdW5kLGE9Zyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MSkscj04MCphLGg9NDgqYSx0PTMqYSx2PTIqYSxkPTMqYSxtPTE1KmEsbj03NCphLHA9MzAqYSxxPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7cS53aWR0aD1yO3EuaGVpZ2h0PWg7cS5zdHlsZS5jc3NUZXh0PVwid2lkdGg6ODBweDtoZWlnaHQ6NDhweFwiO3ZhciBiPXEuZ2V0Q29udGV4dChcIjJkXCIpO2IuZm9udD1cImJvbGQgXCIrOSphK1wicHggSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWZcIjtiLnRleHRCYXNlbGluZT1cInRvcFwiO2IuZmlsbFN0eWxlPWw7Yi5maWxsUmVjdCgwLDAscixoKTtiLmZpbGxTdHlsZT1mO2IuZmlsbFRleHQoZSx0LHYpO1xuYi5maWxsUmVjdChkLG0sbixwKTtiLmZpbGxTdHlsZT1sO2IuZ2xvYmFsQWxwaGE9Ljk7Yi5maWxsUmVjdChkLG0sbixwKTtyZXR1cm57ZG9tOnEsdXBkYXRlOmZ1bmN0aW9uKGgsdyl7Yz1NYXRoLm1pbihjLGgpO2s9TWF0aC5tYXgoayxoKTtiLmZpbGxTdHlsZT1sO2IuZ2xvYmFsQWxwaGE9MTtiLmZpbGxSZWN0KDAsMCxyLG0pO2IuZmlsbFN0eWxlPWY7Yi5maWxsVGV4dChnKGgpK1wiIFwiK2UrXCIgKFwiK2coYykrXCItXCIrZyhrKStcIilcIix0LHYpO2IuZHJhd0ltYWdlKHEsZCthLG0sbi1hLHAsZCxtLG4tYSxwKTtiLmZpbGxSZWN0KGQrbi1hLG0sYSxwKTtiLmZpbGxTdHlsZT1sO2IuZ2xvYmFsQWxwaGE9Ljk7Yi5maWxsUmVjdChkK24tYSxtLGEsZygoMS1oL3cpKnApKX19fTtyZXR1cm4gZn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/stats.js/build/stats.min.js\n'
      );

      /***/
    },
};
