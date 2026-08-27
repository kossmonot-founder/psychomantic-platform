/**
 * ============================================================================
 * 🪐 PLANET LAYER - Composant unifié d'affichage des planètes
 * ============================================================================
 *
 * Ce composant affiche les planètes, points et astéroïdes de manière unifiée
 * sur toutes les pages (Natal, Transits, Compatibility, SolarReturn).
 *
 * EXTENSIBLE: Fonctionne avec n'importe quel nombre de points sans modification.
 *
 * ============================================================================
 */
import React from 'react';
import type { StackedItemWithCoords } from '../hooks/useRadialStacking';
export interface PlanetSymbolConfig {
    symbol: string;
    color: string;
    type: 'planet' | 'point' | 'asteroid' | 'angle';
    name?: string;
}
/** Configuration par défaut des symboles planétaires */
export declare const DEFAULT_PLANET_SYMBOLS: Record<string, PlanetSymbolConfig>;
/** Données d'une planète depuis l'API */
export interface PlanetData {
    longitude: number;
    latitude?: number;
    distance?: number;
    speed?: number;
    isRetrograde?: boolean;
    retrograde?: boolean;
    sign?: string;
    house?: number;
    name?: string;
}
/** Props du PlanetLayer */
export interface PlanetLayerProps {
    /** Éléments empilés avec coordonnées (from useRadialStacking) */
    stackedItems: StackedItemWithCoords[];
    /** Données des planètes (from API response) */
    planetData: Record<string, PlanetData>;
    /** Configuration des symboles (optionnel, merge avec defaults) */
    symbols?: Record<string, Partial<PlanetSymbolConfig>>;
    /** Échelle d'affichage */
    scale?: number;
    /** Planète survolée */
    hoveredPlanet?: string | null;
    /** Planètes en surbrillance */
    highlightedPlanets?: Set<string>;
    /** Callback au survol */
    onPlanetHover?: (key: string | null) => void;
    /** Callback au clic */
    onPlanetClick?: (key: string, planet: PlanetData, event: React.MouseEvent) => void;
    /** Préfixe pour les clés React (pour éviter les doublons en bi-wheel) */
    keyPrefix?: string;
    /** Afficher les degrés */
    showDegrees?: boolean;
    /** Style des connecteurs */
    connectorStyle?: 'curved' | 'straight' | 'none';
    /** Opacité de base */
    baseOpacity?: number;
    /** Opacité quand dimmed */
    dimmedOpacity?: number;
    /** Taille de police des symboles */
    symbolFontSize?: number;
    /** Taille de police des degrés */
    degreeFontSize?: number;
    /** Mobile ? */
    isMobile?: boolean;
}
/**
 * Détecte si un angle est dans la zone basse du chart (pour flipper le texte)
 */
export declare function isBottomZone(angleDeg: number): boolean;
/**
 * Formatte un degré en notation degrés/minutes
 */
export declare function formatDegree(deg: number): string;
/**
 * Récupère le symbole pour une clé (avec fallback)
 */
export declare function getPlanetSymbol(key: string, customSymbols?: Record<string, Partial<PlanetSymbolConfig>>): PlanetSymbolConfig;
export declare const PlanetLayer: React.FC<PlanetLayerProps>;
export default PlanetLayer;
