const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.get('/', (req, res) => {
    res.send('Hello To My Server !!!');
})

app.all("*", (req, res) => {
    res.send("No Route Found");
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});