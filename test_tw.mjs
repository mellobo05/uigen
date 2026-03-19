import postcss from 'postcss';
import tailwindPlugin from '@tailwindcss/postcss';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = 'C:/Users/lobomela/.cursor/claude_code/uigen';
const srcPath = projectRoot + '/src';

// Test 1: relative path
const input1 = `@import "tailwindcss";
@source "../**/*.tsx";
`;

// Test 2: absolute path
const input2 = `@import "tailwindcss";
@source "${srcPath.replace(/\\/g, '/')}/**/*.tsx";
`;

const cssFile = path.join(projectRoot, 'src/app/globals.css');

async function test(label, input) {
  try {
    const result = await postcss([tailwindPlugin]).process(input, { from: cssFile });
    const hasUtils = result.css.includes('h-screen') || result.css.includes('.flex') || result.css.includes('overflow-hidden');
    console.log(label + ':', hasUtils ? 'HAS UTILITIES ✓' : 'NO UTILITIES ✗', '- size:', result.css.length);
    if (hasUtils) {
      const match = result.css.match(/\.h-screen[^{]*\{[^}]*\}/);
      if (match) console.log('  h-screen rule:', match[0].substring(0, 80));
    }
  } catch(e) {
    console.log(label + ' ERROR:', e.message);
  }
}

await test('Relative path', input1);
await test('Absolute path', input2);
