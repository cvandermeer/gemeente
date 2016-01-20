User.create(email: 'bart@ikbeninwoner.nl',
            password: '123qweasd',
            confirmed_at: "2015-12-17 09:10:57",
            confirmation_sent_at: "2015-12-17 09:10:47")
User.create(email: 'chris@ikbeninwoner.nl',
            password: '123qweasd',
            confirmed_at: "2015-12-17 09:10:57",
            confirmation_sent_at: "2015-12-17 09:10:47")
User.create(email: 'rutger@ikbeninwoner.nl',
            password: '123qweasd',
            role_id: 1,
            community_id: 145,
            confirmed_at: "2015-12-17 09:10:57",
            confirmation_sent_at: "2015-12-17 09:10:47")
User.create(email: 'admin@ikbeninwoner.nl',
            password: '123qweasd',
            role_id: 2,
            confirmed_at: "2015-12-17 09:10:57",
            confirmation_sent_at: "2015-12-17 09:10:47")



categories = [
  ['Afvalcontainer', 'fa-trash-o'],
  ['Graffiti en beplakking', 'fa-paint-brush'],
  ['Hondenpoep', 'fa-exclamation'],
  ['Kapotte straatverlichting', 'fa-lightbulb-o'],
  ['Losse stoeptegel / kapotte putdeksel', 'fa-road'],
  ['Ongedierte', 'fa-bug'],
  ['Onkruid', 'fa-pagelines'],
  ['Overlast', 'fa-volume-up'],
  ['Parkeren', 'fa-car'],
  ['Slecht wegdek', 'fa-road'],
  ['Speeltoestellen', 'fa-futbol-o'],
  ['Wateroverlast', 'fa-tint'],
  ['Zwerfvuil op straat', 'fa-trash'],
  ['Idee, wens of overig', 'fa-question']
]

categories.each do |title, icon_name|
  Category.create(title: title, icon_name: icon_name)
end
