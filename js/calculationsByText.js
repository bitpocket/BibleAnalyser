function CaclulateWordsByText(book, translationCode, withoutWords, onlyWords, maxCount) {
  var words = _.chain(book.chapters)
    .pluck('verses')
    .flatten()
    .pluck('translations')
    .flatten()
    .reduce(function(memo, c) {
      var words = c[translationCode].replace(/,|\.|!|-|[0-9]|\<|\>|\(|\)|\[|\]|;/g, ' ').toLowerCase();
      return memo.concat(words.split(' '));
    }, [])
    .filter(function(w) {
      return w && (!withoutWords || withoutWords.indexOf(w) < 0) && (!onlyWords || onlyWords.indexOf(w) >=0);
    })
    .groupBy(function(w) {
      return w;
    })
    .filter(function(w) {
      return w.length >= maxCount;
    })
    .sortBy(function(w) {
      return -w.length;
    })
    .map(function(s) {
      return {
        'word': s[0],
        'count': s.length
      }
    })
    .value();

  return words;
}

function GetCloudByTextData(words) {
  var res = _.chain(words)
    .map(function(w) {
      return {
        'text': w.word,
        'size': w.count
      }
    })
    .value();

  return res;
}

function GetCalculationByTextAsHtml(calc) {
  var res = _.chain(calc)
    .reduce(function(memo, c) {
      return memo +
        '<p>' +
        '<div><strong>Word</strong>: ' + c.word + '  <strong>Count:</strong> ' + c.count + '</div>' +
        '</p>';
    }, '')
    .value();
  return res;
}
