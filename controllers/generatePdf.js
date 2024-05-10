const puppeteer = require("puppeteer")
const axios = require("axios")
const fs = require('fs');
const path = require('path');
const tenat = require("../schema/tenatModel");

// const IP_ADDRESS = require("../ipAddress")
const generatepdf = async (req, res) => {

    console.log(req.body, 'this is the data in the body side')

    const tenateDetails = await tenat.findById({ _id: req.body.id })
    try {
        const html1 = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title></title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="style.css">
            <style>

                *,
    *::after,
    *::before{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    :root{
        --blue-color: #0c2f54;
        --dark-color: #535b61;
        --white-color: #fff;
    }

    ul{
        list-style-type: none;
    }
    ul li{
        margin: 2px 0;
    }

    /* text colors */
    .text-dark{
        color: var(--dark-color);
    }
    .text-blue{
        color: var(--blue-color);
    }
    .text-end{
        text-align: right;
    }
    .text-center{
        text-align: center;
    }
    .text-start{
        text-align: left;
    }
    .text-bold{
        font-weight: 700;
    }
    /* hr line */
    .hr{
        height: 1px;
        background-color: rgba(0, 0, 0, 0.1);
    }
    /* border-bottom */
    .border-bottom{
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    body{
        font-family: 'Poppins', sans-serif;
        color: var(--dark-color);
        font-size: 14px;
    }
    .invoice-wrapper{
        min-height: 100vh;
        background-color: rgba(0, 0, 0, 0.1);
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .invoice{
        max-width: 850px;
        margin-right: auto;
        margin-left: auto;
        background-color: var(--white-color);
        padding: 70px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        min-height: 920px;
    }
    .invoice-head-top-left img{
        width: 130px;
    }
    .invoice-head-top-right h3{
        font-weight: 500;
        font-size: 27px;
        color: var(--blue-color);
    }
    .invoice-head-middle, .invoice-head-bottom{
        padding: 16px 0;
    }
    .invoice-body{
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
    }
    .invoice-body table{
        border-collapse: collapse;
        border-radius: 4px;
        width: 100%;
    }
    .invoice-body table td, .invoice-body table th{
        padding: 12px;
    }
    .invoice-body table tr{
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .invoice-body table thead{
        background-color: rgba(0, 0, 0, 0.02);
    }
    .invoice-body-info-item{
        display: grid;
        grid-template-columns: 80% 20%;
    }
    .invoice-body-info-item .info-item-td{
        padding: 12px;
        background-color: rgba(0, 0, 0, 0.02);
    }
    .invoice-foot{
        padding: 30px 0;
    }
    .invoice-foot p{
        font-size: 12px;
    }
    .invoice-btns{
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
    .invoice-btn{
        padding: 3px 9px;
        color: var(--dark-color);
        font-family: inherit;
        border: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .invoice-head-top, .invoice-head-middle, .invoice-head-bottom{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding-bottom: 10px;
    }

    @media screen and (max-width: 992px){
        .invoice{
            padding: 40px;
        }
    }

    @media screen and (max-width: 576px){
        .invoice-head-top, .invoice-head-middle, .invoice-head-bottom{
            grid-template-columns: repeat(1, 1fr);
        }
        .invoice-head-bottom-right{
            margin-top: 12px;
            margin-bottom: 12px;
        }
        .invoice *{
            text-align: left;
        }
        .invoice{
            padding: 28px;
        }
    }

    .overflow-view{
        overflow-x: scroll;
    }
    .invoice-body{
        min-width: 600px;
    }

    @media print{
        .print-area{
            visibility: visible;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            overflow: hidden;
        }

        .overflow-view{
            overflow-x: hidden;
        }

        .invoice-btns{
            display: none;
        }
    }

            </style>

        </head>
        <body>

            <div class = "invoice" id = "print-area">
                <div class = "invoice">
                    <div class = "invoice-container">
                        <div class = "invoice-head">
                            <div class = "invoice-head-top">
                                <div class = "invoice-head-top-left text-start">
                                    <img src = "images/logo.png">
                                </div>
                                <div class = "invoice-head-top-right text-end">
                                    <h3>Invoice</h3>
                                </div>
                            </div>
                            <div class = "hr"></div>
                            <div class = "invoice-head-middle">
                                <div class = "invoice-head-middle-left text-start">
                                    <p><span class = "text-bold">Date</span>: 05/12/2020</p>
                                </div>
                                <div class = "invoice-head-middle-right text-end">
                                    <p><spanf class = "text-bold">Invoice No:</span>16789</p>
                                </div>
                            </div>
                            <div class = "hr"></div>
                            <div class = "invoice-head-bottom">
                                <div class = "invoice-head-bottom-left">
                                    <ul>
                                        <li class = 'text-bold'>Invoiced To:</li>
                                        <li>${tenateDetails.email}</li>
                                        <li>${tenateDetails.roomNo}</li>
                                         <li>${tenateDetails.addhar}</li>
                                        <li>${tenateDetails.rent}</li>
                                        <li>${tenateDetails.buildingId}</li>
                                    </ul>
                                </div>
                                <div class = "invoice-head-bottom-right">
                                    <ul class = "text-end">
                                        <li class = 'text-bold'>Pay To:</li>
                                        <li>Koice Inc.</li>
                                        <li>2705 N. Enterprise</li>
                                        <li>Orange, CA 89438</li>
                                        <li>contact@koiceinc.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class = "overflow-view">
                            <div class = "invoice-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <td class = "text-bold">ROOM RENT</td>
                                            <td class = "text-bold">ELECTRICITY BILL</td>
                                            <td class = "text-bold">DEPOSIT</td>
                                            <td class = "text-bold">BROKERAGE</td>
                                            <td class = "text-bold">PENDING AMOUNT</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Design</td>
                                            <td>Creating a website design</td>
                                            <td>$50.00</td>
                                            <td>10</td>
                                            <td class = "text-end">$500.00</td>
                                        </tr>
                                        <tr>
                                            <td>Development</td>
                                            <td>Website Development</td>
                                            <td>$50.00</td>
                                            <td>10</td>
                                            <td class = "text-end">$500.00</td>
                                        </tr>
                                        <tr>
                                            <td>SEO</td>
                                            <td>Optimize the site for search engines (SEO)</td>
                                            <td>$50.00</td>
                                            <td>10</td>
                                            <td class = "text-end">$500.00</td>
                                        </tr>
                                        <!-- <tr>
                                            <td colspan="4">10</td>
                                            <td>$500.00</td>
                                        </tr> -->
                                    </tbody>
                                </table>
                                <div class = "invoice-body-bottom">
                                    <div class = "invoice-body-info-item border-bottom">
                                        <div class = "info-item-td text-end text-bold">Sub Total:</div>
                                        <div class = "info-item-td text-end">2150.00</div>
                                    </div>
                                    <div class = "invoice-body-info-item border-bottom">
                                        <div class = "info-item-td text-end text-bold">Tax:</div>
                                        <div class = "info-item-td text-end">$215.00</div>
                                    </div>
                                    <div class = "invoice-body-info-item">
                                        <div class = "info-item-td text-end text-bold">Total:</div>
                                        <div class = "info-item-td text-end">$21365.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class = "invoice-foot text-center">
                            <p><span class = "text-bold text-center">NOTE:&nbsp;</span>This is computer generated receipt and does not require physical signature.</p>

                            <div class = "invoice-btns">
                                <button type = "button" class = "invoice-btn" onclick="printInvoice()">
                                    <span>
                                        <i class="fa-solid fa-print"></i>
                                    </span>
                                    <span>Print</span>
                                </button>
                                <button type = "button" class = "invoice-btn">
                                    <span>
                                        <i class="fa-solid fa-download"></i>
                                    </span>
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src = "script.js"></script>
        </body>
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
                        format: 'A4',
                        path: `${baseDirectory}/${pdfilename}.pdf`
                    });
                    await browser.close();
                    const pdfUrl = `${process.env.BACKENDURL}/pdf/${pdfilename}.pdf`;
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



const pdf = async (req, res) => {
    try {

        const tenateid = req.query.id;
        if (!tenateid) {
            await res.status(400).send('please enter the tenate id')
        } else {
            const data = await tenat.findById({ _id: tenateid })
            // console.log(data, 'this is the value of the id')
            if (data) {
                axios.post(process.env.BACKENDURL + '/api/generatepdf', data).then(async (response) => {
                    console.log(response.data.data, 'this is the value of the response')
                    await res.status(200).send(response.data.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }


    } catch (error) {
        await res.status(400).send(error.message)

    }
}




module.exports = { generatepdf, pdf }