document.addEventListener("DOMContentLoaded", function () {
    fetch("data/places.json")
        .then(response => response.json())
        .then(data => {
            const traveledList = document.getElementById("traveled-list");
            const wishlist = document.getElementById("wishlist");

            data.places.forEach(place => {
                let listItem = document.createElement("li");
                listItem.classList.add("list-group-item", "bg-dark", "text-light");
                listItem.innerHTML = `
                    <strong>${place.name}</strong> - ${place.description}
                    <a href="pages/place.html?name=${place.id}" class="btn btn-sm btn-primary mt-2">View More</a>
                `; // Added a button to view details

                if (place.type === "travelled") {
                    traveledList.appendChild(listItem);
                } else if (place.type === "wishlist") {
                    wishlist.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error("❌ Error fetching places:", error));
});

