 const express = require('express');
 const dbConnention = require('./common/db-config');
 const bodyParser = require('body-parser');
 const expressjwt = require('express-jwt');
 const multer  = require('multer');
 var path = require("path");

 var publicPath = path.join(__dirname, "public");
 // definise storage za upload slika za proizvode
 var storage = multer.diskStorage({
   destination: (req, file, callback) => {
       callback(null, publicPath);
   }, 
   filename: (req, file, callback) => {
       callback(null, file.originalname);
   } 
 })
 
 multer1 = multer({ storage: storage });

 let app = express();
 app.use(bodyParser.json());

 app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers',  'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

   next();
})

  app.use(express.static("public"));

  const furnitureRouting = require('./routing/furniture-routing');//importujemo furniture-routing.js
  const categoryRouting = require('./routing/category-routing');
  const registerRouting = require('./routing/user-routing');
  const furniture_usersRouting = require('./routing/furniture_users-routing');
  
  let auth = expressjwt({
   secret: 'SECRET', 
   userProperty: 'body.userData', 
   algorithms: ['HS256']
});
  
  app.use(furnitureRouting);
  app.use(categoryRouting);
  app.use(registerRouting);
  app.use(furniture_usersRouting);


 app.listen(3000, ()=>{
     console.log('Server is listening on port 3000');
 })

 // post ruta za upload fajlova
 app.post('/upload', multer1.single('img'), function(req, res, next){
   if (!req.file) {
     res.send({
         status: -1, 
         message: "No File Uploaded"
     });
 }
 else {
     res.send({
         status: 0, 
         message: "File uploaded!", 
         filename: req.file.filename
     })
 }
 })

 dbConnention.authenticate()
     .then(data=> {
        console.log('Konekcija na bazu je  uspjesna ');
     })
     .catch(error=>{
        console.log('Konekcija nije uspjela');
     })