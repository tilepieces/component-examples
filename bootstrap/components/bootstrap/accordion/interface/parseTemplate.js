export function parseItemHTML(HTMLText,mainname,doc) {
  var main = mainname;
  var heading = "",collapse = "",item = "";
  var countheading = 1,countcollapsing = 1,countitem=1;
  var seedHeading = main + "-heading-";
  do{
    heading = seedHeading + countheading++;
  }
  while(doc.getElementById(heading));
  
  var seedCollapsing = main + "-collapsing-";
  do{
    collapse = seedCollapsing + countcollapsing++;
  }
  while(doc.getElementById(collapse));

  item = main + "-item-"+(countheading-1);

  let data = {
    main,
    item,
    heading,
    collapse
  };

  return HTMLText.replace(new RegExp(/\{([\s\S]+?)\}/, "g"), (match, variable)=> data[variable])
}