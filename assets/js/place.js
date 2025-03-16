document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const placeKey = urlParams.get("name");

    fetch("../data/places.json")
        .then(response => response.json())
        .then(data => {
            const place = data.places.find(p => p.id === placeKey);

            if (place) {
                document.getElementById("place-name").textContent = place.name;
                document.getElementById("place-image").src = place.image;
                document.getElementById("place-description").textContent = place.description;

                // Set timeline
                const timelineText = `${place.timeline.month} ${place.timeline.startDate}-${place.timeline.endDate}, ${place.timeline.year}`;
                document.getElementById("place-timeline").textContent = timelineText;

                // Populate gallery
                const galleryDiv = document.getElementById("gallery");
                galleryDiv.innerHTML = "";
                place.gallery.forEach((imgSrc) => {
                    const col = document.createElement("div");
                    col.className = "col";
                    col.innerHTML = `<img src="${imgSrc}" class="img-fluid rounded shadow-sm">`;
                    galleryDiv.appendChild(col);
                });
            }
        })
        .catch(error => console.error("Error:", error));
});
