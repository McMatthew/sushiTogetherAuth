var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");


var serviceAccount = require("../sushi-togheter-firebase-adminsdk-vcr5o-e6b54cfefe.json");
serviceAccount.private_key_id=process.env["FB_PKEY_ID"]
serviceAccount.private_key=process.env["FB_PKEY"]

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sushi-togheter-default-rtdb.firebaseio.com"
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/auth', function(req, res) {
  if(req.headers['x-auth-key'] !== process.env["AUTH_KEY"]) return res.status(403).send()
  admin.auth().createCustomToken(process.env["AUTH_UID"]).then((token)=>{
    res.status(200).send(token)
  }).catch((err)=>{
    res.status(500).send(err.message)
  })
});

module.exports = router;
