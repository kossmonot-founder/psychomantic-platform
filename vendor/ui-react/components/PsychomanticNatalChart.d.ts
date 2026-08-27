/**
 * PsychomanticNatalChart — roue astrologique SVG exportable.
 *
 * Wrapper public autour de la roue (SkyChart extraite de psychomantic-app).
 * Stateless : la réponse de POST /v1/chart (ou /v1/astro/natal) est passée
 * en prop `data`. Aucun fetch, aucun calcul côté client.
 */
import type { ChartResponse, CrossAspect } from '../types.js';
export interface PsychomanticNatalChartProps {
    /** Mode simple : réponse de POST /v1/chart */
    data?: ChartResponse;
    /** Mode bi-roue : anneau extérieur (ex. transits, partenaire synastrie) */
    outerData?: ChartResponse;
    /** Mode bi-roue : anneau intérieur (ex. thème natal) */
    innerData?: ChartResponse;
    outerLabel?: string;
    innerLabel?: string;
    biWheelMode?: 'standard' | 'transit';
    showHouses?: boolean;
    showAspects?: boolean;
    visiblePlanets?: string[];
    visibleAngles?: string[];
    visibleAspectTypes?: string[];
    hoveredPlanet?: string | null;
    onPlanetHover?: (planetKey: string | null) => void;
    crossAspects?: CrossAspect[];
    /** Ajouts packaging */
    theme?: 'light' | 'dark' | 'auto';
    lang?: 'fr' | 'en';
    /** Largeur max du widget en px (défaut : pleine largeur du conteneur) */
    size?: number;
    className?: string;
}
export declare function PsychomanticNatalChart({ theme, size, className, ...chartProps }: PsychomanticNatalChartProps): import("react").JSX.Element;
