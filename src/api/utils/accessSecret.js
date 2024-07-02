// Google Cloud Secret Manager
// Access secret from Secret Manager

const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const accessSecret = async (name) => {
  const client = new SecretManagerServiceClient();
  const [version] = await client.accessSecretVersion({ name });
  const payload = version.payload.data.toString("utf8");
  return JSON.parse(payload);
};

module.exports = accessSecret;
