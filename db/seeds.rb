Community.create(name: 'Hollands Kroon')
User.create(email: 'inwoner@ikbeninwoner.nl', password: '123qweasd', role_id: 0, community: Community.first)
User.create(email: 'hollands-kroon@ikbeninwoner.nl', password: '123qweasd', role_id: 1, community: Community.first)
User.create(email: 'admin@ikbeninwoner.nl', password: '123qweasd', role_id: 2)
