export const isValidUrl = (url) => /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url);

export const titleCase = (string) => string.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : " " + d.toUpperCase()));
