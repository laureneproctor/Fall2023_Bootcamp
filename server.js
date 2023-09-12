var http = require('http'), 
    fs = require('fs'),
    port = 8080;

/* Global variables */
var listingData, server, myURL;

var requestHandler = function(request, response) {
  // http.get('http://127.0.0.1:8080/listings', (res) => 
  // {
  //   const jsonContent = JSON.stringify(listingData);
  //   response.write(jsonContent);

  //   let error;
  //   if (statusCode !== 200) {
  //     error = new Error('404 - bad gateway error');
  //   return;
  //   }
  // });
  const jsonContent = JSON.stringify(listingData);
  response.write(jsonContent);

  let error;
  if (request.statusCode !== 200) {
    error = new Error('404 - bad gateway error');
  return;
  }
  
};


fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 

    HINT: Check out this resource on fs.readFile
    //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

    HINT: Read up on JSON parsing Node.js
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

  //Check for errors
  if (err) {
    console.log("404 not found", err);
    return;
  }
    
    /*this resource gives you an idea of the general format err objects and Throwing an existing object.
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw#throwing_an_existing_object
   */
  

   //Save the data in the listingData variable already defined
   listingData = JSON.parse(data);

  //Creates the server
  server = http.createServer(requestHandler);
  //http.get('http://127.0.0.1:8080/listings', http.createServer(requestHandler));

  //Start the server
  server.listen(port, function() {
    //once the server is listening, this callback function is executed
    console.log('Server listening on: http://127.0.0.1:' + port + '/listings');
  });

});
