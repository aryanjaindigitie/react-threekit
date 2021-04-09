import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const patterns = {
  literal: /{{\s*([a-zA-Z_]+[a-zA-Z0-9_-]*)+(\.[a-zA-Z_]+[a-zA-Z0-9_-]*)*\s*}}/g,
  forLoopStart: /{%\s*?for\s+([a-zA-Z_]+[a-zA-Z0-9_-]*)+\sin\s+([a-zA-Z_]+[a-zA-Z0-9_-]*)+(\.[a-zA-Z_]+[a-zA-Z0-9_-]*)*\s*%}/,
  forLoopStartGlobal: /{%\s*?for\s+([a-zA-Z_]+[a-zA-Z0-9_-]*)+\sin\s+([a-zA-Z_]+[a-zA-Z0-9_-]*)+(\.[a-zA-Z_]+[a-zA-Z0-9_-]*)*\s*%}/g,
  forLoopEnd: /{%\s*endfor\s*%}/,
  forLoopEndGlobal: /{%\s*endfor\s*%}/g,
};

export const htmlToPdf = (htmlContent) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      await page.emulateMediaType('print');

      const byteArray = await page.pdf({
        format: 'A4',
        printBackground: true,
      });

      const buffer = Buffer.from(byteArray, 'binary');
      browser.close();
      resolve(buffer);
    } catch (err) {
      reject(err);
    }
  });
};

const populateBlockLiterals = (data, string) => {
  let output = string;
  const matches = output.match(patterns.literal);
  if (!matches) {
    return string;
  }
  for (const match of matches) {
    const keys = match.replace('{{', '').replace('}}', '').trim().split('.');
    let value = keys.reduce((output, key) => {
      if (!output[key]) return '';
      return output[key];
    }, data);
    output = output.replace(match, value);
  }
  return output;
};

const getOperationStartsCount = (string) =>
  string.match(patterns.forLoopStartGlobal)?.length || 0;

const getOperatorEndIdx = (string, nestingCount = 1, absoluteIdx = 0) => {
  let nesting = nestingCount;

  let nextOpEndIdx = absoluteIdx;
  let nextOpEndLength;
  let subString = string.substr(absoluteIdx, string.length - 1 - absoluteIdx);

  while (nesting > 0) {
    nesting -= 1;
    const nextOpEnd = subString.match(patterns.forLoopEnd);
    if (!nextOpEnd) throw new Error('no end to operator');

    nextOpEndIdx += nextOpEnd.index;
    nextOpEndLength = nextOpEnd[0].length;

    subString = string.substr(
      nextOpEndIdx + 1,
      string.length - 1 - (nextOpEndIdx + 1)
    );
  }

  nesting += getOperationStartsCount(
    string.substr(absoluteIdx + 1, nextOpEndIdx - (absoluteIdx + 1))
  );

  if (nesting === 0) return nextOpEndIdx + nextOpEndLength + 1;

  return getOperatorEndIdx(string, nesting, nextOpEndIdx + 1);
};

const getNextOperation = (string, startIdx = 0) => {
  let subString = string.substr(startIdx, string.length - 1 - startIdx);
  const nextOp = subString.match(patterns.forLoopStart);
  if (!nextOp) return null;
  const endIdx = getOperatorEndIdx(
    subString.substr(nextOp.index, subString.length - 1 - nextOp.index)
  );
  return [startIdx + nextOp.index, startIdx + nextOp.index + endIdx];
};

const executeOperation = (data, string) => {
  let output = '';
  const [statement, key, dataKey] = string.match(patterns.forLoopStart);
  const endMatches = string.match(patterns.forLoopEndGlobal);
  const lastIdx = string.lastIndexOf(endMatches[endMatches.length - 1]);
  const loopString = string.substr(
    statement.length,
    lastIdx - statement.length
  );

  if (!data[dataKey]) console.log('no such key in data');

  data[dataKey].forEach((row) => {
    output += compileBlock({ ...data, [key]: row }, loopString);
  });

  return output;
};

const compileBlock = (data, string) => {
  let output = '';

  const nextOp = getNextOperation(string);

  if (!nextOp) {
    output += populateBlockLiterals(data, string);
    return output;
  }

  const [start, end] = nextOp;
  output += populateBlockLiterals(data, string.substr(0, start));

  //  Execute Operation
  output += executeOperation(data, string.substr(start, end - start));

  if (end < string.length) {
    output += compileBlock(data, string.substr(end, string.length - 1 - end));
  }

  return output;
};

const compileTemplate = async (data, templateName) => {
  if (!data) throw new Error('data missing');
  if (!templateName) throw new Error('template missing');

  let template = fs.readFileSync(
    path.join(__dirname, `${templateName}.html`),
    'utf8'
  );

  const output = compileBlock(data, template);

  return htmlToPdf(output);
};

export default { compileTemplate };
