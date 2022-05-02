let searchButton = document.querySelector('#search-button');
let searchBox = document.querySelector('#search-box');
let results = document.querySelector('#results');
let sass = document.querySelector('#sass');

// Clicking the search button and fetching the events
searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  let artist = searchBox.value;
  let artistArray = artist.split(' ');
  let fetchArtist = artistArray.join('-');
  let seatGeekURL = `https://api.seatgeek.com/2/events?performers.slug=${fetchArtist}&client_id=MjY2Mjk4MjN8MTY1MDM4NDgyMi4wNDE2NTU1`;

  results.innerHTML = '';
  let eventResults = document.createElement('div');
  results.appendChild(eventResults);
  eventResults.classList.add('event-results');

  fetch(seatGeekURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // // If no events are avaliable or they give invalid input
      if (data.events.length == 0) {
        let noEventsWarning = document.createElement('h2');
        noEventsWarning.innerText =
          'No Upcoming Events For This Performer, Check Your Spelling or Try Someone New!';
        eventResults.appendChild(noEventsWarning);
      }
      // // If events are available
      else {
        for (i = 0; i < data.events.length; i++) {
          let newEvent = document.createElement('div');
          newEvent.classList.add('new-event');
          eventResults.appendChild(newEvent);

          let eventHeader = document.createElement('h2');
          let title = data.events[i].title;
          eventHeader.innerText = title;
          newEvent.appendChild(eventHeader);

          let eventLocation = document.createElement('p');
          newEvent.appendChild(eventLocation);
          let location = data.events[i].venue.name;
          eventLocation.innerText = 'Where: ' + location;

          let eventPrice = document.createElement('p');
          newEvent.appendChild(eventPrice);
          let price = data.events[i].stats.average_price;
          eventPrice.innerText = 'Average Ticket Price: $' + price;

          let eventDate = document.createElement('p');
          newEvent.appendChild(eventDate);
          let dateLong = data.events[i].datetime_utc;
          let dateArray = dateLong.split('T');
          let date = dateArray[0];
          eventDate.innerText = 'When: ' + date;
        }
      }
    });
});
let coordinates = {
  lat: '40.76924',
  lon: '-111.9006',
};

// Need to update this to add event name and event date
let getHotelData = function (coordinates) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
      'X-RapidAPI-Key': '7544d0d7e7msha6bee2c80682d62p1b90adjsn222d27798882',
    },
  };

  fetch(
    'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=distance&adults_number=2&units=imperial&room_number=1&checkout_date=2022-04-26&filter_by_currency=USD&locale=en-gb&checkin_date=2022-04-25&latitude=' +
      coordinates.lat +
      '&longitude=' +
      coordinates.lon +
      '&children_number=2&children_ages=5%2C0&include_adjacency=true',
    options
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    } else {
      console.log('Error in fetching data');
    }
  });
};

// getHotelData(coordinates);
