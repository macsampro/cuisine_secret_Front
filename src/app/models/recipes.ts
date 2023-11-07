import { Ingredients } from "./ingredients";
import { PreparationSteps } from "./preparation-steps";

export interface Recipes {
  id_recipe: number;
  title: string;
  recipe_type: string;
  description: string;
  time_preparation: Date;
  difficulty: string;
  creation_date: Date;
  id_user: number;
  ingredient:Ingredients[];
  prepararion_step: PreparationSteps[];
}
