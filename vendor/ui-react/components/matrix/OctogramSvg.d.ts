import type { MatrixPositionLabel, MatrixOctogramPosition } from '../../types.js';
interface OctogramSvgProps {
    positions: Record<MatrixPositionLabel, MatrixOctogramPosition>;
    onArcanaClick?: (value: number, label: MatrixPositionLabel) => void;
}
export declare function OctogramSvg({ positions, onArcanaClick }: OctogramSvgProps): import("react").JSX.Element | null;
export {};
