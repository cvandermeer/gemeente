class ApplicationMailer < ActionMailer::Base
  default from: proc.new { ['cvandemeer@live.nl', 'bart-hoekstra@live.nl'] }
  layout 'mailer'
end
