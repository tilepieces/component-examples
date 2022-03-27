const opener = window.opener || window.parent || window;
const openerParent = opener.opener || opener.parent || opener;
const app = openerParent.tilepieces;
const core = app.core;
const htmlMatch = core.htmlMatch;
const doc = core.currentDocument;
const win = core.currentWindow;
const getValuesFromOptions = (select)=>{
  return [...select.options].reduce((acc,v)=>{
    v.value && acc.push(v.value)
    return acc;
  },[]);
}
const primarySelect = document.getElementById("primary");
const sizesSelect = document.getElementById("sizes");
const options = {
  primary : getValuesFromOptions(primarySelect),
  sizes : getValuesFromOptions(sizesSelect)
}
const selectChange = (e)=>{
  var t = e.target;
  var type = t.id;
  options[type].forEach(v=>htmlMatch.removeClass(target,v));
  htmlMatch.addClass(target,t.value);
}
let target,primary,sizes;
function init(){
  var sel = app.elementSelected.closest ? app.elementSelected : app.elementSelected.parentNode;
  target = sel.closest("a[role=button].btn,button.btn,input[type=button].btn,input[type=submit].btn,input[type=reset].btn");
  if(!target) {
    document.body.style.display = "none";
    return;
  }
  primarySelect.removeEventListener("change",selectChange);
  sizesSelect.removeEventListener("change",selectChange);
  primarySelect.value = options.primary.find(v=>target.classList.contains(v)) || "";
  sizesSelect.value = options.sizes.find(v=>target.classList.contains(v)) || "";
  primarySelect.addEventListener("change",selectChange);
  sizesSelect.addEventListener("change",selectChange);
}
init();
openerParent.addEventListener("highlight-click",init);