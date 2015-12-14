function loadPhilippians() {
  outline = [30, 30, 21, 23];
  chapter = 0;
  verse = 0;
  bookId = 11;
  result = [];
  LoadPage(bookId, chapter + 1, verse + 1);
}

var outline, // number of verses in chapters
    bookId,
    chapter,
    verse,
    result = [];

function LoadBook(bookId) {
  LoadPage(bookId, chapter + 1, verse + 1);
}

function LoadPage(book, chapter, verse) {
  socket.emit('load page', {
    'url': 'http://biblia.oblubienica.eu/interlinearny/index/book/' + book + '/chapter/' + chapter + '/verse/' + verse
  });
}

function LoadNextPage() {
  verse++;
  if (verse >= outline[chapter]) {
    verse = 0;
    chapter++;
  }
  if (chapter >= outline.length) {
    verse = -1;
    chapter = -1;
    saveJson('Philippians.json', result);
  }

  if (chapter >= 0 && verse >= 0) {
    LoadPage(bookId, chapter + 1, verse + 1);
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
      res = [];

  for (var i=1; i<items.length ; i++) {
    res[i-1] = {};
    res[i-1].index = items[i].children[0].children[0].text;
    res[i-1].strongIndex = items[i].children[1].children[0].text;
    res[i-1].word = items[i].children[2].children[0].text;
    res[i-1].phonetic = items[i].children[3].innerText;
    res[i-1].grammar = items[i].children[4].children[0].text;
    res[i-1].semantic = items[i].children[5].innerText;
    res[i-1].anternativeSemantic = items[i].children[6].innerText;
  }

  return res;
}

function SaveVerse(verseRes) {
  result[chapter] = result[chapter] || [];
  result[chapter][verse] = verseRes;
}

function init() {
  socket = io.connect('http://localhost');

  socket.on('load page result', function(body) {
    try {
      $('#content').html(body);
    } catch (ex)
    {

    }

    var res = ParseResult();
    SaveVerse(res);
    LoadNextPage();
  });

}

init();
