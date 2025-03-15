import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


async function uploadJsonToS3(): Promise<void> {
  // Initialize the S3 client
  const s3Client = new S3Client({ region: process.env.S3_REGION });
  const bucketName = process.env.S3_BUCKET

}
