import B2 from 'backblaze-b2';

const b2 = new B2({
  applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY
});

export const getSignedUrl = async (fileName) => {
  try {
    await b2.authorize();

    const response = await b2.getDownloadAuthorization({
      bucketId: process.env.B2_BUCKET_ID,
      fileNamePrefix: fileName,
      validDurationInSeconds: 3600 // 1 hour
    });

    const token = response.data.authorizationToken;
    return `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}?Authorization=${token}`;
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return null;
  }
};
