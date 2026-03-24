import type { CSSProperties } from 'react';

export type SaqReferenceCard = {
  type: string;
  title: string;
  appliesTo: string;
  scan: string;
  storage: string;
  keyNote: string;
  tagStyle?: CSSProperties;
};

export const saqReferenceCards: SaqReferenceCard[] = [
  {
    type: 'SAQ A',
    title: 'Card-Not-Present / Fully Outsourced',
    appliesTo:
      'E-commerce merchants; all cardholder data functions fully outsourced to validated third parties (iFrame, redirect). MOTO merchants with fully outsourced processing.',
    scan: 'Required (domain scan if iFrame/redirect used) · Not required for Pay by Link only',
    storage: 'No electronic storage, processing, or transmission of cardholder data on merchant systems.',
    keyNote:
      "Simplest SAQ. Merchant's website does not receive cardholder data. Pay by Link = no scan; iFrame/redirect = domain scan needed.",
  },
  {
    type: 'SAQ A-EP',
    title: 'E-Commerce — Partially Outsourced (JS / Silent Post)',
    appliesTo:
      'E-commerce merchants whose website hosts or controls payment page elements via JavaScript or Direct Post / Silent Post. Card data goes browser → PSP directly.',
    scan: 'Required — domain/URL scan (ASV). Website is internet-facing and in scope.',
    storage: "No CHD on merchant servers, but the merchant's code can influence the payment page.",
    keyNote:
      "Higher risk than SAQ A. Merchant controls how card data is redirected; the site is never fully hands-off. Silent Post / JS integration = A-EP, not A.",
    tagStyle: { background: '#0070a0', color: '#fff' },
  },
  {
    type: 'SAQ D',
    title: 'High Risk / Composite / Multiple Methods',
    appliesTo:
      'High Risk: merchants storing CHD, taking card details by email/fax, recording calls with card data, using POS batch files with full PAN, using mobile without a POI device, or integrated insecure payment pages. Composite: multiple payment methods under the same MID.',
    scan: 'Required — always for High Risk; depends on setups included for Composite.',
    storage: 'High Risk: merchant systems directly handle card data. Most complex SAQ — no outsourcing.',
    keyNote:
      'ISP must be explained for Composite. SAQ D-SP is not supported by Helpdesk. ROC is a full QSA audit for Level 1 merchants.',
    tagStyle: { background: '#c0272d', color: '#fff' },
  },
  {
    type: 'SAQ B',
    title: 'Imprint / Standalone Terminal (Phone / ISDN)',
    appliesTo:
      'Merchants using imprint machines only, or standalone dial-out terminals connected via phone line or ISDN. Face-to-face and MOTO transactions.',
    scan: 'Not required — terminal is not connected to the internet.',
    storage: 'No electronic cardholder data storage.',
    keyNote: 'Standalone terminal via phone line. Not connected to other systems or the internet.',
  },
  {
    type: 'SAQ B-IP',
    title: 'Standalone IP-Connected Terminal — Two Versions',
    appliesTo:
      'Merchants using standalone PTS-approved terminals connected via IP. The terminal is not connected to other merchant systems. Face-to-face and MOTO.',
    scan: 'Required for internet / Wi‑Fi / broadband. Not required for GPRS / SIM because the terminal bypasses the merchant internet.',
    storage: 'No electronic cardholder data storage.',
    keyNote:
      'Two versions: internet with a public IPv4 scan required, and GPRS/SIM with no scan. PCI SSC PTS-approved device required for both.',
  },
  {
    type: 'SAQ C',
    title: 'Mobile / Tablet with Card Reader (POI Device)',
    appliesTo:
      'Merchants using a mobile or tablet with a physical card reader and a payment app. Face-to-face only. No card data storage.',
    scan: 'Not required.',
    storage: 'No electronic cardholder data storage.',
    keyNote:
      'Must have a POI device. If no POI device is attached to the mobile, the merchant becomes SAQ D High Risk.',
  },
  {
    type: 'SAQ C',
    title: 'iPOS / ePOS — POS Software on Computer or Tablet',
    appliesTo:
      'Merchants using POS software on a computer or tablet, such as Clover, EPOS, or IPOS systems. Face-to-face or MOTO. No card data storage.',
    scan: 'Required — public IP scan. Each location must be scanned and IPv6 is not valid for ASV scanning.',
    storage: 'No electronic cardholder data storage.',
    keyNote: 'Cannot use batch settlement files containing full card numbers. Clover, IPOS, and EPOS systems fall here.',
  },
  {
    type: 'SAQ C-VT',
    title: 'Virtual Terminal — Isolated Computer',
    appliesTo:
      'Merchants who process cardholder data only via a virtual terminal on an isolated, dedicated computer. Typically a single admin user.',
    scan: 'Not required.',
    storage: 'No electronic cardholder data storage.',
    keyNote: 'The computer must be used exclusively for payment processing and for no other business functions.',
  },
  {
    type: 'SAQ P2PE',
    title: 'Point-to-Point Encryption Hardware Terminal',
    appliesTo:
      'Merchants using hardware payment terminals within a validated P2PE solution. Cardholder data is encrypted at the point of interaction.',
    scan: 'Not required.',
    storage: 'No electronic cardholder data storage by the merchant.',
    keyNote: 'IPOS/EPOS with P2PE greatly reduces scope and has the fewest requirements of all SAQ types.',
  },
  {
    type: 'SAQ SPOC',
    title: 'Secure PIN on COTS Device (Smartphone / Tablet + SCRP)',
    appliesTo:
      'Merchants accepting EMV chip and PIN on a smartphone or tablet using a PCI-validated SPoC solution with an approved SCRP card reader. Face-to-face and MOTO.',
    scan: 'Not required — the SPoC security model de-scopes scanning.',
    storage: 'No cardholder data stored on the phone. Processing is outsourced to the SPoC solution provider.',
    keyNote:
      'PIN is entered on the mobile via a validated SPoC app. Not available for Fiserv or Elavon acquirers.',
  },
];
