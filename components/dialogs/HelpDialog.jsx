import { useState, useEffect } from 'react';
import { HelpCircle, Check } from 'lucide-react';
import { translations } from '../translations.js';
import { getSEName } from '../matrixData.js';
 
//czy okno ma być widoczne, funkcja zamykająca okno, wybrany język 
export default function HelpDialog({ isOpen, onClose, language }) {
  const t = (key) => translations[language][key] || key;
  
  const [activeSection, setActiveSection] = useState('intro'); //aktywna sekcja samouczka 

  //zamyka okno po wciśnięciu esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    //funkcja wywolana przy nacisnieciu dowolnego klawisza
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    //przy zmianie sekcji, widok przesuwany jest w górę
    const mainContent = document.querySelector('.help-main');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  //struktura sekcji
  const sections = {
    //wprowadzenie, opis warstw matrycy, jak używać
    intro: {
      title: t('helpIntroTitle'),
      content: (
        <div>
          <h4 style={{ fontWeight: 'bold' }}>{t('helpIntroHeading')}</h4>
          <p>{t('helpIntroDesc')}</p>
          <ul>
            <li>Warstwa I: {t('helpIntroL1')}</li>
            <li>Warstwa II: {t('helpIntroL2')}</li>
            <li>Warstwa III: {t('helpIntroL3')}</li>
          </ul>
          <h4 style={{ fontWeight: 'bold' }}>{t('helpHowToUse')}</h4>
          <ol>
            <li>{t('helpStep1')}</li>
            <li>{t('helpStep2')}</li>
            <li>{t('helpStep3')}</li>
            <li>{t('helpStep4')}</li>
            <li>{t('helpStep5')}</li>
          </ol>
          <p>{t('note')}: {t('helpNote')}</p>
        </div>
      )
    },
    //opis Elementów nadrzędnych (PE) i elementów podrzędnych (SE) w każdej warstwie
    l1: {
      title: t('helpL1Title'),
      content: (
        <div>
          <p>{t('helpL1Desc')}</p>
          
          <div className="help-pe-section">
            <h4>{t('helpL1PE001')}</h4>
            <p>{t('helpL1PE001Desc')}</p>
            <div className="help-se-list">
              {['001.1', '001.2', '001.3', '001.4', '001.5', '001.6'].map(id => (
                <div key={id} className="help-se-item">
                  <strong>{id} - {getSEName(id, language)}</strong>
                  <p>{t(`helpSE${id.replace('.', '_')}`)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="help-pe-section">
            <h4>{t('helpL1PE002')}</h4>
            <p>{t('helpL1PE002Desc')}</p>
            <div className="help-se-list">
              {['002.1', '002.2', '002.3', '002.4'].map(id => (
                <div key={id} className="help-se-item">
                  <strong>{id} - {getSEName(id, language)}</strong>
                  <p>{t(`helpSE${id.replace('.', '_')}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    l2: {
      title: t('helpL2Title'),
      content: (
        <div>
          <p>{t('helpL2Desc')}</p>
          
          <div className="help-pe-section">
            <h4>{t('helpL2PE003')}</h4>
            <p>{t('helpL2PE003Desc')}</p>
            <div className="help-se-list">
              {['003.1', '003.2', '003.3', '003.4', '003.5', '003.6', '003.7', '003.8', '003.9', '003.10'].map(id => (
                <div key={id} className="help-se-item">
                  <strong>{id} - {getSEName(id, language)}</strong>
                  <p>{t(`helpSE${id.replace('.', '_')}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    l3: {
      title: t('helpL3Title'),
      content: (
        <div>
          <p>{t('helpL3Desc')}</p>
          
          <div className="help-pe-section">
            <h4>{t('helpL3PE004')}</h4>
            <p>{t('helpL3PE004Desc')}</p>
            <div className="help-se-list">
              {['004.1', '004.2', '004.3', '004.4'].map(id => (
                <div key={id} className="help-se-item">
                  <strong>{id} - {getSEName(id, language)}</strong>
                  <p>{t(`helpSE${id.replace('.', '_')}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    //instrukcja użycia funkcji aplikacji
    usage: {
      title: t('helpUsageTitle'),
      content: (
        <div>
          <h4 style={{ fontWeight: 'bold' }}>{t('helpUsageAddComments')}</h4>
          <ol>
            <li>{t('helpUsageAddStep1')}</li>
            <li>{t('helpUsageAddStep2')}</li>
            <li>{t('helpUsageAddStep3')}
              <ul>
                <li>{t('titleLabel')}: {t('helpUsageAddTitle')}</li>
                <li>{t('contentLabel')}: {t('helpUsageAddContent')}</li>
                <li>{t('imageLabel')}: {t('helpUsageAddImage')}</li>
              </ul>
            </li>
            <li>{t('helpUsageAddStep4')}</li>
          </ol>

          <h4 style={{ fontWeight: 'bold' }}>{t('helpUsageEdit')}</h4>
          <ul>
            <li>{t('helpUsageEditStep1')}</li>
            <li>{t('helpUsageEditStep2')}</li>
            <li>{t('helpUsageEditStep3')}</li>
          </ul>

          <h4 style={{ fontWeight: 'bold' }}>{t('helpUsageRating')}</h4>
          <ol>
            <li>{t('helpUsageRatingStep1')}</li>
            <li>{t('helpUsageRatingStep2')}</li>
            <li>{t('helpUsageRatingStep3')}</li>
          </ol>

          <h4 style={{ fontWeight: 'bold' }}>{t('helpUsageRadar')}</h4>
          <ol>
            <li>{t('helpUsageRadarStep1')}</li>
            <li>{t('helpUsageRadarStep2')}</li>
            <li>{t('helpUsageRadarStep3')}</li>
            <li>{t('helpUsageRadarStep4')}</li>
          </ol>

          <h4 style={{ fontWeight: 'bold' }}>{t('helpUsagePDF')}</h4>
          <ol>
            <li>{t('helpUsagePDFStep1')}</li>
            <li>{t('helpUsagePDFStep2')}</li>
            <li>{t('helpUsagePDFStep3')}
              <ul>
                <li>{t('helpUsagePDFItem1')}</li>
                <li>{t('helpUsagePDFItem2')}</li>
                <li>{t('helpUsagePDFItem3')}</li>
                <li>{t('helpUsagePDFItem4')}</li>
              </ul>
            </li>
          </ol>

          <h4 style={{ fontWeight: 'bold' }}>{t('helpUsageJSON')}</h4>
          <p>{t('helpUsageJSONExport')}</p>
          <ol>
            <li>{t('helpUsageJSONExportStep1')}</li>
            <li>{t('helpUsageJSONExportStep2')}</li>
          </ol>
          
          <p>{t('helpUsageJSONImport')}</p>
          <ol>
            <li>{t('helpUsageJSONImportStep1')}</li>
            <li>{t('helpUsageJSONImportStep2')}</li>
            <li>{t('helpUsageJSONImportStep3')}</li>
          </ol>

          <h4 style={{ fontWeight: 'bold' }}>{t('helpUsageClear')}</h4>
          <ul>
            <li>{t('helpUsageClearDesc')}</li>
            <li>{t('helpUsageClearConfirm')}</li>
          </ul>
        </div>
      )
    },
    //wskazówki, najlepsze praktyki, skróty
    tips: {
      title: t('helpTipsTitle'),
      content: (
        <div>
          <h4 style={{ fontWeight: 'bold' }}>{t('helpTipsAnalysis')}</h4>
          <ul>
            <li>Warstwa I: {t('helpTipsAnalysisL1')}</li>
            <li>Warstwa II: {t('helpTipsAnalysisL2')}</li>
            <li>Warstwa III: {t('helpTipsAnalysisL3')}</li>
          </ul>

          <h4 style={{ fontWeight: 'bold' }}>{t('helpTipsComments')}</h4>
          <ul>
            <li>{t('titleLabel')}: {t('helpTipsCommentsTitle')}</li>
            <li>{t('contentLabel')}: {t('helpTipsCommentsContent')}</li>
            <li>{t('helpTipsCommentsCite')}</li>
            <li>{t('helpTipsCommentsDate')}</li>
          </ul>

          <h4 style={{ fontWeight: 'bold' }}>{t('helpTipsOrganization')}</h4>
          <ul>
            <li>{t('helpTipsOrgBackup')}</li>
            <li>{t('helpTipsOrgNaming')}</li>
            <li>{t('helpTipsOrgPDF')}</li>
            <li>{t('helpTipsOrgFiles')}</li>
          </ul>

          <h4 style={{ fontWeight: 'bold' }}>{t('helpTipsBestPractices')}</h4>
          <ul>
            <li>{t('objectivity')}: {t('helpTipsBPObjectivity')}</li>
            <li>{t('verification')}: {t('helpTipsBPVerification')}</li>
            <li>{t('documentation')}: {t('helpTipsBPDocumentation')}</li>
            <li>{t('regularity')}: {t('helpTipsBPRegularity')}</li>
          </ul>

          <h4 style={{ fontWeight: 'bold' }}>{t('helpTipsShortcuts')}</h4>
          <ul>
            <li>ESC: {t('helpTipsShortcutsESC')}</li>
            <li>{t('click')}: {t('helpTipsShortcutsClick')}</li>
          </ul>
        </div>
      )
    }
  };

  //widok samouczka
  return (
    <div className="dialog-backdrop help-backdrop" onClick={handleBackdropClick}>
      <div className="dialog help-dialog">
        <div className="dialog-header">
          <h3><HelpCircle size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />{t('helpTitle')}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="help-content">
          <div className="help-sidebar">
            <nav className="help-nav">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  className={`help-nav-btn ${activeSection === key ? 'active' : ''}`}
                  onClick={() => handleSectionChange(key)}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          <div className="help-main">
            <div className="help-section-content">
              <h3>{sections[activeSection].title}</h3>
              {sections[activeSection].content}
            </div>
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            <Check size={16} style={{ marginRight: '5px' }} /> {t('helpClose')}
          </button>
        </div>
      </div>
    </div>
  );
}
