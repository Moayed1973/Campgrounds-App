const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

// mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    console.log('Open :D')
}



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65e80bb7935a22d02db2f3ee',
            location: `${cities[random1000].city} ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto corporis, possimus quibusdam voluptatem consequuntur dolores aut. Autem aspernatur, ad, delectus architecto in quas eum accusantium mollitia voluptatum, vero a unde',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                 ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmauv1k0m/image/upload/v1713085456/YelpCamp/v78drllvbstgyjvevldl.jpg',
                    filename: 'YelpCamp/v78drllvbstgyjvevldl.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dmauv1k0m/image/upload/v1710067579/YelpCamp/mycd5svzdm4l0gzppzi9.jpg',
                    filename: 'YelpCamp/mycd5svzdm4l0gzppzi9.jpg'
                }
            ],
        })
        await camp.save();
    }
}
seedDB()
    // .then(() => {
    //     mongoose.connection.close()
    //     console.log('DB Closed')
    // })
