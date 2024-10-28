import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection, footerSection } from "./sections";
import { Country } from "src/entities";

interface CountryOptions {
  title?: string;
  subTitle?: string;
  data: Country[]
}

export const getCountryReport = (options: CountryOptions): TDocumentDefinitions => {
  const { title, subTitle, data } = options;

  return {
      pageOrientation: 'landscape',
      header: headerSection({
          title: title ?? 'Countries Report',
          subTitle: subTitle ?? 'List of Countries'
      }),
      footer: footerSection,
      pageMargins: [40, 80, 40, 60],
      content: [
          {
              layout: 'customLayout01',
              table: {
                  headerRows: 1,
                  widths: [50, 50, 50, '*', 'auto', '*'],
                  body: [
                    ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'], 
                    ...data.map(country => [
                      { text: country.id.toString(), fontSize: 8 },
                      { text: country.iso2, fontSize: 8 },
                      { text: country.iso3, fontSize: 8 },
                      { text: country.name, fontSize: 8, bold: true },
                      { text: country.continent ?? 'N/A', fontSize: 8 },
                      { text: country.localName ?? 'N/A', fontSize: 8 },
                  ]),
              ]
          }
      },

      // Tabla de Totales
      {
        text: 'Totales',
        style: {
          fontSize: 14,
          bold: true,
          margin: [0,40,0,0]
        }
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Total de países',
                colSpan: 2,
                bold: true,
              },
              {},
              {
                text: `${data.length.toString()} países`,
                fontSize: 10,
                bold: true
              },
              {},
              {},
              {}
            ]
          ],
        }
      }
  ]
};
}