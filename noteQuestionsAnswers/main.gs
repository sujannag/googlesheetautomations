function InsertAnswer(spreadsheet, questionID) {
  // var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  var cellEntry = 'Ans - ';

  sheet.getRange(spreadsheet.getCurrentCell().getRow() + 1, 1, 1, sheet.getMaxColumns()).activate();
  spreadsheet.getActiveSheet().insertRowsBefore(spreadsheet.getActiveRange().getRow(), 1);
  spreadsheet.getActiveRange().offset(0, 0, 1, spreadsheet.getActiveRange().getNumColumns()).activate();
  spreadsheet.getCurrentCell().offset(0, 1).activate();

  // get cell entry
  cellEntry = cellEntry + questionID;
  spreadsheet.getCurrentCell().setValue(cellEntry);

  spreadsheet.getCurrentCell().offset(0, 1).activate();
  spreadsheet.getActiveRangeList().setBackground('#f4d6a3')
  .setBorder(true, true, true, true, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID);
};

// send the cell number on which to perform the actions. The function should just perform the actions and not manipulate the cell activations. if multiple cells needs to be changed, activate and conderned cells but activate the original cell back.
function IdentifyAsQuestion(spreadsheet) {
  // var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getCurrentCell().offset(0, 1).activate();
  spreadsheet.getActiveRangeList().setFontWeight('bold')
  .setBackground('#a4c2f4')
  .setBorder(true, true, true, true, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID);
};

/**
 * The event handler triggered when editing the spreadsheet.
 * @param {Event} e The onEdit event.
 * @see https://developers.google.com/apps-script/guides/triggers#onedite
 */
function onEdit(e) {

  // Get the source for the current edited cell
  const spreadsheet = e.source;

  // Get the value of the cell on which the edit was done.
  const cellValue = e.value;
  
  // if the edit contains a 'Q', get the cell number of the immediate next cell
  if (cellValue.charAt(0) == 'Q')
  {
    // Set the next cell as the stage for the question
    IdentifyAsQuestion(spreadsheet);
    InsertAnswer(spreadsheet, cellValue)

    // Activate the question cell
    spreadsheet.getCurrentCell().offset(-1, 0).activate();
  }
}