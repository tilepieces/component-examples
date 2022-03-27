function parseWrapper(HTMLText, tilepieces) {
  const mainname = "bootstrap-dropdown";
  var doc = tilepieces.core.currentDocument;
  var count = 0;
  var id = mainname;
  while (doc.getElementById(id))
    id = mainname + "-" + count++;
  let data = {
    id
  };
  return HTMLText.replace(new RegExp(/\{([\s\S]+?)\}/, "g"), (match, variable)=> data[variable])
}