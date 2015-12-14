function getNatives(s) {
  var res = _.chain(s)
    .groupBy(function(s) {
      return s.word
    })
    .reduce(function(memo, g) {
      return memo + g[0].word + ' (' + g[0].phonetic + '), ';
    }, '')
    .value();
  return res;
}

function getTtanslates(s) {
  var res = _.chain(s)
    .groupBy(function(s) {
      return s.semantic
    })
    .reduce(function(memo, g) {
      var sem1 = g[0].semantic ? g[0].semantic + ', ' : '';
      var sem2 = g[0].anternativeSemantic ? g[0].anternativeSemantic + ', ' : '';
      return memo + sem1 + sem2;
    }, '')
    .value();
  return res;
}

function CaclulateStrongWords(book, withoutStrongs, onlyWords, maxCount) {
  var words = _.chain(book.chapters)
    .pluck('verses')
    .flatten()
    .pluck('words')
    .flatten()
    .filter(function(w) {
      return (!withoutStrongs || withoutStrongs.indexOf(w.strongIndex) < 0) &&
        (!onlyWords || onlyWords.indexOf(w.strongIndex) >= 0);
    })
    .groupBy(function(w) {
      return w.strongIndex;
    })
    .filter(function(s) {
      return s.length >= maxCount;
    })
    .sortBy(function(s) {
      return -s.length;
    })
    .map(function(s) {
      return {
        'strong': s[0].strongIndex,
        'natives': getNatives(s),
        'translates': getTtanslates(s),
        'count': s.length
      }
    })
    .value();

  return words;
}

function GetCalculationAsHtml(calc) {
  var res = _.chain(calc)
    .reduce(function(memo, c) {
      return memo +
      '<p>'+
        // '<div class="col-md-1"><h3>1</h3></div>' +
        // '<div class="col-md-11">' +
          '<div><strong>Strong</strong>: ' + c.strong + '  <strong>Count: </strong>' + c.count + '</div>' +
          '<div><strong>Greek</strong>: ' + c.natives + '</div>' +
          '<div><strong>Polish</strong>: ' + c.translates + '</div>' +
        // '</div>' +
        '</p>';

    }, '')
    .value();
  return res;
}

function GetCloudByStrongData(words) {
  var res = _.chain(words)
    .map(function(w) {
      return {
        'text': w.strong,
        'size': w.count
      }
    })
    .value();

  return res;
}
