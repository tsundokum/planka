/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

module.exports.up = async (knex) => {
  await knex.raw(`
    ALTER TABLE project ADD COLUMN IF NOT EXISTS external_slug TEXT;
    ALTER TABLE board ADD COLUMN IF NOT EXISTS external_ref TEXT;

    CREATE UNIQUE INDEX IF NOT EXISTS project_external_slug_unique
      ON project (external_slug)
      WHERE external_slug IS NOT NULL;

    CREATE UNIQUE INDEX IF NOT EXISTS board_external_ref_unique
      ON board (external_ref)
      WHERE external_ref IS NOT NULL;
  `);
};

module.exports.down = async (knex) => {
  await knex.raw(`
    DROP INDEX IF EXISTS board_external_ref_unique;
    DROP INDEX IF EXISTS project_external_slug_unique;
  `);

  return knex.raw(`
    ALTER TABLE board DROP COLUMN IF EXISTS external_ref;
    ALTER TABLE project DROP COLUMN IF EXISTS external_slug;
  `);
};
