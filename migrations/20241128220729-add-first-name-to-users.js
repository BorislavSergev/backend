'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add the 'first_name' column without the 'NOT NULL' constraint
    await queryInterface.addColumn('Users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: true,  // Initially, allow NULL values
    });

    // Step 2: Update existing rows to set a default value for 'first_name'
    await queryInterface.sequelize.query(
      'UPDATE "Users" SET "first_name" = \'\' WHERE "first_name" IS NULL;' // Set empty string as default for existing records
    );

    // Step 3: Alter the column to set 'NOT NULL' constraint now that all rows have a value
    await queryInterface.changeColumn('Users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: false,  // Now set the column as NOT NULL
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the column back to allowing NULL and remove the column if rolling back
    await queryInterface.removeColumn('Users', 'first_name');
  }
};
