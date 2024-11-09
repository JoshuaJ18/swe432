const express = require('express');
const app = express();

app.use(express.static(__dirname));

// Listen on port 8080 on localhost
const PORT = 8080;

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
