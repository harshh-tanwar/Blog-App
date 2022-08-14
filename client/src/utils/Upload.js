import S3 from "react-aws-s3";
import config1 from "../config/config";
window.Buffer = window.Buffer || require("buffer").Buffer;

const Upload = async (file, fileName) => {
  const config = {
    bucketName: config1.aws.bucketName,
    region: config1.aws.bucketRegion,
    accessKeyId: config1.aws.accessKeID,
    secretAccessKey: config1.aws.secretAccessKey,
  };
  const ReactS3Client = new S3(config);
  try {
    const data = await ReactS3Client.uploadFile(file, fileName);
    console.log(data);
    return data.location;
  } catch (error) {
    console.log(error);
  }
};

export default Upload;
