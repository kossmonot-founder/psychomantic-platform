/**
 * JsonNode — arborescence JSON repliable récursive (Pastelo).
 * Composant partagé interne du package.
 */
interface JsonNodeProps {
    name?: string;
    value: unknown;
    depth: number;
    collapsedDepth: number;
    search?: string;
}
export declare function JsonNode({ name, value, depth, collapsedDepth, search }: JsonNodeProps): import("react").JSX.Element;
export {};
