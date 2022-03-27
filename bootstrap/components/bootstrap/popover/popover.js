var popoverTriggerList = [...document.querySelectorAll('.bootstrap-popover')];
window.bootstrapPopovers = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl,{container: 'body'})
})