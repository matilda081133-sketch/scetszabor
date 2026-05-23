import { createClient } from '@sanity/client';

const c = createClient({
  projectId: 'gryay0m8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-02',
});

try {
  const r = await c.fetch('*[_type == "siteSettings"][0]{phone}');
  console.log('SANITY OK:', JSON.stringify(r));
  
  const gallery = await c.fetch('*[_type == "heroGallery"][0]');
  console.log('heroGallery:', JSON.stringify(gallery));
} catch(e) {
  console.log('ERR:', e.message);
}
