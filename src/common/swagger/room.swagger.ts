import { ApiConsumes, ApiBody } from '@nestjs/swagger';

export const ApiRoomUpload = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiConsumes('multipart/form-data')(target, propertyKey, descriptor);
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          ten_phong: { type: 'string', example: 'Phòng Deluxe' },
          mo_ta: { type: 'string', example: 'Phòng có view đẹp' },
          gia_tien: { type: 'number', example: 500000 },
          location_id: { type: 'number', example: 3 },
          host_id: { type: 'number', example: 1 },

          khach: { type: 'number', example: 2 },
          phong_ngu: { type: 'number', example: 1 },
          giuong: { type: 'number', example: 2 },
          phong_tam: { type: 'number', example: 1 },
          may_giat: { type: 'boolean', example: true },
          ban_la: { type: 'boolean', example: true },
          tivi: { type: 'boolean', example: true },
          dieu_hoa: { type: 'boolean', example: true },
          wifi: { type: 'boolean', example: true },
          bep: { type: 'boolean', example: true },
          do_xe: { type: 'boolean', example: true },
          ho_boi: { type: 'boolean', example: false },
          ban_ui: { type: 'boolean', example: false },

          hinh_anh: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
            description: 'Upload up to 3 room images',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
};
