/**
 * PsychomanticMatrixGrid — cartographie complète de la Matrice du Destin.
 *
 * Widget différenciant Psychomantic, sans équivalent chez les concurrents.
 * Stateless : la réponse de POST /v1/matrix est passée en prop `data`.
 * Sections : octogramme, clés + programme karmique, chakras, énergies annuelles.
 */
import type { MatrixResponse, MatrixArcana } from '../types.js';
export type MatrixSection = 'octogram' | 'keys' | 'chakras' | 'yearly';
export interface PsychomanticMatrixGridProps {
    /** Réponse de POST /v1/matrix */
    data: MatrixResponse;
    /** Bibliothèque des 22 arcanes (GET /v1/matrix/arcanas), optionnelle */
    library?: MatrixArcana[];
    /** Sections affichées, toutes par défaut */
    sections?: MatrixSection[];
    theme?: 'light' | 'dark' | 'auto';
    lang?: 'fr' | 'en';
    className?: string;
}
export declare function PsychomanticMatrixGrid({ data, library, sections, theme, lang, className, }: PsychomanticMatrixGridProps): import("react").JSX.Element;
