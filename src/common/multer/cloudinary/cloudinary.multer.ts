import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '@/src/common/cloudinary/init.cloudinary';

export function createCloudinaryMultiInterceptor(
  fieldName: string,
  folder: string,
  maxCount: number,
) {
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

  return FilesInterceptor(fieldName, maxCount, {
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB mỗi ảnh
  });
}

export const AvatarUploadInterceptor = createCloudinaryMultiInterceptor(
  'avatar',
  'user-avatars',
  1,
);

export const LocationUploadInterceptor = createCloudinaryMultiInterceptor(
  'image',
  'locations',
  1,
);

export const RoomUploadInterceptor = createCloudinaryMultiInterceptor(
  'hinh_anh',
  'rooms',
  3,
);
