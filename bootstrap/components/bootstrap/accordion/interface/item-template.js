export const accordionItemHTML = `<div class="accordion-item">
    <h2 class="accordion-header" id="{heading}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#{collapse}" 
        aria-expanded="false" aria-controls="{collapse}">
            {item}</button>
    </h2>
    <div id="{collapse}" class="accordion-collapse collapse" aria-labelledby="{heading}" data-bs-parent="#{main}">
        <div class="accordion-body">This is the {item} body.</div>
    </div>
</div>`;
