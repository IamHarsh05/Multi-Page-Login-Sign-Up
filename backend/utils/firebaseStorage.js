const admin = require("firebase-admin");
const serviceAccount = require("./multi-page-login-firebase-adminsdk-rlj9w-3b09b34731.js");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://multi-page-login.appspot.com", // Replace with your Firebase Storage bucket URL
});

const bucket = admin.storage().bucket();

async function uploadFileToStorage(file) {
  try {
    const response = await bucket.upload(file.path, {
      destination: `profileImages/${file.filename}`, // Customize the destination path as needed
      metadata: {
        contentType: file.mimetype, // Set content type based on file mimetype
      },
    });

    console.log("File uploaded successfully:", response);

    // Get the public URL of the uploaded file
    const [url] = await response[0].getSignedUrl({
      action: "read",
      expires: new Date('9999-12-31'), // URL expires at a distant future date
    });

    return url;
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    throw error;
  }
}

module.exports = { uploadFileToStorage };
