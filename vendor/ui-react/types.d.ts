/**
 * Types des contrats IshtarEngine consommés par les widgets.
 * Copies stables des interfaces de psychomantic-app/src/services/api.ts
 * (réexportées sans modification — garantie de compatibilité ascendante).
 */
export interface Planet {
    name: string;
    longitude: number;
    latitude: number;
    distance?: number;
    velocity?: number;
    sign?: string;
    symbol?: string;
    signSymbol?: string;
    degree?: number;
    house?: number;
    element?: string;
    modality?: string;
    ruler?: string;
    traits?: string[];
    retrograde?: boolean;
    isRetrograde?: boolean;
}
export interface House {
    house: number;
    cusp: number;
    sign: string;
}
export interface Angles {
    ascendant: number;
    midheaven: number;
    descendant: number;
    imumCoeli: number;
}
export interface ChartMetadata {
    calculationTime: number;
    engine: 'NASA_SPICE' | 'VSOP87';
    precision: string;
    name?: string;
}
export interface Aspect {
    planet1: string;
    planet2: string;
    type: string;
    symbol: string;
    angle: number;
    orb: number;
    isApplying: boolean;
    harmonious: boolean | null;
    strength: number;
}
export interface ChartSummary {
    sign?: string;
    longitude?: number;
    degree?: number;
}
export interface ChartResponse {
    planets: Record<string, Planet>;
    houses?: House[];
    angles?: Angles;
    aspects?: Aspect[];
    metadata: ChartMetadata;
    sun?: ChartSummary;
    moon?: ChartSummary;
    ascendant?: ChartSummary;
}
export interface CrossAspect {
    planet1: string;
    planet2: string;
    type: string;
    orb: number;
    harmonious?: boolean | null;
}
export type MatrixPositionLabel = 'A' | 'B' | 'C' | 'D' | 'E' | 'NW' | 'NE' | 'SE' | 'SW';
export interface MatrixOctogramPosition {
    label: MatrixPositionLabel;
    name: string;
    value: number;
    domain: string;
    x: number;
    y: number;
}
export interface MatrixKarmicTail {
    k1: number;
    k2: number;
    k3: number;
    programId: string;
}
export interface MatrixChakraLevel {
    physical: number;
    emotional: number;
    spiritual: number;
}
export interface MatrixChakraEntry extends MatrixChakraLevel {
    id: string;
    name: string;
    location: string;
    archetype: string;
}
export interface MatrixChakraMatrix {
    sahasrara: MatrixChakraEntry;
    ajna: MatrixChakraEntry;
    vishuddha: MatrixChakraEntry;
    anahata: MatrixChakraEntry;
    manipura: MatrixChakraEntry;
    svadhisthana: MatrixChakraEntry;
    muladhara: MatrixChakraEntry;
}
export interface MatrixYearlyEnergy {
    age: number;
    energy: number;
    isKarmicTurningPoint: boolean;
}
export interface DestinyMatrix {
    birthDate: string;
    positions: Record<MatrixPositionLabel, MatrixOctogramPosition>;
    karmicTail: MatrixKarmicTail;
    heartKey: number;
    walletKey: number;
    chakraMatrix: MatrixChakraMatrix;
    yearlyEnergies: MatrixYearlyEnergy[];
}
export interface MatrixArcana {
    id: number;
    names: Record<string, string>;
    archetype: string;
    element: string;
    planet: string;
    description: string;
    manifestationPlus: string[];
    manifestationMinus: string[];
    karmicTasks: string[];
    finance: {
        suitable_professions: string[];
        money_blockers: string[];
        wealth_potential: string;
    };
    relationships: {
        ideal_partner: string;
        relationship_traps: string[];
        love_strengths: string[];
    };
    health: {
        vulnerable_chakras: string[];
        physical_risks: string[];
        emotional_risks: string[];
        recommendations: string[];
    };
    yearlyForecastTheme: string;
}
export interface MatrixKarmicProgram {
    id: string;
    title: Record<string, string>;
    pastLifeCause: string;
    presentManifestation: string;
    resolutionKeys: string[];
    relatedChakras: string[];
    severity: string;
    lifeSummary: string;
}
export interface MatrixYearlyForecast {
    id: number;
    age: number | null;
    arcanaId: number;
    theme: string;
    guidance: string;
    isKarmicTurningPoint: boolean;
    turningPointSignificance: string | null;
}
export interface MatrixResponse {
    matrix: DestinyMatrix;
    arcana: Record<number, MatrixArcana | null>;
    karmicProgram: MatrixKarmicProgram | null;
    karmicArcana: [MatrixArcana | null, MatrixArcana | null, MatrixArcana | null];
    yearlyForecasts: Record<number, MatrixYearlyForecast | null>;
}
