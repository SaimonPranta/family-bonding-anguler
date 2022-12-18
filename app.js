//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/angular-ui/browser'));

/**
 * MAIN BASE GET PATH
 */

/**
 * MAIN BASE GET PATH
 */

app.get('/callback/**', (req, res) => {
  res.send('<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center"><h1 style="color: blueviolet">API RUNNING...</h1><p style="color: lightcoral">Powered by SOFTLAB IT TEAM</p></div>')
})

app.post('/callback/payment/cancel', (req, res) => {

  res.redirect(301, 'https://ekrate.softlabit.com/merchant/payment/cancel')
  // console.log(req.body);
  // res.status(200).json({
  //   data: req.body,
  //   message: 'Data Retrieved Successfully!'
  // });

})

app.post('/callback/payment/success', (req, res) => {

  res.redirect(301, 'https://ekrate.softlabit.com/merchant/payment/success')
  // console.log(req.body);
  // res.status(200).json({
  //   data: req.body,
  //   message: 'Data Retrieved Successfully!'
  // });

})

app.post('/callback/payment/fail', (req, res) => {

  res.redirect(301, 'https://ekrate.softlabit.com/merchant/payment/fail')
  // console.log(req.body);
  // res.status(200).json({
  //   data: req.body,
  //   message: 'Data Retrieved Successfully!'
  // });

})


app.get('*', function (req, res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  res.sendFile(path.join(__dirname + '/dist/angular-ui/browser/index.html'));
});


// For Main Server..
const port = process.env.PORT || 10042;
app.listen(port, () => console.log(`Server is running at port:${port}`));
