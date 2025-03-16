document.addEventListener("DOMContentLoaded", function () {
    const openFormBtn = document.getElementById("openForm");
    const modal = document.getElementById("googleFormModal");
    const closeModal = document.querySelector(".close");

    openFormBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
