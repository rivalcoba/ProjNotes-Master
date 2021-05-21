// URL /
const index = (req, res) => {
  res.render('home/index', {});
};

// URL /about
const about = (req, res) => {
  res.render('home/about', { appVersion: '0.0.1' });
};

export default {
  index,
  about,
};
