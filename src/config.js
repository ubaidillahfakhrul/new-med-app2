// export const API_URL = window.location.hostname === "localhost"
//   ? "http://localhost:8181"
//   : "https://your-production-url.com"; // atau ulangi "http://localhost:8181" saja kalau belum ada hosting

//export const API_URL = "http://localhost:8181";
const isLocal =
  ["localhost", "127.0.0.1"].includes(window.location.hostname) ||
  window.location.hostname.startsWith("192.168."); // jaringan lokal

export const API_URL = isLocal
  ? "http://localhost:8181"
  : "https://your-production-url.com";
