const puppeteer = require("puppeteer")
const axios = require("axios")
const fs = require('fs');
const path = require('path');
const tenat = require("../schema/tenatModel");

// const IP_ADDRESS = require("../ipAddress")
const generatepdf = async (req, res) => {



    // const tenateDetails = await tenat.findById({ _id: req.body.id })
    // console.log(tenateDetails)
    try {
        const html1 = `<!DOCTYPE html>
<html>
<head>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <style>
        body {
            margin-top: 20px;
            color: #484b51;
            font-family: Arial, sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .text-secondary-d1 {
            color: #728299;
        }

        .page-header {
            margin: 0 0 1rem;
            padding-bottom: 1rem;
            padding-top: .5rem;
            border-bottom: 1px dotted #e2e2e2;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .page-title {
            padding: 0;
            margin: 0;
            font-size: 1.75rem;
            font-weight: 300;
        }

        .brc-default-l1 {
            border-color: #dce9f0;
        }

        hr {
            margin-top: 1rem;
            margin-bottom: 1rem;
            border: 0;
            border-top: 1px solid rgba(0,0,0,.1);
        }

        .text-grey-m2 {
            color: #888a8d;
        }

        .text-success-m2 {
            color: #86bd68;
        }

        .font-bolder, .text-600 {
            font-weight: 600;
        }

        .text-110 {
            font-size: 110%;
        }

        .text-blue {
            color: #478fcc;
        }

        .pb-25, .py-25 {
            padding-bottom: .75rem;
        }

        .pt-25, .py-25 {
            padding-top: .75rem;
        }

        .bgc-default-tp1 {
            background-color: rgba(121,169,197,.92);
        }

        .bgc-default-l4, .bgc-h-default-l4:hover {
            background-color: #f3f8fa;
        }

        .page-header .page-tools {
            align-self: flex-end;
        }

        .btn-light {
            color: #757984;
            background-color: #f5f6f9;
            border-color: #dddfe4;
            padding: 5px 10px;
            border: 1px solid #dddfe4;
            text-decoration: none;
        }

        .w-2 {
            width: 1rem;
        }

        .text-120 {
            font-size: 120%;
        }

        .text-primary-m1 {
            color: #4087d4;
        }

        .text-danger-m1 {
            color: #dd4949;
        }

        .text-blue-m2 {
            color: #68a3d5;
        }

        .text-150 {
            font-size: 150%;
        }

        .text-60 {
            font-size: 60%;
        }

        .text-grey-m1 {
            color: #7b7d81;
        }

        .align-bottom {
            vertical-align: bottom;
        }

        /* Custom Styles */
        .invoice-details {
            margin-left: auto; /* Align to the right */
            text-align: right;
        }

        .invoice {
            margin-left: 20px; /* Add space before "invoice" text */
        }
    </style>
</head>
<body>
<div class="page-content container">
    <div class="page-header text-blue-d2">
        <h1 class="page-title text-secondary-d1">
            <span class="invoice">Invoice</span>
            <small class="page-info">
                <i class="fa fa-angle-double-right text-80"></i>
                ID: ${req.body._id}
            </small>
        </h1>

        
    </div>

    <div class="container px-0">
        <div class="row mt-4">
            <div class="col-12 col-lg-12">
                <div class="row">
                    <div class="col-12">
                        <div class="text-center text-150">
                           <i class="fa fa-home fa-2x text-success-m2 mr-1"></i>
                            <span class="text-default-d3">Jaru Construction</span>
                            <div>
                             <span class="text-default-d3" style="font-size: smaller;">plot no. 88 Rushabh Nagar Baroi-Mundra Road, Mundra-Kutch</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <!-- .row -->

                <hr class="row brc-default-l1 mx-n1 mb-4" />

                <div class="row">
                    <table class="invoice-details">
                        <tr>
                            <td>
                                <span class="text-sm text-grey-m2 align-middle">To:</span>
                                <span class="text-600 text-110 text-blue align-middle">${req.body.username}</span>
                                <div class="text-grey-m2">
                                    <div class="my-1">
                                      ${req.body.address}
                                    </div>
                                    <div class="my-1">
                                        ${req.body.orgnisation}
                                    </div>
                                    <div class="my-1"><i class="fa fa-phone fa-flip-horizontal text-secondary"></i> <b class="text-600">111-111-111</b></div>
                                </div>
                            </td>
                            <td>
                                <hr class="d-sm-none" />
                                <div class="text-grey-m2" style="margin-left: 55%;">
                                    <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125">ID: #111-222
                                        Invoice
                                    </div>

                                    <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">ID:</span> #111-222</div>

                                    <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">Issue Date:</span> ${new Date().toLocaleDateString()}</div>

                                    <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">Status:</span> <span class="badge badge-warning badge-pill px-25">Unpaid til date</span></div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="mt-4">
                    <table>
                        <thead>
                            <tr class="text-600 text-white bgc-default-tp1 py-25">
                                <th>#</th>
                                <th>Description</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody class="text-95 text-secondary-d3">
                            <tr class="mb-2 mb-sm-0 py-25">
                                <td>1</td>
                                <td>Monthly Rent</td>
                                <td>1</td>
                                <td>${req.body.rent}</td>
                                <td>${req.body.rent}</td>
                            </tr>
                            <tr class="mb-2 mb-sm-0 py-25 bgc-default-l4">
                                <td>2</td>
                                <td>waterCharge</td>
                                <td>1</td>
                                <td>${req.body.waterCharge}</td>
                                <td>${req.body.waterCharge}</td>
                            </tr>
                            <tr class="mb-2 mb-sm-0 py-25">
                                <td>3</td>
                                <td>electricity charge</td>
                                <td>1</td>
                               <td>${req.body.electricitycharge}</td>
                                <td>${req.body.electricitycharge}</td>
                            </tr>
                            <tr class="mb-2 mb-sm-0 py-25">
                                <td>3</td>
                                <td>Other Charge</td>
                                <td>1</td>
                               <td>${req.body.otherCharge}</td>
                                <td>${req.body.otherCharge}</td>
                            </tr>
                        </tbody>
                    </table>

                    <hr />

                    
                </div>

                <div class="row">
                    <table class="invoice-details">
                        <tr>
                            <td>
                                <span class="text-sm text-grey-m2 align-middle">Extra note such as company or payment information...</span>
                                
                            </td>
                            <td>
                                <hr class="d-sm-none" />
                                <div class="text-grey-m2" style="margin-left: 10%;">
                                    <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-100" style="margin-right: 48px;">Sub Total</span> ${parseInt(req.body.rent)}</div>

                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <span class="text-secondary-d1 text-105">Thank you for your business</span>
                    <a href="#" class="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0">Pay Now</a>
                </div>
            </div>
        </div>
    </div>
</div>
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

                    const pdfUrl = `${'http://192.168.1.2:7000'}/pdf/${pdfilename}.pdf`;
                    return res.status(200).send({ data: pdfUrl });
                })
                .catch(error => {
                    console.error(error);
                    return res.status(400).send({ message: error.message });
                });
        }

    } catch (error) {
        console.log(error.message)
        res.status(400).send({ message: error.message })
    }
}



const pdf = async (req, res) => {
    try {

        const tenateid = req.query.id;
        console.log(tenateid, 'this is the value of the tenate idx')
        if (!tenateid) {
            await res.status(400).send('please enter the tenate id')
        } else {
            const data = await tenat.findById({ _id: tenateid })
            // console.log(data, 'this is the value of the id')
            if (data) {
                axios.post('http://192.168.1.2:7000/' + 'api/generatepdf', data).then(async (response) => {
                    // console.log(response.data.data, 'this is the value of the response')
                    await res.status(200).send(response.data.data)
                }).catch((err) => {
                    console.log(err.message)
                })
            }
        }


    } catch (error) {
        console.log(error.message)
        await res.status(400).send(error.message)

    }
}




module.exports = { generatepdf, pdf }