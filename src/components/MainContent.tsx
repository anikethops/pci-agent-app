import { QuickRefSection } from './QuickRefSection';

type MainContentProps = {
  activeSection: string;
  searchValue: string;
  onNavigate: (section: string) => void;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  referenceHtml: string;
};

export function MainContent({ activeSection, searchValue, onNavigate, iframeRef, referenceHtml }: MainContentProps) {
  return (
    <div className="bridge-work-area">
      <div className="bridge-content-stage">
        {activeSection === 'quickref' ? (
          <QuickRefSection searchValue={searchValue} onNavigate={onNavigate} />
        ) : (
          <div className="bridge-iframe-wrap">
            <iframe
              ref={iframeRef}
              title="PCI Helpdesk Reference"
              srcDoc={referenceHtml}
              className="bridge-iframe"
            />
          </div>
        )}
      </div>
    </div>
  );
}
