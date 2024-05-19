/**@module Index */

import { showAllProjects, filtersFunction } from "./filters.js";
import { modeEditionFunction } from "./editionMode.js";
import { modalWindowFunction } from "./modal.js";
import { modalAddPhotos } from "./modalAddPhotos.js";

showAllProjects();

filtersFunction();

modeEditionFunction();

modalWindowFunction();

modalAddPhotos();
