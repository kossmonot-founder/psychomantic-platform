import type { MatrixResponse, MatrixArcana } from '../../types.js';
interface MatrixDrawerProps {
    selection: {
        type: 'arcana';
        id: number;
    } | {
        type: 'karmic';
    } | null;
    result: MatrixResponse | null;
    library?: MatrixArcana[];
    onClose: () => void;
    drawerRef?: React.RefObject<HTMLDivElement | null>;
}
export declare function MatrixDrawer({ selection, result, library, onClose, drawerRef }: MatrixDrawerProps): import("react").JSX.Element | null;
export {};
