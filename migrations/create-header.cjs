module.exports = function (migration) {
  // NavLink - A simple navigation link
  const navLink = migration.createContentType('navLink', {
    name: 'Nav Link',
    description: 'A single navigation link',
    displayField: 'label',
  });

  navLink.createField('label', {
    name: 'Label',
    type: 'Symbol',
    required: true,
  });

  navLink.createField('url', {
    name: 'URL',
    type: 'Symbol',
    required: true,
  });

  // NavGroup - A group of links under a label
  const navGroup = migration.createContentType('navGroup', {
    name: 'Nav Group',
    description: 'A group of navigation links under a label',
    displayField: 'label',
  });

  navGroup.createField('label', {
    name: 'Label',
    type: 'Symbol',
    required: true,
  });

  navGroup.createField('links', {
    name: 'Links',
    type: 'Array',
    required: true,
    items: {
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['navLink'] }],
    },
  });

  // Header - Contains logo, nav, and login
  const header = migration.createContentType('header', {
    name: 'Header',
    description: 'Site header with logo, navigation, and login',
    displayField: 'name',
  });

  header.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: true,
    validations: [{ unique: true }],
  });

  header.createField('logo', {
    name: 'Logo',
    type: 'Link',
    linkType: 'Asset',
    required: false,
    validations: [
      {
        linkMimetypeGroup: ['image'],
      },
    ],
  });

  header.createField('navItems', {
    name: 'Navigation Items',
    type: 'Array',
    required: false,
    items: {
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['navLink', 'navGroup'] }],
    },
  });

  header.createField('loginText', {
    name: 'Login Text',
    type: 'Symbol',
    required: false,
  });

  header.createField('loginUrl', {
    name: 'Login URL',
    type: 'Symbol',
    required: false,
  });

  // Global - Site-wide settings containing header
  const global = migration.createContentType('global', {
    name: 'Global',
    description: 'Global site settings',
    displayField: 'name',
  });

  global.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: true,
    validations: [{ unique: true }],
  });

  global.createField('header', {
    name: 'Header',
    type: 'Link',
    linkType: 'Entry',
    required: false,
    validations: [{ linkContentType: ['header'] }],
  });
};
