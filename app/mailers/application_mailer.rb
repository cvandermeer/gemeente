class ApplicationMailer < ActionMailer::Base
  default to: proc.new { ['cvandermeer@live.nl', 'bart-hoekstra@live.nl'] },
  from: 'info@ikbeninwoner.nl'
  layout 'mailer'
end
