import { useState, useEffect } from 'react';
import { client, fetchCmsData } from './sanity/client';

const DEFAULT_CONTENT = {
  phone: '+7 (812) 425-69-83',
  email: 'info@спецзабор.рф',
  heroTitle: 'Заборы под ключ\nс реальной гарантией\nпо договору',
  heroSubtitle: 'Инженерный замер с учётом грунта. ГОСТовая сварка. Фото- и видеофиксация скрытых работ. Точная смета до старта работ — без сюрпризов.',
  aboutTitle: 'О компании СпецЗабор',
  aboutText: 'Мы команда профессионалов с 12-летним опытом...',
  footerText: 'Профессиональное строительство заборов в Санкт-Петербурге и ЛО.',
  basePrice: 1500,
  telegramUrl: 'https://t.me/speczabor',
  maxUrl: 'https://max.ru/+79216413388',
  products: [] as any[], // Dynamic products from Sanity
};

export const useCMS = () => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCmsData();
        if (data) {
          setContent(prev => ({
            ...prev,
            phone: data.settings?.phone || prev.phone,
            email: data.settings?.email || prev.email,
            heroTitle: data.settings?.heroTitle || prev.heroTitle,
            heroSubtitle: data.settings?.heroSubtitle || prev.heroSubtitle,
            aboutTitle: data.settings?.aboutTitle || prev.aboutTitle,
            aboutText: data.settings?.aboutText || prev.aboutText,
            footerText: data.settings?.footerText || prev.footerText,
            telegramUrl: data.settings?.telegramUrl || prev.telegramUrl,
            maxUrl: data.settings?.maxUrl || prev.maxUrl,
            products: data.products || [],
          }));
        }
      } catch (e) {
        console.warn('Sanity fetch failed', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getProductContent = (slug: string) => {
    return content.products.find(p => p.slug?.current === slug) || null;
  };

  return { content, getProductContent, loading };
};
