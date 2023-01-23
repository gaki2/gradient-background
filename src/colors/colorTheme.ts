export type ThemeType = 'ukraine' | 'vine' | 'flickr';

const colorTheme: Record<ThemeType, string[]> = {
    ukraine: ['#004FF9', '#FFF94C'],
    vine: ['#00bf8f', '#001510'],
    flickr: ['#ff0084', '#33001b'],
};

export {
    colorTheme,
}