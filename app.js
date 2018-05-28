// setup
var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");


// route
app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var keyword = req.query.keyword;
    request("http://www.omdbapi.com/?s=" + keyword + "&apikey=thewdb", function(error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            // res.send(data);
            res.render("results", {data: data["Search"]});
        }
    });
});



// start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running!");
});