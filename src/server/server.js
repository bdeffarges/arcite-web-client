import express from 'express';
import path from 'path';
// import proxy from 'express-http-proxy';
import proxy from 'http-proxy-middleware';

const app = express();

const apiServer = process.env.API_SERVER || 'http://arcite-api-test.idorsia.com';
const apiPort = process.env.API_PORT || '80';

app.use(
  '/api',
  proxy({
    target: `${apiServer}:${apiPort}`,
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1/download': '/',     // rewrite path for downloads of artifacts
    },
  }),
);

app.use(express.static(
  path.join(__dirname, '/public')
)
);


app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
  .listen(3000);
