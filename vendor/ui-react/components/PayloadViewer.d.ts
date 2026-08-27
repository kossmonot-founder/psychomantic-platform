/**
 * PayloadViewer — visualiseur double vue pour tout payload IshtarEngine.
 *
 * Vue JSON (arborescence repliable, recherche, copie) + vue visuelle générique
 * (résumé automatique). Les renderers métier ('natal', 'matrix', 'codex')
 * seront branchés sur PsychomanticNatalChart / PsychomanticMatrixGrid
 * lors de leur extraction (phase suivante du chantier widgets).
 *
 * Stateless : aucun fetch, aucune clé, la donnée vient en prop.
 */
export interface PayloadViewerProps {
    /** Payload typé connu ou JSON quelconque */
    payload: unknown;
    /** Vue initiale : 'visual' | 'json' ('split' réservé au desktop, phase 2) */
    view?: 'visual' | 'json';
    /** Rendu visuel ; 'auto' = détection par empreinte du payload */
    visualRenderer?: 'auto' | 'natal' | 'matrix' | 'codex' | 'generic';
    onViewChange?: (view: 'visual' | 'json') => void;
    jsonOptions?: {
        collapsedDepth?: number;
        searchable?: boolean;
        copyButton?: boolean;
    };
    /** Bandeau métadonnées (engine, calculationTime, source, cached) */
    showMeta?: boolean;
    theme?: 'light' | 'dark' | 'auto';
    lang?: 'fr' | 'en';
    className?: string;
}
export declare function PayloadViewer({ payload, view, visualRenderer, onViewChange, jsonOptions, showMeta, theme, lang, className, }: PayloadViewerProps): import("react").JSX.Element;
