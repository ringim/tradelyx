const {initializeApp, cert} = require('firebase-admin/app');
const admin = require('firebase-admin');

const serviceAccount = {
  type: 'service_account',
  project_id: 'tradely-8c83f',
  private_key_id: 'd18b94efbdd42558ff6718032f50a64cd01a9642',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDIcfla8A8Hmbv9\nlsBisEcNDDWLRg9jnaD0S0glkUNqtEHcSdHpP8aHhaLsMZekCmgKwbRISOaTA8M2\nyzSvVwiCtFmPKpIhRYQmImRTkINyFAYzCZvIMMm4mAc1TntRDiosW9pJ4jINB9cN\nMDnpg6sz1k29MZ2vU3r056zUO71CB+uJPHSd6hCqIoNufHUm9FC6/bLAeX3HxU5X\nv9zlCI8z94/O47oAXC/D3markhH+1XKLkg1XjCtZVEvLjU9hKavBBee4On3NFOel\nG5wTcXccjUDon2GsZLafB/3NmT34kkIehHJIX73k4RzFWbAjSaEOnZYHU4aJyKfM\npqR+o5G7AgMBAAECggEAA62bu5OpViSRcr85obxfjjMjWssa7Mmisqwck2iz/P94\nlrgM3KPcwVxH0UYjsZ3pqz2pg9ena4E0XtgIJanwlqPQ+01dR+dq2/kVMDdedVE9\n8xSbdQDE/HJfVEoWMM/6uolA9MqF/2YECAW5ILpxNM7oHeJzZOYHEC43WXmmXATM\naqWDG5TWvJFly8II6a7DqRv4DCr9El1u3c9aePlCvjNpNTecc6P28BMD33m3114i\n5nH7ksYUOOcK9y0cfZIb0mWodjLaVG0mGJYBc463Ev3k9qQjlRI10YgPWAFyChDN\n2Exa0EOmQX6RlF9R6eCudbjKg9/eZDs4iidD+EMEMQKBgQD+mULCiR6aSfCP+MXP\nPhjnncXftNPFAtktMgYjaOdHr7Ry2FzSpC1oVi+U6R6fn9rEARXBsdQPmzwuiVM8\nR0Eyhlcj6u6K/riBCHXKt9m5Wr5D0XiwIspj+n4WJ6ZAMfTazS9jpjShkHef6NQN\na4dygf3EaeLCtlybPOxzj6XlcwKBgQDJjGiyZuO/TebxTEgx6W/LZx74WqhlP4Ow\nD39WYxxF+IrvMIJgTZODxPhxGKqDYevvxNZhB2qUyRtrrT4a3/boaT35AgWheNrS\nIE8LDdD/QZ+nyPZzodRKRJoRL9mbfYxD375nsfM6OptTno4W8kylq/2lHFu4GLsH\n4jxFubDQmQKBgBdm7wQCppV4Bmy1aTlLc+6WSgHuFSkeweetmXLXyaqFNAj6ak3S\nWXolsen2I6J4hxtNHjrXpa5pjnaYmNYJlqyWPJxIk/SixULXDDy9+X1YIfUJ5BYM\nnJ3kAIL40gdEkEUsZxa5yEyxgs1oEVXKdIDKAhFzyiwrpwd96h4VLiKRAoGBALNC\nJ6hs7Kksr3f0Ac4qslz1tczsTRPoPsbrsbTy56WwHloJChx/QvGS0ek9KAM8p60U\npBuejgQRLktBxZf/lMo3OIBtdPad1/nF9Kd/PWCaTFbd3Z0Q1RDNHT6mEWRDcOq5\naM8vrYYftCDWR8hO7y723tzocQc3L7oeVL8rHgEZAoGAE8gTnJuWcmgO8jbsMwyr\n1ju1ndFKOGcNseyS0thuiiN2BW2aFypIzGgcw8Mrl8gKLPv7ZzDZm9kLeyaBH4pV\nm+7KFR4+xhvWvXzQenjA59nhMLqlpMYwjrKuTg2y29REiqR+Dv8F08Nk4I5LJ+GC\nlg1cenzUxjfn9qmooKig0ZM=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-k2zgm@tradely-8c83f.iam.gserviceaccount.com',
  client_id: '109733185655274234982',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k2zgm%40tradely-8c83f.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

initializeApp({
  credential: cert(serviceAccount),
});

const sendMulticastNotification = async (notification, data, fcmToken) => {
  const message = {
    tokens: fcmToken,
    notification,
    data
  };
  await admin
    .messaging()
    .sendEachForMulticast(message)
    .then(response => {
      // console.log('Successfully sent message to everyone:', response);
    })
    .catch(error => {
      // console.log('Error sending message:', error);
    });
};

module.exports = {
  sendMulticastNotification,
};
