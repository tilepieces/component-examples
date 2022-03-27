import {accordionItemHTML} from "./item-template.js";
import {parseItemHTML} from "./parseTemplate.js";
import {changeAlwaysOpen} from "./changeAlwaysOpen.js";
import {changeFlush} from "./changeFlush.js";
const opener = window.opener || window.parent || window;
const openerParent = opener.opener || opener.parent || opener;
const app = openerParent.tilepieces;
const core = app.core;
const htmlMatch = core.htmlMatch;
const doc = core.currentDocument;
const win = core.currentWindow;

const addButton = document.getElementById("add-accordion");
const delButton = document.getElementById("del-accordion");
const flushCheck = document.getElementById("flush");
const alwaysOpenCheck = document.getElementById("always-open");
let target,item;
function init(){
    target = app.elementSelected.closest(".bootstrap-accordion");
    if(!target) {
        document.body.style.display="none";
        return;
    }
    item = app.elementSelected.closest(".accordion-item");
    delButton.disabled = !item;
    document.body.style.display="block";
    flushCheck.checked = target.classList.contains("accordion-flush");
    flushCheck.onchange = (e)=>changeFlush(e,target,openerParent);
    alwaysOpenCheck.checked = ![...target.querySelectorAll(".accordion-collapse")].every(v=>v.getAttribute("data-bs-parent"));
    alwaysOpenCheck.onchange = (e)=>changeAlwaysOpen(e,target,openerParent);
}
init();
openerParent.addEventListener("highlight-click",init);
addButton.addEventListener("click",e=>{
    var id = target.id;
    if(!id) {
        id = "bootstrap-accordion";
        var count = 0;
        while (doc.getElementById(id))
            id = id + "-" + count++;
        target.id = id;
    }
    var rawHTML = parseItemHTML(accordionItemHTML,id,doc);
    var parserFakeEl = doc.createElement("div");
    parserFakeEl.innerHTML = rawHTML;
    var childToSelect = parserFakeEl.children[0];
    var fragment = doc.createDocumentFragment();
    [...parserFakeEl.childNodes].forEach(n=>fragment.append(n));
    core.htmlMatch.append(target,fragment);
    core.selectElement(childToSelect);
});
delButton.addEventListener("click",e=>{
    core.deselectElement();
    core.htmlMatch.removeChild(item);
    item = null;
});