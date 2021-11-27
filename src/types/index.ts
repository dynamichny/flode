export interface Category {
  name: string;
  emote: string;
  id: string;
  color: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recepie {
  images: string[];
  title: string;
  creationDate: string;
  categories: Category[];
  ingredients: Ingredient[];
  steps: Step[];
  user_id: string;
  public: boolean;
  id: string;
}

export type Step = string;
