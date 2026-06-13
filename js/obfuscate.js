#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targets = [
    { input: 'js/main-logic.js',  output: 'js/main-logic.min.js' },
    { input: 'js/shield.js',      output: 'js/shield.min.js' },
];

const baseOptions = {

    compact: true,
    simplify: true,

    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false,

    stringArray: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayThreshold: 0.75,
    stringArrayIndexShift: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersType: 'function',
    stringArrayEncoding: ['base64'],
    splitStrings: true,
    splitStringsChunkLength: 8,

    controlFlowFlattening: false,

    deadCodeInjection: false,

    transformObjectKeys: false,
    unicodeEscapeSequence: false,

    selfDefending: false,
    debugProtection: false,
    disableConsoleOutput: false,

    target: 'browser',

    reservedNames: [
        '^React$', '^ReactDOM$', '^createElement$', '^createRoot$',
        '^useState$', '^useEffect$', '^useRef$', '^useCallback$',
        '^Fragment$', '^Component$', '^render$'
    ],
    reservedStrings: [],
};

const shieldOptions = {
    ...baseOptions,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 2000,
    selfDefending: false,
    renameGlobals: false,
};

console.log('═══════════════════════════════════════════════');
console.log('  KozzyX Code Obfuscation Build');
console.log('═══════════════════════════════════════════════\n');

for (const { input, output } of targets) {
    const inputPath = path.resolve(__dirname, input);
    const outputPath = path.resolve(__dirname, output);

    if (!fs.existsSync(inputPath)) {
        console.error(`[ERROR] File not found: ${inputPath}`);
        process.exit(1);
    }

    const source = fs.readFileSync(inputPath, 'utf-8');
    const originalSize = Buffer.byteLength(source, 'utf-8');

    console.log(`Processing: ${input}`);
    console.log(`  Original size: ${(originalSize / 1024).toFixed(1)} KB`);

    const isShield = input.includes('shield');
    const options = isShield ? shieldOptions : baseOptions;

    console.log(`  Mode: ${isShield ? 'AGGRESSIVE (control flow + dead code)' : 'STANDARD (string + identifier mangling)'}`);
    console.log(`  Obfuscating...`);

    const startTime = Date.now();
    const result = JavaScriptObfuscator.obfuscate(source, options);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    const obfuscated = result.getObfuscatedCode();
    const newSize = Buffer.byteLength(obfuscated, 'utf-8');

    fs.writeFileSync(outputPath, obfuscated, 'utf-8');

    console.log(`  Output: ${output}`);
    console.log(`  New size: ${(newSize / 1024).toFixed(1)} KB (${((newSize / originalSize) * 100).toFixed(0)}%)`);
    console.log(`  Time: ${elapsed}s`);
    console.log(`  ✓ Done\n`);
}

console.log('═══════════════════════════════════════════════');
console.log('  All files obfuscated successfully.');
console.log('  Deploy the .min.js files, keep originals as source.');
console.log('═══════════════════════════════════════════════');
