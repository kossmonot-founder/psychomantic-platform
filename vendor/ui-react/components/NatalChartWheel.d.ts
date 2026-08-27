import type { ChartResponse } from '../types.js';
/** Taille intrinsèque du SkyChart selon la largeur viewport (source unique) */
export declare function getSkyChartResponsiveSize(width: number): number;
export declare const PLANET_SYMBOLS: Record<string, {
    symbol: string;
    color: string;
    type: 'planet' | 'point' | 'asteroid';
}>;
interface SkyChartProps {
    /** Single chart mode */
    data?: ChartResponse;
    /** Bi-wheel mode: outer ring (e.g., Transit) */
    outerData?: ChartResponse;
    /** Bi-wheel mode: inner ring (e.g., Natal) */
    innerData?: ChartResponse;
    /** Label for outer ring in bi-wheel mode */
    outerLabel?: string;
    /** Label for inner ring in bi-wheel mode */
    innerLabel?: string;
    /** Bi-wheel display mode:
     * - 'standard': both inside houses (natal 68%, transit 115%)
     * - 'transit': natal normal, transit on outer ring with black graduation
     */
    biWheelMode?: 'standard' | 'transit';
    showHouses?: boolean;
    showAspects?: boolean;
    visiblePlanets?: string[];
    visibleAngles?: string[];
    visibleAspectTypes?: string[];
    hoveredPlanet?: string | null;
    onPlanetHover?: (planetKey: string | null) => void;
    /** Cross-chart aspects (e.g., synastry aspects between person1 and person2) */
    crossAspects?: Array<{
        planet1: string;
        planet2: string;
        type: string;
        orb: number;
        harmonious?: boolean | null;
    }>;
}
export declare function SkyChart({ data, outerData, innerData, outerLabel, innerLabel, biWheelMode, showHouses, showAspects, visiblePlanets, visibleAngles, visibleAspectTypes, // 🆕 Filtrer les types d'aspects visibles
hoveredPlanet, onPlanetHover, crossAspects, }: SkyChartProps): import("react").JSX.Element;
export { SkyChartUnified } from "./SkyChartUnified";
