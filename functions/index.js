const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.greetings = functions.https.onRequest((request, response) => {
    response.send("Greetings from Deal Arena!");
});

const createNotification = ((notification) => {
    return admin.firestore().collection('notifications')
      .add(notification)
      .then(doc => console.log('notification added', doc));
});

exports.offerAdded = functions.firestore
  .document('offerDetails/{offerDetailsId}')
  .onCreate(doc => {
    const offer = doc.data();  
    const notification = {
        content: 'A new offer added.',
        offer: `${offer.Brand} ${offer.Category} ${offer.Offer}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);
 });