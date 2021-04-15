// import the file system module from node
const fs = require('fs');

// import the https module from node
const https = require('https');

// create a function to fetch data from jsonplaceholder
const getData = async () => {

    // use the https.get() method to make an api call to jsonplaceholder
    https.get('https://jsonplaceholder.typicode.com/posts', (response) => {

        // create a store to hold all our posts
        let posts = '';

        // capture the data event on the response object and save all the buffer posts data into the posts variable above 
        response.on('data', (data) => {
            posts += data;
        });
        
        // this end event will execute when the data event above is completed
        response.on('end', () => {

            // write the posts in the result directory with file name posts.json
            fs.writeFile('./result/posts.json', posts, (error) => {

                // if an error occurs display it on the console
                if (error) console.log(error);

                // if no error occured then display a success message to the console
                console.log('Posts save successfully!');
            });
        });

    }).on('error', (e) => {
        // if an error occurred while getting the data from jsonplaceholder display it on the console
        console.error(e);
    });
};

// call the getData function
getData();