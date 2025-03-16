import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
const secret = "topsecret";
const app = express();
const PORT = 6000;
app.use(express.json());
app.use(cors())
 const authenticate = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("No valid token provided");
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = await jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
};

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (username == "faisal" && password == "123") {
        const token = await jwt.sign({ username }, secret, { expiresIn: "1h" }); // Added token expiry
        res.status(200).json({ token });
    } else {
        res.status(401).json( {message: "failed"});
    }
});  

app.get("/verify" , authenticate , (req , res)=>{
    res.json({message: "Token is vaild" , user: req.user})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

