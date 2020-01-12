function openModal(modal) {
    modal.classList.remove('hidden');
}
function closeModal(modal) {
    modal.classList.add('hidden');
}
function openPhoto(target, popup, modal) {
    const post = target.parentElement,
    clone = post.cloneNode(true);
    while (modal.hasChildNodes()) {
        modal.removeChild(modal.firstChild);
    }
    modal.appendChild(clone);
    
    location.replace(`http://localhost:3000/#${post.id}`);
    openModal(popup);
}
export {openModal, closeModal, openPhoto};
