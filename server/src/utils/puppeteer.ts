const puppeteer = require("puppeteer");

const getPdf = async (url: any) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });

  await page.emulateMediaType("screen");

  // Downlaod the PDF
  const pdfBuffer = await page.pdf({
    /* path: "result.pdf", */
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  await browser.close();

  return pdfBuffer;
};

export default getPdf;
