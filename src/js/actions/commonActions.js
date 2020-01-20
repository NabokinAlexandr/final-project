function openModal(modal) {
    modal.classList.remove('hidden');
    document.querySelector('body').classList.add('fixed');
}
function closeModal(modal) {
    modal.classList.add('hidden');
    document.querySelector('body').classList.remove('fixed');
}
function openPhoto(target, popup, modal) {
    const post = target.parentElement,
    clone = post.cloneNode(true);
    while (modal.hasChildNodes()) {
        modal.removeChild(modal.firstChild);
    }
    modal.appendChild(clone);
    openModal(popup);
}
export {openModal, closeModal, openPhoto};
