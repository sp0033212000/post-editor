import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { NextRequest, NextResponse } from "next/server";

import {
  NextAuthInstance,
  validAuthMailDomains,
} from "@src/app/api/auth/[...nextauth]/utils";

export interface S3StorageUploadResponse {
  url: string;
}

export async function POST(req: NextRequest) {
  const auth = await NextAuthInstance.auth();

  if (
    !validAuthMailDomains.some((domain) => auth?.user?.email?.endsWith(domain))
  ) {
    return NextResponse.json({ success: false }, { status: 403 });
  }

  const data = await req.formData();
  const file = data.get("image") as File | null;

  if (!file) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // convert file to buffer
  const fileBufferArray = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileBufferArray);
  const Bucket = `${process.env.AWS_S3_BUCKET_NAME!}`;
  const Key = `from_editor/${file.name}`;

  let stage = "uploading";

  try {
    const client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },

      region: process.env.AWS_S3_REGION!,
    });
    const command = new PutObjectCommand({
      Bucket,
      Key,
      Body: fileBuffer,
    });
    await client.send(command);

    stage = "presigning";
    const { url, fields } = await createPresignedPost(client, {
      Bucket,
      Key,
      Fields: {
        type: "public-read",
      },
    });

    return NextResponse.json<S3StorageUploadResponse>(
      { url: `${url}${fields.key}` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ success: false, stage, error }, { status: 500 });
  }
}
