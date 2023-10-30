import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  try {
    var auth = req.header("Authorization");
    if (!auth) {
      res.status(403).json({ message: "Access Denied" });
    }
    const token = auth.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
