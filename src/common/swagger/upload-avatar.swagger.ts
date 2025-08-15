// src/common/swagger/avatar-upload.swagger.ts
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

export const ApiAvatarUpload = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiConsumes('multipart/form-data')(target, propertyKey, descriptor);
    ApiBody({
      schema: {
        type: 'object',
        required: ['email', 'password', 'role'],
        properties: {
          avatar: { type: 'string', format: 'binary' },
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          role: { type: 'string', enum: ['user', 'admin'], default: 'user' },
          phone: { type: 'string' },
          birthday: { type: 'string', format: 'date' },
          gender: { type: 'boolean' },
        },
      },
    })(target, propertyKey, descriptor);
  };
};
