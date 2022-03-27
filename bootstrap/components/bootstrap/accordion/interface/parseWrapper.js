function parseWrapper(HTMLText, tilepieces) {
  const mainname = "bootstrap-accordion";
  var doc = tilepieces.core.currentDocument;
  var count = 0;
  var main = mainname;
  while (doc.getElementById(main))
    main = mainname + "-" + count++;
  let data = {
    main
  };
  return HTMLText.replace(new RegExp(/\{([\s\S]+?)\}/, "g"), (match, variable)=> data[variable])
}