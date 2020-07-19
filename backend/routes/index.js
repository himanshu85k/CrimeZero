var express = require('express');
var router = express.Router();
let heroes = require('../heroesStore');
let codesToHeroes = {};

(function convertHeroesToCodes() {
  try {
    heroes.forEach(hero => {
      let code = '';
      hero.split('').forEach(letter => {
        switch (letter) {
          case 'A': case 'B': case 'C':
            code += 2;
            break;
          case 'D': case 'E': case 'F':
            code += 3;
            break;
          case 'G': case 'H': case 'I':
            code += 4;
            break;
          case 'J': case 'K': case 'L':
            code += 5;
            break;
          case 'M': case 'N': case 'O':
            code += 6;
            break;
          case 'P': case 'Q': case 'R': case 'S':
            code += 7;
            break;
          case 'T': case 'U': case 'V':
            code += 8;
            break;
          case 'W': case 'X': case 'Y': case 'Z':
            code += 9;
            break;
          default:
            code += 1;
        }
      });
      codesToHeroes[code] = hero;
    });
    console.log('Heroes mapped to Codes');
  } catch(e) {
    console.log('Exception occurred at converting heroes to codes: ', e);
  }  
})();

/* GET home page. */
router.get('/', function (req, res, next) {
  const code = req.query.code;
  const hero = codesToHeroes[code];
  if (hero) {
    res.status(200).json({
      message: `${hero} is here`
    })
  } else {
    res.status(404).json({
      message: 'No hero found for code ' + code
    })
  }
});

module.exports = router;
