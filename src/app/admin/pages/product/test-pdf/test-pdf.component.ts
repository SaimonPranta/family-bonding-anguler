import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfFonts from './custom-fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Poppins: {
    normal: 'Poppins-Regular.ttf',
    bold: 'Poppins-SemiBold.ttf',
    italics: 'Poppins-Italic.ttf',
    bolditalics: 'Poppins-Italic.ttf',
  },
  Sutonny: {
    normal: 'sutonny.ttf',
    bold: 'sutonny.ttf',
    italics: 'sutonny.ttf',
    bolditalics: 'sutonny.ttf',
  },
  Nikosh: {
    normal: 'nikosh.ttf',
    bold: 'nikosh.ttf',
    italics: 'nikosh.ttf',
    bolditalics: 'nikosh.ttf',
  },
};


@Component({
  selector: 'app-test-pdf',
  templateUrl: './test-pdf.component.html',
  styleUrls: ['./test-pdf.component.scss']
})
export class TestPdfComponent implements OnInit {

  constructor() {
    // (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  private static get pdfMakeStyleObject(): object {
    return {
      p: {
        font: 'Poppins',
        fontSize: 9,
      },
      pBn: {
        font: 'Nikosh',
        fontSize: 9,
        lineHeight: 2
      },
      tableHead: {
        font: 'Poppins',
        fontSize: 9,
        bold: true,
        margin: [5, 2],
      },
      tableBody: {
        font: 'Poppins',
        fontSize: 9,
        margin: [5, 2],
      },
      gapY: {
        margin: [0, 8]
      }

    }
  }

  ngOnInit(): void {
  }

  /**
   * NEW PDF MAKE
   * ASYNC FUNCTION (FOR IMAGE COMPRESS)
   */

  async downloadPdfInvoice(fileName: string) {

    const documentDefinition = await this.getInvoiceDocument();

    pdfMake.createPdf(documentDefinition).download(`${fileName}.pdf`);

  }

  dataTableForPdfMake() {
    const tableHead = [
      {
        text: 'Product',
        style: 'tableHead',
        // border: [true, true, true, true],
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Quantity',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Price',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Total',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
    ];
    const products = [
      {name: 'Bela Furabar Agy', price: 600, quantity: 2, total: 1200},
      {name: 'Rahe Belayet', price: 300, quantity: 1, total: 300},
    ];
    const finalTableBody = [tableHead];
    products.forEach(m => {
      const res = [
        {
          text: m.name,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.quantity,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.price,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.total,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
      ];
      // @ts-ignore
      finalTableBody.push(res)
    })

    return finalTableBody;

  }


  getItemTable() {
    return {
      table: {
        widths: ['*', 'auto', 'auto', 'auto'],
        body: this.dataTableForPdfMake()
        // body: [
        //   [
        //     {
        //       text: 'Product',
        //       style: 'tableHead',
        //       // border: [true, true, true, true],
        //       fillColor: '#DEDEDE',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //     {
        //       text: 'Quantity',
        //       style: 'tableHead',
        //       fillColor: '#DEDEDE',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //     {
        //       text: 'Price',
        //       style: 'tableHead',
        //       fillColor: '#DEDEDE',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //     {
        //       text: 'Total',
        //       style: 'tableHead',
        //       fillColor: '#DEDEDE',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //   ],
        //   [
        //     {
        //       text: 'Bela Furabar Agy',
        //       style: 'tableBody',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //     {
        //       text: '2',
        //       style: 'tableBody',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //     {
        //       text: '500',
        //       style: 'tableBody',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //     {
        //       text: '1000',
        //       style: 'tableBody',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //   ],
        //   [
        //     {
        //       text: 'Rahe Belayet',
        //       style: 'tableBody',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //     {
        //       text: '1',
        //       style: 'tableBody',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //     {
        //       text: '300',
        //       style: 'tableBody',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //     {
        //       text: '300',
        //       style: 'tableBody',
        //       borderColor: ['#eee', '#eee', '#eee', '#eee'],
        //     },
        //   ]
        // ]
      }
    };
  }

  getCalculationTable() {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: 'SubTotal',
              style: 'tableHead',
              // border: [true, true, true, true],
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
            {
              text: '502 TK',
              style: 'tableBody',
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            }
          ],
          [
            {
              text: 'Shipping',
              style: 'tableHead',
              // border: [true, true, true, true],
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
            {
              text: '50 TK',
              style: 'tableBody',
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            }
          ],
          [
            {
              text: 'Total',
              style: 'tableHead',
              // border: [true, true, true, true],
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
            {
              text: '1300 TK',
              style: 'tableBody',
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            }
          ],
          [
            {
              text: 'Payable',
              style: 'tableHead',
              // border: [true, true, true, true],
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
            {
              text: '1300 TK',
              style: 'tableBody',
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            }
          ],
        ]
      }
    };
  }

  async getDocumentDefinitionForPdf() {
    return {
      content: [
        {
          text: 'Invoice',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
              await this.getProfilePicObjectPdf()
            ],
            [{
              text: `Invoice:  #100`,
              style: 'name',
              alignment: 'right'
            },
              {
                text: '20/10/2021',
                alignment: 'right'
              },
              {
                text: 'Customer Id : ' + '100',
                alignment: 'right'
              },
              {
                text: 'Bill Type : ' + 'Regular',
                alignment: 'right'
              }
            ]
          ]
        },
        {
          style: 'gapBig',
          columns: [
            [
              {
                text: 'From',
                alignment: 'left'
              },
              {
                text: 'Cash Management',
                style: 'name',
                alignment: 'left'
              },
              {
                text: 'Mirpur-10, Dhaka-1216',
                alignment: 'left'
              },
              {
                text: '+8801773253900',
                alignment: 'left'
              },
              {
                text: 'www.cashmanagement.com',
                alignment: 'left'
              },
            ],
            [{
              text: 'To',
              alignment: 'right'
            },
              {
                text: 'Md Sazib',
                style: 'name',
                alignment: 'right'
              },
              {
                text: '01773253900',
                alignment: 'right'
              },
              {
                text: 'Sazib Store',
                alignment: 'right'
              },
              {
                text: 'Mirpur',
                alignment: 'right'
              },
            ]
          ]
        },
        {
          text: '',
          style: 'gapBig'
        },
        this.getPaymentTable(),
        {
          text: '',
          style: 'gapSmall'
        },
        {
          text: '',
          alignment: 'right'
        },
        {
          text: 'Sub Total     ' + '900' + ' /-',
          style: 'totalInfo',
          alignment: 'right'
        },
        {
          text: 'Vat(15%)     ' + '2000' + ' /-',
          style: 'totalInfo',
          alignment: 'right'
        },
        {
          text: 'Total     ' + '5000' + ' /-',
          style: 'totalInfo',
          alignment: 'right'
        },
        {
          text: 'Thank you for your business!',
          alignment: 'center',
          style: 'gapBig'
        },
        {
          text: 'If you have any questions about this invoice, please contact with us',
          alignment: 'center',
        },

        {
          style: 'gapBig',
          columns: [
            [{
              text: 'wqijw',
              style: 'name',
              alignment: 'left'
            },
              {
                text: '01287321313',
                alignment: 'left'
              },
              {
                text: 'asnass@gmail.com',
                alignment: 'left'
              },
              {
                text: 'Visit Facebook Page',
                link: 'https://www.facebook.com/cashmanagementltd',
                color: 'blue',
                alignment: 'left'
              }
            ],
            [
              {
                qr: 'Cash , Contact No : 01773253900',
                fit: 100,
                alignment: 'right'
              }
            ]
          ]
        }
      ],
      info: {
        title: 'Cash Invoice',
        author: 'Sazib',
        subject: 'Invoice',
        keywords: 'Invoice',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        totalInfo: {
          fontSize: 12,
          bold: true,
          lineHeight: 1.5
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        },
        gapMid: {
          margin: [0, 20, 0, 10],
        },
        gapBig: {
          margin: [0, 40, 0, 20],
        },
        gapSmall: {
          margin: [0, 10, 0, 5],
        },
      }
    };
  }

  async getProfilePicObjectPdf() {
    return {
      image: await this.getBase64ImageFromURL('https://ftp.ehsan.com.bd/uploads/logo/1639422163674_ehsan-logo-7604.png'),
      width: 90,
      alignment: 'left'
    };
  }

  getPaymentTable() {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: 'Description',
              style: 'tableHeader'
            },
            {
              text: 'Amount',
              style: 'tableHeader',
              alignment: 'right'
            }
          ],
          [
            {
              text: 'ashas' + '-' + '20/10/2021',
            },
            {
              text: '10,000' + ' /-',
              alignment: 'right'
            }
          ]
        ]
      }
    };
  }

  public async getDocumentDefinitionForPdfC() {

    return {
      content: 'Iam Sazib from Rajshahi', defaultStyle: {font: 'Poppins', bold: true, italics: true, fontSize: '30'}

    }
    // return {
    //   content: [
    //     {
    //       text: 'Invoice',
    //       bold: true,
    //       fontSize: 20,
    //       alignment: 'center',
    //       margin: [0, 0, 0, 20],
    //     },
    //     {
    //       text: '',
    //       alignment: 'right'
    //     },
    //
    //     {
    //       text: 'Thank you for your business!',
    //       alignment: 'center',
    //       style: 'gapBig'
    //     },
    //     {
    //       text: 'If you have any questions about this invoice, please contact with us',
    //       alignment: 'center',
    //     },
    //   ],
    //   styles: {
    //     header: {
    //       fontSize: 18,
    //       bold: true,
    //       margin: [0, 20, 0, 10],
    //       decoration: 'underline'
    //     },
    //     name: {
    //       fontSize: 16,
    //       bold: true
    //     },
    //     totalInfo: {
    //       fontSize: 12,
    //       bold: true,
    //       lineHeight: 1.5
    //     },
    //     jobTitle: {
    //       fontSize: 14,
    //       bold: true,
    //       italics: true
    //     },
    //     sign: {
    //       margin: [0, 50, 0, 10],
    //       alignment: 'right',
    //       italics: true
    //     },
    //     tableHeader: {
    //       bold: true,
    //     },
    //     gapMid: {
    //       margin: [0, 20, 0, 10],
    //       font: 'Roboto'
    //     },
    //     gapBig: {
    //       margin: [0, 40, 0, 20],
    //       font: 'Helvetica'
    //     },
    //     gapSmall: {
    //       margin: [0, 10, 0, 5],
    //     },
    //   },
    // };

  }

  urlToBase64(url: string) {

    return new Promise((resolve, reject) => {
      let base64;

      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();

      xhr.addEventListener('load', () => {
        const reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.addEventListener('loadend', () => {
          base64 = reader.result;
          const imageBase64 = reader.result as string;
          resolve(imageBase64);
          // console.log(imageBase64);
        });
      });
    })


  }

  getBase64ImageFromURL(url): Promise<any> {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

  checkEngLanguage(text: string) {
    if (/^[a-zA-Z]+$/.test(text)) //if the English language
    {
      console.log('Language is English')
    } else //if the not English language
    {
      console.log('Language is not English')
    }
  }

  /**
   * INVOICE DOCUMENT FOR PDF MAKE
   */
  private async getInvoiceDocument() {
    const documentObject = {
      content: [
        {
          columns: [
            await this.getProfilePicObjectPdf(),
            [
              {
                width: 'auto',
                text: `www.ehsan.com.bd`,
                style: 'p',
              },
              {
                width: 'auto',
                text: `312, South Jatrabari,Dhaka-1204`,
                style: 'p',
              },
              {
                width: 'auto',
                text: `Telephone:++8801832093039`,
                style: 'p',
              },
              {
                width: 'auto',
                text: `Email:ehsanbookshop@gmail.com`,
                style: 'p',
              },
            ],
            [
              {
                width: '*',
                text: [
                  `Invoice ID: `,
                  {
                    text: '622858b5e3a91b936b7e2cf6',
                    bold: true
                  }
                ],
                style: 'p',
                alignment: 'right'
              },
              {
                width: '*',
                text: `Thursday, March 10, 2022 (Sowda Jabin`,
                style: 'p',
                alignment: 'right'
              },
            ]
          ],
          columnGap: 16
        }, // END TOP INFO SECTION
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 535,
              y2: 5,
              lineWidth: 0.5,
              lineColor: '#E8E8E8'
            }
          ]
        }, // END TOP INFO BORDER
        {
          columns: [
            [
              {
                width: 'auto',
                text: `Order Info:`,
                style: 'p',
                margin: [0, 8, 0, 0]
              },
              {
                width: 'auto',
                text: [
                  `Order Id: `,
                  {
                    text: 'EH622858b5e3a91b936b7e2cf6',
                    bold: true
                  }
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text: `Date Added: Thursday, March 10, 2022`,
                style: 'p',
              },
              {
                width: 'auto',
                text: [
                  `Payment Status: `,
                  {
                    text: 'paid',
                    bold: true
                  }
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text: [
                  `Total Product: `,
                  {
                    text: '2Items',
                    bold: true
                  }
                ],
                style: 'p',
              },
            ],
            {
              width: '*',
              alignment: 'left',
              text: '',
            }, // Middle Space for Make Column Left & Right
            [
              {
                width: 'auto',
                text: `Delivery Address:`,
                style: ['p'],
                margin: [0, 8, 0, 0]
              },
              {
                width: 'auto',
                text: [
                  `Name: `,
                  {
                    text: 'Sawda Jabin',
                    bold: true
                  }
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text: `Address: Basher hut, Dinajpur.(HSTU Campus), চেহলগাজী ইউিনয়ন, িদনাজপুর সদর, িদনাজপুর`,
                style: ['pBn'],
              },
              {
                width: 'auto',
                text: [
                  `Phone: `,
                  {
                    text: '01786943093',
                    bold: true
                  }
                ],
                style: 'p',
              },
            ],
          ],
          columnGap: 16
        },
        {
          style: 'gapY',
          columns: [
            this.getItemTable(),
          ]
        }, // END ITEM TABLE SECTION
        {
          style: 'gapY',
          columns: [
            {
              width: '*',
              alignment: 'left',
              text: '',
            }, // Middle Space for Make Column Left & Right
            [
              this.getCalculationTable()
            ]
          ]
        }, // END CALCULATION SECTION
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 535,
              y2: 5,
              lineWidth: 0.5,
              lineColor: '#E8E8E8'
            }
          ]
        }, // END TOP INFO BORDER
        {
          text: 'Thank you for your order from www.ehsan.com.bd',
          style: 'p',
          alignment: 'center',
          margin: [0, 10]
        }
      ],
      defaultStyle: {
        font: 'Poppins'
      },
      styles: TestPdfComponent.pdfMakeStyleObject
    }

    return documentObject;
  }

}
