import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
    images: {
        remotePatterns: [
         {
           hostname: "wonderlybackendpublic.s3.ap-south-1.amazonaws.com"
         },
       ],
     },
};

export default withNextIntl(nextConfig);
