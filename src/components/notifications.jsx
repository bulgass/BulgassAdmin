const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your-serviceAccountKey.json'); // Путь к вашему JSON файлу с ключом Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPaymentReminder = async (token, student) => {
  const message = {
    token: token,
    notification: {
      title: 'Напоминание об оплате',
      body: `Оплата для ${student.name} должна быть произведена до ${student.paymentDueDate}`,
    },
  };

  try {
    await admin.messaging().send(message);
    console.log('Notification sent successfully');
  } catch (error) {
    console.log('Error sending notification:', error);
  }
};

module.exports = { sendPaymentReminder };
