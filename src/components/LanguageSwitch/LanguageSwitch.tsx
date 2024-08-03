import React from 'react';
import { Switch } from 'antd';
import useLanguageStore from '../../store/languageStore';
import './LanguageSwitch.css'; 

const LanguageSwitch: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const handleSwitchChange = (checked: boolean) => {
    setLanguage(checked ? 'en' : 'tr');
  };

  return (
    <div className="language-switcher">
      <Switch
        checked={currentLanguage === 'en'}
        onChange={handleSwitchChange}
        checkedChildren="EN"
        unCheckedChildren="TR"
        style={{ marginLeft: 10 }}
      />
    </div>
  );
};

export default LanguageSwitch;