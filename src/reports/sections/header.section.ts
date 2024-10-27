import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const logo: Content = {
    image: 'src/assets/amaxonia-logo.png',
    width: 150,
    height: 50,
    absolutePosition: { x: 15, y: 20 }
};

const currentDate: Content = {
    text: DateFormatter.getDDMMYYYY(new Date()),
    alignment: 'right',
    margin: [20, 20],
    width: 180
}

interface HeaderOptions {
    title?: string;
    subTitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
    const { title, subTitle, showLogo = true, showDate = true } = options;

    const headerLogo: Content = showLogo ? logo : null;
    const headerDate: Content = showDate ? currentDate : null;
    const headerTitle: Content = title ? {
        stack: [
            { text: title, fontSize: 22, bold: true, alignment: 'center', margin: [0, 15, 0, 5] },
            { text: subTitle, fontSize: 15, bold: true, alignment: 'center' }
        ]
    } : null;

    return {
        columns: [headerLogo, headerTitle, headerDate],
        columnGap: 10
    };
};
