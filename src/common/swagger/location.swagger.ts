import { ApiConsumes, ApiBody } from '@nestjs/swagger';

export const ApiLocationUpload = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiConsumes('multipart/form-data')(target, propertyKey, descriptor);
    ApiBody({
      schema: {
        type: 'object',
        required: ['name', 'province'],
        properties: {
          image: { type: 'string', format: 'binary' },
          name: { type: 'string', example: 'Hà Nội' },
          province: { type: 'string', example: 'Hà Nội' },
          description: { type: 'string', example: 'Thủ đô ngàn năm văn hiến' },
        },
      },
    })(target, propertyKey, descriptor);
  };
};
