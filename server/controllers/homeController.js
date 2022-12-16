// URL: /
const index = (req, res) => {
  res.render('home/index', {});
};

// URL: /about
const about = (req, res) => {
  res.render('home/about', { appVersion: '0.0.1' });
};

// URL: /test
const test = (_, res) =>
  res.render('user/registrationSuccessful', {
    backgroundColor: 'cyan darken-2',
  });

export default {
  index,
  about,
  test,
};
