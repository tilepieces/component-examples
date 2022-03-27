function parseHTML(HTMLText, tilepieces) {
  const getAnUniqueId = (mainname)=>{
    var doc = tilepieces.core.currentDocument;
    var count = 0;
    var id = mainname;
    while (doc.getElementById(id))
      id = mainname + "-" + count++;
    return id;
  }
  var data = {
    id : getAnUniqueId("bootstrap-navbar"),
    iddropdown : getAnUniqueId("bootstrap-dropdown")
  }
  return HTMLText.replace(new RegExp(/\{([\s\S]+?)\}/, "g"), (match, variable)=> data[variable])
}