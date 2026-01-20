import { Content } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
): Content => {
  return {
    stack: [
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 967.12,
            y2: 0,
            lineWidth: 2,
            lineColor: '#2563EB',
          },
        ],
        margin: [20, 0, 20, 5],
      },
      {
        text: `Página ${currentPage} de ${pageCount}`,
        alignment: 'right',
        margin: [0, 0, 40, 20],
        fontSize: 10,
        bold: true,
        color: '#1E40AF',
      },
    ],
  };
};
