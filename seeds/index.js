const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '686c8346b19fdf52824119bf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, dolorum totam. Neque, dolorem fugiat exercitationem voluptates, similique dolores minima tempore iusto possimus illo molestias architecto facilis vel! Aspernatur, itaque maxime.',
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
                url: 'https://res.cloudinary.com/donqq9jjy/image/upload/v1752134946/YelpCamp/zwpvnpnvd4ldkrdvawuj.png',
                filename: 'YelpCamp/zwpvnpnvd4ldkrdvawuj',
            },
            {
                url: 'https://res.cloudinary.com/donqq9jjy/image/upload/v1752134948/YelpCamp/tji4wwws56atrdxtroyo.png',
                filename: 'YelpCamp/tji4wwws56atrdxtroyo',
            } ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})