let coordinates = {
    lat: "40.76924",
    lon: "-111.9006"
};

// Need to update this to add event name and event date
let getHotelData = function (coordinates) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
            'X-RapidAPI-Key': '7544d0d7e7msha6bee2c80682d62p1b90adjsn222d27798882'
        }
    };
    
    fetch("https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=distance&adults_number=2&units=imperial&room_number=1&checkout_date=2022-04-26&filter_by_currency=USD&locale=en-gb&checkin_date=2022-04-25&latitude="+coordinates.lat+"&longitude="+coordinates.lon+"&children_number=2&children_ages=5%2C0&include_adjacency=true", options)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            }
            else {
                console.log("Error in fetching data");
            }
        })
};



// getHotelData(coordinates);