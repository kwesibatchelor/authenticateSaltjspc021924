const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser= require('body-parser')

app.use(express.json())

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = []
const saltRounds = 10;

app.get('/users', (req, res) => {
    res.json(users)
})

/*
app.post('/users', async (req, res) => {
    console.log(req.body)
    //const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    /*
    //try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    //} catch {
    //    console.log("here")
    //    res.status(500).send()
    //}
    
})
*/
app.post('/users', async (req, res) => {
    // Validate request body
    if (!req.body.name || !req.body.password) {
        return res.status(400).send("Name and password are required");
    }

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log("Salt:", salt);
        console.log("Hashed Password:", hashedPassword);
        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error registering user");
    }
});
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
})