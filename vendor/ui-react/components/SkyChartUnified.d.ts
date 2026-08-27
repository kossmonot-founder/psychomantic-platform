/**
 * ============================================================================
 * 🌌 SKYCHART UNIFIED - Wrapper harmonisé
 * ============================================================================
 *
 * Ce composant remplace l'ancien SkyChart avec une interface compatible
 * mais utilise en interne les nouveaux composants modulaires :
 * - useRadialStacking (logique d'empilement)
 * - PlanetLayer (affichage des planètes)
 * - HouseLayer (affichage des maisons)
 *
 * AVANTAGES:
 * - Comportement identique sur toutes les pages
 * - Extensible (accepte n'importe quel nombre de points)
 * - Maisons toujours correctement alignées
 * - Collisions gérées par radial stacking (angle sacré)
 *
 * ============================================================================
 */
import type { ChartResponse } from '../types.js';
import { DEFAULT_PLANET_SYMBOLS } from './PlanetLayer';
export declare const PLANET_SYMBOLS: Record<string, import("./PlanetLayer").PlanetSymbolConfig>;
export { DEFAULT_PLANET_SYMBOLS };
export interface SkyChartProps {
    /** Mode single chart */
    data?: ChartResponse;
    /** Bi-wheel: outer ring (e.g., Transit) */
    outerData?: ChartResponse;
    /** Bi-wheel: inner ring (e.g., Natal) */
    innerData?: ChartResponse;
    /** Label outer */
    outerLabel?: string;
    /** Label inner */
    innerLabel?: string;
    /** Mode bi-wheel */
    biWheelMode?: 'standard' | 'transit';
    showHouses?: boolean;
    showAspects?: boolean;
    visiblePlanets?: string[];
    visibleAngles?: string[];
    hoveredPlanet?: string | null;
    onPlanetHover?: (key: string | null) => void;
    crossAspects?: Array<{
        planet1: string;
        planet2: string;
        type: string;
        orb: number;
        harmonious?: boolean;
    }>;
    /**
     * 🎓 MODE APPRENDRE: Planètes à mettre en évidence (focus)
     * Si défini, les autres planètes seront atténuées selon dimOpacity
     */
    focusFilter?: string[];
    /**
     * 🎓 MODE APPRENDRE: Angles à mettre en évidence
     */
    focusAngles?: string[];
    /**
     * 🎓 MODE APPRENDRE: Opacité des planètes non focus (0-1)
     * @default 1
     */
    dimOpacity?: number;
    /**
     * 🎓 MODE APPRENDRE: Afficher les axes cardinaux (AS/DC/MC/IC)
     */
    showCardinalAxes?: boolean;
    /**
     * 🎓 MODE APPRENDRE: Callback au clic sur une planète
     */
    onPlanetClick?: (planetKey: string) => void;
    /**
     * 🎓 MODE APPRENDRE: Planète actuellement sélectionnée
     */
    selectedPlanet?: string | null;
}
export declare const SkyChartUnified: React.FC<SkyChartProps>;
export default SkyChartUnified;
