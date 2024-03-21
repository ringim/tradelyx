const {initializeApp, cert} = require('firebase-admin/app');
const {getMessaging} = require('firebase-admin/messaging');

// const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT)

const serviceAccount = {
  type: 'service_account',
  project_id: 'tradely-x-5d910',
  private_key_id: 'be6dd43697235a9ddf73c719198c72a1d9209286',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGVLK7GZCP9TT2\n3Ea/FrjrnFYfTI8ozMGquwkPCPW5lzNsW1o9djVlEBgi/KUrWsMwlmYfhTm8uxrN\ngnVQiMNJ096grGQ0WttHbTCTKQSltiGSgaB35kOoiSvfB/cAqMbr7wk8ep7c2OXJ\n/AVKKRblsogFAqqzEuGnOdFiumCPVf42JKtEf4D7p12h+YC6W+/iusoILk0aa+AB\n+F5/fR94zdLVjVfXKpcrz4IpiR0MT+gVM+UQLtMfa6uYfrg1eqipG+CR1ItPIPOP\nx81SzQJ+1AOfsoPSe1zGN1IvEK6oVztoxo89dqhOQxYXKoHZQp0jvPabDy0KS1S/\nDDVyhRiJAgMBAAECggEABJL8gksvJdrSa2UeLpcQEcMLy3IBFUBPsSfaKCIdRLgD\nhBrBRIye46NQ4zGvf4X63XqChXSVpdAs6JN7MC3PTzsXNd5z+y8jQoz2o1Y9WLMQ\nKChcMpe5dMAhJmYxIK9D0zoynNX5Jv/LoPJyjsjO0eJht7fdhv7G/IvdU+kXhAa9\nzS4/Jrj4BtHyef5kMLzM42WIdIli6/3L/61WCNKRWWGnJR0L3+79Peeui/+nrCgL\npntm1J6z9xTMy2UWXk4DZsWNtVX0sUkkBVIJfytO1fTPrCQo+ITN65CRAypYY08Z\n573tjLxg7fZgx505Uw+OOVqCwEqO5l+WgL628djcgQKBgQDpjl6pQ8nEbUtdMafg\n0dG7SEbtb2yQVTBlHIrqFKQSEyxCYGxtX5ZpbxQm2IOFLw09800j+CXSgoqrYvKD\naYsjcQ8qOm/oDTFh+6GafYFo2CABg/dZZmtNS7D//81SEmDaLyOy70USQ0xWQpui\npMY1fUb3PUqxzcyc3phLIml5YQKBgQDZY8OUmJzhxKV1DwoJEG157R4aEMftJU/O\nUH8IgMODdIkAXWJ2n2dEMklLno7r/M+G5jC3GPYEzILaaDVx9PFZODoFiiz+2Ec/\n3XnQDn16cVPJCg99+ZuhU6gufkwo5wHGnlqTXV1BTQzPlTa55VOfpE3W67r24vxp\nEG6MTZmoKQKBgGRUZXO/DBjWfo59O0nHuJoEVXu/5tolzlFRLpeZ4FVnaRbmhw2B\nB4MpVXXOgskeykh3kQbHna/NpjYznkw3da727XXNfq8no7QcvXI5QfNBDJa6EvKT\nnbqprlJ6l8AO5w4zO9mtEXXj9RIFMQhwUjk+JNMmwESbTK+Cq9dy4+5hAoGAeSRg\nNCmLm0CDV6VG2WA/MafSk4Hwd5XIUFeJQwrGaTYCtqJToXkZCebf83TrflSGrU0P\nrqkJSAlTjjRuPA/cgvSTWMz0YBvUMKHSJQA+KoKGx0yE75WuhYth+G7HMC/zTGSo\nYuCvfBlc3zzun09Nd3QPMIpyyOwa7s2KXUNNMmkCgYEA2/ZzmHd86A5at2wsEJZ0\nx8EikPkLDPfkNUAUOvHbQfDlw1NGwrWE2qnWrIwDzfTjO6nZUcZN3+AKE6sKXJm4\nXt9tPytwUoGFOl+8yOn7uF0LFMEX2RAJYNEBCbzN1jTqauqGNQDpgES00xHe2KEF\n5WxVmWXYg+eKL6+4eRPg6fs=\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-xmlf8@tradely-x-5d910.iam.gserviceaccount.com',
  client_id: '117589521639222632976',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xmlf8%40tradely-x-5d910.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

initializeApp({
  credential: cert(serviceAccount),
});

const sendNotification = async (notification, data = {}, fcmToken) => {
  const message = {
    token: fcmToken,
    notification,
    data,
  };
  await getMessaging()
    .send(message)
    .then(response => {
      // console.log('Successfully sent message:', response);
      return response;
    })
    .catch(error => {
      // console.log('Error sending message:', error);
      return error;
    });
};

module.exports = {
  sendNotification,
};
