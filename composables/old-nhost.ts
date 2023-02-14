import { NhostClient } from "@nhost/nhost-js";
const myNhostClient = new NhostClient({
  subdomain: "rzcywmsyykhpunfkygpk",
  region: "eu-central-1",
});
export const nhost = myNhostClient;
