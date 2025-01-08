const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// const authenticateHealthOrg = (req, res, next) => {
//   const token = req.cookies.healthOrgToken;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized: No token provided' });
//   }

//   jwt.verify(token, 'your-secret-key', (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ error: 'Forbidden: Invalid token' });
//     }
//     req.healthOrg = decoded; 
//     next();
//   });
// };


const authenticateHealthOrg = (req, res, next) => {
  const token = req.cookies.healthOrgToken; 
  if (!token) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    console.log(decoded)
    const healthOrgId = decoded.id;

    if (!healthOrgId) {
      return res.status(400).json({ error: 'Invalid token payload' });
    }

    req.healthOrgId = healthOrgId; 
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  } 
}

const doctorAuthMiddleware = (req, res, next) => {
  const token = req.cookies.doctorToken 
  if (!token) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    const doctorId = decoded.id;

    if (!doctorId) {
      return res.status(400).json({ error: 'Invalid token payload' });
    }

    req.doctorId = doctorId; 
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};



module.exports = {authMiddleware, authenticateHealthOrg, doctorAuthMiddleware};