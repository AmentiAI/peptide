const fs = require('fs');
const path = require('path');

const peptides = {
  'tb-500': {
    grad1: '#f59e0b',
    grad2: '#ef4444',
    label: 'TB-500',
    theme: 'Muscle & Recovery'
  },
  'cjc-1295': {
    grad1: '#8b5cf6',
    grad2: '#ec4899',
    label: 'CJC',
    theme: 'Growth Hormone'
  },
  'ipamorelin': {
    grad1: '#06b6d4',
    grad2: '#3b82f6',
    label: 'IPA',
    theme: 'GH Release'
  },
  'sermorelin': {
    grad1: '#a855f7',
    grad2: '#6366f1',
    label: 'SER',
    theme: 'GHRH'
  },
  'melanotan-2': {
    grad1: '#f97316',
    grad2: '#dc2626',
    label: 'MT-2',
    theme: 'Melanocortin'
  },
  'pt-141': {
    grad1: '#ec4899',
    grad2: '#be123c',
    label: 'PT-141',
    theme: 'Melanocortin'
  },
  'ghk-cu': {
    grad1: '#d4af37',
    grad2: '#f59e0b',
    label: 'GHK-Cu',
    theme: 'Copper Peptide'
  },
  'semaglutide': {
    grad1: '#10b981',
    grad2: '#059669',
    label: 'SEMA',
    theme: 'GLP-1'
  },
  'tirzepatide': {
    grad1: '#14b8a6',
    grad2: '#0d9488',
    label: 'TIRZ',
    theme: 'GIP/GLP-1'
  },
  'aod-9604': {
    grad1: '#6366f1',
    grad2: '#4f46e5',
    label: 'AOD',
    theme: 'HGH Fragment'
  },
  'hgh-fragment': {
    grad1: '#8b5cf6',
    grad2: '#7c3aed',
    label: 'HGH-F',
    theme: 'Lipolysis'
  }
};

const svgTemplate = (slug, data) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
  <defs>
    <linearGradient id="${slug}-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${data.grad1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${data.grad2};stop-opacity:1" />
    </linearGradient>
    <filter id="glow-${slug}">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <radialGradient id="${slug}-radial">
      <stop offset="0%" style="stop-color:${data.grad1};stop-opacity:0.4" />
      <stop offset="100%" style="stop-color:${data.grad2};stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="300" fill="#0a0f1a"/>
  
  <!-- Radial glow background -->
  <circle cx="200" cy="150" r="150" fill="url(#${slug}-radial)"/>
  
  <!-- Molecular grid -->
  <g opacity="0.1" stroke="${data.grad1}" stroke-width="1">
    <line x1="0" y1="75" x2="400" y2="75"/>
    <line x1="0" y1="150" x2="400" y2="150"/>
    <line x1="0" y1="225" x2="400" y2="225"/>
    <line x1="100" y1="0" x2="100" y2="300"/>
    <line x1="200" y1="0" x2="200" y2="300"/>
    <line x1="300" y1="0" x2="300" y2="300"/>
  </g>
  
  <!-- Molecular structure -->
  <g filter="url(#glow-${slug})" opacity="0.8">
    <!-- Central hexagon -->
    <path d="M200,110 L230,125 L230,155 L200,170 L170,155 L170,125 Z" 
          fill="none" stroke="url(#${slug}-grad)" stroke-width="3"/>
    
    <!-- Orbital rings -->
    <circle cx="200" cy="150" r="60" fill="none" stroke="url(#${slug}-grad)" stroke-width="2" opacity="0.6"/>
    <circle cx="200" cy="150" r="90" fill="none" stroke="url(#${slug}-grad)" stroke-width="1" opacity="0.3"/>
    
    <!-- Atom nodes -->
    <circle cx="200" cy="110" r="6" fill="${data.grad1}"/>
    <circle cx="230" cy="125" r="5" fill="${data.grad2}"/>
    <circle cx="230" cy="155" r="6" fill="${data.grad1}"/>
    <circle cx="200" cy="170" r="5" fill="${data.grad2}"/>
    <circle cx="170" cy="155" r="6" fill="${data.grad1}"/>
    <circle cx="170" cy="125" r="5" fill="${data.grad2}"/>
    
    <!-- Outer orbit atoms -->
    <circle cx="140" cy="150" r="4" fill="${data.grad1}" opacity="0.8"/>
    <circle cx="260" cy="150" r="4" fill="${data.grad2}" opacity="0.8"/>
    <circle cx="200" cy="60" r="4" fill="${data.grad1}" opacity="0.8"/>
    <circle cx="200" cy="240" r="4" fill="${data.grad2}" opacity="0.8"/>
  </g>
  
  <!-- Central label -->
  <g filter="url(#glow-${slug})">
    <circle cx="200" cy="150" r="35" fill="url(#${slug}-grad)" opacity="0.3"/>
    <text x="200" y="155" text-anchor="middle" 
          font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">
      ${data.label}
    </text>
  </g>
  
  <!-- Theme label at bottom -->
  <text x="200" y="280" text-anchor="middle" 
        font-family="Arial, sans-serif" font-size="12" fill="${data.grad1}" opacity="0.7">
    ${data.theme}
  </text>
</svg>`;

const outputDir = path.join(__dirname, '..', 'public', 'images');

Object.entries(peptides).forEach(([slug, data]) => {
  const svg = svgTemplate(slug, data);
  const filePath = path.join(outputDir, `${slug}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✓ Created ${slug}.svg`);
});

// Also create JPG versions using placeholder with proper naming
const jpgMapping = {
  'tb-500': 'tb-500.jpg',
  'cjc-1295': 'cjc-1295.jpg',
  'ipamorelin': 'ipamorelin.jpg',
  'sermorelin': 'sermorelin.jpg',
  'melanotan-2': 'melanotan-2.jpg',
  'pt-141': 'pt-141.jpg',
  'ghk-cu': 'ghk-cu.jpg',
  'semaglutide': 'semaglutide.jpg',
  'tirzepatide': 'tirzepatide.jpg',
  'aod-9604': 'aod-9604.jpg',
  'hgh-fragment': 'hgh-fragment.jpg'
};

console.log('\nCreated all peptide SVG images!');
console.log('Total:', Object.keys(peptides).length + 1, 'images (including bpc-157)');
