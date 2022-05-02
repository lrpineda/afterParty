let searchButton = document.querySelector('#search-button');
let searchBox = document.querySelector('#search-box');
let heroEl = document.querySelector('#hero');
let main = document.querySelector('#main');
let results = document.querySelector('#results');
let sass = document.querySelector('#sass');
let arrow = document.querySelector('#arrow');
let searched = [];

// Clicking the search button or pressing enter - search function at the bottom of js
searchButton.addEventListener('click', search);

searchBox.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    search();
  }
});

// Creates and displays the events column
let displayEvents = function (Edata) {
  // Making the hero section smaller to fit the events
  heroEl.classList.remove('is-fullheight');
  heroEl.classList.add('is-small');

  // Creating the div for the events
  let eventResults = document.createElement('div');
  eventResults.classList.add('section');
  eventResults.setAttribute('id', 'eventSection');
  // Creating Event Header
  let eventHeader = document.createElement('h2');
  eventHeader.innerText = 'Upcoming Events:';
  eventHeader.classList.add('title');
  eventResults.appendChild(eventHeader);
  // Creating Event cards
  for (i = 0; i < Edata.events.length; i++) {
    // Creating the event card element
    let cardEl = document.createElement('div');
    cardEl.classList.add('card');

    // Creating the event card header
    let eventTitleEl = document.createElement('div');
    eventTitleEl.classList.add('card-header', 'has-background-warning');

    // Creating the event title
    let eventTitleText = document.createElement('p');
    eventTitleText.classList.add('card-header-title');
    eventTitleText.innerText = Edata.events[i].title;

    // Appending the event title to the card header
    eventTitleEl.appendChild(eventTitleText);

    // Creating the event card content
    let eventContentEl = document.createElement('div');
    eventContentEl.classList.add('card-content');
    let columnsEl = document.createElement('div');
    columnsEl.classList.add('columns');

    // Creating image column
    let imageColumnEl = document.createElement('div');
    imageColumnEl.classList.add('column', 'card-image', 'is-one-quarter');

    // Creating image
    let imageEl = document.createElement('figure');
    imageEl.classList.add('image', 'is-4by3');
    let image = document.createElement('img');
    image.src = Edata.events[i].performers[0].image;
    imageEl.appendChild(image);

    // Appending image to image column
    imageColumnEl.appendChild(imageEl);
    // Appending image column to columns element
    columnsEl.appendChild(imageColumnEl);

    // Creating info column
    let contentColumnEl = document.createElement('div');
    contentColumnEl.classList.add('column', 'content');

    // Creating info content
    let cardContentEl = document.createElement('div');
    cardContentEl.classList.add('card-content');

    // Event Venue
    let eventVenueEl = document.createElement('p');
    eventVenueEl.innerText = 'Venue: ' + Edata.events[i].venue.name;

    // Where the event is
    let eventLocationEl = document.createElement('p');
    eventLocationEl.setAttribute(
      'coor',
      Edata.events[i].venue.location.lat +
        ',' +
        Edata.events[i].venue.location.lon
    );
    eventLocationEl.setAttribute('id', 'location');
    eventLocationEl.innerText =
      'Where: ' + Edata.events[i].venue.display_location;

    // When the event is
    let eventDateEl = document.createElement('p');
    eventDateEl.setAttribute('id', 'event-date');
    eventDateEl.innerText =
      'When: ' +
      moment.utc(Edata.events[i].datetime_utc).format('MMMM Do YYYY');

    // Ticket Price Range
    let eventPriceRangeEl = document.createElement('p');
    eventPriceRangeEl.innerText =
      'Ticket Price Range: $' +
      (Edata.events[i].stats.lowest_price || 'N/A') +
      ' - $' +
      (Edata.events[i].stats.highest_price || 'N/A');

    // Link to Get Tickets
    let eventLinkEl = document.createElement('div');
    var link = document.createElement('a');
    var linkText = document.createTextNode('Get Tickets Here!');
    eventLinkEl.classList.add('pb-4');
    link.setAttribute('target', '_blank');
    link.appendChild(linkText);
    link.title = 'Get Tickets Here!';
    link.href = Edata.events[i].url;
    eventLinkEl.appendChild(link);

    // Appending info content to card content
    cardContentEl.appendChild(eventVenueEl);
    cardContentEl.appendChild(eventLocationEl);
    cardContentEl.appendChild(eventDateEl);
    cardContentEl.appendChild(eventPriceRangeEl);
    cardContentEl.appendChild(eventLinkEl);

    // Appending card content to content column
    contentColumnEl.appendChild(cardContentEl);

    // Appending content column to columns element
    columnsEl.appendChild(contentColumnEl);

    // Appending columns element to events element
    eventContentEl.appendChild(columnsEl);

    // Adding a space br
    let brEl = document.createElement('br');
    eventContentEl.appendChild(brEl);

    // Creating the event card button
    let cardButtonEl = document.createElement('div');
    cardButtonEl.classList.add('buttons', 'is-left');

    // Creating the event button
    let confirmButtonEl = document.createElement('button');
    confirmButtonEl.classList.add('button', 'is-info');
    confirmButtonEl.setAttribute('id', 'confirm-event');
    confirmButtonEl.innerText = 'See Hotels Near This Event';

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
// create and display the hotel section
let displayHotelData = function (Hdata) {
  let mainSection = $('#main');
  // creating header/sections/outline
  if (mainSection) {
    let Hcontainer = $('<div>')
      .addClass('container column is-8')
      .attr('id', 'hotels');
    let Hsection = $('<div>').addClass('section');
    let Htitle = $('<h1>')
      .addClass('subtitle is-4')
      .text('Please select a hotel:');
    Hsection.append(Htitle);
    Hcontainer.append(Hsection);

    // Creating hotel cards
    for (let i = 0; i < 10; i++) {
      let HCard = $('<div>').addClass('card');
      let HCardHeader = $('<div>').addClass('card-header has-background-info');
      let HCardTitle = $('<p>')
        .addClass('card-header-title has-text-white')
        .text(Hdata.result[i].hotel_name);
      HCardHeader.append(HCardTitle);
      HCard.append(HCardHeader);

      let HCardContent = $('<div>').addClass('card-content');

      let HCardContentDivider = $('<div>').addClass('columns');

      HCardContent.append(HCardContentDivider);

      let HCardImageEl = $('<div>').addClass(
        'column card-image is-one-quarter'
      );
      let HCardImage = $('<figure>').addClass('image is-4by3');
      let HCardImageImg = $('<img>').attr('src', Hdata.result[i].max_photo_url);
      HCardImage.append(HCardImageImg);
      HCardImageEl.append(HCardImage);
      HCardContentDivider.append(HCardImageEl);

      let HCardContentColumn = $('<div>').addClass('column content');
      let HCardContentEl = $('<div>').addClass('is-justify-content-left');
      let HCardReviewEl = $('<div>').addClass('is-3 level-right');
      let HCardReview = $('<p>').text('Reviews: ');
      let HCardReviewStars = $('<span>');
      if (Hdata.result[i].review_score == null) {
        HCardReviewStars.addClass('tag is-link is-light');
        HCardReviewStars.text('N/A');
      } else if (Hdata.result[i].review_score > 7.5) {
        HCardReviewStars.addClass('tag is-success');
        HCardReviewStars.text(Hdata.result[i].review_score);
      } else if (Hdata.result[i].review_score < 7.5) {
        HCardReviewStars.addClass('tag is-warning');
        HCardReviewStars.text(Hdata.result[i].review_score);
      } else if (Hdata.result[i].review_score < 5) {
        HCardReviewStars.addClass('tag is-danger');
        HCardReviewStars.text(Hdata.result[i].review_score);
      }

      HCardReview.append(HCardReviewStars);
      HCardReviewEl.append(HCardReview);
      HCardContentEl.append(HCardReviewEl);
      HCardContentColumn.append(HCardContentEl);

      let HCardList = $('<ul>');
      let HCardListItemDis = $('<li>').text(Hdata.result[i].distances[0].text);
      let HCardListItemAddress = $('<li>').text(
        'Address: ' +
          Hdata.result[i].address +
          ', ' +
          Hdata.result[i].city +
          ', ' +
          Hdata.result[i].zip
      );
      let HCardListItemRoom = $('<li>').html(
        Hdata.result[i].unit_configuration_label
      );

      HCardList.append(HCardListItemDis);
      HCardList.append(HCardListItemAddress);
      HCardList.append(HCardListItemRoom);

      let HCardRoom = $('<div>').addClass('card-content has-text-right');
      let HCardRoomPrice = $('<p>').text(
        'Price: $' +
          Hdata.result[i].price_breakdown.all_inclusive_price.toFixed(2)
      );
      let HCardBreak = $('<br>');
      HCardRoom.append(HCardRoomPrice);
      HCardRoom.append(HCardBreak);

      HCardLink = $('<a>')
        .attr('href', Hdata.result[i].url)
        .attr('target', '_blank')
        .text('Reserve now!');

      HCardRoom.append(HCardLink);

      HCardContentColumn.append(HCardList);
      HCardContentColumn.append(HCardRoom);
      HCardContentDivider.append(HCardContentColumn);
      HCardContent.append(HCardContentDivider);

      HCard.append(HCardContent);
      Hsection.append(HCard);
    }
    mainSection.append(Hcontainer);
  } else {
    alert('Something went terribly wrong. Please retry your search');
  }
};

// Need to update this to add event name and event date
let getHotelData = function (coordinates, checkInDate) {
  checkInDate = moment(checkInDate, 'MMMM Do YYYY').format('YYYY-MM-DD');
  checkOutDate = moment(checkInDate).add(1, 'days').format('YYYY-MM-DD');
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
      'X-RapidAPI-Key': '7544d0d7e7msha6bee2c80682d62p1b90adjsn222d27798882',
    },
  };

  fetch(
    'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=distance&adults_number=2&units=imperial&room_number=1' +
      '&checkout_date=' +
      checkOutDate +
      '&filter_by_currency=USD&locale=en-gb' +
      '&checkin_date=' +
      checkInDate +
      '&latitude=' +
      coordinates.lat +
      '&longitude=' +
      coordinates.lon +
      '&include_adjacency=true',
    options
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if (data.result.length > 0) {
          displayHotelData(data);
        } else {
          let mainDiv = document.querySelector('#results');
          mainDiv.classList.remove('is-4');
          let noHotel = document.createElement('h1');
          noHotel.classList.add('title', 'is-5', 'has-text-centered', 'pt-0');
          noHotel.textContent =
            'There are no hotels found near the event location.';
          mainDiv.append(noHotel);
        }
      });
    } else {
      let mainDiv = document.querySelector('#results');
      mainDiv.classList.remove('is-4');
      let noResults = document.createElement('h1');
      noResults.classList.add('title', 'is-5', 'has-text-centered', 'pt-0');
      noResults.textContent =
        'We were unable to find any hotels with available rooms near the event location.';
      mainDiv.append(noResults);
    }
  });
};

// Event listener after confirming a specific event
$(document).on('click', '#confirm-event', function (e) {
  e.preventDefault();

  // Turns confirm event button into functioning new event button

  $(this).addClass('is-hidden');
  let switchEventButtonEl = document.createElement('button');
  switchEventButtonEl.classList.add('button', 'is-danger');
  switchEventButtonEl.setAttribute('id', 'switch-event');
  switchEventButtonEl.innerText = 'Switch Event';
  let buttonDiv = $(this).parent();
  buttonDiv.append(switchEventButtonEl);

  $('#switch-event').attr('onclick', 'search()');

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
  let eventDate = event.find('#event-date').text().split(': ')[1];
  let eventLat = event.find('#location').attr('coor').split(',')[0];
  let eventLon = event.find('#location').attr('coor').split(',')[1];
  let eventCoordinates = {
    lat: eventLat,
    lon: eventLon,
  };

  // Re-create event section
  let mainDiv = document.querySelector('#results');
  let sectionTxt = $('<h1>').addClass('title').text('Event:');

  // Empty data in event section
  eventSection.empty();
  // Make the event section smaller
  mainDiv.classList.add('is-4');
  // Add the event section back to the main section
  eventSection.append(sectionTxt);
  eventSection.append(cardSelectedContent);

  // Get the hotel data
  getHotelData(eventCoordinates, eventDate);
});

// create local storage function pass in searchbox field
let saveSearches = function (artist) {
  localStorage.setItem('searches', searched);
  if (artist !== '') {
    //makes storage inputs uniform and first letter capitalized
    let inputname = artist.trim().toLowerCase();
    let inputnames = inputname.split(' ');
    for (let i = 0; i < inputnames.length; i++) {
      inputnames[i] = inputnames[i][0].toUpperCase() + inputnames[i].substr(1);
    }

    let capitalizedArtist = inputnames.join(' ');
    // only adds new searches - prevents duplicates in local storage
    if (!searched.includes(capitalizedArtist)) {
      searched.push(capitalizedArtist);
    }
    // saves to local storage
    localStorage.setItem('searches', JSON.stringify(searched));
  }
  // test
  //   console.log(localStorage.getItem("searches"));
};

let loadSearched = function () {
  searched = localStorage.getItem('searches');
  searched = JSON.parse(searched);
  return searched;
};

let autofill = function () {
  if (localStorage.getItem('searches')) {
    $('#search-box').autocomplete(
      {
        source: loadSearched(),
      },
      {
        autoFocus: true,
        delay: 0,
      }
    );
  }
};

// main variables
let randomSass = {};
let pastSearches = {};

function search() {
  let hotelQuery = document.querySelector('#hotels');
  let artist = searchBox.value;
  let artistArray = artist.split(' ');
  let fetchArtist = artistArray.join('-');
  let seatGeekURL = `https://api.seatgeek.com/2/events?performers.slug=${fetchArtist}&client_id=MjY2Mjk4MjN8MTY1MDM4NDgyMi4wNDE2NTU1`;

  // remove previous HTML and create section for events
  arrow.remove();
  results.innerHTML = '';
  if (hotelQuery) {
    hotelQuery.remove();
    results.classList.remove('is-4');
  }

  // Fetch SeatGeek
  fetch(seatGeekURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // If no events are avaliable or they give invalid input
      if (data.events.length == 0) {
        let noEventsWarning = document.createElement('h2');
        noEventsWarning.classList.add(
          'title',
          'is-4',
          'has-text-centered',
          'pt-6',
          'pb-6'
        );
        noEventsWarning.innerText =
          'No Upcoming Events For This Performer, Check Your Spelling or Try Someone New!';
        results.appendChild(noEventsWarning);
      }
      // If events are available
      else {
        displayEvents(data);
      }
    });

  saveSearches(artist);
  loadSearched();
  autofill();
}

autofill();
