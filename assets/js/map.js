function initMap() {
    const india = { lat: 28.5937, lng: 77.9629 };

    map = new google.maps.Map(document.getElementById("travel-map"), {
        center: india,
        zoom: 5,
        mapId: "AIzaSyC8gW7O4_GOIajFiI17vfOw58EUA_oJh9o"
    });

    fetch("data/places.json")
        .then(response => response.json())
        .then(data => {
            let bounds = new google.maps.LatLngBounds();

            if (!Array.isArray(data.places)) {
                console.error("❌ places.json does not contain an array of places. Check its format.");
                return;
            }

            data.places.forEach(place => {
                let marker = addMarker(place);
                bounds.extend(new google.maps.LatLng(place.coordinates.lat, place.coordinates.lng));
            });

            map.fitBounds(bounds);

            google.maps.event.addListenerOnce(map, 'idle', function () {
                map.setCenter(india);
                if (map.getZoom() < 5) {
                    map.setZoom(5);
                }
            });
        })
        .catch(error => console.error("❌ Error loading map data:", error));
}

function addMarker(place) {
    let iconUrl = place.type === "wishlist" ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" : "https://maps.google.com/mapfiles/ms/icons/red-dot.png";

    let marker = new google.maps.Marker({
        position: place.coordinates,
        map: map,
        title: place.name,
        icon: iconUrl
    });

    let infoBox = document.createElement("div");
    infoBox.className = "info-box";
    infoBox.innerHTML = `
        <img src="${place.image}" alt="${place.name}">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
    `;
    document.body.appendChild(infoBox);

    marker.addListener("mouseover", (event) => {
        infoBox.style.display = "block";
        infoBox.style.left = `${event.domEvent.pageX + 10}px`;
        infoBox.style.top = `${event.domEvent.pageY + 10}px`;
    });

    marker.addListener("mousemove", (event) => {
        infoBox.style.left = `${event.domEvent.pageX + 10}px`;
        infoBox.style.top = `${event.domEvent.pageY + 10}px`;
    });

    marker.addListener("mouseout", () => {
        infoBox.style.display = "none";
    });

    marker.addListener("click", () => {
        window.location.href = `pages/place.html?name=${place.id}`;
    });

    return marker;
}