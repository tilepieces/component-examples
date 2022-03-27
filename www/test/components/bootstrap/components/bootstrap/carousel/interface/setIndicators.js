import {indicatorsHTML} from "./Indicators.js";
export function setIndicators(checked,target,htmlMatch){
  if(!checked) {
    var indicator = target.querySelector(".carousel-indicators");
    htmlMatch.removeChild(indicator);
  }
  else {
    var parser = new DOMParser();
    var doc = parser.parseFromString(indicatorsHTML(target.id, [...target.querySelectorAll(".carousel-item")]),
      "text/html");
    var placeholder = document.createDocumentFragment();
    [...doc.body.children].forEach(v=>placeholder.append(v));
    htmlMatch.prepend(target, placeholder);
  }
}