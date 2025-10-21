const B2 = require('backblaze-b2');

const b2 = new B2({
  applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

async function authorizeB2() {
  await b2.authorize();
}

async function uploadToB2(fileName, fileBuffer, contentType = 'image/jpeg') {
  await authorizeB2();

  const { data: uploadData } = await b2.getUploadUrl({ 
    bucketId: process.env.B2_BUCKET_ID 
  });

  const { data } = await b2.uploadFile({
    uploadUrl: uploadData.uploadUrl,
    uploadAuthToken: uploadData.authorizationToken,
    fileName,
    data: fileBuffer,
    contentType,
  });

  const fileUrl = `https://f000.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${data.fileName}`;
  return fileUrl;
}

module.exports = { uploadToB2 };