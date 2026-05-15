import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { siteSettings, product, review } from './src/lib/sanity/schema';

export default defineConfig({
  name: 'default',
  title: 'СпецЗабор Admin',

  projectId: 'gryay0m8',
  dataset: 'production',
  basePath: '/studio',

  plugins: [deskTool()],

  schema: {
    types: [siteSettings, product, review],
  },
});
