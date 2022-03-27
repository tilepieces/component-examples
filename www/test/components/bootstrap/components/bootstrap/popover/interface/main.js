const opener = window.opener || window.parent || window;
const openerParent = opener.opener || opener.parent || opener;
const app = openerParent.tilepieces;
const htmlMatch = app.core.htmlMatch;
const doc = app.core.currentDocument;
const win = app.core.currentWindow;

const title = document.getElementById("title");
const description = document.getElementById("description");
const placement = document.getElementById("placement");
const dismissible = document.getElementById("dismissible");

let  targetPopOver;
const titleChange = e=>{
  htmlMatch.setAttribute(targetPopOver,"title",title.value);
}
const descriptionChange = e=>{
  htmlMatch.setAttribute(targetPopOver,"data-bs-content",description.value);
}
const placementChange = e=>{
  htmlMatch.setAttribute(targetPopOver,"data-bs-placement",placement.value);
}
function init() {
  var sel = app.elementSelected.closest ? app.elementSelected : app.elementSelected.parentNode;
  targetPopOver = sel.closest(".bootstrap-popover");
  if (!targetPopOver) {
    document.body.style.display = "none";
    return;
  }
  title.removeEventListener("change",titleChange);
  title.value = targetPopOver.title;
  title.addEventListener("change",titleChange);
  description.removeEventListener("change",descriptionChange);
  description.value = targetPopOver.dataset.bsContent;
  description.addEventListener("change",descriptionChange);
  placement.removeEventListener("change",placementChange);
  placement.value = targetPopOver.dataset.bsPlacement;
  placement.addEventListener("change",placementChange);
}

init();
openerParent.addEventListener("highlight-click", init);