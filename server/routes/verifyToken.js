module.exports = (req, res, next) => {
  const token = req.get('auth-token');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// module.exports = (req, res, next) => {
//   let headers = req.get['auth-token'];
//   if (headers) {
//     const token = headers.split(' ')[1];
//     let decoded = jwt.verify(token, SECRET_TOKEN);
//     if (decoded) {
//       const id = decoded.id;
//       models.User.findOne({
//         where: {
//           id: id
//         }
//       }).then(user => {
//         if (user) {
//           next();
//         } else {
//           res.json({ message: 'error' });
//         }
//       });
//     } else {
//       res.json({ error: 'unauthorized access' });
//     }
//   } else {
//     res.json({ error: 'unauthorized access' });
//   }
// };
