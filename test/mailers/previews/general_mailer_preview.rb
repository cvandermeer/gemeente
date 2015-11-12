# Preview all emails at http://localhost:3000/rails/mailers/general_mailer
class GeneralMailerPreview < ActionMailer::Preview
  def new_community_notice_preview
    GeneralMailer.new_community_notice
  end
end
