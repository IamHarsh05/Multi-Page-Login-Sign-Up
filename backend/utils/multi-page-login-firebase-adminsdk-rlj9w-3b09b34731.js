require("dotenv").config();

module.exports = {
  type: process.env.ServiceAccount_type,
  project_id: process.env.ServiceAccount_project_id,
  private_key_id: process.env.ServiceAccount_private_key_id,
  private_key: process.env.ServiceAccount_private_key,
  client_email: process.env.ServiceAccount_client_email,
  client_id: process.env.ServiceAccount_client_id,
  auth_uri: process.env.ServiceAccount_auth_uri,
  token_uri: process.env.ServiceAccount_token_uri,
  auth_provider_x509_cert_url:
    process.env.ServiceAccount_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.ServiceAccount_client_x509_cert_url,
  universe_domain: process.env.ServiceAccount_universe_domain,
};
