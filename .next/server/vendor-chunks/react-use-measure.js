"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-use-measure";
exports.ids = ["vendor-chunks/react-use-measure"];
exports.modules = {
  /***/ "(ssr)/./node_modules/react-use-measure/dist/index.cjs":
    /*!*******************************************************!*\
  !*** ./node_modules/react-use-measure/dist/index.cjs ***!
  \*******************************************************/
    /***/ (module, __unused_webpack_exports, __webpack_require__) => {
      eval(
        'const i=__webpack_require__(/*! react */ "(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");function b(n,t){let o;return(...s)=>{window.clearTimeout(o),o=window.setTimeout(()=>n(...s),t)}}function S({debounce:n,scroll:t,polyfill:o,offsetSize:s}={debounce:0,scroll:!1,offsetSize:!1}){const a=o||(typeof window=="undefined"?class{}:window.ResizeObserver);if(!a)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");const[l,h]=i.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),e=i.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:l,orientationHandler:null}),d=n?typeof n=="number"?n:n.scroll:null,f=n?typeof n=="number"?n:n.resize:null,w=i.useRef(!1);i.useEffect(()=>(w.current=!0,()=>void(w.current=!1)));const[p,m,c]=i.useMemo(()=>{const r=()=>{if(!e.current.element)return;const{left:L,top:y,width:C,height:H,bottom:O,right:x,x:R,y:B}=e.current.element.getBoundingClientRect(),u={left:L,top:y,width:C,height:H,bottom:O,right:x,x:R,y:B};e.current.element instanceof HTMLElement&&s&&(u.height=e.current.element.offsetHeight,u.width=e.current.element.offsetWidth),Object.freeze(u),w.current&&!q(e.current.lastBounds,u)&&h(e.current.lastBounds=u)};return[r,f?b(r,f):r,d?b(r,d):r]},[h,s,d,f]);function v(){e.current.scrollContainers&&(e.current.scrollContainers.forEach(r=>r.removeEventListener("scroll",c,!0)),e.current.scrollContainers=null),e.current.resizeObserver&&(e.current.resizeObserver.disconnect(),e.current.resizeObserver=null),e.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",e.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",e.current.orientationHandler))}function E(){e.current.element&&(e.current.resizeObserver=new a(c),e.current.resizeObserver.observe(e.current.element),t&&e.current.scrollContainers&&e.current.scrollContainers.forEach(r=>r.addEventListener("scroll",c,{capture:!0,passive:!0})),e.current.orientationHandler=()=>{c()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",e.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",e.current.orientationHandler))}const z=r=>{!r||r===e.current.element||(v(),e.current.element=r,e.current.scrollContainers=g(r),E())};return D(c,!!t),T(m),i.useEffect(()=>{v(),E()},[t,c,m]),i.useEffect(()=>v,[]),[z,l,p]}function T(n){i.useEffect(()=>{const t=n;return window.addEventListener("resize",t),()=>void window.removeEventListener("resize",t)},[n])}function D(n,t){i.useEffect(()=>{if(t){const o=n;return window.addEventListener("scroll",o,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",o,!0)}},[n,t])}function g(n){const t=[];if(!n||n===document.body)return t;const{overflow:o,overflowX:s,overflowY:a}=window.getComputedStyle(n);return[o,s,a].some(l=>l==="auto"||l==="scroll")&&t.push(n),[...t,...g(n.parentElement)]}const M=["x","y","top","bottom","left","right","width","height"],q=(n,t)=>M.every(o=>n[o]===t[o]);module.exports=S;\n//# sourceMappingURL=index.cjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlLW1lYXN1cmUvZGlzdC9pbmRleC5janMiLCJtYXBwaW5ncyI6IkFBQWEsUUFBUSxtQkFBTyxDQUFDLHdHQUFPLEVBQUUsZ0JBQWdCLE1BQU0sZUFBZSwyREFBMkQsWUFBWSw0Q0FBNEMsRUFBRSxtQ0FBbUMsRUFBRSw4Q0FBOEMsd0JBQXdCLHdLQUF3Syx1QkFBdUIsdURBQXVELGNBQWMsNEZBQTRGLCtGQUErRix1REFBdUQsNEJBQTRCLGFBQWEsNkJBQTZCLE1BQU0sdURBQXVELDhDQUE4Qyx3REFBd0QsZ05BQWdOLGdDQUFnQyxZQUFZLGFBQWEsd2dCQUF3Z0IsYUFBYSw4TUFBOE0sc0JBQXNCLHFDQUFxQyxJQUFJLHVQQUF1UCxZQUFZLDBGQUEwRixzQ0FBc0MsUUFBUSx3Q0FBd0MsY0FBYyxpQkFBaUIsVUFBVSwyRkFBMkYsTUFBTSxnQkFBZ0IsaUJBQWlCLE1BQU0sVUFBVSwyQ0FBMkMsc0JBQXNCLHNEQUFzRCxRQUFRLGNBQWMsV0FBVyxrQ0FBa0MsTUFBTSxtQ0FBbUMsNEJBQTRCLHdGQUF3RixrR0FBa0c7QUFDNWxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2EtcHJvai1jYW5ub24tbG9sLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXVzZS1tZWFzdXJlL2Rpc3QvaW5kZXguY2pzPzI4MzMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7Y29uc3QgaT1yZXF1aXJlKFwicmVhY3RcIik7ZnVuY3Rpb24gYihuLHQpe2xldCBvO3JldHVybiguLi5zKT0+e3dpbmRvdy5jbGVhclRpbWVvdXQobyksbz13aW5kb3cuc2V0VGltZW91dCgoKT0+biguLi5zKSx0KX19ZnVuY3Rpb24gUyh7ZGVib3VuY2U6bixzY3JvbGw6dCxwb2x5ZmlsbDpvLG9mZnNldFNpemU6c309e2RlYm91bmNlOjAsc2Nyb2xsOiExLG9mZnNldFNpemU6ITF9KXtjb25zdCBhPW98fCh0eXBlb2Ygd2luZG93PT1cInVuZGVmaW5lZFwiP2NsYXNze306d2luZG93LlJlc2l6ZU9ic2VydmVyKTtpZighYSl0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBSZXNpemVPYnNlcnZlciBvdXQgb2YgdGhlIGJveC4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Qtc3ByaW5nL3JlYWN0LXVzZS1tZWFzdXJlLyNyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGxzXCIpO2NvbnN0W2wsaF09aS51c2VTdGF0ZSh7bGVmdDowLHRvcDowLHdpZHRoOjAsaGVpZ2h0OjAsYm90dG9tOjAscmlnaHQ6MCx4OjAseTowfSksZT1pLnVzZVJlZih7ZWxlbWVudDpudWxsLHNjcm9sbENvbnRhaW5lcnM6bnVsbCxyZXNpemVPYnNlcnZlcjpudWxsLGxhc3RCb3VuZHM6bCxvcmllbnRhdGlvbkhhbmRsZXI6bnVsbH0pLGQ9bj90eXBlb2Ygbj09XCJudW1iZXJcIj9uOm4uc2Nyb2xsOm51bGwsZj1uP3R5cGVvZiBuPT1cIm51bWJlclwiP246bi5yZXNpemU6bnVsbCx3PWkudXNlUmVmKCExKTtpLnVzZUVmZmVjdCgoKT0+KHcuY3VycmVudD0hMCwoKT0+dm9pZCh3LmN1cnJlbnQ9ITEpKSk7Y29uc3RbcCxtLGNdPWkudXNlTWVtbygoKT0+e2NvbnN0IHI9KCk9PntpZighZS5jdXJyZW50LmVsZW1lbnQpcmV0dXJuO2NvbnN0e2xlZnQ6TCx0b3A6eSx3aWR0aDpDLGhlaWdodDpILGJvdHRvbTpPLHJpZ2h0OngseDpSLHk6Qn09ZS5jdXJyZW50LmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksdT17bGVmdDpMLHRvcDp5LHdpZHRoOkMsaGVpZ2h0OkgsYm90dG9tOk8scmlnaHQ6eCx4OlIseTpCfTtlLmN1cnJlbnQuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50JiZzJiYodS5oZWlnaHQ9ZS5jdXJyZW50LmVsZW1lbnQub2Zmc2V0SGVpZ2h0LHUud2lkdGg9ZS5jdXJyZW50LmVsZW1lbnQub2Zmc2V0V2lkdGgpLE9iamVjdC5mcmVlemUodSksdy5jdXJyZW50JiYhcShlLmN1cnJlbnQubGFzdEJvdW5kcyx1KSYmaChlLmN1cnJlbnQubGFzdEJvdW5kcz11KX07cmV0dXJuW3IsZj9iKHIsZik6cixkP2IocixkKTpyXX0sW2gscyxkLGZdKTtmdW5jdGlvbiB2KCl7ZS5jdXJyZW50LnNjcm9sbENvbnRhaW5lcnMmJihlLmN1cnJlbnQuc2Nyb2xsQ29udGFpbmVycy5mb3JFYWNoKHI9PnIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLGMsITApKSxlLmN1cnJlbnQuc2Nyb2xsQ29udGFpbmVycz1udWxsKSxlLmN1cnJlbnQucmVzaXplT2JzZXJ2ZXImJihlLmN1cnJlbnQucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpLGUuY3VycmVudC5yZXNpemVPYnNlcnZlcj1udWxsKSxlLmN1cnJlbnQub3JpZW50YXRpb25IYW5kbGVyJiYoXCJvcmllbnRhdGlvblwiaW4gc2NyZWVuJiZcInJlbW92ZUV2ZW50TGlzdGVuZXJcImluIHNjcmVlbi5vcmllbnRhdGlvbj9zY3JlZW4ub3JpZW50YXRpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLGUuY3VycmVudC5vcmllbnRhdGlvbkhhbmRsZXIpOlwib25vcmllbnRhdGlvbmNoYW5nZVwiaW4gd2luZG93JiZ3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsZS5jdXJyZW50Lm9yaWVudGF0aW9uSGFuZGxlcikpfWZ1bmN0aW9uIEUoKXtlLmN1cnJlbnQuZWxlbWVudCYmKGUuY3VycmVudC5yZXNpemVPYnNlcnZlcj1uZXcgYShjKSxlLmN1cnJlbnQucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShlLmN1cnJlbnQuZWxlbWVudCksdCYmZS5jdXJyZW50LnNjcm9sbENvbnRhaW5lcnMmJmUuY3VycmVudC5zY3JvbGxDb250YWluZXJzLmZvckVhY2gocj0+ci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsYyx7Y2FwdHVyZTohMCxwYXNzaXZlOiEwfSkpLGUuY3VycmVudC5vcmllbnRhdGlvbkhhbmRsZXI9KCk9PntjKCl9LFwib3JpZW50YXRpb25cImluIHNjcmVlbiYmXCJhZGRFdmVudExpc3RlbmVyXCJpbiBzY3JlZW4ub3JpZW50YXRpb24/c2NyZWVuLm9yaWVudGF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIixlLmN1cnJlbnQub3JpZW50YXRpb25IYW5kbGVyKTpcIm9ub3JpZW50YXRpb25jaGFuZ2VcImluIHdpbmRvdyYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLGUuY3VycmVudC5vcmllbnRhdGlvbkhhbmRsZXIpKX1jb25zdCB6PXI9Pnshcnx8cj09PWUuY3VycmVudC5lbGVtZW50fHwodigpLGUuY3VycmVudC5lbGVtZW50PXIsZS5jdXJyZW50LnNjcm9sbENvbnRhaW5lcnM9ZyhyKSxFKCkpfTtyZXR1cm4gRChjLCEhdCksVChtKSxpLnVzZUVmZmVjdCgoKT0+e3YoKSxFKCl9LFt0LGMsbV0pLGkudXNlRWZmZWN0KCgpPT52LFtdKSxbeixsLHBdfWZ1bmN0aW9uIFQobil7aS51c2VFZmZlY3QoKCk9Pntjb25zdCB0PW47cmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdCksKCk9PnZvaWQgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0KX0sW25dKX1mdW5jdGlvbiBEKG4sdCl7aS51c2VFZmZlY3QoKCk9PntpZih0KXtjb25zdCBvPW47cmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsbyx7Y2FwdHVyZTohMCxwYXNzaXZlOiEwfSksKCk9PnZvaWQgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixvLCEwKX19LFtuLHRdKX1mdW5jdGlvbiBnKG4pe2NvbnN0IHQ9W107aWYoIW58fG49PT1kb2N1bWVudC5ib2R5KXJldHVybiB0O2NvbnN0e292ZXJmbG93Om8sb3ZlcmZsb3dYOnMsb3ZlcmZsb3dZOmF9PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pO3JldHVybltvLHMsYV0uc29tZShsPT5sPT09XCJhdXRvXCJ8fGw9PT1cInNjcm9sbFwiKSYmdC5wdXNoKG4pLFsuLi50LC4uLmcobi5wYXJlbnRFbGVtZW50KV19Y29uc3QgTT1bXCJ4XCIsXCJ5XCIsXCJ0b3BcIixcImJvdHRvbVwiLFwibGVmdFwiLFwicmlnaHRcIixcIndpZHRoXCIsXCJoZWlnaHRcIl0scT0obix0KT0+TS5ldmVyeShvPT5uW29dPT09dFtvXSk7bW9kdWxlLmV4cG9ydHM9Uztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmNqcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-use-measure/dist/index.cjs\n'
      );

      /***/
    },
};
