import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher(){
  const { i18n } = useTranslation();

  const change = (lng: string) => {
    i18n.changeLanguage(lng);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={() => change('en')} className="px-2 py-1 border rounded">EN</button>
      <button onClick={() => change('ar')} className="px-2 py-1 border rounded">AR</button>
    </div>
  );
}
