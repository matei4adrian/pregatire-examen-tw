const express = require("express");
const router = express.Router();
const spacecraftController = require("./../controllers").spacecraft;
const astronautController = require("./../controllers").astronaut;

router.get("/", spacecraftController.getAllSpacecrafts);
router.post("/", spacecraftController.addSpacecraft);
router.put("/:spacecraftId", spacecraftController.updateSpacecraft);
router.delete("/:spacecraftId", spacecraftController.deleteSpacecraft);

router.get(
  "/:spacecraftId/astronauts",
  astronautController.getAllAstronautsOfSpacecraft
);
router.post(
  "/:spacecraftId/astronauts",
  astronautController.addAstronautOnSpacecraft
);
router.put(
  "/:spacecraftId/astronauts/:astronautId",
  astronautController.updateAstronautOfSpacecraft
);
router.delete(
  "/:spacecraftId/astronauts/:astronautId",
  astronautController.deleteAstronautOfSpacecraft
);

module.exports = router;
