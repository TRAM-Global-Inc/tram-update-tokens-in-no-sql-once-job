import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getEnvironmentVariable } from '@tram/tram-common-utils';
dotenv.config();

function getLocalAdminCredentials(): object {
  return {
    type: getEnvironmentVariable('FB_ADMIN_TYPE'),
    projectId: getEnvironmentVariable('FB_ADMIN_PROJECT_ID'),
    privateKeyId: getEnvironmentVariable('FB_ADMIN_PRIVATE_KEY_ID'),
    privateKey: getEnvironmentVariable('FB_ADMIN_PRIVATE_KEY').replace(
      /\\n/gm,
      '\n'
    ),
    clientEmail: getEnvironmentVariable('FB_ADMIN_CLIENT_EMAIL'),
    clientId: getEnvironmentVariable('FB_ADMIN_CLIENT_ID'),
    authUri: getEnvironmentVariable('FB_ADMIN_AUTH_URI'),
    tokenUri: getEnvironmentVariable('FB_ADMIN_TOKEN_URI'),
    authProviderX509CertUrl: getEnvironmentVariable(
      'FB_ADMIN_AUTH_PROVIDER_X509_CERT_URL'
    ),
    clientC509CertUrl: getEnvironmentVariable('FB_ADMIN_CLIENT_X509_CERT_URL'),
  };
}

const app = admin.initializeApp(
  {
    credential:
      process.env.ENVIRONMENT === 'LOCAL'
        ? admin.credential.cert(getLocalAdminCredentials())
        : admin.credential.applicationDefault(),
  },
  getEnvironmentVariable('APP_NAME')
);

const db = getFirestore(app);

export default db;
