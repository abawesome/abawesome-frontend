export const colors = {
    primary: {
        // dark: "#2E2852",
        main: '#39FFC4',
        // light: "#A26BF9",
    },
    text: {
        black: '#1b1b1b',
        dark: '#333',
        light: '#666',
    },
};

export const gradients = {};

export const fonts = {
    primary: 'Rubik',
};

export const fontSizes = {
    h3: 20,
};

export const breakpoints = {
    sm: '512px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1850px',
};

export default {
    // space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    breakpoints: [breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl],
    colors,
    space: [4, 8, 16, 32, 64, 128, 256, 512],
    fonts: {
        primary: [fonts.primary, 'Roboto', 'Arial', 'sans-serif'].join(','),
    },
};
