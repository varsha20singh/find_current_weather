const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
    
})

app.post("/", function(req, res){
    querry=req.body.cityName
    appid="b0d9d3c2a9bfb95261e50e948a9c8250"
    unit="metric"
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&appid="+appid+"&units="+unit
    https.get(url,function(response){
        console.log(response.statusCode)
        
        response.on("data", function(data){
            const whdata = JSON.parse(data)
            const temp = whdata.main.temp
            console.log(temp)
            const description = whdata.weather[0].description
            console.log(description)
            const icon = whdata.weather[0].icon
            const imgUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently "+description+".</p>")
            res.write("<h1>The temperature in "+querry+" is "+temp+" degree celcius.</h1>")
            res.write("<img src="+imgUrl+">")
            res.send()
        })

    })
})




// app.listen(3000, function(){
//     console.log("server is running on port 3000");
// })


app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})