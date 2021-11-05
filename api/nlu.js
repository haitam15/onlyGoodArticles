const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

module.exports.rateArticle = async function nluApi(text) {

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2021-08-01',
    authenticator: new IamAuthenticator({
      apikey: 'sDXGFI1DgURGHX5gdKhs54CxA63HEYxW8unInBeR1-Jg',
    }),
    serviceUrl: 'https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/instances/49dce6fb-bf30-476b-aad7-c4eba99e34d1',
    disableSslVerification: true,
  });

  const analyzeParams = {
    // 'url' : url,
    'text': text,
    'features': {
      // 'entities': {
      //   'emotion': true,
      //   'sentiment': true,
      //   'limit': 2,
      // },
      // 'keywords': {
      //   'emotion': true,
      //   'sentiment': true,
      //   'limit': 2,
      // },
      'sentiment': {
          // "targets": ["World Kindness Day"]
      }
    },
  };

  const analysisResults = await naturalLanguageUnderstanding.analyze(analyzeParams);

  // console.log(analysisResults);
  // console.log(analysisResults.result.sentiment.document.score);
  return(analysisResults.result.sentiment.document.score)
}