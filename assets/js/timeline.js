document.addEventListener("DOMContentLoaded", function () {
    fetch("../data/places.json")
        .then(response => response.json())
        .then(data => {
            const timelineContent = document.getElementById("timeline-content");

            data.places.forEach((place, index) => {
                if (place.timeline) {
                    let div = document.createElement("div");
                    div.className = `timeline-item ${index % 2 === 0 ? "left" : "right"}`;
                    div.innerHTML = `
                        <h4 class="text-warning">${place.timeline.year} - ${place.name}</h4>
                        <p><strong>Date:</strong> ${place.timeline.month} ${place.timeline.startDate} - ${place.timeline.endDate}</p>
                        <p>${place.description}</p>
                    `;
                    timelineContent.appendChild(div);
                }
            });
        })
        .catch(error => console.error("Error fetching timeline data:", error));
});
