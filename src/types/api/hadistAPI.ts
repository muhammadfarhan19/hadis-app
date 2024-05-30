export interface HadistData {
  name: string;
  id: string;
  available: number;
  requested: number;
  hadiths: {
    number: number;
    arab: string;
    id: string;
  }[];
}
