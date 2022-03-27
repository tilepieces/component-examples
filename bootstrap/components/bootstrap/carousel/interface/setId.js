export function setId(target,doc,htmlMatch){
  if(!target.id || doc.querySelectorAll("#"+target.id).length>1){
    const mainname = "bootstrap-carousel";
    var count = 0;
    var main = mainname;
    while (doc.getElementById(main))
      main = mainname + "-" + count++;
    htmlMatch.setAttribute(target,"id",main)
  }
}