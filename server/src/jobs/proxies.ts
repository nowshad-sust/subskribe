const proxies = [
  "115.249.2.192:8080",
  "201.64.22.51:80",
  "45.64.99.25:8080",
  "1.2.169.101:47477",
  "178.219.37.70:8080",
  "77.94.144.162:3128",
  "185.204.208.78:8080",
];

export const getProxy = () => {
  return proxies[Math.floor(Math.random() * (proxies.length - 1))];
};
