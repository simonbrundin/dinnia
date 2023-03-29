import { NhostClient } from "@nhost/nhost-js";
const myNhostClient = new NhostClient({
  authUrl: "http://localhost:4000",
  storageUrl: "localhost:4000",
  graphqlUrl: "localhost:8080",
  functionsUrl: "localhost:4000",
  autoSignIn: true,
  autoRefreshToken: true,
});
export const nhost = myNhostClient;
