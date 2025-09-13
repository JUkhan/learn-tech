function cleanGisUrl(originalUrl) {
  try {
    const url = new URL(originalUrl);
    const params = new URLSearchParams(url.search);

    // Get the CQL filter and decode it for readability
    const cqlFilter = params.get('cql_filter');
    if (cqlFilter) {
      console.log('Decoded CQL Filter:', decodeURIComponent(cqlFilter));
    }

    return {
      cleanUrl: url.toString(),
      decodedParams: Object.fromEntries(params.entries()),
    };
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

function template(str, data) {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key] || '');
}

const templateStr = 'Hello {{name}}, you have {{count}} messages.';
const result = template(templateStr, { name: 'Bob', count: 5 });
// "Hello Bob, you have 5 messages."
function calculate(options) {
  const res = options.reduce((acc, val) => {
    len = acc.length;
    if (val === '+') {
      acc.push(acc[len - 2] + acc[len - 1]);
    } else if (val === 'D') {
      acc.push(acc[len - 1] * 2);
    } else if (val === 'C') {
      acc.pop();
    } else {
      acc.push(Number(val));
    }
    return acc;
  }, []);
  return res.reduce((acc, val) => acc + val, 0);
}

console.clear();
console.log(Number.MAX_SAFE_INTEGER); // 27
