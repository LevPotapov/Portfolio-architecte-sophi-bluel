/**@module Index */

import { showAllProjects, filtersFunction } from "./filters.js";
import { modeEditionFunction } from "./edition-mode.js";
import { modalWindowFunction } from "./modal.js";
import { modalAddPhotos } from "./modal-add-photos.js";

showAllProjects();

filtersFunction();

modeEditionFunction();

modalWindowFunction();

modalAddPhotos();
