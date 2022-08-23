import puppeteer from "puppeteer";

const getPdf = async (url: string) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });

  await page.emulateMediaType("screen");

  // Downlaod the PDF
  const pdfBuffer = await page.pdf({
    /* path: "result.pdf", */
    printBackground: true,
    format: "A4",
  });

  await browser.close();

  return pdfBuffer;
};

export default getPdf;
