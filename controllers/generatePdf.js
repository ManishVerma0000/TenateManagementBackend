const puppeteer = require("puppeteer")
const axios = require("axios")
const fs = require('fs');
const path = require('path');


const generatepdf = async (req, res) => {
    console.log('api is hit')
    try {
        const html1 = `<html>

        </html>`;

        if (html1) {
            puppeteer
                .launch()
                .then(async browser => {
                    const page = await browser.newPage();
                    const html = html1;
                    await page.setContent(html, {
                        waitUntil: 'domcontentloaded'
                    });

                    const pdfBuffer = await page.pdf({
                        format: 'letter'
                    });
                    const pdfilename = Date.now();
                    const baseDirectory = './pdf';
                    await page.pdf({
                        format: 'letter',
                        path: `${baseDirectory}/${pdfilename}.pdf`
                    });
                    await browser.close();
                    const pdfUrl = `http://172.19.224.1:5000/pdf/${pdfilename}.pdf`;
                    return res.status(200).send({ data: pdfUrl });
                })
                .catch(error => {
                    console.error(error);
                    return res.status(400).send({ message: error.message });
                });
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ message: error.message })
    }
}

module.exports = generatepdf