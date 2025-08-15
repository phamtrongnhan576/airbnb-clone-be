import { cloudinary } from '@/src/common/cloudinary/init.cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { FileInterceptor } from '@nestjs/platform-express';
export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user-avatars',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [
      {
        width: 500,
        height: 500,
        crop: 'fill',
        gravity: 'face',
        quality: 'auto:best',
      },
    ],
  } as any,
});

export const AvatarUploadInterceptor = FileInterceptor('avatar', {
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
