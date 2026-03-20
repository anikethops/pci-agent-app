import type { WorkspaceSeed } from '../types/app';

export const seedWorkspace: WorkspaceSeed = {
  sections: [
    {
      id: 'section-overview',
      slug: 'overview',
      title: 'Overview',
      subtitle: 'Agent home base for search, notes, and workflow guidance',
      category: 'Core',
      locked: false,
      position: 1,
      content: `Use this page as your main PCI Helpdesk control room. Keep the live call flow simple: verify the merchant, confirm the reason for the call, check profile requirements, identify payment method, map likely SAQ, and advise next steps.\n\nThis web app is designed from the merged HTML reference: left navigation groups, searchable sections, floating notes, bookmarks, backups, history, and an autosave pill/workspace panel model.`,
    },
    {
      id: 'section-scenario-scripts',
      slug: 'scenario-scripts',
      title: 'Scenario Scripts',
      subtitle: 'Accordion-style section for key scenarios and responses',
      category: 'Call Scripts',
      locked: false,
      position: 2,
      content: `Suggested starter scenarios:\n\n1. Login reset or password reissue\n2. Merchant received scan email and wants clarification\n3. Merchant is unsure why they were transferred to PCI Helpdesk\n4. Merchant uses website payments and SAQ type must be clarified\n5. Merchant asks why fees continue after compliance\n\nTip: keep one scenario per content block later when you normalize this into block-level records.`,
    },
    {
      id: 'section-action-guide',
      slug: 'action-guide',
      title: 'Action Guide',
      subtitle: 'Decision-led actions to take during live calls',
      category: 'Call Scripts',
      locked: false,
      position: 3,
      content: `Action flow example:\n\n• If profile says scan required, verify whether scans truly apply based on the payment channel and final SAQ.\n• If merchant requests username or password reissue, ask whether they still have access to the registered email address.\n• If payment acceptance is unclear, ask how the customer pays: terminal, website, pay by link, invoice, phone, or outsourced call centre.\n• If SAQ is risky, add risk-reduction advice before ending the call.`,
    },
    {
      id: 'section-saq-reference',
      slug: 'saq-reference',
      title: 'SAQ Reference',
      subtitle: 'Quick mapping between payment method and likely SAQ',
      category: 'Reference',
      locked: false,
      position: 4,
      content: `Quick guide:\n\n• SAQ A: fully outsourced e-commerce redirect / iframe or pay-by-link-only flows where card data does not touch merchant systems.\n• SAQ A-EP: merchant website hosts payment elements or scripts affecting payment page.\n• SAQ B: standalone dial-out terminal.\n• SAQ B-IP: standalone IP-connected terminal.\n• SAQ C-VT: browser-based virtual terminal with one transaction at a time.\n• SAQ C: payment application / IPOS / EPOS / Clover environments.\n• SAQ P2PE: listed P2PE solution.\n\nAlways confirm actual scope before finalizing.`,
    },
    {
      id: 'section-saq-study',
      slug: 'saq-study',
      title: 'SAQ Study Notes',
      subtitle: 'Study-focused notes with scan reminders and explanations',
      category: 'Study Notes',
      locked: false,
      position: 5,
      content: `Study reminders:\n\n• SAQ A can still need a domain-related scan in some website cases depending on setup.\n• Scan emails alone are not enough to conclude scope — profile and payment flow must both be checked.\n• Replace placeholder employee counts with the actual count confirmed during calls.\n• Explain the why, not only the label, when the merchant is confused.`,
    },
    {
      id: 'section-checklist',
      slug: 'checklist',
      title: 'Checklist',
      subtitle: 'Pre-close checklist before finishing the call',
      category: 'Core',
      locked: false,
      position: 6,
      content: `Before ending the call:\n\n1. Verified identity\n2. Clarified reason for call\n3. Checked profile requirements\n4. Confirmed payment method\n5. Mapped likely SAQ\n6. Explained scan requirement clearly\n7. Gave risk-reduction advice when needed\n8. Confirmed login/reset path if requested\n9. Recapped the next merchant action`,
    }
  ]
};
