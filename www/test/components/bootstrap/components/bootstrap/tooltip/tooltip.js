window.bootstrapTooltips = [...document.querySelectorAll('.bootstrap-tooltip')].map((tooltipTriggerEl)=>{
  return new bootstrap.Tooltip(tooltipTriggerEl,{container: 'body'})
});