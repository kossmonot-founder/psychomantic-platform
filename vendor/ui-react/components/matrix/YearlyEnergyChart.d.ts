import type { MatrixYearlyEnergy, MatrixYearlyForecast } from '../../types.js';
interface YearlyEnergyChartProps {
    yearlyEnergies: MatrixYearlyEnergy[];
    yearlyForecasts: Record<number, MatrixYearlyForecast | null>;
}
export declare const YearlyEnergyChart: import("react").NamedExoticComponent<YearlyEnergyChartProps>;
export {};
