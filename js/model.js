// function Word() {
//   this.index;
//   this.strongIndex;
//   this.word;
//   this.phonetic;
//   this.grammar;
//   this.semantic;
//   this.anternativeSemantic;
// }
//
// function Verse() {
//   this.index;
//   this.Words;
// }
//
// function Chapter() {
//   this.index;
//   this.Verses;
// }
//
// function Book() {
//   this.index;
//   this.chapters;
//   this.name;
//   this.tags;
//   this.translation;
// }

var TranslationsCodes = {};
TranslationsCodes.EPI = 'EPI';
TranslationsCodes.BG = 'BG';
TranslationsCodes.UBG = 'UBG';
TranslationsCodes.BW = 'BW';
TranslationsCodes.BT = 'BT';
TranslationsCodes.KJVS = 'KJVS';
TranslationsCodes.NKJVS = 'NKJVS';

var Translations = {
  EPI: {
    name: 'Ewangeliczny Przekład Interlinearny Biblii'
  },
  BG: {
    name: 'Biblia Gdańska'
  },
  UBG: {
    name: 'Uwspółcześniona Biblia Gdańska'
  },
  BW: {
    name: 'Biblia Warszawska'
  },
  BT: {
    name: 'Biblia Tysiąclecia'
  },
  KJVS: {
    name: 'King James Version + Strong'
  },
  NKJVS: {
    name: 'New King James Verson + Strong'
  }
};
