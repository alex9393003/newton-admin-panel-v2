import { PDFDocument, rgb } from 'pdf-lib';

async function generatePdf(data) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);
  
    const title = 'Sample PDF Export';
    const columns = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9', 'col10'];
    const numberOfRows = 25;
    const columnWidth = 50;
    const rowHeight = 20;
  
    const titleX = 40;
    const titleY = 740;
    const titleFontSize = 20;
  
    const tableX = 40;
    const tableY = 700;
    const headerFontSize = 12;
    const cellFontSize = 10;
  
    // Draw the title
    page.drawText(title, {
      x: titleX,
      y: titleY,
      size: titleFontSize,
      color: rgb(0, 0, 0),
    });
  
    // Draw the column headers
    for (let i = 0; i < columns.length; i++) {
      page.drawText(columns[i], {
        x: tableX + i * columnWidth,
        y: tableY,
        size: headerFontSize,
        color: rgb(0, 0, 0),
      });
    }
  
    // Draw the table cells with data
    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col < columns.length; col++) {
        const cellData = data[row][col];
        const xPos = tableX + col * columnWidth;
        const yPos = tableY - (row + 1) * rowHeight;
  
        page.drawText(cellData, {
          x: xPos,
          y: yPos,
          size: cellFontSize,
          color: rgb(0, 0, 0),
        });
      }
    }
  
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

async function exportPdf(data) {
  const pdfBytes = await generatePdf(data);

  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
  link.download = 'sample_export.pdf';
  link.click();
}

export { exportPdf };