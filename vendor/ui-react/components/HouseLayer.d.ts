/**
 * ============================================================================
 * 🏠 HOUSE LAYER - Composant unifié d'affichage des maisons
 * ============================================================================
 *
 * Ce composant affiche les maisons astrologiques de manière cohérente
 * sur toutes les pages et tous les modes (single wheel, bi-wheel).
 *
 * EXTENSIBLE: Gère automatiquement les 12 maisons sans hardcodage.
 *
 * ============================================================================
 */
import React from 'react';
export interface House {
    house: number;
    cusp: number;
    sign: string;
    degree?: number;
}
export interface HouseLayerProps {
    /** Données des maisons (12 éléments) */
    houses: House[];
    /** Angle de l'ascendant pour la rotation */
    ascendant: number;
    /** Rayon intérieur des maisons */
    innerRadius: number;
    /** Rayon extérieur des maisons */
    outerRadius: number;
    /** Centre X */
    centerX: number;
    /** Centre Y */
    centerY: number;
    /** Échelle */
    scale?: number;
    /** Afficher les numéros de maisons */
    showNumbers?: boolean;
    /** Afficher les lignes de cuspides */
    showCuspLines?: boolean;
    /** Style des lignes de cuspides */
    cuspLineStyle?: 'full' | 'partial' | 'ticks';
    /** Longueur des lignes de cuspides (0-1, proportion du rayon) */
    cuspLineLength?: number;
    /** Couleur des lignes de cuspides */
    cuspLineColor?: string;
    /** Opacité des lignes de cuspides */
    cuspLineOpacity?: number;
    /** Épaisseur des lignes de cuspides */
    cuspLineWidth?: number;
    /** Taille de police des numéros */
    numberFontSize?: number;
    /** Couleur des numéros */
    numberColor?: string;
    /** Offset radial des numéros (positif = extérieur) */
    numberOffset?: number;
}
export declare const HouseLayer: React.FC<HouseLayerProps>;
export default HouseLayer;
