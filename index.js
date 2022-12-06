const http = require("http");
const path = require("path");
const fs = require("fs");
const { MongoClient } = require('mongodb');


const server = http.createServer((req, res) => {
    
    /*

        

        we can Navigate to different pages via different requests. 
        if / then goto index.html
        if /about about then goto about.html
        if /api then laod the JSON file  /  ;) this might be something you need for your exam. 



    */
        if(req.url === "/"){
            fs.readFile("./public/index.html", "UTF-8", function(err, html){
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(html);
            });
        }else if(req.url.match("\.css$")){
            var cssPath = path.join(__dirname, 'public', req.url);
            var fileStream = fs.createReadStream(cssPath, "UTF-8");
            res.writeHead(200, {"Content-Type": "text/css"});
            fileStream.pipe(res);
    
        }else if(req.url.match("\.png$")){
            var imagePath = path.join(__dirname, 'public', req.url);
            var fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, {"Content-Type": "images/png"});
            fileStream.pipe(res);
        }
        else if(req.url.match("\.jpg$")){
            var imagePath = path.join(__dirname, 'public', req.url);
            var fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, {"Content-Type": "images/jpg"});
            fileStream.pipe(res);
        }
    else if (req.url === '/about') {


        // read the about.html file public folder
        fs.readFile(
            path.join(__dirname, 'public', 'about.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }
    else if (req.url==='/api')
    {
     
        retrieve();
        async function retrieve() {
        const uri = "mongodb+srv://rohith:rohith98@cluster0.kwhh6ne.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            console.log("connection happened successfully")
    
            // Make the appropriate DB calls
    
            // Find the listing named "Infinite Views" that we created in create.js
            const result = await client.db("restaurant_data").collection("items_data").find({}).toArray();

            const res_json = JSON.stringify(result);
            console.log(res_json);
       //   console.log(res_json);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(res_json);
        }
        finally{

        }
    }
    retrieve().catch(console.error);    
    }
    else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("No Page Found");
    }

    /*

        But what if we have  1000 pages/urls ? do we need to write 1000 if-else statements?

    /*/
});

const PORT= process.env.PORT || 1580;

server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));