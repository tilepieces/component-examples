const opener = window.opener || window.parent || window;
const openerParent = opener.opener || opener.parent || opener;
const app = openerParent.tilepieces;
const htmlMatch = app.core.htmlMatch;
const doc = app.core.currentDocument;
const win = app.core.currentWindow;

const title = document.getElementById("title");
const placement = document.getElementById("placement");

let  targetTooltip;
const titleChange = e=>{
  htmlMatch.setAttribute(targetTooltip,"title",title.value);
}
const placementChange = e=>{
  htmlMatch.setAttribute(targetTooltip,"data-bs-placement",placement.value);
}
function init() {
  var sel = app.elementSelected.closest ? app.elementSelected : app.elementSelected.parentNode;
  targetTooltip = sel.closest(".bootstrap-tooltip");
  if (!targetTooltip) {
    document.body.style.display = "none";
    return;
  }
  title.removeEventListener("change",titleChange);
  title.value = targetTooltip.title;
  title.addEventListener("change",titleChange);
  placement.removeEventListener("change",placementChange);
  placement.value = targetTooltip.dataset.bsPlacement;
  placement.addEventListener("change",placementChange);
}

init();
openerParent.addEventListener("highlight-click", init);