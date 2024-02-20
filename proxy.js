import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  target: 'https://secure.3gdirectpay.com',
  changeOrigin: true,
});

export default function (req, res, next) {
  return proxy(req, res, next);
}