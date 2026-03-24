export type QuickRefNode = {
  type: 'script' | 'internal';
  title: string;
  icon: string;
  body: string;
};

export const quickRefPhase1Nodes: QuickRefNode[] = [
  {
    type: 'script',
    icon: '🎧',
    title: 'Greet & invite reason',
    body: '"Thank you for calling the PCI Helpdesk, my name is [Your Name]. How can I help you today?"',
  },
  {
    type: 'internal',
    icon: '🔒',
    title: 'Pull up account while merchant speaks',
    body: 'Open CRM / portal → search by phone number or Merchant ID while they state their reason for calling.',
  },
  {
    type: 'script',
    icon: '🎧',
    title: 'Request identity verification',
    body: '"I\'ll just need to verify your account before we proceed. Could you please confirm your [Merchant ID / Business Name / Postcode / last 4 of registered phone]?"',
  },
];

export const quickRefLegend = [
  { label: 'Agent Script', color: '#3b7dd8' },
  { label: 'Internal Action', color: '#3a8a4a' },
  { label: 'Decision', color: '#c8900a' },
  { label: 'Alert / End', color: '#c0272d' },
  { label: 'Close', color: '#0a7a6a' },
];
