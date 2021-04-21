// URL /
const index = (req, res) => {
  res.render('index', { title: 'Express with babel and HRM' });
};
export default {
  index,
};
