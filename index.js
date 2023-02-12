const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/get-response', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await generate(prompt);

    res.send({ response });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

async function generate(prompt) {
    const data = await openai.createCompletion({
        prompt: "answer this with lots of details and words and be very specific" + prompt,
        model: "text-davinci-003",
        max_tokens: 3851,
        top_p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0,
        best_of: 1,
        temperature: 0.9
    });
    return data.data.choices[0].text;
}
