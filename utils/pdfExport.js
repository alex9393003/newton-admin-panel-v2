import { PDFDocument, rgb } from 'pdf-lib';

// async function generatePdf(data) {
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([612, 792]);
  
//     const title = 'Sample PDF Export';
//     const columns = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9', 'col10'];
//     const numberOfRows = 25;
//     const columnWidth = 50;
//     const rowHeight = 20;
  
//     const titleX = 40;
//     const titleY = 740;
//     const titleFontSize = 20;
  
//     const tableX = 40;
//     const tableY = 700;
//     const headerFontSize = 12;
//     const cellFontSize = 10;
  
//     // Draw the title
//     page.drawText(title, {
//       x: titleX,
//       y: titleY,
//       size: titleFontSize,
//       color: rgb(0, 0, 0),
//     });
  
//     // Draw the column headers
//     for (let i = 0; i < columns.length; i++) {
//       page.drawText(columns[i], {
//         x: tableX + i * columnWidth,
//         y: tableY,
//         size: headerFontSize,
//         color: rgb(0, 0, 0),
//       });
//     }
  
//     // Draw the table cells with data
//     for (let row = 0; row < numberOfRows; row++) {
//       for (let col = 0; col < columns.length; col++) {
//         const cellData = data[row][col];
//         const xPos = tableX + col * columnWidth;
//         const yPos = tableY - (row + 1) * rowHeight;
  
//         page.drawText(cellData, {
//           x: xPos,
//           y: yPos,
//           size: cellFontSize,
//           color: rgb(0, 0, 0),
//         });
//       }
//     }
  
//     const pdfBytes = await pdfDoc.save();
//     return pdfBytes;
//   }

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateCSV(payload) {
    const vitalsHeaders = ['Height', 'Weight', 'Temperature', 'Systolic', 'Diastolic', 'Pulse', 'Respiration'];
    const thinHeaders = ['Physiotherapy #', 'Room Assignments', 'Physio', 'TX'];
    const primaryHeaders = ['Spinal', 'Sides', 'Objective Findings', 'Physiotherapies', 'Treatment'];
    
    const spinalSubHeaders = ['Levels', 'Regions'];
    const sidesSubHeaders = ['L', 'R', 'B'];
    const objFindingsSubHeaders = ['Sublux', 'Muscle Spasms', 'Trigger Points', 'Tenderness', 'Numbness', 'Edema', 'Swelling', 'Reduced Motion'];
    const physioSubHeaders = ['Positioning', 'Cold Pack', 'Hot Pack', 'Elect Stim', 'Traction', 'Massage'];
    const treatmentSubHeaders = ['Positioning', 'Techniques', 'Manipulation'];
    
    const mainRowHeaders = ['C-Region', 'Full-T Region', 'Full-L Region', 'Full-Sac-Region'];
    const cRegionSubHeaders = ['Sub Occ.', 'Upper Cerv', 'Mid-Cerv.', 'Lower Cerv'];
    const tRegionSubHeaders = ['Upper T', 'Mid T', 'Lower T.'];
    const lRegionSubHeaders = ['Upper L', 'Lower L'];
    const sacRegionSubHeaders = ['Upper Sac', 'Lower Sac'];
    
    const subOccRows = ['Occ', 'C1'];
    const upperCervRows = ['C2', 'C3'];
    const midCervRows = ['C4', 'C5'];
    const lowerCervRows = ['C6', 'C7'];
    const upperTRows = ['T1', 'T2', 'T3'];
    const midTRows = ['T4', 'T5', 'T6', 'T7'];
    const lowerTRows = ['T8', 'T9', 'T10', 'T11', 'T12'];
    const upperLRows = ['L1', 'L2', 'L3'];
    const lowerLRows = ['L4', 'L5'];
    const upperSacRows = ['S1', 'S2', 'S3'];
    const lowerSacRows = ['S4', 'S5'];
    
    let csvContent = "";
  
    // Add Vitals section
    csvContent += vitalsHeaders.join(",") + "\n";
    csvContent += vitalsHeaders.map(header => payload[header]).join(",") + "\n\n";
  
    // Add thin section
    csvContent += thinHeaders.map(header => `${header} : ${payload[header]}`).join(",") + "\n\n";
  
    // Add main headers and sub-headers
    csvContent += primaryHeaders.join(",") + "\n";
    csvContent += [spinalSubHeaders, sidesSubHeaders, objFindingsSubHeaders, physioSubHeaders, treatmentSubHeaders].map(headers => headers.join(",")).join(",,,") + "\n\n";
  

 // Add row headings and data
 const rowSections = [
    { main: mainRowHeaders[0], subs: cRegionSubHeaders, thirdLevel: [subOccRows, upperCervRows, midCervRows, lowerCervRows] },
    { main: mainRowHeaders[1], subs: tRegionSubHeaders, thirdLevel: [upperTRows, midTRows, lowerTRows] },
    { main: mainRowHeaders[2], subs: lRegionSubHeaders, thirdLevel: [upperLRows, lowerLRows] },
    { main: mainRowHeaders[3], subs: sacRegionSubHeaders, thirdLevel: [upperSacRows, lowerSacRows] },
  ];

  rowSections.forEach(section => {
    csvContent += section.main + "," + ",".repeat(primaryHeaders.length - 1) + "\n";
    section.subs.forEach((subHeader, subIndex) => {
      csvContent += "," + subHeader + ",".repeat(primaryHeaders.length - 1) + "\n";
      section.thirdLevel[subIndex].forEach(thirdLevelRow => {
        const rowData = [
          "," + thirdLevelRow,
          sidesSubHeaders.map(() => randomIntFromInterval(1, 10)).join(","),
          objFindingsSubHeaders.map(() => randomIntFromInterval(1, 10)).join(","),
          physioSubHeaders.map(() => randomIntFromInterval(1, 10)).join(","),
          treatmentSubHeaders.map(() => randomIntFromInterval(1, 10)).join(","),
        ].join(",,");
        csvContent += rowData + "\n";
      });
    });
  });

  return csvContent;
}


async function generatePdf(payload) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);
  
    const vitalsColumnHeaders = [
      'Height',
      'Weight',
      'Temperature',
      'Systolic',
      'Diastolic',
      'Pulse',
      'Respiration',
    ];
    const otherLabels = ['Physiotherapy #', 'Room Assignments', 'Physio', 'TX'];
  
    const mainColumnHeaders = [
      'Spinal',
      'Sides',
      'Objective Findings',
      'Physiotherapies',
      'Treatment',
    ];
    const spinalSubColumns = ['Levels', 'Regions'];
    const sidesSubColumns = ['L', 'R', 'B'];
    const objectiveFindingsSubColumns = [
      'Sublux',
      'Muscle Spasms',
      'Trigger Points',
      'Tenderness',
      'Numbness',
      'Edema',
      'Swelling',
      'Reduced Motion',
    ];
    const physiotherapiesSubColumns = [
      'Positioning',
      'Cold Pack',
      'Hot Pack',
      'Elect Stim',
      'Traction',
      'Massage',
    ];
    const treatmentSubColumns = ['Positioning', 'Techniques', 'Manipulation'];
  
    // Add code from Part 2 here

    // Draw Vitals section
    const vitalsStartX = 40;
    const vitalsStartY = 740;
    const vitalsFontSize = 10;
    const vitalsSpacing = 70;

    vitalsColumnHeaders.forEach((header, index) => {
    page.drawText(header, {
        x: vitalsStartX + index * vitalsSpacing,
        y: vitalsStartY,
        size: vitalsFontSize,
        color: rgb(0, 0, 0),
    });
    page.drawText(String(payload.vitals[header]), {
        x: vitalsStartX + index * vitalsSpacing,
        y: vitalsStartY - 15,
        size: vitalsFontSize,
        color: rgb(0, 0, 0),
    });
    });

    // Draw otherLabels section
    const otherLabelsStartX = 40;
    const otherLabelsStartY = 690;
    const otherLabelsFontSize = 10;
    const otherLabelsSpacing = 120;

    otherLabels.forEach((label, index) => {
    const payloadKey = label.replace(/ /g, "").toLowerCase();
    if (payload[payloadKey] !== undefined) {
        page.drawText(`${label} : ${payload[payloadKey].toString()}`, {
        x: otherLabelsStartX + index * otherLabelsSpacing,
        y: otherLabelsStartY,
        size: otherLabelsFontSize,
        color: rgb(0, 0, 0),
        });
    }
    });

    // Draw mainColumnHeaders
    const mainColumnHeadersStartX = 40;
    const mainColumnHeadersStartY = 650;
    const mainColumnHeadersFontSize = 12;

    mainColumnHeaders.forEach((header, index) => {
    const x = mainColumnHeadersStartX + index * 160;
    const y = mainColumnHeadersStartY;
    page.drawText(header, { x, y, size: mainColumnHeadersFontSize, color: rgb(0, 0, 0) });
    });
    // Draw the second thin one-line section
    const thinSectionFontSize = 10;
    const thinSectionStartY = mainColumnHeadersStartY - 30;

    const thinSectionLabels = ['Physiotherapy #', 'Room Assignments', 'Physio', 'TX'];
    const thinSectionValues = [
        String(payload.physiotherapyNumber),
        String(payload.roomAssignments),
        String(payload.physio),
        String(payload.tx),
      ];

    thinSectionLabels.forEach((label, index) => {
    const x = mainColumnHeadersStartX + index * 120;
    const y = thinSectionStartY;
    page.drawText(`${label}: ${thinSectionValues[index]}`, {
        x,
        y,
        size: thinSectionFontSize,
        color: rgb(0, 0, 0),
    });
    });
    // Draw subcolumn headers and table rows
        const subColumnHeadersFontSize = 10;
        const subColumnHeadersStartY = mainColumnHeadersStartY - 20;
        const rowHeight = 20;
        const spinalColumnWidth = 60;
        const sidesColumnWidth = 25;
        const objectiveColumnWidth = 60;
        const physioColumnWidth = 60;
        const treatmentColumnWidth = 60;

        const drawSubColumnHeaders = (subColumns, startX) => {
        subColumns.forEach((header, index) => {
            const x = startX + index * spinalColumnWidth;
            const y = subColumnHeadersStartY;
            page.drawText(header, { x, y, size: subColumnHeadersFontSize, color: rgb(0, 0, 0) });
        });
        };

        drawSubColumnHeaders(spinalSubColumns, mainColumnHeadersStartX);
        drawSubColumnHeaders(sidesSubColumns, mainColumnHeadersStartX + spinalColumnWidth * 2);
        drawSubColumnHeaders(
        objectiveFindingsSubColumns,
        mainColumnHeadersStartX + spinalColumnWidth * 2 + sidesColumnWidth * 3
        );
        drawSubColumnHeaders(
        physiotherapiesSubColumns,
        mainColumnHeadersStartX + spinalColumnWidth * 2 + sidesColumnWidth * 3 + objectiveColumnWidth * 8
        );
        drawSubColumnHeaders(
        treatmentSubColumns,
        mainColumnHeadersStartX + spinalColumnWidth * 2 + sidesColumnWidth * 3 + objectiveColumnWidth * 8 + physioColumnWidth * 6
        );

        // Draw table rows
        const tableStartY = subColumnHeadersStartY - 20;
        const rowFontSize = 10;
        const spinalData = payload.spinalData;

        const drawRow = (row, y) => {
            spinalData[row].forEach((cell, colIndex) => {
              let x = mainColumnHeadersStartX + colIndex * spinalColumnWidth;
          
              if (colIndex === 1) {
                x += spinalColumnWidth;
              } else if (colIndex > 1) {
                x += sidesColumnWidth * (colIndex - 1);
              }
          
              page.drawText(String(cell), { x, y, size: rowFontSize, color: rgb(0, 0, 0) });
            });
          };

        Object.keys(spinalData).forEach((row, index) => {
        const y = tableStartY - index * rowHeight;
        drawRow(row, y);
        });
        // Draw a title at the top of the page
        const title = 'Sample PDF Export';
        const titleFontSize = 20;
        const titleWidth = title.length * titleFontSize * 0.6;
        page.drawText(title, {
        x: (612 - titleWidth) / 2,
        y: 770,
        size: titleFontSize,
        color: rgb(0, 0, 0),
        });

        // Serialize the PDF
        const pdfBytes = await pdfDoc.save();

        exportCsv(payload);

        return pdfBytes;
}

// async function exportPdf(data) {
//   const pdfBytes = await generatePdf(data);

//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
//   link.download = 'sample_export.pdf';
//   link.click();
// }

async function exportPdf(payload) {
    const pdfBytes = await generatePdf(payload);
  
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));
    link.download = "sample_export.pdf";
    link.click();
  }

  const samplePayload = {
    Height: 170,
    Weight: 70,
    Temperature: 98.6,
    Systolic: 120,
    Diastolic: 80,
    Pulse: 70,
    Respiration: 18,
    'Physiotherapy #': 5,
    'Room Assignments': 3,
    Physio: 'John Doe',
    TX: '1234',
  };
  
  const csv = generateCSV(samplePayload);
  console.log(csv);

export { exportPdf };