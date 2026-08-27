import type { MatrixChakraMatrix, MatrixArcana } from '../../types.js';
interface ChakraGridProps {
    chakraMatrix: MatrixChakraMatrix;
    arcana: Record<number, MatrixArcana | null>;
    onArcanaClick?: (value: number) => void;
}
export declare function ChakraGrid({ chakraMatrix, arcana, onArcanaClick }: ChakraGridProps): import("react").JSX.Element;
export {};
