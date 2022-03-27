export const indicatorsHTML = (targetId,itemsArray)=> {
  return `
<div class="carousel-indicators">
    ${itemsArray.
  map((v,i)=>{
    /*
    if(i==0)
      return `<button type="button" data-bs-target="#${targetId}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="${v.ariaLabel || `Slide ${i+1}`}"></button>`
    else
     */
      return `<button type="button" data-bs-target="#${targetId}" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`
  }).join("")}
</div>`
}