const jwt = require("jsonwebtoken");

// Middleware function to check if the user is authenticated
function isAuthenticated(req, res, next) {
    const auth = req.get("Authorization");
    if (!auth) {
        return res.status(401).json({ message: "Sin Autorizacion" });
    }
    try {
        const token = auth.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalido o token expirado" });
    }
}

// Middleware function to check if the user is an admin
function isAdmin(req, res, next) {
    if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Access Denied" });
    }
    next();
}

module.exports = { isAuthenticated, isAdmin };