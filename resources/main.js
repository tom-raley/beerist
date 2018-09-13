const clientID = config.CLIENT_ID;
const clientSecret = config.CLIENT_SECRET;

// Get Average Rating for Particular Beer Style Based on User Input //

function getBeerRating() {
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
    var ratingArr = styleFilterArr.map(function(beer) {
        return beer.rating_score;
    })

    var positiveRatingArr = ratingArr.filter(function(rating) {
        return rating > 0;
    })

    if (positiveRatingArr.length > 0) {
        var ratingAvg = positiveRatingArr.reduce(function(curr, acc) {
            var total = curr + acc;
            return total / 2;
        })
        
        } else {
            console.log("Not Enough Data!")
            return "Not Enough Data";
        }
    document.querySelector("#beerForm1").reset();
    return document.querySelector("#ratingText").innerHTML = `Based on your tastes, we predict a ${Math.floor(ratingAvg * 20)}% chance you will like this beer!`;
    
}

function getBeerRecs() {
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

}