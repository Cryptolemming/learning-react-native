var Deck = require('./Deck');
var Card = require('./Card');

var SQLite = require('react-native-sqlite');


class Database {
  query(query, params, errorCB, rowCB, completeCB) {
    var database = SQLite.open('development.db');

    database.executeSQL(query, params, rowCB, completeCB);
    /*
    SQLite.open('development.db', (error, database) => {
      if (error) {
        console.error('Failed to open  database: ', error);
        errorCB(error);
      }

      function completeCallback(completeError) {
        database.close((closeError) => {
          console.error('Failed to close database: ', closeError);
          errorCB(closeError);
        });

        if (completeError) {
          console.error('Error from completeCallback:', completeError);
          errorCB(completeError);
        }

        completeCB(completeError);
      }

      database.executeSQL(query, params, rowCB, completeCallback);
    });

    */
  }
}

class Data {
  constructor() {


    var d = new Deck('Esperanto Vocabulary');
    this.decks = [
      d
    ];
    this.cards = [
      new Card('saluton', 'hello', d.id),
      new Card('ĝis', 'bye', d.id)
    ];
  }

  loadDecks() {

    function errorCB(error) {
      console.log('in errorCB w/ error: ', error);
    }

    function rowCB(rowData) {
      console.log('zomg row data: ');
      console.log(rowData);
    }

    function completeCB(err) {
      console.log(err);
      console.log('d-d-done!');
    }

    (new Database()).query('SELECT * FROM decks', [], errorCB, rowCB, completeCB);
    return this.decks;
  }

  loadCards() {
    return this.cards;
  }
}

module.exports = Data;
