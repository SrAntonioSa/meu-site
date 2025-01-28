// Juntar PDFs
document.getElementById("merge-pdf-button").addEventListener("click", async () => {
    const inputFiles = document.getElementById("merge-pdf-files").files;
    if (inputFiles.length < 2) {
      alert("Por favor, selecione ao menos 2 arquivos PDF para juntar.");
      return;
    }
  
    const mergedPdf = await PDFLib.PDFDocument.create();
  
    for (let file of inputFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
  
    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.getElementById("merge-pdf-download");
    downloadLink.href = url;
    downloadLink.classList.remove("hidden");
  });
  
  // Converter imagens para PDF
  document.getElementById("convert-images-button").addEventListener("click", async () => {
    const inputFiles = document.getElementById("image-files").files;
    if (inputFiles.length === 0) {
      alert("Por favor, selecione pelo menos uma imagem para converter.");
      return;
    }
  
    const pdfDoc = await PDFLib.PDFDocument.create();
  
    for (let file of inputFiles) {
      const imageBytes = await file.arrayBuffer();
      let image;
      if (file.type === "image/jpeg") {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (file.type === "image/png") {
        image = await pdfDoc.embedPng(imageBytes);
      }
  
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }
  
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.getElementById("image-pdf-download");
    downloadLink.href = url;
    downloadLink.classList.remove("hidden");
  });
  