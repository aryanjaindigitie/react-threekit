import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const OPERATIONS = {
  forLoop: 'forLoop',
  conditional: 'conditional',
};

const variableRe = `([a-zA-Z_]+[a-zA-Z0-9_-]*)`;
const nestedVariableRe = `(.[a-zA-Z_]+[a-zA-Z0-9_-]*)`;
const literalRe = `${variableRe}+${nestedVariableRe}*`;
const conditionsRe = `(==|!=|>|<|>=|<=|contains)`;
const stringRe = `(('[^']*')|("[^"]*"))`;
const numberRe = `(\\d*\.?\\d*)`;

const patternsRaw = {
  loopStart: `for\\s*${variableRe}+\\s*in\\s*${literalRe}`,
  loopEnd: `endfor`,
  conditionalStart: `if\\s*${literalRe}(\\s*${conditionsRe}\\s*(${stringRe}|${numberRe}|${literalRe}))?`,
  conditionalEnd: `endif`,
};

const getLiteralPatter = (re, flags) => new RegExp(`{{\\s*${re}\\s*}}`, flags);
const getOpPattern = (re, flags) => new RegExp(`{%\\s*${re}\\s*%}`, flags);

const literalPattern = getLiteralPatter(literalRe, 'g');

const patterns = {
  [OPERATIONS.forLoop]: {
    start: getOpPattern(patternsRaw.loopStart),
    end: getOpPattern(patternsRaw.loopEnd),
  },
  [OPERATIONS.conditional]: {
    start: getOpPattern(patternsRaw.conditionalStart),
    end: getOpPattern(patternsRaw.conditionalEnd),
  },
};

const evaluators = {
  [OPERATIONS.forLoop]: (data, string) => {
    let output = '';
    const [statement, key, dataKey] = string.match(
      patterns[OPERATIONS.forLoop].start
    );
    const endMatches = string.match(
      new RegExp(patterns[OPERATIONS.forLoop].end, 'g')
    );
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
  },
  [OPERATIONS.conditional]: (data, string) => {
    const [statement] = string.match(patterns[OPERATIONS.conditional].start);
    const endMatches = string.match(
      new RegExp(patterns[OPERATIONS.conditional].end, 'g')
    );
    const lastIdx = string.lastIndexOf(endMatches[endMatches.length - 1]);

    const operation = statement
      .replace('{%', '')
      .replace('%}', '')
      .replace('if', '')
      .trim()
      .split(' ')
      .filter((el) => el.length);

    const address = operation[0].split('.');
    const value = address.reduce((output, idx) => {
      return output ? output[idx] : undefined;
    }, data);

    let isTrue;

    if (value === undefined || value === null) isTrue = false;
    else if (operation.length === 1) {
      isTrue = true;
    } else {
      let checkVal = operation[2].substr(1, operation[2].length - 2);
      if (checkVal === 'true') checkVal = true;
      if (checkVal === 'false') checkVal = false;
      switch (operation[1]) {
        case '==':
          if (value === checkVal || value === parseFloat(checkVal))
            isTrue = true;
          break;
        case '!=':
          if (value !== checkVal || value === parseFloat(checkVal))
            isTrue = true;
          break;
        case '>=':
          if (parseFloat(value) && value >= parseFloat(checkVal)) isTrue = true;
          break;
        case '<=':
          if (parseFloat(value) && value <= parseFloat(checkVal)) isTrue = true;
          break;
        case '>':
          if (parseFloat(value) && value > parseFloat(checkVal)) isTrue = true;
          break;
        case '<':
          if (parseFloat(value) && value < parseFloat(checkVal)) isTrue = true;
          break;
        case 'contains':
          if (value.includes(checkVal)) isTrue = true;
          break;
        default:
          break;
      }
    }

    if (isTrue)
      return compileBlock(
        data,
        string.substr(statement.length, lastIdx - statement.length)
      );
    else return '';
  },
};

const ops = Object.keys(OPERATIONS).reduce(
  (output, opName) =>
    Object.assign(output, {
      [opName]: { patterns: patterns[opName], evaluator: evaluators[opName] },
    }),
  {}
);

const evaluateLiterals = (data, string) => {
  let output = string;
  const matches = output.match(literalPattern);
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

const getOperationStartsCount = (string, opName) =>
  string.match(new RegExp(ops[opName].patterns.start, 'g'))?.length || 0;

const getNextOperationIndex = (string, startIdx = 0) => {
  const getEndIdx = (opName, string, nestingCount = 1, absoluteIdx = 0) => {
    let nesting = nestingCount;

    let nextOpEndIdx = absoluteIdx;
    let nextOpEndLength;
    let subString = string.substr(absoluteIdx, string.length - 1 - absoluteIdx);

    while (nesting > 0) {
      nesting -= 1;
      const nextOpEnd = subString.match(ops[opName].patterns.end);
      if (!nextOpEnd) throw new Error('no end to operator');

      nextOpEndIdx += nextOpEnd.index;
      nextOpEndLength = nextOpEnd[0].length;

      subString = string.substr(
        nextOpEndIdx + 1,
        string.length - 1 - (nextOpEndIdx + 1)
      );
    }

    nesting += getOperationStartsCount(
      string.substr(absoluteIdx + 1, nextOpEndIdx - (absoluteIdx + 1)),
      opName
    );
    if (nesting === 0) return nextOpEndIdx + nextOpEndLength + 1;

    return getEndIdx(string, nesting, nextOpEndIdx + 1);
  };

  let subString = string.substr(startIdx, string.length - 1 - startIdx);

  const nextOp = Object.entries(ops).reduce((result, [opName, op]) => {
    const next = subString.match(op.patterns.start);
    if (!next) return result;
    if (!result) return [opName, next.index];
    if (next.index < result[1]) return [opName, next.index];
    return result;
  }, undefined);

  if (!nextOp) return null;
  const endIdx = getEndIdx(
    nextOp[0],
    subString.substr(nextOp[1], subString.length - 1 - nextOp[1])
  );
  return [nextOp[0], startIdx + nextOp[1], startIdx + nextOp[1] + endIdx];
};

const evaluateOperation = (opName, data, string) =>
  ops[opName].evaluator(data, string);

const compileBlock = (data, string) => {
  let output = '';

  const nextOp = getNextOperationIndex(string);

  if (!nextOp) {
    output += evaluateLiterals(data, string);
    return output;
  }

  const [opName, start, end] = nextOp;
  output += evaluateLiterals(data, string.substr(0, start));

  //  Execute Operation
  output += evaluateOperation(opName, data, string.substr(start, end - start));

  if (end < string.length) {
    output += compileBlock(data, string.substr(end, string.length - 1 - end));
  }

  return output;
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

const compile = async (data, templateName) => {
  if (!data) throw new Error('data missing');
  if (!templateName) throw new Error('template missing');

  let template;

  try {
    template = fs.readFileSync(
      path.join(__dirname, `${templateName}.liquid`),
      'utf8'
    );
  } catch (e) {
    console.log(e);
    return;
  }

  const output = compileBlock(data, template);
  return output;
  return htmlToPdf(output);
};

export default { compile };
