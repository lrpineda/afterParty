let searchButton = document.querySelector("#search-button");
let searchBox = document.querySelector("#search-box");
let results = document.querySelector("#results");

// Clicking the search button and fetching the events
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    let artist = searchBox.value;
    let artistArray = artist.split(" ");
    let fetchArtist = artistArray.join("-");
    let seatGeekURL = `https://api.seatgeek.com/2/events?performers.slug=${fetchArtist}&client_id=MjY2Mjk4MjN8MTY1MDM4NDgyMi4wNDE2NTU1`;

    let eventResults = document.createElement("div");
    results.appendChild(eventResults);
    eventResults.classList.add("event-results");

    fetch(seatGeekURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // // If no events are avaliable or they give invalid input
            // if (data.events.length = 0) {
            //     console.log("Hey!");
            //     let noEventsWarning = document.createElement("h2");
            //     eventResults.appendChild(noEventsWarning);
            //     noEventsWarning.innerText = ("No Upcoming Events For This Performer, Check Your Spelling or Try Someone New!");
            // }
            // // If events are available
            // else {
            //     console.log("Hi!")
            //     for (i = 0; i < 6 || i < data.events.length; i++) {
            //         let newEvent = document.createElement("div");
            //         eventResults.appendChild(newEvent);

            //         let eventHeader = document.createElement("h2");
            //         newEvent.appendChild(eventHeader);
            //         eventHeader.innerText = artist;

            //         let eventLocation = document.createElement("p");
            //         newEvent.appendChild(eventLocation);
            //         let location = "location"
            //         eventLocation.innerText = ("Where: " + location)

            //         let eventPrice = document.createElement("p");
            //         newEvent.appendChild(eventPrice);
            //         let price = "price"
            //         eventPrice.innerText = ("Price: " + price)

            //         let eventDate = document.createElement("p");
            //         newEvent.appendChild(eventDate);
            //         let date = "date"
            //         eventDate.innerText = ("When: " + date)
            //     }
            // }
        })

});