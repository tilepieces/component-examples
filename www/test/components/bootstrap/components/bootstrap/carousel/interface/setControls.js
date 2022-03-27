import {controlsHTML} from "./Controls.js";
export function setControls(checked,target,htmlMatch){
  if(!checked) {
    var controls =  target.querySelectorAll(".carousel-control-prev,.carousel-control-next");
    [...controls].forEach(v=>htmlMatch.removeChild(v));
  }
  else {
    var parser = new DOMParser();
    var doc = parser.parseFromString(controlsHTML(target.id),
      "text/html");
    var placeholder = document.createDocumentFragment();
    [...doc.body.children].forEach(v=>placeholder.append(v));
    htmlMatch.append(target, placeholder);
  }
}