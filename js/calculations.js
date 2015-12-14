function getBook(fileName) {
  $.getJSON(fileName, function(book) {

    var ListMaxCount = 5,
      CloudMaxCount = 3;

    var filter1 = ['3588', '2532', '1722', '1161', '1519','3754', '3739', '1063', '1223', '5124', '1537',
      '1909', '3326', '3361', '575', '3767', '3745', '5228', '5613', '1535', '4314', '2076', '1511',
      '2443', '235', '3568', '2257', '3123', '1438', '3427', '5100', '2596', '2192', '1698',
      '1473', '3748', '4012', '3440', '1520'];

    var res1f = CaclulateStrongWords(book, filter1, undefined, ListMaxCount);
    var res1r = CaclulateStrongWords(book, undefined, filter1, ListMaxCount);
    var res1c = CaclulateStrongWords(book, filter1, undefined, 2);
    putCloud(GetCloudByStrongData(res1c), '#epi #cloud');
    $('#epi #list #core').append(GetCalculationAsHtml(res1f));
    $('#epi #list #rest').append(GetCalculationAsHtml(res1r));


    var filter4 = ['the', 'and', 'of', 'in', 'you', 'for', 'that', 'i', 'with', 'as', 'will',
      'by', 'a', 'if', 'this', 'it', 'on', 'he', 'to', 'is', 'are', 'or', 'so', 'am', 'do',
      'from', 'who', 'which', 'also', 'him', 'let', 'his', 'beign', 'one', 'out', 'was', 'has', 'those',
      'whose', 'us', 'these', 'at', 'what'];

    var res4f = CaclulateWordsByText(book, TranslationsCodes.NKJVS, filter4, undefined, ListMaxCount);
    var res4r = CaclulateWordsByText(book, TranslationsCodes.NKJVS, undefined, filter4, ListMaxCount);
    var res4c = CaclulateWordsByText(book, TranslationsCodes.NKJVS, filter4, undefined, CloudMaxCount);
    putCloud(GetCloudByTextData(res4c), '#nkjvs #cloud');
    $('#nkjvs #list #core').append(GetCalculationByTextAsHtml(res4f));
    $('#nkjvs #list #rest').append(GetCalculationByTextAsHtml(res4r));


    var filter2 = ['w', 'i', 'się', 'z', 'a', 'do', 'dla', 'na', 'o', 'za', 'ze', 'od', 'ku',
      'to', 'że', 'co', 'u', 'czy', 'zaś', 'jak', 'go', 'tylko', 'bo', 'ale', 'jego', 'we', 'jeśli',
      'przez', 'niech', 'tego', 'będzie', 'już', 'był', 'dlatego', 'on', 'tym', 'także', 'nie', 'was',
      'iż', 'lub', 'mi', 'który', 'jeźli', 'jako', 'aby'];

    var res2f = CaclulateWordsByText(book, TranslationsCodes.BT, filter2, undefined, ListMaxCount);
    var res2r = CaclulateWordsByText(book, TranslationsCodes.BT, undefined, filter2, ListMaxCount);
    var res2c = CaclulateWordsByText(book, TranslationsCodes.BT, filter2, undefined, CloudMaxCount);
    putCloud(GetCloudByTextData(res2c), '#bt #cloud');
    $('#bt #list #core').append(GetCalculationByTextAsHtml(res2f));
    $('#bt #list #rest').append(GetCalculationByTextAsHtml(res2r));


    var res3f = CaclulateWordsByText(book, TranslationsCodes.BW, filter2, undefined, ListMaxCount);
    var res3r = CaclulateWordsByText(book, TranslationsCodes.BW, undefined, filter2, ListMaxCount);
    var res3c = CaclulateWordsByText(book, TranslationsCodes.BW, filter2, undefined, CloudMaxCount);
    putCloud(GetCloudByTextData(res3c), '#bw #cloud');
    $('#bw #list #core').append(GetCalculationByTextAsHtml(res3f));
    $('#bw #list #rest').append(GetCalculationByTextAsHtml(res3r));

    var res6f = CaclulateWordsByText(book, TranslationsCodes.BG, filter2, undefined, ListMaxCount);
    var res6r = CaclulateWordsByText(book, TranslationsCodes.BG, undefined, filter2, ListMaxCount);
    var res6c = CaclulateWordsByText(book, TranslationsCodes.BG, filter2, undefined, CloudMaxCount);
    putCloud(GetCloudByTextData(res6c), '#bg #cloud');
    $('#bg #list #core').append(GetCalculationByTextAsHtml(res6f));
    $('#bg #list #rest').append(GetCalculationByTextAsHtml(res6r));

    var res5f = CaclulateWordsByText(book, TranslationsCodes.UBG, filter2, undefined, ListMaxCount);
    var res5r = CaclulateWordsByText(book, TranslationsCodes.UBG, undefined, filter2, ListMaxCount);
    var res5c = CaclulateWordsByText(book, TranslationsCodes.UBG, filter2, undefined, CloudMaxCount);
    putCloud(GetCloudByTextData(res5c), '#ubg #cloud');
    $('#ubg #list #core').append(GetCalculationByTextAsHtml(res5f));
    $('#ubg #list #rest').append(GetCalculationByTextAsHtml(res5r));


  });
}

function CountWords(book) {
  getBook('Philippians.json');
}

CountWords();
