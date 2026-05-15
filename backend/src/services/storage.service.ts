import ImageKit from '@imagekit/nodejs';

const imageKitClient = new ImageKit({
    privateKey: process.env.PRIVATE_KEY,
});

export async function uploadImage(file: Buffer, fileName: string) {
    return await imageKitClient.files.upload({
        file: file.toString('base64'),
        fileName: fileName,
    });
}