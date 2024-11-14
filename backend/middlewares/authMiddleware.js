import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token missing" });

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        console.log(req.user)
        console.log("In middleware")
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
}

export default authMiddleware;


