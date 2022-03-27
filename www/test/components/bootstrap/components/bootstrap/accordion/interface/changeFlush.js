export function changeFlush(e,target,openerParent){
  if(e.target.checked) {
    openerParent.tilepieces.core.htmlMatch.addClass(target,"accordion-flush");
    openerParent.dialog.open("flush added to current accordion");
  }
  else {
    openerParent.tilepieces.core.htmlMatch.removeClass(target,"accordion-flush");
    openerParent.dialog.open("flush removed from current accordion");
  }

}