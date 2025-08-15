import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '@/src/common/multer/cloudinary/cloudinary.multer';

export const AvatarUploadInterceptor = FileInterceptor('avatar', {
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
