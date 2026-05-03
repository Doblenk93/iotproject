import type { Core } from '@strapi/strapi';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register( { strapi }: { strapi: Core.Strapi } ) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap( { strapi }: { strapi: Core.Strapi } ) {
    // Hooks untuk Media Library (upload)
    strapi.db.lifecycles.subscribe({
      models: ['plugin::upload.file'],

      async afterCreate(event) {
        const { result } = event;

        // Cek apakah file yang diupload adalah video
        if (result.mime.startsWith('video/')) {
          const videoPath = path.join(process.cwd(), 'public', result.url);
          const thumbnailName = `thumbnail_${result.hash}.jpg`;
          const thumbnailPath = path.join(process.cwd(), 'public/uploads', thumbnailName);

          // Jalankan FFmpeg untuk ambil frame di detik ke-2
          ffmpeg(videoPath)
            .screenshots({
              timestamps: [2],
              filename: thumbnailName,
              folder: path.join(process.cwd(), 'public/uploads'),
              size: '640x?'
            })
            .on('end', () => {
              console.log('Thumbnail berhasil dibuat:', thumbnailName);
              // Di sini Anda bisa mengupdate database jika ingin menyimpan path thumbnail secara permanen
            })
            .on('error', (err) => {
              console.error('FFmpeg Error:', err);
            });
        }
      },
    });
  },
};