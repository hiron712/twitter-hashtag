const fs = require("fs");
let Twitter = require('twitter');
require('dotenv').config();

let client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});


const main = async () => {
    const stream = await client.stream('statuses/filter', {'track':'#ダイエット'});
    stream.on('data', async data => {
        try {
            fs.appendFile("tweet/tweet.csv", JSON.stringify(data) + "\n", (err) => {
                if (err) throw err;
                console.log("正常に書き込みが完了しました");
            });

        } catch (error) {
            console.log(error);
        }
    });
};

main();