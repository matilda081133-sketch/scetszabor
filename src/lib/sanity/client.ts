import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'gryay0m8',
  dataset: 'production',
  useCdn: false, // Set to false for authenticated/fresh requests
  apiVersion: '2024-05-02',
  token: 'skJ71CEaeETGNPJLp6qICsJEsWuSfh2fFmGdnkiPPOpoDgPakYU53Ic7zeShVqmWBjGUAoMYPCt5K3G7LOSg5lZlIF6nGkk2uSVQAdXq7SZDdTRx2kioMqxpNrISjSDUGWbjdFfSMYfyvMGSIJkQMoXJzycDUricOPBowdyuBPDbCzrbZEnN',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Function to fetch all site data at once
export async function fetchCmsData() {
  const query = `{
    "settings": *[_type == "siteSettings"][0],
    "products": *[_type == "product"],
    "reviews": *[_type == "review"],
    "calc": *[_type == "calcSettings"][0]
  }`;
  return await client.fetch(query);
}
