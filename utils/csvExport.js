// Import the necessary dependencies
import { saveAs } from 'file-saver';
import { cellMappings } from './cellMappings';

// Helper function to convert an alphanumeric cell reference to row and column index
function cellReferenceToIndex(ref) {
    const match = ref.match(/([A-Z]+)(\d+)/);
    const col = match[1]
      .split('')
      .reduce((acc, char) => acc * 26 + char.charCodeAt(0) - 64, 0);
    const row = parseInt(match[2], 10);
    return { row: row - 1, col: col - 1 };
  }

//   function applyMergedCells(cells, mergedCells) {
//     for (const [startRef, endRef] of mergedCells) {
//       const { row: startRow, col: startCol } = cellReferenceToIndex(startRef);
//       const { row: endRow, col: endCol } = cellReferenceToIndex(endRef);
  
//       for (let row = startRow; row <= endRow; row++) {
//         for (let col = startCol; col <= endCol; col++) {
//           if (row !== startRow || col !== startCol) {
//             cells[row][col] = null;
//           }
//         }
//       }
//     }
//   }

// Define the generateCSV function
function generateCSV(payload) {
    console.log('FUNCTION BEING CALLED');
  // Create a 2D array representing the cells of the CSV content
  const rows = 42; // Define the number of rows
  const cols = 29; // Define the number of columns (A to AC)
  const cells = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(''));

console.log('cells are ', cells);
console.log('cell mappings are ', cellMappings);
  // Populate the cells based on the cell mappings
  for (const [ref, value] of Object.entries(cellMappings)) {
    const { row, col } = cellReferenceToIndex(ref);
    console.log('ref is ', ref);
    console.log('value is ,', value)
    console.log('row is ', row);
    console.log('col is ', col);
    console.log('typeof value is ', typeof value);
    try {
        if (typeof value === 'function') {
          cells[row][col] = value(payload);
        } else {
          cells[row][col] = value;
        }
      } catch (error) {
        console.error(`Error populating cell ${ref}:`, error);
        cells[row][col] = ''; // Set an empty string or a default value in case of error
      }
    }

  // Apply merged cells
//   applyMergedCells(cells, mergedCells);

  // Convert the 2D array to a CSV formatted string
  const csvContent = cells
    .map((row) => row.filter((cell) => cell !== null).join(','))
    .join('\n');

  // Create a Blob object with the CSV file content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Export the CSV file to the user
  saveAs(blob, 'exported_data.csv');
}

// Export the generateCSV function
export { generateCSV };