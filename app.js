const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const { url } = require("inspector");

const app = express();
app.use(bodyParser.urlencoded({ extended : true }));

app.use(express.static("public"));

app.get("/" , function(req , res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function( req , res ) {
    
    const email = req.body.email;
    const firstName = req.body.fName;
    const lastName = req.body.lName;

    const data = {
        members: [
            {
                email_address: email ,
                status: "subscribed" ,
                merge_fields: {
                    FNAME: firstName ,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/d23601442c";

    const option = {
        method: 'POST',
        auth: 'smdsurfing@gmail.com:a5487ff9a5778db96bf00eb3be906577b-us1'
    };
    
   const request = https.request(url , option , function(resp) {

    if(resp.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    } 
    else {
        res.sendFile(__dirname + "/failure.html");
    }


         resp.on("data" , function(data) {

            const new_data = JSON.parse(data);
            console.log(new_data.new_members);
        });
});

request.write(jsonData);

request.end();







});

app.post("/failure" , function(req , res) {
    res.redirect("/");
});



app.listen(3000 , function() {
    console.log("Server is running on port 3000");
});



// unique id
//d23601442c

// api key : 5487ff9a5778db96bf00eb3be906577b-us1