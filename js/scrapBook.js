function ScrapPhilippians() {
  outline = [30, 30, 21, 23];
  chapterIndex = 0;
  verseIndex = 0;
  bookId = 11;
  book = {
      'number': bookId,
      'name': 'Philippians',
      'chapters': []
    },
    result = [];
  ScrapBook(bookId, chapterIndex + 1, verseIndex + 1);
}

var outline, // number of verses in chapters
  bookId,
  chapterIndex,
  verseIndex,
  book,
  result = [];

function ScrapBook(bookId) {
  ScrapPage(bookId, chapterIndex + 1, verseIndex + 1);
}

function ScrapPage(book, chapterIndex, verseIndex) {
  socket.emit('load page', {
    'url': 'http://biblia.oblubienica.eu/interlinearny/index/book/' + book + '/chapter/' + chapterIndex + '/verse/' + verseIndex
  });
}

function ScrapNextPage() {
  verseIndex++;
  if (verseIndex >= outline[chapterIndex]) {
    verseIndex = 0;
    chapterIndex++;
  }
  if (chapterIndex >= outline.length) {
    verseIndex = -1;
    chapterIndex = -1;
    saveJson('Philippians.json', book);
  }

  if (chapterIndex >= 0 && verseIndex >= 0) {
    ScrapPage(bookId, chapterIndex + 1, verseIndex + 1);
  }
}

var content;

function loadJson(fileName) {
  $.getJSON(fileName, function(json) {
    content = json;
    $('#content').html('<p>new content is ' + json + '</p>');
  });
}

function saveJson(fileName, data) {
  socket.emit('save file', {
    'fileName': fileName,
    'content': JSON.stringify(data)
  });
}

var socket;

function ParseResult() {
  var items = $(".item"),
    verse = {
      'number': verseIndex + 1,
      'words': [],
      'translations': {
        'EPI': $(".przeklad2")[0].children[1].innerText,
        'BG': $(".przeklad3")[0].children[1].innerText,
        'UBG': $(".przeklad4")[0].children[1].innerText,
        'BW': $(".przeklad5")[0].children[1].innerText,
        'BT': $(".przeklad6")[0].children[1].innerText,
        'KJVS': $(".przeklad7")[0].children[1].innerText,
        'NKJVS': $(".przeklad8")[0].children[1].innerText
      }
    };

  for (var i = 1; i < items.length; i++) {
    var word = {};
    word.number = items[i].children[0].children[0].text;
    word.strongIndex = items[i].children[1].children[0].text;
    word.word = items[i].children[2].children[0].text;
    word.phonetic = items[i].children[3].innerText;
    word.grammar = items[i].children[4].children[0].text;
    word.semantic = items[i].children[5].innerText;
    word.anternativeSemantic = items[i].children[6].innerText;

    verse.words.push(word);
  }

  return verse;
}

function SaveVerse(verseRes) {
  book.chapters[chapterIndex] = book.chapters[chapterIndex] || {
    'number': chapterIndex + 1,
    'verses': []
  };
  book.chapters[chapterIndex].verses.push(verseRes);
}

function init() {
  socket = io.connect('http://localhost');

  socket.on('load page result', function(body) {
    try {
      $('#content').html(body);
    } catch (ex) {}

    var res = ParseResult();
    SaveVerse(res);
    ScrapNextPage();
  });

}

init();
