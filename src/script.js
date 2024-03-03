
// Open Login Modal when Login button pressed
function openModal(elementId) {
    // Display the modal with the specified elementId
    var modal = document.getElementById(elementId);

    if (modal) {
        modal.style.display = 'flex';
    } else {
        console.error("Element with ID '" + elementId + "' not found.");
    }
}
// Close Login Modal when 'x' button pressed in the overlay.
function closeModal(elementId) {
    // Close the modal with the specified elementId
    var modal = document.getElementById(elementId);
    
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error("Element with ID '" + elementId + "' not found.");
    }
}
