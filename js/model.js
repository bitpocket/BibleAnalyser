function Word () {
  this.index;
  this.strongIndex;
  this.word;
  this.phonetic;
  this.grammar;
  this.semantic;
  this.anternativeSemantic;
}

function Verse () {
  this.index;
  this.Words;
}

function Chapter () {
  this.index;
  this.Verses;
}

function Book () {
  this.index;
  this.chapters;
  this.name;
  this.tags;
  this.translation;
}

var Translations = [
  BT5: {
    id: 'BT5',
    name: 'Biblia Tysiąclecia, wydanie V',
    date: '',
    language: '',
    url: ''
  },

  EPI: {
    id: 'EPI',
    name: 'Ewangeliczny Przekład Interlinearny Biblii ',
    date: '',
    language: '',
    url: 'http://biblia.oblubienica.eu/'
  }

];
