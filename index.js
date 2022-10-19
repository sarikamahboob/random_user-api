const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
// app.use("/user/save", userRouter);
// app.use("/user/all", allUserRouter);
// app.use("/user/update", allUserRouter);
// app.use("/user/bulk-update", userRouter);
// app.use("/user/delete", allUserRouter);

app.get('/', (req, res) => {
    res.send('Hello To My Server !!!');
})

app.all("*", (req, res) => {
    res.send("No Route Found");
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});