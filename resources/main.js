const clientID = "AACE263B245DA15D906DEB6BEB9959C5B064BA0C";
const clientSecret = "B454474D50FD59B9E9A357650B0846638D414A71";
// Get Average Rating for Particular Beer Style Based on User Input //

function getBeerRating(event) {
    event.preventDefault();
    var ratingText = document.querySelector("#ratingText");
    //Run request to search beers
    var inputValue = document.querySelector(".beername").value;
    var username = document.querySelector(".username").value;
    var beerSearch = new XMLHttpRequest();
    beerSearch.open("GET", "https://api.untappd.com/v4/search/beer?q=" + inputValue + "&client_id=" + clientID + "&client_secret=" + clientSecret, false);
    beerSearch.send(null);
    var beerSearchJSON = JSON.parse(beerSearch.responseText);
    console.log(beerSearchJSON);
    if (beerSearchJSON.response.beers.count === 0) {
        ratingText.innerHTML = "Please enter a valid brewery and beer name";
        form.reset();
    }
    var breweryName = beerSearchJSON.response.beers.items[0].brewery.brewery_name;
    var beerName = beerSearchJSON.response.beers.items[0].beer.beer_name;
    var beerSearchStyle = beerSearchJSON.response.beers.items[0].beer.beer_style;
    //Run request to retrieve ratings
    var ratingReq = new XMLHttpRequest();
    var username = document.querySelector(".username").value;
    ratingReq.open("GET", "https://api.untappd.com/v4/user/checkins/" + username + "?client_id=" + clientID + "&client_secret=" + clientSecret, false);
    ratingReq.send(null);
    var ratingReqJSON = JSON.parse(ratingReq.responseText);
    console.log(ratingReqJSON);
    if (ratingReqJSON.meta.error_detail) {
        ratingText.innerHTML = "Please enter a valid Untappd username.";
        form.reset();
    }
    var beerArr = ratingReqJSON.response.checkins.items;

    var styleFilterArr = beerArr.filter(function (checkin) {
        return checkin.beer.beer_style === beerSearchStyle;
    });
    var ratingArr = styleFilterArr.map(function(beer) {
        return beer.rating_score;
    })

    var positiveRatingArr = ratingArr.filter(function(rating) {
        return rating > 0;
    })

    if (positiveRatingArr.length > 0 && username.length > 0) {
        var ratingAvg = positiveRatingArr.reduce(function(curr, acc) {
            var total = curr + acc;
            return total / 2;
        })
        ratingText.innerHTML = `${breweryName} ${beerName} is a ${beerSearchStyle}. Based on your tastes, we predict a ${Math.floor(ratingAvg * 20)}% chance you will like this beer!`;
        } else {
             ratingText.innerHTML = "Based on your entry, there's either not enough data or you didn't enter an Untappd username. We predict a 50% chance you will like this beer. Give it a try!";
        }

    var form = document.querySelector("#beerForm1");
    form.reset();
}
var searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getBeerRating);
searchButton.addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        getBeerRating();
        form.reset();
    }
});



/* function getBeerRecs() {
    //Run request to search beers
    var inputValue = document.querySelector(".beername").value;
    var beerSearch = new XMLHttpRequest();
    beerSearch.open("GET", "https://api.untappd.com/v4/search/beer?q=" + inputValue + "&client_id=" + clientID + "&client_secret=" + clientSecret, false);
    beerSearch.send(null);
    var beerSearchJSON = JSON.parse(beerSearch.responseText);
    console.log(beerSearchJSON);
    var beerSearchStyle = beerSearchJSON.response.beers.items[0].beer.beer_style;

    //Run request to retrieve ratings
    var ratingReq = new XMLHttpRequest();
    var username = document.querySelector(".username").value;
    ratingReq.open("GET", "https://api.untappd.com/v4/user/checkins/" + username + "?client_id=" + clientID + "&client_secret=" + clientSecret, false);
    ratingReq.send(null);
    var ratingReqJSON = JSON.parse(ratingReq.responseText);
    console.log(ratingReqJSON);
    var beerArr = ratingReqJSON.response.checkins.items;

    var styleFilterArr = beerArr.filter(function (checkin) {
        return checkin.beer.beer_style === beerSearchStyle;
    });
    var ratingArr = styleFilterArr.map(function (beer) {
        return beer.rating_score;
    })

    var positiveRatingArr = ratingArr.filter(function (rating) {
        return rating > 0;
    })

    if (positiveRatingArr.length > 0) {
        var ratingAvg = positiveRatingArr.reduce(function (curr, acc) {
            var total = curr + acc;
            return total / 2;
        })

    } else {
        console.log("Not Enough Data!")
        return "Not Enough Data";
    }
    document.querySelector("#beerForm1").reset();
    return document.querySelector("#ratingText").innerHTML = `Based on your tastes, we predict a ${Math.floor(ratingAvg * 20)}% chance you will like this beer!`;

} */