let searchButton = document.querySelector("#search-button");
let searchBox = document.querySelector("#search-box");
let heroEl = document.querySelector("#hero");
let results = document.querySelector("#events");
let sass = document.querySelector("#sass");

$("#confirm-event").on("click", function () {
    console.log("clicked");
});

// Clicking the search button and fetching the events
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    let artist = searchBox.value;
    let artistArray = artist.split(" ");
    let fetchArtist = artistArray.join("-");
    let seatGeekURL = `https://api.seatgeek.com/2/events?performers.slug=${fetchArtist}&client_id=MjY2Mjk4MjN8MTY1MDM4NDgyMi4wNDE2NTU1`;

    results.innerHTML = "";
    let eventResults = document.createElement("div");
    results.appendChild(eventResults);
    eventResults.classList.add("section","is-medium");

    fetch(seatGeekURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // If no events are avaliable or they give invalid input
            if (data.events.length == 0) {
                let noEventsWarning = document.createElement("h2");
                noEventsWarning.classList.add("title","is-4","has-text-centered");
                noEventsWarning.innerText = ("No Upcoming Events For This Performer, Check Your Spelling or Try Someone New!");eventResults.appendChild(noEventsWarning);
            }
            // If events are available
            else {
                displayEvents(data);
            }
        })

});

let displayEvents = function (Edata) {
    // Making the hero section smaller to fit the events
    heroEl.classList.remove("is-fullheight");
    heroEl.classList.add("is-small");

    // Clearing sass and arrow
    results.innerHTML = "";

    // Creating the div for the events
    let eventResults = document.createElement("div");
    eventResults.classList.add("section");
    eventResults.setAttribute("id", "eventSection");
    // Creating Event Header
    let eventHeader = document.createElement("h2");
    eventHeader.innerText = "Upcoming Events:";
    eventHeader.classList.add("title");
    eventResults.appendChild(eventHeader);
    // Creating Event cards
    for (i = 0; i < Edata.events.length; i++) {

        // Creating the event card element
        let cardEl = document.createElement("div");
        cardEl.classList.add("card");

        // Creating the event card header
        let eventTitleEl = document.createElement("div");
        eventTitleEl.classList.add("card-header", "has-background-warning");

        // Creating the event title
        let eventTitleText = document.createElement("p");
        eventTitleText.classList.add("card-header-title");
        eventTitleText.innerText = Edata.events[i].title;

        // Appending the event title to the card header
        eventTitleEl.appendChild(eventTitleText);

        // Creating the event card content
        let eventContentEl = document.createElement("div");
        eventContentEl.classList.add("card-content");
        let columnsEl = document.createElement("div");
        columnsEl.classList.add("columns");

        // Creating image column
        let imageColumnEl = document.createElement("div");
        imageColumnEl.classList.add("column", "card-image", "is-one-quarter");

        // Creating image
        let imageEl = document.createElement("figure");
        imageEl.classList.add("image", "is-4by3");
        let image = document.createElement("img");
        image.src = Edata.events[i].performers[0].image;
        imageEl.appendChild(image);

        // Appending image to image column
        imageColumnEl.appendChild(imageEl);
        // Appending image column to columns element
        columnsEl.appendChild(imageColumnEl);

        // Creating info column
        let contentColumnEl = document.createElement("div");
        contentColumnEl.classList.add("column", "content");

        // Creating info content
        let cardContentEl = document.createElement("div");
        cardContentEl.classList.add("card-content");

        // Where the event is
        let eventLocationEl = document.createElement("p");
        eventLocationEl.setAttribute("coor", Edata.events[i].venue.location.lat+","+Edata.events[i].venue.location.lon);
        eventLocationEl.innerText = "Where: " + Edata.events[i].venue.name;

        // When the event is
        let eventDateEl = document.createElement("p");
        eventDateEl.setAttribute("id", "event-date");
        eventDateEl.innerText = "When: " + moment.utc(Edata.events[i].datetime_utc).format("MMMM Do YYYY");

        // Average ticket price
        let eventPriceEl = document.createElement("p");
        eventPriceEl.innerText = "Average Ticket Price: $" + Edata.events[i].stats.average_price;

        // Appending info content to card content
        cardContentEl.appendChild(eventLocationEl);
        cardContentEl.appendChild(eventDateEl);
        cardContentEl.appendChild(eventPriceEl);

        // Appending card content to content column
        contentColumnEl.appendChild(cardContentEl);

        // Appending content column to columns element
        columnsEl.appendChild(contentColumnEl);

        // Appending columns element to events element
        eventContentEl.appendChild(columnsEl);

        // Adding a space br
        let brEl = document.createElement("br");
        eventContentEl.appendChild(brEl);

        // Creating the event card button
        let cardButtonEl = document.createElement("div");
        cardButtonEl.classList.add("buttons", "is-left");
        
        // Creating the event button
        let confirmButtonEl = document.createElement("button");
        confirmButtonEl.classList.add("button", "is-info");
        confirmButtonEl.setAttribute("id", "confirm-event");
        confirmButtonEl.innerText = "Confirm";

        // Appending the event button to the card button
        cardButtonEl.appendChild(confirmButtonEl);

        // Appending the card button to the card content
        cardContentEl.appendChild(cardButtonEl);

        // Appending the card content to the card element
        cardEl.appendChild(eventTitleEl);
        cardEl.appendChild(eventContentEl);

        // Appending the card element to the event results element
        eventResults.appendChild(cardEl);

    }

    // Appending the event results element to the results element
    results.appendChild(eventResults);

    
};

let displayHotelData = function (Hdata) {
    let mainSection = $("#main");
    if (mainSection) {
        let Hcontainter = $("<div>")
            .addClass("container column is-8");
        let Hsection = $("<div>")
            .addClass("section");
        let Htitle = $("<h1>")
            .addClass("subtitle is-4")
            .text("Please select a hotel:");
        
        Hsection.append(Htitle);
        Hcontainter.append(Hsection);

        for (let i = 0; i < 10; i++) {
            let HCard = $("<div>")
                .addClass("card");
            let HCardHeader = $("<div>")
                .addClass("card-header has-background-info");
            let HCardTitle = $("<p>")
                .addClass("card-header-title has-text-white")
                .text(Hdata.result[i].hotel_name);
            HCardHeader.append(HCardTitle);
            HCard.append(HCardHeader);

            let HCardContent = $("<div>")
                .addClass("card-content");
            
            let HCardContentDivider = $("<div>")
                .addClass("columns");
            
            HCardContent.append(HCardContentDivider);
                
            let HCardImageEl = $("<div>")
                .addClass("column card-image is-one-quarter");
            let HCardImage = $("<figure>")
                .addClass("image is-4by3");
            let HCardImageImg = $("<img>")
                .attr("src", Hdata.result[i].max_photo_url);
            HCardImage.append(HCardImageImg);
            HCardImageEl.append(HCardImage);
            HCardContentDivider.append(HCardImageEl);

            let HCardContentColumn = $("<div>")
                .addClass("column content");
            let HCardContentEl = $("<div>")
                .addClass("is-justify-content-left");
            let HCardReviewEl = $("<div>")
                .addClass("is-3 level-right");
            let HCardReview = $("<p>")
                .text("Reviews: ");
            let HCardReviewStars = $("<span>").text(Hdata.result[i].review_score);
                if (Hdata.result[i].review_score > 7.5) {
                    HCardReviewStars.addClass("tag is-success");
                }else if (Hdata.result[i].review_score < 7.5) {
                    HCardReviewStars.addClass("tag is-warning");
                }else if(Hdata.result[i].review_score < 5){
                    HCardReviewStars.addClass("tag is-danger");
                }

            HCardReview.append(HCardReviewStars);
            HCardReviewEl.append(HCardReview);
            HCardContentEl.append(HCardReviewEl);
            HCardContentColumn.append(HCardContentEl);

            let HCardList = $("<ul>");
            let HCardListItemDis = $("<li>")
                .text(Hdata.result[i].distances[0].text);
            let HCardListItemAddress = $("<li>")
                .text("Address: " + Hdata.result[i].address + ", " + Hdata.result[i].city + ", " + Hdata.result[i].state + ", " + Hdata.result[i].zip);
            let HCardListItemRoom = $("<li>")
                .html(Hdata.result[i].unit_configuration_label);
            
            HCardList.append(HCardListItemDis);
            HCardList.append(HCardListItemAddress);
            HCardList.append(HCardListItemRoom);

            let HCardRoom = $("<div>")
                .addClass("card-content has-text-right");
            let HCardRoomPrice = $("<p>")
                .text("Price: $" + Hdata.result[i].price_breakdown.all_inclusive_price);
            let HCardBreak = $("<br>");
            HCardRoom.append(HCardRoomPrice);
            HCardRoom.append(HCardBreak);
            
            HCardLink = $("<a>")
                .attr("href", Hdata.result[i].url)
                .attr("target", "_blank")
                .text("Reserve now!");

            HCardRoom.append(HCardLink);
            
            HCardContentColumn.append(HCardList);
            HCardContentColumn.append(HCardRoom);
            HCardContentDivider.append(HCardContentColumn);
            HCardContent.append(HCardContentDivider);

            HCard.append(HCardContent);
            Hsection.append(HCard);
        }
        mainSection.append(Hcontainter);
        
    }
    else {
        alert("Something went terribly wrong. Please retry your search");
    }
};



// Need to update this to add event name and event date
let getHotelData = function (coordinates, checkInDate) {
    checkInDate = moment(checkInDate, 'MMMM Do YYYY').format("YYYY-MM-DD");
    checkOutDate = moment(checkInDate).add(1, "days").format("YYYY-MM-DD");
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
            'X-RapidAPI-Key': '7544d0d7e7msha6bee2c80682d62p1b90adjsn222d27798882'
        }
    };
    
    fetch("https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=distance&adults_number=2&units=imperial&room_number=1"
        +"&checkout_date="+ checkOutDate
        +"&filter_by_currency=USD&locale=en-gb"
        +"&checkin_date="+checkInDate
        +"&latitude="
        +coordinates.lat
        +"&longitude="
        +coordinates.lon
        +"&include_adjacency=true", options)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (data) {
                    // displayHotelData(data);
                    displayHotelData(data);
                });
            }
            else {
                console.log("Error in fetching data");
            }
        })
};

// Event listener after confirming a specific event
$(document).on("click", "#confirm-event", function () {
    // Get the event Section 
    let eventSection = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent();

    // Get the event Card HTML
    let cardSelectedContent = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .html();

    // Variable to get event's coordinates
    let event = $(this).parent().parent().parent();
    let eventDate = event.find("#event-date").text().split(": ")[1];
    let eventLat = event.find("p").attr("coor").split(",")[0];
    let eventLon = event.find("p").attr("coor").split(",")[1];
    let eventCoordinates = {
        lat: eventLat,
        lon: eventLon
    };

    // Re-create event section 
    let mainDiv = document.querySelector("#events");
    let sectionTxt = $("<h1>")
        .addClass("title")
        .text("Event:");

    // Empty data in event section
    eventSection.empty();
    // Make the event section smaller
    mainDiv.classList.add("is-4");
    // Add the event section back to the main section
    eventSection.append(sectionTxt);
    eventSection.append(cardSelectedContent);
    
    // Get the hotel data
    getHotelData(eventCoordinates, eventDate);
});



// main variables 
let randomSass = {};
let pastSearches = {};


