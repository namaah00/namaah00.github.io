import { useState, useEffect } from 'react';
import { translations } from './translations.js';
import { getSEName } from './matrixData.js';

export default function HelpDialog({ isOpen, onClose, language }) {
  const t = (key) => translations[language][key] || key;
  
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    // Scroll to top when changing sections
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

  const sections = {
    intro: {
      title: t('helpIntroTitle'),
      content: (
        <div>
          <h4>{t('helpIntroHeading')}</h4>
          <p>{t('helpIntroDesc')}</p>
          <ul>
            <li><strong>L1:</strong> {t('helpIntroL1')}</li>
            <li><strong>L2:</strong> {t('helpIntroL2')}</li>
            <li><strong>L3:</strong> {t('helpIntroL3')}</li>
          </ul>
          <h4>{t('helpHowToUse')}</h4>
          <ol>
            <li>{t('helpStep1')}</li>
            <li>{t('helpStep2')}</li>
            <li>{t('helpStep3')}</li>
            <li>{t('helpStep4')}</li>
            <li>{t('helpStep5')}</li>
          </ol>
          <p><strong>{t('note')}:</strong> {t('helpNote')}</p>
        </div>
      )
    },
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
            <h4>{t('helpL3PE005')}</h4>
            <p>{t('helpL3PE005Desc')}</p>
            <div className="help-se-list">
              {['005.1', '005.2', '005.3', '005.4'].map(id => (
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
    usage: {
      title: t('helpUsageTitle'),
      content: (
        <div>
          <h4>{t('helpUsageAddComments')}</h4>
          <ol>
            <li>{t('helpUsageAddStep1')}</li>
            <li>{t('helpUsageAddStep2')}</li>
            <li>{t('helpUsageAddStep3')}
              <ul>
                <li><strong>{t('titleLabel')}:</strong> {t('helpUsageAddTitle')}</li>
                <li><strong>{t('contentLabel')}:</strong> {t('helpUsageAddContent')}</li>
                <li><strong>{t('imageLabel')}:</strong> {t('helpUsageAddImage')}</li>
              </ul>
            </li>
            <li>{t('helpUsageAddStep4')}</li>
          </ol>
          <p style={{ fontSize: '0.9em', fontStyle: 'italic', color: '#667eea', marginTop: '10px' }}>
            💡 {t('helpUsageImageNote')}
          </p>

          <h4>{t('helpUsageEdit')}</h4>
          <ul>
            <li>{t('helpUsageEditStep1')}</li>
            <li>{t('helpUsageEditStep2')}</li>
            <li>{t('helpUsageEditStep3')}</li>
          </ul>

          <h4>{t('helpUsagePDF')}</h4>
          <ol>
            <li>{t('helpUsagePDFStep1')}</li>
            <li>{t('helpUsagePDFStep2')}</li>
            <li>{t('helpUsagePDFStep3')}
              <ul>
                <li>{t('helpUsagePDFItem1')}</li>
                <li>{t('helpUsagePDFItem2')}</li>
                <li>{t('helpUsagePDFItem3')}</li>
              </ul>
            </li>
          </ol>

          <h4>{t('helpUsageJSON')}</h4>
          <p><strong>{t('helpUsageJSONExport')}</strong></p>
          <ol>
            <li>{t('helpUsageJSONExportStep1')}</li>
            <li>{t('helpUsageJSONExportStep2')}</li>
          </ol>
          
          <p><strong>{t('helpUsageJSONImport')}</strong></p>
          <ol>
            <li>{t('helpUsageJSONImportStep1')}</li>
            <li>{t('helpUsageJSONImportStep2')}</li>
            <li>{t('helpUsageJSONImportStep3')}</li>
          </ol>

          <h4>{t('helpUsageClear')}</h4>
          <ul>
            <li>{t('helpUsageClearDesc')}</li>
            <li>{t('helpUsageClearConfirm')}</li>
          </ul>
        </div>
      )
    },
    tips: {
      title: t('helpTipsTitle'),
      content: (
        <div>
          <h4>{t('helpTipsAnalysis')}</h4>
          <ul>
            <li><strong>L1:</strong> {t('helpTipsAnalysisL1')}</li>
            <li><strong>L2:</strong> {t('helpTipsAnalysisL2')}</li>
            <li><strong>L3:</strong> {t('helpTipsAnalysisL3')}</li>
          </ul>

          <h4>{t('helpTipsComments')}</h4>
          <ul>
            <li><strong>{t('titleLabel')}:</strong> {t('helpTipsCommentsTitle')}</li>
            <li><strong>{t('contentLabel')}:</strong> {t('helpTipsCommentsContent')}</li>
            <li>{t('helpTipsCommentsCite')}</li>
            <li>{t('helpTipsCommentsDate')}</li>
          </ul>

          <h4>{t('helpTipsOrganization')}</h4>
          <ul>
            <li>{t('helpTipsOrgBackup')}</li>
            <li>{t('helpTipsOrgNaming')}</li>
            <li>{t('helpTipsOrgPDF')}</li>
            <li>{t('helpTipsOrgFiles')}</li>
          </ul>

          <h4>{t('helpTipsBestPractices')}</h4>
          <ul>
            <li><strong>{t('objectivity')}:</strong> {t('helpTipsBPObjectivity')}</li>
            <li><strong>{t('verification')}:</strong> {t('helpTipsBPVerification')}</li>
            <li><strong>{t('documentation')}:</strong> {t('helpTipsBPDocumentation')}</li>
            <li><strong>{t('regularity')}:</strong> {t('helpTipsBPRegularity')}</li>
          </ul>

          <h4>{t('helpTipsShortcuts')}</h4>
          <ul>
            <li><strong>ESC:</strong> {t('helpTipsShortcutsESC')}</li>
            <li><strong>{t('click')}:</strong> {t('helpTipsShortcutsClick')}</li>
          </ul>
        </div>
      )
    }
  };

  return (
    <div className="dialog-backdrop help-backdrop" onClick={handleBackdropClick}>
      <div className="dialog help-dialog">
        <div className="dialog-header">
          <h3>❓ {t('helpTitle')}</h3>
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
            ✓ {t('helpClose')}
          </button>
        </div>
      </div>
    </div>
  );
}
