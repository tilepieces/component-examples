(()=>{const opener=window.opener?window.opener:window.parent;const app=opener.tilepieces;function getHistory(){if(!app.core?.history)return[];var copyObj=Object.assign({},app.core.history);copyObj.entries=copyObj.entries.slice(0);copyObj.entries.unshift({method:"new"});copyObj.entries=copyObj.entries.map(((v,i)=>{var newObj=Object.assign({},v);if(!newObj.method)newObj.method=newObj.ho.method;newObj.index=i;return newObj}));return copyObj}var scope={history:getHistory()};var section=document.getElementById("panel-history");var template=new opener.TT(section,scope);opener.addEventListener("tilepieces-core-history-set",(e=>{template.set("history",getHistory())}));opener.addEventListener("frame-unload",(e=>{template.set("history",{})}));section.addEventListener("click",(async e=>{var t=e.target;var li=t.closest("li");if(!li)return;if(li.querySelector(".selected"))return;opener.dialog.open("history move...",true);var index=Number(li.dataset.index);var pointer=app.core.history.pointer;var delta=pointer-index;var action=delta>0?"undo":"redo";var absDelta=Math.abs(delta);for(var i=0;i<absDelta;i++)await app.core[action](i!==absDelta-1);opener.dialog.close()}));opener.addEventListener("content-editable-start",(e=>{section.ownerDocument.body.classList.add("content-editable-start")}));opener.addEventListener("content-editable-end",(e=>{section.ownerDocument.body.classList.remove("content-editable-start")}));if(app.contenteditable){section.ownerDocument.body.classList.add("content-editable-start")}})();