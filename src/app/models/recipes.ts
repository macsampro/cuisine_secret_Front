import { Ingredients } from "./ingredients";
import { PreparationSteps } from "./preparation-steps";

export interface Recipes {
  steps: any;
  id_recipe: number;
  title: string;
  recipe_type: string;
  description: string;
  time_preparation: Date;
  difficulty: string;
  creation_date: Date;
  id_user: number;
  ingredient:Ingredients[];
  preparation_step: PreparationSteps[];
  id_photo?: number[]; 
}
