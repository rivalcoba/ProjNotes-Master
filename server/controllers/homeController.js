// URL /
const index = (req, res) => {
  res.render('home/index', { });
};

// URL /about
const about = (req, res) => {
  res.render('home/about',{});
}

export default {
  index,
  about,
};
