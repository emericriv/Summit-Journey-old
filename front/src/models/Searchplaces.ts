export interface PlaceResult {
  name: string;
  formatted_address: string;
  // Ajoute d'autres champs que tu attends dans la réponse
}

export interface SearchPlaceResponse {
  results: PlaceResult[];
  status: string;
  // Ajoute d'autres propriétés si nécessaire
}