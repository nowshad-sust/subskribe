const proxies = [
  "115.249.2.192:8080",
  "201.64.22.51:80",
  "45.64.99.25:8080",
  "1.2.169.101:47477",
];

export const getProxy = () => {
  return proxies[Math.floor(Math.random() * (proxies.length - 1))];
};
