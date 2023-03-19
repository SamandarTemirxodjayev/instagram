const jwt = require("jsonwebtoken");

function UserMiddleware(req, res, next) {
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, 'secret');
    req.userId = decoded.data;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Not Authorized!", message: error.message });
  }
}

module.exports = UserMiddleware;
