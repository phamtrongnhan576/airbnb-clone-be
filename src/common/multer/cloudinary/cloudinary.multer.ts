import { cloudinary } from '@/src/common/cloudinary/init.cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { FileInterceptor } from '@nestjs/platform-express';

export function createCloudinaryInterceptor(fieldName: string, folder: string) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [
        {
          width: 800,
          height: 600,
          crop: 'fill',
          quality: 'auto:best',
        },
      ],
    } as any,
  });

  return FileInterceptor(fieldName, {
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
}
export const AvatarUploadInterceptor = createCloudinaryInterceptor(
  'avatar',
  'user-avatars',
);

export const LocationUploadInterceptor = createCloudinaryInterceptor(
  'image',
  'locations',
);
