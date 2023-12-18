export type dataType = {
    area: number;
    cioc: string;
    flag: string;
    gini: number;
    name: string;
    flags: {
        png: string;
        svg: string;
    };
    latlng: [number, number];
    region: string;
    borders: string[];
    capital: string;
    demonym: string;
    languages: {
        name: string;
        iso639_1: string;
        iso639_2: string;
        nativeName: string;
    }[];
    subregion: string;
    timezones: string[];
    alpha2Code: string;
    alpha3Code: string;
    currencies: {
        code: string;
        name: string;
        symbol: string;
    }[];
    nativeName: string;
    population: number;
    independent: boolean;
    numericCode: string;
    altSpellings: string[];
    callingCodes: string[];
    translations: {
        br: string;
        de: string;
        es: string;
        fa: string;
        fr: string;
        hr: string;
        hu: string;
        it: string;
        ja: string;
        nl: string;
        pt: string;
    };
    regionalBlocs: {
        name: string;
        acronym: string;
    }[];
    topLevelDomain: string[];
}