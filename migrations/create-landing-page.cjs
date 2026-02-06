module.exports = function (migration) {
  const landingPage = migration.createContentType('landinPage', {
    name: 'Landing Page',
    description: 'Content for the landing page',
    displayField: 'title',
  });

  landingPage.createField('entryId', {
    name: 'Entry ID',
    type: 'Symbol',
    required: true,
    validations: [{ unique: true }],
  });

  landingPage.createField('title', {
    name: 'Title',
    type: 'Symbol',
    required: true,
  });
};
