export function changeAlwaysOpen(e,target,openerParent){
  var checked = e.target.checked;
  [...target.querySelectorAll(".accordion-collapse")].forEach(v=>{
    if(!checked)
      openerParent.tilepieces.core.htmlMatch.setAttribute(v,"data-bs-parent","#"+target.id)
    else
      openerParent.tilepieces.core.htmlMatch.removeAttribute(v,"data-bs-parent")
  });
  openerParent.dialog.open("always open " + (checked?"added to":"removed from") +  " current accordion");
}