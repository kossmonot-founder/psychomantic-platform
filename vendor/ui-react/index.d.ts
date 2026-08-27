/**
 * @psychomantic/ui-react — composants exportables Psychomantic.
 *
 * Stateless : aucun fetch, aucune clé API. L'appelant récupère la donnée
 * via l'API IshtarEngine et la passe en prop `data` / `payload`.
 */
import './styles/pastelo.css';
export { PayloadViewer } from './components/PayloadViewer.js';
export type { PayloadViewerProps } from './components/PayloadViewer.js';
export { PsychomanticNatalChart } from './components/PsychomanticNatalChart.js';
export type { PsychomanticNatalChartProps } from './components/PsychomanticNatalChart.js';
export { PsychomanticMatrixGrid } from './components/PsychomanticMatrixGrid.js';
export type { PsychomanticMatrixGridProps, MatrixSection } from './components/PsychomanticMatrixGrid.js';
export type { ChartResponse, Planet, House, Angles, Aspect, ChartMetadata, CrossAspect } from './types.js';
export type { MatrixResponse, MatrixArcana, DestinyMatrix, MatrixKarmicProgram } from './types.js';
