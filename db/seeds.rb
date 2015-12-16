User.create(email: 'bart@ikbeninwoner.nl', password: '123qweasd', role_id: 0)
User.create(email: 'chris@ikbeninwoner.nl', password: '123qweasd', role_id: 0)
User.create(email: 'rutger@ikbeninwoner.nl', password: '123qweasd', role_id: 1, community_id: 145)
User.create(email: 'admin@ikbeninwoner.nl', password: '123qweasd', role_id: 2)

categories = [
  'groen',
  'afval',
  'straatverlichting',
  'wegdek',
  'overig'
]

categories.each do |category_name|
  Category.create(title: category_name)
end
