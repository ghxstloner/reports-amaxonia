import { Content } from "pdfmake/interfaces";

export const footerSection = (currentPage: number, pageCount: number): Content => {
    return {
        text: `Página ${currentPage} de ${pageCount}`,
        alignment: 'right',
        margin: [0, 10, 40, 20], 
        fontSize: 10,
        bold: true
    };
}