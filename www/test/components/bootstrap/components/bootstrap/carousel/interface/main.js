import {setIndicators} from "./setIndicators.js";
import {setControls} from "./setControls.js";
import {setId} from "./setId.js";
import {carouselItemInnerHTML} from "./carouselItem.js";
const opener = window.opener || window.parent || window; // the element panel
const openerParent = opener.opener || opener.parent || opener; // tilepieces main window
const app = openerParent.tilepieces;
const core = app.core;
const htmlMatch = core.htmlMatch;
const doc = core.currentDocument; // tilepieces current document
const win = core.currentWindow; // tilepieces current document window

const mainSection = document.getElementsByTagName("main")[0];
const notSandbox = document.getElementById("not-sandbox");
const addItemButton = document.getElementById("add-item");
const delItemButton = document.getElementById("del-item");
const intervalInput = document.getElementById("carousel-interval");
const darkVariantButton = document.getElementById("dark-variant");
const controlsInput = document.getElementById("Controls");
const indicatorsInput = document.getElementById("Indicators");
const notMatchSection = document.getElementById("not-match");
const intervalItemChange = ()=>{
  htmlMatch.setAttribute(item,"data-bs-interval",intervalInput.value);
}
const carouselDark = e=>{
  if(e.target.checked)
    htmlMatch.addClass(target,"carousel-dark");
  else
    htmlMatch.removeClass(target,"carousel-dark");
}
function setControlProxy(e){
  setControls(e.target.checked,target,htmlMatch)
}
function setIndicatorProxy(e){
  setIndicators(e.target.checked,target,htmlMatch)
}
let target,item;
function init(){
  if(app.frame.getAttribute("sandbox") != "allow-same-origin"){
    notMatchSection.hidden = true;
    notSandbox.hidden = false;
    mainSection.hidden = true;
    return;
  }
  var selected = app.elementSelected.nodeType == 3 ? app.elementSelected.parentNode : app.elementSelected;
  target = selected.closest(".carousel");
  var targetMatch = target && htmlMatch.find(target);
  console.log("[BOOTSTRAP CAROUSEL COMPONENT targetMatch",targetMatch);
  if(!target || !targetMatch?.HTML) {
    console.error("[BOOTSTRAP CAROUSEL COMPONENT : target invalid or not match}",target,targetMatch)
    notMatchSection.hidden = false;
    notSandbox.hidden = true;
    mainSection.hidden = true;
    return;
  }
  else{
    notMatchSection.hidden = true;
    notSandbox.hidden = true;
    mainSection.hidden = false;
  }
  setId(target,doc,htmlMatch);
  item = selected.closest(".carousel-item");
  delItemButton.disabled = !item;
  intervalInput.removeEventListener("change",intervalItemChange)
  intervalInput.disabled = !item;
  if(item) {
    intervalInput.value = item.dataset.bsInterval || 5000;
    intervalInput.addEventListener("change", intervalItemChange)
  }
  darkVariantButton.removeEventListener("change",carouselDark);
  darkVariantButton.checked = target.classList.contains("carousel-dark");
  darkVariantButton.addEventListener("change",carouselDark);

  indicatorsInput.removeEventListener("change",setIndicatorProxy);
  indicatorsInput.checked = target.querySelector(".carousel-indicators");
  indicatorsInput.addEventListener("change",setIndicatorProxy);

  controlsInput.removeEventListener("change",setControlProxy);
  controlsInput.checked = target.querySelector(".carousel-control-prev,.carousel-control-next");
  controlsInput.addEventListener("change",setControlProxy);
}
init();
openerParent.addEventListener("highlight-click",init);
addItemButton.addEventListener("click",e=>{
  var newItem = document.createElement("div");
  newItem.className = "carousel-item";
  var items = target.querySelectorAll(".carousel-item");
  var itemsLength = items.length;
  newItem.innerHTML = carouselItemInnerHTML(itemsLength);
  var carouselInner = target.querySelector(".carousel-inner");
  htmlMatch.append(carouselInner,newItem);
  if(indicatorsInput.checked) {
    var div = document.createElement("div");
    div.innerHTML = `<button type="button" data-bs-target="#${target.id}" data-bs-slide-to="${itemsLength}" aria-label="Slide ${itemsLength+1}"></button>`
    var indicator = target.querySelector(".carousel-indicators");
    htmlMatch.append(indicator, div.firstElementChild);
  }
})
delItemButton.addEventListener("click",e=>{
  var index = [...item.parentNode.children].indexOf(item);
  htmlMatch.removeChild(item);
  if(indicatorsInput.checked) {
    var indicator = target.querySelector(".carousel-indicators");
    htmlMatch.removeChild(indicator.children[index]);
    indicator.querySelectorAll("button").forEach((v,i)=>
      htmlMatch.setAttribute(v,"data-bs-slide-to",i)
    )
  }
})