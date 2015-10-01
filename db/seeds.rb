User.create(email: 'inwoner@meldingen.nl', password: '123qweasd', role_id: 0)
User.create(email: 'gemeente@meldingen.nl', password: '123qweasd', role_id: 1, community_id: 1)
User.create(email: 'admin@meldingen.nl', password: '123qweasd', role_id: 2)
Community.create(name: 'Hollands Kroon')