import type { CSSProperties } from 'react';

export type NavItem = {
  key: string;
  label: string;
  dotColor: string;
  badge?: string;
  badgeStyle?: CSSProperties;
  activeBorderColor?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: 'Quick Access',
    items: [
      {
        key: 'checklist',
        label: 'Checklist for Calls',
        dotColor: 'var(--cl)',
        badge: 'LIVE',
        badgeStyle: { background: 'rgba(20,184,166,0.15)', color: 'var(--cl)' },
        activeBorderColor: 'var(--cl)',
      },
      { key: 'cheatsheet', label: 'Cheat Sheet', dotColor: 'var(--cs)' },
      {
        key: 'quickref',
        label: 'Quick Ref Script',
        dotColor: '#2563eb',
        badge: 'SCRIPT',
        badgeStyle: { background: 'rgba(37,99,235,0.13)', color: '#2563eb' },
      },
    ],
  },
  {
    label: 'Main Call Flow',
    items: [
      { key: 'p1', label: 'P1 · Opening & Auth', dotColor: 'var(--p1)', badge: '§1–2', badgeStyle: { background: 'rgba(59,130,246,0.15)', color: 'var(--p1)' } },
      { key: 'p2', label: 'P2 · PCI DSS Awareness', dotColor: 'var(--p2)', badge: '§3', badgeStyle: { background: 'rgba(167,139,250,0.15)', color: 'var(--p2)' } },
      { key: 'p3', label: 'P3 · Journey Stage Check', dotColor: 'var(--p3)', badge: '§4', badgeStyle: { background: 'rgba(245,158,11,0.15)', color: 'var(--p3)' } },
      { key: 'p4', label: 'P4 · Business Profile', dotColor: 'var(--p4)', badge: '§5', badgeStyle: { background: 'rgba(16,185,129,0.15)', color: 'var(--p4)' } },
      { key: 'p5', label: 'P5 · Vulnerability Scan', dotColor: 'var(--p5)', badge: '§6', badgeStyle: { background: 'rgba(239,68,68,0.15)', color: 'var(--p5)' } },
      { key: 'p6', label: 'P6 · Security Assessment', dotColor: 'var(--p6)', badge: '§7', badgeStyle: { background: 'rgba(6,182,212,0.15)', color: 'var(--p6)' } },
      { key: 'p7', label: 'P7 · Attestation', dotColor: 'var(--p7)', badge: '§8', badgeStyle: { background: 'rgba(249,115,22,0.15)', color: 'var(--p7)' } },
      { key: 'p8', label: 'P8 · Call Closing', dotColor: 'var(--p8)', badge: '§10', badgeStyle: { background: 'rgba(132,204,22,0.15)', color: 'var(--p8)' } },
    ],
  },
  {
    label: 'Supplementary',
    items: [
      { key: 'sa', label: 'Supp A · Login Reset', dotColor: 'var(--sa)', badge: '§9', badgeStyle: { background: 'rgba(148,163,184,0.1)', color: 'var(--sa)' } },
      { key: 'sb', label: 'Supp B · Maintenance', dotColor: 'var(--sb)', badge: '§11', badgeStyle: { background: 'rgba(192,132,252,0.1)', color: 'var(--sb)' } },
    ],
  },
  {
    label: 'Call Scripts',
    items: [
      { key: 'callscripts', label: 'Scenario Scripts', dotColor: 'var(--csc)', badge: '20', badgeStyle: { background: 'rgba(0,118,163,0.13)', color: 'var(--csc)' } },
      { key: 'actionguide', label: 'Action Guide', dotColor: '#5046e5', badge: '6 FLOWS', badgeStyle: { background: 'rgba(80,70,229,0.13)', color: '#5046e5' } },
    ],
  },
  {
    label: 'Study Notes',
    items: [
      { key: 'studynotes', label: 'Study Notes', dotColor: '#6d3fcf', badge: 'STUDY', badgeStyle: { background: 'rgba(109,63,207,0.12)', color: '#6d3fcf' } },
    ],
  },
  {
    label: 'Reference',
    items: [
      { key: 'objections', label: 'Objection Handling', dotColor: 'var(--obj)', badge: '7 TYPES', badgeStyle: { background: 'rgba(236,72,153,0.15)', color: 'var(--obj)' } },
      { key: 'saqref', label: 'SAQ Reference', dotColor: 'var(--saq)', badge: '7 TYPES', badgeStyle: { background: 'rgba(34,211,238,0.15)', color: 'var(--saq)' } },
      { key: 'saqstudy', label: 'SAQ Study Notes', dotColor: 'var(--saq)', badge: 'STUDY', badgeStyle: { background: 'rgba(34,211,238,0.15)', color: 'var(--saq)' } },
      { key: 'scope', label: 'Scope / SAQ Summary Table', dotColor: 'var(--p3)' },
      { key: 'feequery', label: 'Fee & Billing Queries', dotColor: '#b45309', badge: 'FEES', badgeStyle: { background: 'rgba(180,83,9,0.13)', color: '#b45309' } },
      { key: 'escalation', label: 'Escalation Guide', dotColor: '#c0272d', badge: 'ESC', badgeStyle: { background: 'rgba(192,39,45,0.13)', color: '#c0272d' } },
    ],
  },
];

export const phasePills = [
  { key: 'p1', label: 'P1 Opening', color: 'var(--p1)' },
  { key: 'p2', label: 'P2 Awareness', color: 'var(--p2)' },
  { key: 'p3', label: 'P3 Journey', color: 'var(--p3)' },
  { key: 'p4', label: 'P4 Profile', color: 'var(--p4)' },
  { key: 'p5', label: 'P5 Scan', color: 'var(--p5)' },
  { key: 'p6', label: 'P6 SAQ', color: 'var(--p6)' },
  { key: 'p7', label: 'P7 Attest', color: 'var(--p7)' },
  { key: 'p8', label: 'P8 Close', color: 'var(--p8)' },
];
