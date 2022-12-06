const {MongoClient} = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = "mongodb+srv://rohith:rohith98@cluster0.kwhh6ne.mongodb.net/?retryWrites=true&w=majority";
   
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // Create a single new listing
        
  
        // Create 3 new listings
        await createMultipleListings(client, [
            {
                "id":1,
                "item_name": "Chicken Biryani",
                "price": 19,
                "taste": "Spicy",
                "time_to_cook":15,
                "is_it_special": false
              
              },
              {
                "id":2,
                "item_name": "Paneer Biryani",
                "price": 13,
                "taste": "Mild",
                "time_to_cook":10,
                "is_it_special": false
              },
              {
                "id":3,
                "item_name": "Gulab Jamun",
                "price": 8,
                "taste": "Sweet",
                "time_to_cook":7,
                "is_it_special": false
              },
              {
                "id":4,
                "item_name": "Paper dosa",
                "price": 25,
                "taste": "Mild",
                "time_to_cook":3,
                "is_it_special": true
              },
              {
                "id":5,
                "item_name": "Gongura Mutton",
                "price": 28,
                "taste": "Spicy",
                "time_to_cook":20,
                "is_it_special": true
              }
        ]);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);




/**
 * Create multiple Airbnb listings
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Object[]} newListings The new listings to be added
 */
async function createMultipleListings(client, newListings){
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany for the insertMany() docs
    const result = await client.db("restaurant_data").collection("items_data").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}